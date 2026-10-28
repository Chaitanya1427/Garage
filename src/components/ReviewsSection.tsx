"use client";

import React from "react";
import { Star, CheckCircle, MapPin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { REVIEWS_DATA } from "@/data/content";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function ReviewsSection() {
  const dbReviews = useQuery(api.content.getByKey, { key: "reviews" });

  let displayReviews = REVIEWS_DATA;
  if (dbReviews?.value) {
    try {
      const parsed = JSON.parse(dbReviews.value);
      if (Array.isArray(parsed) && parsed.length > 0) {
        displayReviews = parsed.map((r: any, idx: number) => ({
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

  return (
    <section className="bg-[#FAF8F5] border-y border-[#E6D7BC] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header with Overall Rating Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E6D7BC] pb-8">
          <div>
            <SectionHeading
              eyebrow="VERIFIED GOOGLE REVIEWS"
              title="What Riders Say About RoadCrafters Garage"
              subtitle="Authentic customer feedback from machine and performance owners across Porvorim, Goa."
            />
          </div>
          <div className="bg-[#1F1B14] text-[#FAF8F5] p-5 border border-[#2C2316] flex items-center space-x-4 flex-shrink-0 shadow-md">
            <div className="text-center">
              <span className="font-sans text-3xl font-bold text-[#C5A059] block leading-none">
                5.0
              </span>
              <div className="flex items-center text-[#C5A059] mt-1 space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                ))}
              </div>
            </div>
            <div className="border-l border-[#2C2316] pl-4 text-xs">
              <span className="font-semibold text-white block">{displayReviews.length}+ Google Reviews</span>
              <span className="text-[#D4C4A8] text-[11px]">Top-Rated Machine Garage in Goa</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.map((review: any) => (
            <div
              key={review.id}
              className="bg-white border border-[#E6D7BC] p-6 flex flex-col justify-between hover:border-[#C5A059] transition-all shadow-sm group"
            >
              <div className="space-y-4">
                {/* Header: Author & Stars */}
                <div className="flex items-start justify-between gap-3 border-b border-[#FAF8F5] pb-3">
                  <div>
                    <h3 className="font-sans text-lg font-bold text-[#1F1B14] group-hover:text-[#C5A059] transition-colors">
                      {review.author}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      {review.badge && (
                        <span className="text-[10px] text-[#6E6B65] font-mono bg-[#FAF8F5] px-2 py-0.5 border border-[#E6D7BC]">
                          {review.badge}
                        </span>
                      )}
                      <span className="text-[10px] text-[#6E6B65]">{review.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-[#C5A059]">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="font-sans text-xs text-[#1F1E1B] leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              {/* Owner Response if present */}
              {review.ownerResponse && (
                <div className="mt-4 pt-3 border-t border-[#FAF8F5] bg-[#FAF8F5] p-3 text-[11px] space-y-1">
                  <div className="flex items-center space-x-1.5 text-[#1F1B14] font-semibold">
                    <CheckCircle className="w-3 h-3 text-[#C5A059]" />
                    <span>Response from RoadCrafters Garage:</span>
                  </div>
                  <p className="text-[#6E6B65] italic pl-4">"{review.ownerResponse}"</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer CTA in Reviews Section */}
        <div className="text-center pt-4">
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent("RoadCrafters Garage, Bay 9, Alcon Regency, Village Panchayat, near Nexa Showroom, Defence Colony, Aradi Socorro, Porvorim, Goa 403521, India")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#1F1B14] hover:text-[#C5A059] border-b border-[#1F1B14] pb-1 transition-colors gap-2"
          >
            <MapPin className="w-4 h-4 text-[#C5A059]" />
            <span>Read all 55+ Verified Customer Reviews on Google Maps →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
