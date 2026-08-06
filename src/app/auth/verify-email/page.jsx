"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ success: false, message: "" });

  useEffect(() => {
    if (!token) {
      setStatus({ success: false, message: "Token not found" });
      setLoading(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed Verify");

        setStatus({ success: true, message: data.message });
      } catch (err) {
        setStatus({ success: false, message: err.message });
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-black/5 shadow-xl text-center space-y-4">
      {loading ? (
        <div className="flex flex-col items-center gap-3 py-6">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF84BA]" />
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Verification</p>
        </div>
      ) : status.success ? (
        <div className="space-y-4">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
          <h1 className="text-xl font-black uppercase text-[#2D2321]">Email has verifified!</h1>
          <p className="text-xs text-gray-500 font-medium">{status.message}</p>
          <button
            onClick={() => router.push("/")}
            className="w-full py-3.5 bg-[#FF84BA] text-white rounded-2xl font-bold text-xs uppercase tracking-wider cursor-pointer mt-4"
          >
            Go to Login
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <XCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h1 className="text-xl font-black uppercase text-[#2D2321]">Failed Verify</h1>
          <p className="text-xs text-red-500 font-medium">{status.message}</p>
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 bg-gray-100 text-gray-700 rounded-2xl font-bold text-xs uppercase tracking-wider cursor-pointer mt-4"
          >
            Back to landing
          </button>
        </div>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-[#FFEFE3] flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-xs font-bold">Loading...</div>}>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}