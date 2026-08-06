import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Edit, X, MapPin, Banknote, Check, Calendar, ScrollText, ListChecks, Contact } from 'lucide-react';
import StatusBadge from '@/components/common/StatusBadge';

export default function JobDetailModal({ viewingJob, onClose, onStartEdit }) {
  if (!viewingJob) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-xs"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          className="relative w-full max-w-2xl bg-white border border-black/5 rounded-3xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col z-10">
          <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#99C2FF]/15 border border-[#99C2FF]/20 text-[#44ACFF] flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-sm uppercase leading-tight text-gray-800">
                  {viewingJob.jobTitle}
                </h3>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-0.5">
                  {viewingJob.company}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onStartEdit(viewingJob);
                  onClose();
                }}
                className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold uppercase bg-[#007DCC] hover:bg-[#99C2FF]/95 text-white rounded-xl transition-all shadow-xs cursor-pointer">
                <Edit className="w-3.5 h-3.5" />
                EDIT
              </button>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors bg-white border border-black/5 cursor-pointer">
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto flex-1 min-h-0 custom-scrollbar space-y-6">
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="space-y-1 text-left">
                <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" /> Location
                </span>
                <p className="text-xs font-bold text-gray-700 uppercase">
                  {viewingJob.location}
                </p>
              </div>
              <div className="space-y-1 text-left">
                <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                  <Banknote className="w-3.5 h-3.5 text-gray-400" /> Salary
                </span>
                <p className="text-xs font-bold text-green-600">
                  {viewingJob.salary}
                </p>
              </div>
              <div className="grid grid-cols-1 col-span-2 pt-2 border-t border-gray-200/50 space-y-1 text-left">
                <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-gray-400" /> Application Status
                </span>
                <div className="pt-0.5">
                  <StatusBadge status={viewingJob.status} />
                </div>
              </div>
            </div>

            {viewingJob.interviewDate ? (
              <div className="p-4.5 bg-[#99C2FF]/10 border border-[#99C2FF]/20 rounded-2xl space-y-2 text-left">
                <div className="flex items-center gap-1.5 border-b border-[#99C2FF]/10 pb-1.5">
                  <Calendar className="w-4.5 h-4.5 text-[#44ACFF]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Interview Information
                  </h4>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-600 font-medium">
                  <div>
                    <span className="font-bold text-gray-400 text-[9px] uppercase block tracking-wider mb-0.5">
                      Scheduled Interviews
                    </span>
                    Scheduled on{' '}
                    <span className="font-bold text-gray-800">
                      {new Date(viewingJob.interviewDate).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>{' '}
                    at{' '}
                    <span className="font-bold text-gray-800">
                      {viewingJob.interviewTime || ''}
                    </span>{' '}
                    ({viewingJob.interviewDuration || '60'} minutes)
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3.5 bg-gray-50 border border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-gray-400/75" />
                No Saved Scheduled Interview
              </div>
            )}

            <div className="space-y-2 text-left">
              <label className="text-[9px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                <ScrollText className="w-3.5 h-3.5 text-gray-400" /> Description and Responsible
              </label>
              <div className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100 whitespace-pre-wrap font-medium">
                {viewingJob.description || 'No Saved Description'}
              </div>
            </div>

            <div className="space-y-2 text-left">
              <label className="text-[9px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                <ListChecks className="w-3.5 h-3.5 text-gray-400" /> Detail Qualification
              </label>
              <ul className="grid grid-cols-1 gap-2">
                {(viewingJob.qualifications || []).map((q, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs text-gray-600 font-medium bg-gray-50/50 p-2.5 border border-gray-100 rounded-xl">
                    <span className="w-5 h-5 rounded bg-[#99C2FF]/15 text-[#44ACFF] flex items-center justify-center text-[9px] shrink-0 font-bold border border-[#99C2FF]/20">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {viewingJob.contact && (
              <div className="space-y-2 pt-2 border-t border-gray-100 text-left">
                <label className="text-[9px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                  <Contact className="w-3.5 h-3.5 text-gray-400" /> Contact Information
                </label>
                <div className="p-3.5 bg-[#FFEFE3]/60 border border-[#FF84BA]/15 rounded-2xl flex items-center justify-between gap-4">
                  <p className="text-xs font-bold text-gray-700 truncate font-mono max-w-[80%]">
                    {viewingJob.contact}
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(viewingJob.contact);
                      alert('Copied!');
                    }}
                    className="text-[9px] font-bold uppercase text-[#FF84BA] hover:underline cursor-pointer shrink-0">
                    Copy Contact
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-red-50 border-t border-gray-100">
            <button
              onClick={onClose}
              className="w-full py-3 bg-red-500 hover:bg-red-600 active:scale-98 text-white rounded-2xl font-bold uppercase text-xs tracking-wider transition-all shadow-sm cursor-pointer">
              Close Detail
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}