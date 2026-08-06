import React from "react";
import { Wrench } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#FFEFE3] flex items-center justify-center p-6 text-[#2D2321]">
      <div className="w-full max-w-md bg-white border border-black/5 rounded-3xl p-8 shadow-xl text-center space-y-5">
        <div className="w-16 h-16 bg-[#FF84BA]/10 text-[#FF84BA] rounded-2xl flex items-center justify-center mx-auto">
          <Wrench className="w-8 h-8 animate-bounce" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black uppercase tracking-tight">
            System Maintenance
          </h1>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            We are currently upgrading JOBA to serve you better. We'll be back online shortly!
          </p>
        </div>
      </div>
    </div>
  );
}