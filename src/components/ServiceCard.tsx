import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { ServiceItem } from "@/data/content";

export default function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <div className="bg-white border border-[#E6D7BC] group hover:border-[#C5A059] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm">
      <div>
        {/* Service Image */}
        <div className="relative h-48 w-full overflow-hidden bg-stone-900">
          <img
            src={service.image || "/services/periodic-service.jpg"}
            alt={service.title}
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== "/services/periodic-service.jpg") {
                target.src = "/services/periodic-service.jpg";
              }
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-[#1F1B14]/90 backdrop-blur-sm border border-[#C5A059]/40 text-[#FAF8F5] text-[10px] uppercase font-semibold tracking-widest px-2.5 py-1">
            {service.category || "MACHINE"}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-baseline mb-2">
            <h3 className="font-serif text-xl font-semibold text-[#1F1B14] group-hover:text-[#C5A059] transition-colors">
              {service.title}
            </h3>
          </div>
          <p className="text-sm text-[#6E6B65] leading-relaxed mb-4 line-clamp-2">
            {service.shortDesc}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-0 border-t border-[#E6D7BC]/40 mt-auto flex items-center justify-between">
        <a
          href="tel:+918668412375"
          className="inline-flex items-center text-xs font-semibold text-[#C5A059] hover:underline gap-1"
        >
          <Phone className="w-3 h-3" />
          <span>Call for Quote</span>
        </a>
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#1F1B14] group-hover:text-[#C5A059] transition-colors"
        >
          Explore Service
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
