"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Wrench, ShieldCheck, CheckCircle2, Phone, Search, Package, Sparkles, AlertCircle } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SPARE_PARTS_DATA, SparePartCategory } from "@/data/content";

export default function SparePartsClient() {
  const [categories, setCategories] = useState<SparePartCategory[]>(SPARE_PARTS_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const dbParts = useQuery(api.content.getByKey, { key: "sparePartsCategories" });

  useEffect(() => {
    if (dbParts?.value) {
      try {
        const parsed = JSON.parse(dbParts.value);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCategories(parsed);
        }
      } catch (e) {
        console.error("Failed to parse spare parts from CMS:", e);
      }
    }
  }, [dbParts]);

  const filteredCategories = categories.filter((cat) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      cat.title.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q) ||
      cat.badge.toLowerCase().includes(q) ||
      cat.items.some((item) => item.toLowerCase().includes(q))
    );
  });

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      {/* Page Header */}
      <div className="border-b border-[#E6D7BC] pb-8 text-center max-w-3xl mx-auto">
        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#C5A059] bg-[#1F1B14] px-3 py-1 inline-block mb-3">
          GENUINE OEM & PERFORMANCE COMPONENTS
        </span>
        <h1 className="text-4xl sm:text-5xl font-medium text-[#1F1B14] tracking-tight">
          High-Performance Machine Parts & Inventory
        </h1>
        <p className="mt-4 text-base text-[#6E6B65] leading-relaxed">
          We stock 100% authentic OEM machine components, high-performance synthetic lubricants, sintered brake pads, and heavy-duty drive chains for all street, sport, and cruiser machines.
        </p>

        {/* Real-time Filter Search */}
        <div className="mt-8 relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-[#6E6B65] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search parts, brands (e.g. Motul, Brembo, DID)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#E6D7BC] text-sm text-[#1F1B14] focus:outline-none focus:border-[#C5A059] shadow-sm rounded-none"
          />
        </div>
      </div>

      {/* Call to Order Banner */}
      <div className="bg-[#1F1B14] text-white p-8 border border-[#2C2316] flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C5A059]">
            SPARE PARTS INQUIRY & AVAILABILITY
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Need a Specific Part for Your Machine?
          </h2>
          <p className="text-sm text-[#D4C4A8] max-w-xl">
            Call our spare parts desk directly to check real-time stock availability, order OEM components, or get recommendations for your bike.
          </p>
        </div>
        <a
          href="tel:+918668412375"
          className="px-8 py-4 bg-[#C5A059] hover:bg-[#B38E47] text-[#1F1B14] font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2 whitespace-nowrap shadow-md"
        >
          <Phone className="w-4 h-4" />
          <span>Call Desk: +91 86684 12375</span>
        </a>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="bg-[#FAF8F5] border border-[#E6D7BC] p-6 space-y-6 flex flex-col justify-between hover:shadow-lg transition-shadow"
          >
            <div className="space-y-4">
              <div className="relative h-44 w-full bg-[#1F1B14] overflow-hidden border border-[#E6D7BC]/50">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 bg-[#1F1B14] text-[#C5A059] text-[10px] uppercase tracking-widest px-2.5 py-1 font-bold border border-[#C5A059]/40">
                  {category.badge}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#1F1B14] tracking-tight">
                  {category.title}
                </h3>
                <p className="text-xs text-[#6E6B65] mt-1 leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#E6D7BC]/60 space-y-2">
                <span className="text-[10px] uppercase font-bold text-[#C5A059] tracking-wider block">
                  Available Stock & Models:
                </span>
                <ul className="space-y-1.5">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#1F1B14]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6D7BC] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#1F1B14]">Call to check part availability</span>
              <a
                href="tel:+918668412375"
                className="text-xs font-bold uppercase text-[#C5A059] hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>Inquire</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12 bg-[#FAF8F5] border border-[#E6D7BC] p-8 space-y-3">
          <AlertCircle className="w-8 h-8 text-[#C5A059] mx-auto" />
          <h3 className="text-lg font-bold text-[#1F1B14]">No Spare Parts Matched Your Query</h3>
          <p className="text-xs text-[#6E6B65]">
            Call our desk directly at +91 86684 12375 — we source specialized OEM parts on request.
          </p>
        </div>
      )}
    </div>
  );
}
