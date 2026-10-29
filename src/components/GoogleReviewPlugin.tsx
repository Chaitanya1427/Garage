"use client";

import React, { useState, useEffect } from "react";
import { Star, X, ExternalLink, CheckCircle, ThumbsUp, MessageSquare } from "lucide-react";
import { REVIEWS_DATA } from "@/data/content";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function GoogleLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

const GOOGLE_MAPS_REVIEW_URL = `https://maps.google.com/?q=${encodeURIComponent(
  "RoadCrafters Garage, Bay 9, Alcon Regency, Village Panchayat, near Nexa Showroom, Defence Colony, Aradi Socorro, Porvorim, Goa 403521, India"
)}`;

export default function GoogleReviewPlugin({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [filter, setFilter] = useState<"all" | "5star">("all");
  const dbReviews = useQuery(api.content.getByKey, { key: "reviews" });

  let reviews = REVIEWS_DATA;
  if (dbReviews?.value) {
    try {
      const parsed = JSON.parse(dbReviews.value);
      if (Array.isArray(parsed) && parsed.length > 0) {
        reviews = parsed.map((r: any, idx: number) => ({
          id: r.id || `convex_rev_${idx}`,
          author: r.author || r.name || "Satisfied Rider",
          badge: r.badge || r.vehicle || "Verified Review",
          date: r.date || "Recently",
          rating: r.rating || 5,
          comment: r.comment || r.text || "",
          ownerResponse: r.ownerResponse,
        }));
      }
    } catch (e) {}
  }

  const filteredReviews =
    filter === "5star" ? reviews.filter((r) => r.rating === 5) : reviews;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white border border-[#E6D7BC] shadow-2xl overflow-hidden flex flex-col z-10">
        {/* Top Header */}
        <div className="bg-[#1F1B14] text-[#FAF8F5] p-6 border-b border-[#2C2316] flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md flex-shrink-0">
              <GoogleLogo className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-sans text-lg font-bold text-white tracking-wide">
                  RoadCrafters Garage
                </span>
                <span className="bg-[#2C2316] text-[#C5A059] text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 border border-[#C5A059]/30">
                  Verified
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs mt-0.5">
                <span className="font-bold text-[#C5A059]">5.0</span>
                <div className="flex text-[#C5A059]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                  ))}
                </div>
                <span className="text-[#D4C4A8]">({reviews.length}+ Google Reviews)</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#D4C4A8] hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter & Write Review Bar */}
        <div className="bg-[#FAF8F5] px-6 py-3.5 border-b border-[#E6D7BC] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider transition-all ${
                filter === "all"
                  ? "bg-[#1F1B14] text-white"
                  : "bg-white text-[#6E6B65] border border-[#E6D7BC] hover:border-[#C5A059]"
              }`}
            >
              All Reviews ({reviews.length})
            </button>
            <button
              onClick={() => setFilter("5star")}
              className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider transition-all flex items-center space-x-1 ${
                filter === "5star"
                  ? "bg-[#1F1B14] text-white"
                  : "bg-white text-[#6E6B65] border border-[#E6D7BC] hover:border-[#C5A059]"
              }`}
            >
              <Star className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
              <span>5 Stars ({reviews.filter((r) => r.rating === 5).length})</span>
            </button>
          </div>

          <a
            href={GOOGLE_MAPS_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#1F1B14] hover:text-[#C5A059] bg-white border border-[#E6D7BC] hover:border-[#C5A059] px-3.5 py-1.5 shadow-sm transition-all"
          >
            <GoogleLogo className="w-3.5 h-3.5" />
            <span>Write a Google Review</span>
            <ExternalLink className="w-3 h-3 text-[#C5A059]" />
          </a>
        </div>

        {/* Reviews List */}
        <div className="p-6 overflow-y-auto space-y-4 max-h-[60vh]">
          {filteredReviews.map((rev: any, idx: number) => {
            const initial = (rev.author || "R").charAt(0).toUpperCase();
            const avatarColors = [
              "bg-blue-600",
              "bg-red-600",
              "bg-emerald-600",
              "bg-amber-600",
              "bg-purple-600",
              "bg-teal-600",
            ];
            const avatarColor = avatarColors[idx % avatarColors.length];

            return (
              <div
                key={rev.id || idx}
                className="bg-white border border-[#E6D7BC] p-5 hover:border-[#C5A059] transition-all shadow-sm"
              >
                {/* Author Info */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-9 h-9 rounded-full ${avatarColor} text-white font-bold flex items-center justify-center text-sm shadow-sm flex-shrink-0`}
                    >
                      {initial}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-sans font-bold text-sm text-[#1F1B14]">
                          {rev.author}
                        </span>
                        <GoogleLogo className="w-3 h-3" />
                      </div>
                      <div className="flex items-center space-x-2 text-[11px] text-[#6E6B65]">
                        {rev.badge && (
                          <span className="bg-[#FAF8F5] px-1.5 py-0.5 border border-[#E6D7BC]">
                            {rev.badge}
                          </span>
                        )}
                        <span>{rev.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center text-[#C5A059]">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-xs text-[#1F1E1B] leading-relaxed pl-12">
                  "{rev.comment}"
                </p>

                {/* Owner Reply */}
                {rev.ownerResponse && (
                  <div className="mt-3.5 ml-12 pt-3 border-t border-[#FAF8F5] bg-[#FAF8F5] p-3 text-[11px] space-y-1">
                    <div className="flex items-center space-x-1.5 text-[#1F1B14] font-semibold">
                      <CheckCircle className="w-3 h-3 text-[#C5A059]" />
                      <span>Response from RoadCrafters Garage:</span>
                    </div>
                    <p className="text-[#6E6B65] italic pl-4">
                      "{rev.ownerResponse}"
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-[#FAF8F5] p-4 border-t border-[#E6D7BC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-[#6E6B65]">
            <GoogleLogo className="w-4 h-4" />
            <span>Official Google Business Profile • Porvorim, Goa</span>
          </div>

          <a
            href={GOOGLE_MAPS_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#1F1B14] hover:text-[#C5A059] flex items-center space-x-1 underline"
          >
            <span>View All Reviews on Google Maps</span>
            <ExternalLink className="w-3 h-3 text-[#C5A059]" />
          </a>
        </div>
      </div>
    </div>
  );
}
