import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Grid,
  List,
  Search,
  Filter,
  X,
  MapPin,
  Banknote,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Building2,
  Plus,
} from 'lucide-react';
import StatusBadge from '@/components/common/StatusBadge';

const STATUS_OPTIONS = [
  'Applied',
  'Interview HR',
  'Interview User',
  'Technical Test',
  'Offering',
  'Accepted',
  'Rejected',
];

export default function JobTrackerHistory({
  savedJobs = [],
  onViewJob,
  onStartEdit,
  onDeleteJob,
  onUpdateStatus,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  const filteredJobs = savedJobs.filter((job) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      job.jobTitle?.toLowerCase().includes(query) ||
      job.company?.toLowerCase().includes(query) ||
      job.location?.toLowerCase().includes(query) ||
      job.description?.toLowerCase().includes(query);

    const matchesStatus = filterStatus === 'All' || job.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  if (savedJobs.length === 0) {
    return (
      <section
        id="history-tracker"
        className="bg-white rounded-3xl border border-black/5 p-6 shadow-sm">
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mb-4 shadow-xs">
            <Plus className="w-6 h-6 text-[#FF84BA]" />
          </div>
          <h3 className="font-bold capitalize text-gray-700 text-xs tracking-wider">
            No Saved Application Yet
          </h3>
          <p className="text-[10px] text-gray-400 max-w-sm mt-1 capitalize font-semibold">
            Try Your First Joba
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="history-tracker"
      className="bg-white rounded-3xl border border-black/5 p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-6 bg-[#99C2FF] rounded-sm" />
          <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight">
            Job Application History
          </h2>
        </div>

        <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-black/5 self-end shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white text-[#FF84BA]'
                : 'text-gray-400 hover:text-gray-600'
            }`}
            title="Card View">
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white text-[#FF84BA]'
                : 'text-gray-400 hover:text-gray-600'
            }`}
            title="Table View">
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/70 p-4 rounded-2xl border border-gray-100">
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search company, location, position"
              className="w-full pl-10 pr-10 py-2 rounded-xl border border-black/5 focus:outline-none focus:border-[#FF84BA] text-xs font-semibold placeholder:text-gray-400 bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-red-500 cursor-pointer">
                <X className="w-3.5 h-3.5 bg-gray-100 rounded-full p-0.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 justify-end">
            <span className="text-[10px] font-bold capitalize tracking-wider text-gray-400 flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3 text-[#FF84BA]" /> Filter:
            </span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-black/5 focus:outline-none text-xs font-bold capitalize tracking-wider bg-white text-gray-600 cursor-pointer">
              <option value="All">All Status</option>
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredJobs.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job._id || job.id}
                  layout
                  className="bg-white border border-black/5 rounded-2xl p-4.5 space-y-3.5 flex flex-col justify-between hover:shadow-md transition-shadow relative">
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-extrabold text-sm uppercase text-gray-800 truncate">
                          {job.jobTitle}
                        </h4>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase truncate mt-0.5">
                          {job.company}
                        </p>
                      </div>

                      <div className="relative inline-block hover:scale-105 transition-transform shrink-0">
                        <select
                          value={job.status}
                          onChange={(e) =>
                            onUpdateStatus(job._id || job.id, e.target.value)
                          }
                          className="absolute inset-0 opacity-0 cursor-pointer w-full">
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <StatusBadge status={job.status} />
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5 text-[10px] text-gray-500 border-t border-b border-gray-50 py-2 flex-wrap">
                      <span className="flex items-center gap-1 shrink-0">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        {job.location || 'Remote'}
                      </span>
                      <span className="flex items-center gap-1 shrink-0 text-green-600 font-bold">
                        <Banknote className="w-3.5 h-3.5 text-green-500" />
                        {job.salary || 'Negosiasi'}
                      </span>
                    </div>

                    {job.interviewDate && (
                      <div className="flex items-center gap-1.5 bg-[#99C2FF]/10 text-[#44ACFF] text-[9px] font-bold uppercase py-1 px-2.5 rounded-lg w-fit">
                        <Calendar className="w-3 h-3" />
                        <span>Scheduled Interview</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-gray-50">
                    <span className="text-[9px] text-gray-400 font-mono">
                      {new Date(job.createdAt).toLocaleDateString('id-ID')}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onViewJob(job)}
                        className="p-1.5 hover:bg-gray-50 text-gray-500 rounded-lg border border-black/5 cursor-pointer"
                        title="View Detail">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onStartEdit(job)}
                        className="p-1.5 hover:bg-gray-50 text-[#44ACFF] rounded-lg border border-black/5 cursor-pointer"
                        title="Edit Detail">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteJob(job)}
                        className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg border border-black/5 cursor-pointer"
                        title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Position
                      </th>
                      <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Company
                      </th>
                      <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Application Status
                      </th>
                      <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Location
                      </th>
                      <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredJobs.map((job) => (
                      <tr
                        key={job._id || job.id}
                        className="bg-white hover:bg-gray-50/40 text-gray-700 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <p className="font-bold uppercase text-gray-800 text-xs">
                              {job.jobTitle}
                            </p>
                            {job.interviewDate && (
                              <span className="inline-flex items-center gap-1 bg-[#99C2FF]/15 border border-[#99C2FF]/20 text-gray-600 text-[8px] font-bold uppercase px-1.5 py-0.5 rounded">
                                <Calendar className="w-2.5 h-2.5 text-[#44ACFF]" />
                                Scheduled
                              </span>
                            )}
                          </div>
                          <p className="text-[9px] text-gray-400 mt-0.5 font-mono">
                            {new Date(job.createdAt).toLocaleDateString('id-ID')}
                          </p>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-xs font-bold text-gray-600 uppercase">
                              {job.company}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="relative inline-block hover:scale-105 transition-transform">
                            <select
                              value={job.status}
                              onChange={(e) =>
                                onUpdateStatus(job._id || job.id, e.target.value)
                              }
                              className="absolute inset-0 opacity-0 cursor-pointer w-full">
                              {STATUS_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                            <StatusBadge status={job.status} />
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-xs font-semibold text-gray-500">
                              {job.location}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onViewJob(job)}
                              className="p-1.5 hover:bg-gray-50 border border-black/5 rounded-lg cursor-pointer text-gray-400 hover:text-gray-600">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onStartEdit(job)}
                              className="p-1.5 hover:bg-gray-50 border border-black/5 rounded-lg cursor-pointer text-[#44ACFF]">
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteJob(job)}
                              className="p-1.5 hover:bg-gray-50 border border-black/5 rounded-lg cursor-pointer text-red-500">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        ) : (
          <div className="bg-gray-50 border border-dashed border-gray-200 rounded-3xl p-12 text-center">
            <div className="w-11 h-11 rounded-full bg-white border border-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
              <Search className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold capitalize text-gray-600">
              Searching Not Found
            </p>
            <p className="text-[10px] text-gray-400 mt-1 capitalize font-semibold">
              Try another keywords
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterStatus('All');
              }}
              className="mt-4 px-4 py-2 bg-white border border-black/5 hover:bg-gray-50 text-gray-600 text-xs font-bold capitalize tracking-wider rounded-xl transition-colors shadow-xs cursor-pointer">
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}