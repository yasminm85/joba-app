import React from 'react';

export default function StatusBadge({ status }) {
  const getColors = () => {
    switch (status) {
      case 'Applied':
        return 'bg-[#FF84BA]/10 text-[#FF84BA] border-[#FF84BA]/20';
      case 'Interview HR':
      case 'Interview User':
      case 'Technical Test':
        return 'bg-[#99C2FF]/15 text-[#44ACFF] border-[#99C2FF]/30';
      case 'Offering':
        return 'bg-[#FFDF82]/25 text-amber-600 border-[#FFDF82]/40';
      case 'Accepted':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'Rejected':
        return 'bg-gray-50 text-gray-500 border-gray-100';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <span
      className={`inline-block px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider border rounded-full ${getColors()}`}>
      {status}
    </span>
  );
}