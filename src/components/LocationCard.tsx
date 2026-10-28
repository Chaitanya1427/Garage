import React from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Mail, Clock } from "lucide-react";
import { LocationItem } from "@/data/content";

export default function LocationCard({ location }: { location: LocationItem }) {
  return (
    <div className="bg-white border border-[#E6D7BC] p-8 flex flex-col justify-between hover:border-[#C5A059] transition-colors shadow-sm">
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[#C5A059] bg-[#1F1B14] px-2.5 py-1">
            {location.city}
          </span>
        </div>
        <h3 className="font-serif text-2xl font-semibold text-[#1F1B14] mb-3">
          {location.name}
        </h3>
        
        <div className="space-y-2.5 text-xs text-[#6E6B65] mb-6">
          <p className="flex items-start gap-2 text-[#1F1E1B]">
            <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
            <span>{location.address}</span>
          </p>
          <a href={`tel:${location.phone.replace(/\s+/g, "")}`} className="flex items-center gap-2 hover:text-[#1F1B14]">
            <Phone className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
            <span>{location.phone}</span>
          </a>
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
            <span>{location.email}</span>
          </p>
          <p className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
            <span>{location.hours}</span>
          </p>
        </div>

        {/* Facility Badges */}
        <div className="mb-6">
          <span className="text-[10px] uppercase tracking-wider text-[#6E6B65] block mb-2 font-semibold">
            On-site Capabilities:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {location.facilities.map((fac) => (
              <span
                key={fac}
                className="text-[11px] bg-[#FAF8F5] border border-[#E6D7BC] text-[#1F1B14] px-2 py-0.5"
              >
                {fac}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#E6D7BC] flex items-center justify-between gap-3">
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-[#6E6B65] hover:text-[#1F1B14] underline"
        >
          Get Directions
        </a>
        <Link
          href="/book"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#1F1B14] px-4 py-2 hover:bg-[#2C2316] transition-colors"
        >
          Book Facility
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-[#C5A059]" />
        </Link>
      </div>
    </div>
  );
}
