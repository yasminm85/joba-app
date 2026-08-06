import React from "react";

export default function ScanToCardAnimation() {
  return (
    <div className="relative w-[460px] max-w-full h-[460px]">
      <div className="absolute inset-0 rounded-[20px] bg-white shadow-[0_18px_40px_rgba(43,33,29,0.10)] overflow-hidden border border-[#EBD9C6]">

        <div className="absolute inset-0 p-7 flex flex-col gap-2.5 motion-safe:animate-[rawFade_7s_infinite] motion-reduce:opacity-100">
          <div className="flex gap-1.5 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#EBD9C6]" />
            <span className="w-2 h-2 rounded-full bg-[#EBD9C6]" />
            <span className="w-2 h-2 rounded-full bg-[#EBD9C6]" />
          </div>
          <div className="h-4 w-[78%] rounded bg-[#E3DCD2]" />
          <div className="h-[11px] w-[60%] rounded bg-[#EEEAE3]" />
          <div className="h-[11px] w-[92%] rounded bg-[#EEEAE3]" />
          <div className="h-[11px] w-[40%] rounded bg-[#EEEAE3] mt-1.5" />
          <div className="h-5 w-[88px] rounded-full bg-[#FBEAF0] mt-2.5" />
          <div className="h-[11px] w-[92%] rounded bg-[#EEEAE3]" />
          <div className="h-[11px] w-[60%] rounded bg-[#EEEAE3]" />
          <div className="h-[11px] w-[92%] rounded bg-[#EEEAE3]" />
          <div className="h-[11px] w-[40%] rounded bg-[#EEEAE3]" />
        </div>

        {/* Scan beam */}
        <div className="absolute left-0 right-0 h-16 -top-16 z-10 pointer-events-none motion-safe:animate-[sweep_7s_infinite] motion-reduce:hidden bg-gradient-to-b from-[rgba(234,132,183,0)] via-[rgba(234,132,183,0.55)] to-[rgba(234,132,183,0.15)] after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-[#EA84B7]" />

        {/* Structured result state */}
        <div className="absolute inset-0 flex flex-col opacity-0 motion-safe:animate-[resultFade_7s_infinite] motion-reduce:opacity-0 motion-reduce:hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#EBD9C6] shrink-0">
            <div className="w-2 h-5.5 rounded bg-[#EA84B7] shrink-0" />
            <div className="text-sm text-[#2B211D] tracking-wide">Joba Analysis Result</div>
          </div>

          <div className="p-5 pt-4 flex-1 flex flex-col gap-3">
            <div className="bg-[#F7F5F1] rounded-2xl px-4 py-3.5">
              <div className="text-[9px] text-[#C85D93] tracking-wide mb-2">
                Choose Application Status
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[9.5px] tracking-wide px-2.5 py-1.5 rounded-full bg-[#EA84B7] text-white border border-[#EA84B7] whitespace-nowrap">
                  APPLIED
                </span>
                {["INTERVIEW HR", "INTERVIEW USER", "TECHNICAL TEST", "OFFERING", "ACCEPTED", "REJECTED"].map((label) => (
                  <span
                    key={label}
                    className="text-[9.5px] tracking-wide px-2.5 py-1.5 rounded-full bg-white text-[#948577] border border-[#EBD9C6] whitespace-nowrap"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <FieldCard delay="0s" label="Company"  value="Joba Laps" />
              <FieldCard delay="0.1s" label="Job Postion" value="Frontend Engineer" />
              <FieldCard delay="0.2s" label="Location" value="Jakarta" />
              <FieldCard delay="0.3s" label="Salary" value="Rp 12–18jt" valueColor="text-[#3E9A5C]" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function FieldCard({ delay, label, value, valueColor = "text-[#2B211D]" }) {
  return (
    <div
      className="border border-[#EBD9C6] rounded-2xl px-3.5 py-3 opacity-0 translate-y-1.5 motion-safe:animate-[fieldIn_7s_infinite] motion-reduce:opacity-100 motion-reduce:translate-y-0"
      style={{ animationDelay: delay }}
    >
      <div className="text-[9px] text-[#948577] tracking-wide mb-2">{label}</div>
      <div className="flex items-center gap-2">
        <div className={`text-[12.5px] font-bold ${valueColor}`}>{value}</div>
      </div>
    </div>
  );
}