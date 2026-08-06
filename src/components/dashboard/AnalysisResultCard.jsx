import React from 'react';
import { Building2, Briefcase, MapPin, Banknote, Save } from 'lucide-react';

const STATUS_OPTIONS = [
  'Applied',
  'Interview HR',
  'Interview User',
  'Technical Test',
  'Offering',
  'Accepted',
  'Rejected',
];

export default function AnalysisResultCard({
  result,
  selectedStatus,
  setSelectedStatus,
  onSaveJob,
}) {
  if (!result) {
    return (
      <div className="h-full min-h-[354px] flex flex-col items-center justify-center p-8 text-center bg-white/50 border border-dashed border-gray-200 rounded-3xl">
        <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-center justify-center mb-4">
          <Building2 className="w-6 h-6 text-[#FF84BA]/80" />
        </div>
        <h3 className="text-xs font-bold capitalize tracking-wider text-gray-700">
          Waiting Joba Analysis
        </h3>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-black/5 flex flex-col h-full overflow-hidden">
      <div className="p-5 border-b bg-gray-50/50 flex items-center justify-between">
        <h2 className="text-sm font-bold capitalize flex items-center gap-2">
          <div className="w-2.5 h-5 bg-[#FF84BA] rounded-sm" /> Result Joba Analysis
        </h2>
      </div>

      <div className="p-6 space-y-5 flex-1 max-h-[350px] overflow-y-auto custom-scrollbar">
        <div className="bg-gray-50/70 p-4.5 border border-gray-100 rounded-2xl space-y-2.5">
          <label className="text-[9px] font-bold capitalize tracking-widest text-[#FF84BA] block">
            Choose Your Job Application Status
          </label>
          <div className="flex flex-wrap gap-1.5">
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 rounded-xl text-[9px] font-extrabold uppercase tracking-wider border transition-all cursor-pointer ${
                  selectedStatus === status
                    ? 'bg-[#FF84BA] text-white border-transparent'
                    : 'bg-white text-gray-500 border-black/5 hover:text-gray-700'
                }`}>
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50/50 border border-gray-100 p-4 rounded-2xl space-y-1">
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider block">
              Company
            </span>
            <p className="text-xs font-extrabold uppercase text-gray-800 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#FF84BA]" />
              {result.company}
            </p>
          </div>

          <div className="bg-gray-50/50 border border-gray-100 p-4 rounded-2xl space-y-1">
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider block">
              Position
            </span>
            <p className="text-xs font-extrabold uppercase text-gray-800 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#44ACFF]" />
              {result.jobTitle}
            </p>
          </div>

          <div className="bg-gray-50/50 border border-gray-100 p-4 rounded-2xl space-y-1">
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider block">
              Location
            </span>
            <p className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              {result.location}
            </p>
          </div>

          <div className="bg-gray-50/50 border border-gray-100 p-4 rounded-2xl space-y-1">
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider block">
              Salary
            </span>
            <p className="text-xs font-bold text-green-600 flex items-center gap-1.5">
              <Banknote className="w-3.5 h-3.5 text-green-500" />
              {result.salary}
            </p>
          </div>
        </div>

        <div className="bg-gray-50/50 border border-gray-100 p-4 rounded-2xl space-y-2">
          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider block">
            Main Qualification
          </span>
          <ul className="space-y-2">
            {(result.qualifications || []).slice(0, 4).map((q, i) => (
              <li key={i} className="text-xs text-gray-600 font-medium flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#FF84BA] rounded-full shrink-0 mt-1.5" />
                <span>{q}</span>
              </li>
            ))}
            {(result.qualifications || []).length > 4 && (
              <li className="text-[9px] text-[#FF84BA] font-bold uppercase tracking-wider pl-3.5">
                +{(result.qualifications || []).length - 4} Other Qualification
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="p-4.5 bg-gray-50 border-t">
        <button
          onClick={onSaveJob}
          className="w-full py-3 bg-[#99C2FF] hover:bg-[#99C2FF]/90 text-white rounded-2xl font-bold capitalize text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
          <Save className="w-4 h-4" /> Save
        </button>
      </div>
    </div>
  );
}