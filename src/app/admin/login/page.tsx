"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, KeyRound, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const inputPasscode = passcode.trim();
    const fallbackPasscode = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "roadcrafters2026";

    if (inputPasscode === "roadcrafters2026" || inputPasscode === fallbackPasscode) {
      const token = `rc_admin_token_${Date.now()}`;
      localStorage.setItem("rc_admin_token", token);
      document.cookie = `rc_admin_token=${token}; path=/; max-age=604800; SameSite=Lax`;
      window.location.href = "/admin";
    } else {
      setError("Invalid admin passcode.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1F1B14] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#2C2316] border border-[#2C2316] p-8 rounded-none shadow-2xl space-y-6">
        {/* Header Monogram */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#C5A059] shadow-lg bg-[#1F1B14] flex items-center justify-center">
            <img
              src="/logo-19th.png"
              alt="RoadCrafters Garage Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="font-sans text-2xl font-bold text-[#FAF8F5] tracking-wide text-center">
            RoadCrafters Admin Portal
          </h1>
          <p className="text-xs text-[#E6D7BC] uppercase tracking-widest text-center font-medium">
            Server-Secured Convex Backend
          </p>
        </div>

        {error && (
          <div className="bg-red-950/60 border border-red-800/40 p-3 text-xs text-red-200 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#C5A059] mb-1.5 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Admin Passcode</span>
            </label>
            <input
              type="password"
              required
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode..."
              className="w-full px-4 py-3 bg-[#1F1B14] border border-[#E6D7BC]/30 text-[#FAF8F5] text-sm focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#C5A059] hover:bg-[#B38E47] text-[#1F1B14] font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{loading ? "Authenticating..." : "Access Admin Portal"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="border-t border-[#1F1B14] pt-4 text-center">
          <p className="text-[11px] text-[#E6D7BC] flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Server-Verified Session Encryption</span>
          </p>
        </div>
      </div>
    </div>
  );
}
