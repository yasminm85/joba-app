'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import joba from '../../../public/joba.svg';
import { LogOut } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';
import { useJobs } from '@/hooks/useJobs';
import { useGoogleCalendar } from '@/hooks/useGoogleCalendar';

import ScannerSection from '@/components/dashboard/ScannerSection';
import AnalysisResultCard from '@/components/dashboard/AnalysisResultCard';
import JobDetailModal from '@/components/dashboard/JobDetailModal';
import JobDeleteModal from '@/components/dashboard/JobDeleteModal';
import JobTrackerHistory from '@/components/dashboard/JobTrackerHistory';

export default function MainPage() {
  const { user, logout } = useAuthContext();

  const {
    savedJobs,
    isJobsLoading,
    saveJob,
    editJob,
    deleteJob,
    updateStatus,
  } = useJobs(user);

  const [activeTab, setActiveTab] = useState('image');
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('Applied');

  const [viewingJob, setViewingJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);

  const { exportToCalendar, calendarExporting, calendarStatusMsg } =
    useGoogleCalendar(async (job, updateData) => {
      await editJob({ ...job, ...updateData });
      if (
        viewingJob &&
        (viewingJob._id === job._id || viewingJob.id === job.id)
      ) {
        setViewingJob((prev) => (prev ? { ...prev, ...updateData } : prev));
      }
    });

  const handleExtract = async () => {
    setIsExtracting(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          activeTab === 'image'
            ? { image: selectedImage }
            : { text: inputText },
        ),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
          throw new Error(
            `Server Error (${response.status}): Ukuran file/data terlalu besar.`,
          );
        }

        const errorData = await response.json();
        throw new Error(errorData.message || 'Terjadi kesalahan pada server.');
      }

      const data = await response.json();
      setResult(data);
      setSelectedStatus('Applied');
    } catch (err) {
      console.error('Fetch Error:', err);
      setError(err.message);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleSaveJob = async () => {
    if (!result || !user) return;

    const bodyData = {
      jobTitle: result.jobTitle || '',
      company: result.company || '',
      location: result.location || '',
      description: result.description || '',
      qualifications: result.qualifications || [],
      salary: result.salary || 'Not disclosed',
      contact: result.contact || '',
      status: selectedStatus || 'Applied',
    };

    try {
      await saveJob(bodyData);
      setResult(null);
      setSelectedImage(null);
      setInputText('');
    } catch (err) {
      alert(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFEFE3] text-[#2D2321] p-4 md:p-6 font-sans flex flex-col gap-6">
      <div className="max-w-6xl w-full mx-auto space-y-6">
        <header className="bg-white/80 backdrop-blur-md border border-black/5 rounded-3xl p-4.5 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-white rounded-xl shadow-sm border border-black/5 flex items-center justify-center">
              <Image
                src={joba}
                alt="Joba Logo"
                className="h-9 w-auto object-contain rounded-lg"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 pl-2.5 pr-3 py-1.5 rounded-2xl border border-gray-100">
            <span className="text-xs font-bold text-gray-700 capitalize tracking-tight">
              {user?.name || user?.email || 'User'}
            </span>
            <button
              onClick={logout}
              className="p-1 hover:text-[#FF84BA] text-gray-400 transition-colors cursor-pointer"
              title="Logout">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5">
            <ScannerSection
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              inputText={inputText}
              setInputText={setInputText}
              isExtracting={isExtracting}
              error={error}
              onExtract={handleExtract}
            />
          </div>

          <div className="lg:col-span-7 h-full">
            <AnalysisResultCard
              result={result}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              onSaveJob={handleSaveJob}
            />
          </div>
        </div>
        <JobTrackerHistory
          savedJobs={savedJobs}
          onViewJob={(job) => setViewingJob(job)}
          onStartEdit={(job) => setEditingJob(job)}
          onDeleteJob={(job) => setJobToDelete(job)}
          onUpdateStatus={(id, status) => updateStatus({ id, status })}
        />
      </div>

      <JobDetailModal
        viewingJob={viewingJob}
        onClose={() => setViewingJob(null)}
        onStartEdit={(job) => setEditingJob(job)}
      />

      <JobDeleteModal
        jobToDelete={jobToDelete}
        onClose={() => setJobToDelete(null)}
        onDelete={deleteJob}
      />
    </div>
  );
}
