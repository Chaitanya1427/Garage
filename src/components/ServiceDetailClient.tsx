"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check, Clock, ShieldCheck, Wrench, Phone } from "lucide-react";
import { SERVICES_DATA } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function ServiceDetailClient({ slug }: { slug: string }) {
  const dbServices = useQuery(api.content.getByKey, { key: "services" });

  let service = SERVICES_DATA.find((s) => s.slug === slug);

  if (dbServices?.value) {
    try {
      const parsed = JSON.parse(dbServices.value);
      if (Array.isArray(parsed)) {
        const foundInDb = parsed.find(
          (s: any) =>
            s.slug === slug ||
            (s.id && s.id === slug) ||
            (s.title && s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug)
        );
        if (foundInDb) {
          service = {
            ...(service || SERVICES_DATA[0]),
            ...foundInDb,
            title: foundInDb.title || foundInDb.name || service?.title,
            shortDesc: foundInDb.shortDesc || foundInDb.description || service?.shortDesc,
            fullDesc: foundInDb.fullDesc || foundInDb.shortDesc || foundInDb.description || service?.fullDesc,
            startingPrice: foundInDb.startingPrice || service?.startingPrice,
            estimatedTime: foundInDb.estimatedTime || service?.estimatedTime,
          };
        }
      }
    } catch (e) {}
  }

  if (!service) {
    return (
      <div className="py-24 max-w-2xl mx-auto text-center space-y-4">
        <h1 className="font-serif text-3xl font-bold text-[#1F1B14]">Service Not Found</h1>
        <p className="text-sm text-[#6E6B65]">The requested service could not be located.</p>
        <Link href="/services" className="inline-block px-6 py-2.5 bg-[#1F1B14] hover:bg-[#2C2316] text-[#FAF8F5] text-xs font-semibold uppercase transition-colors">
          Back to All Services
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="text-xs text-[#6E6B65] flex items-center space-x-2">
        <Link href="/" className="hover:text-[#C5A059]">Home</Link>
        <span>/</span>
        <Link href="/services" className="hover:text-[#C5A059]">Services</Link>
        <span>/</span>
        <span className="text-[#1F1B14] font-medium">{service.title}</span>
      </div>

      {/* Main Service Header & Image Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] uppercase font-semibold tracking-widest text-[#C5A059] bg-[#1F1B14] px-2.5 py-1 inline-block">
            {service.category || "MACHINE"} SERVICE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-[#1F1B14] leading-tight">
            {service.title}
          </h1>
          <p className="text-lg text-[#6E6B65] leading-relaxed">
            {service.fullDesc || service.shortDesc}
          </p>

          <div className="bg-[#FAF8F5] border border-[#E6D7BC] p-6 grid grid-cols-2 gap-6 my-6">
            <div>
              <span className="text-xs text-[#6E6B65] block">Estimated Duration</span>
              <span className="font-serif text-xl font-semibold text-[#1F1B14] flex items-center gap-1.5 mt-1">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                {service.estimatedTime}
              </span>
            </div>
            <div>
              <span className="text-xs text-[#6E6B65] block">Pricing & Estimate</span>
              <a
                href="tel:+918668412375"
                className="font-serif text-base font-semibold text-[#C5A059] hover:underline flex items-center gap-1.5 mt-1"
              >
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span>Call for Quote (+91 86684 12375)</span>
              </a>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href={`/book?service=${service.slug}`}
              className="inline-flex items-center px-8 py-4 bg-[#1F1B14] hover:bg-[#2C2316] text-[#FAF8F5] text-xs font-semibold uppercase tracking-widest transition-colors space-x-2 group"
            >
              <span>Book {service.title}</span>
              <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="border border-[#E6D7BC] bg-white p-2">
            <img
              src={service.image || "/services/periodic-service.jpg"}
              alt={service.title}
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== "/services/periodic-service.jpg") {
                  target.src = "/services/periodic-service.jpg";
                }
              }}
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="mt-4 bg-[#1F1B14] text-[#FAF8F5] p-6 space-y-2 border border-[#2C2316]">
            <div className="flex items-center space-x-2 text-xs text-[#C5A059] font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>ROADCRAFTERS GARAGE GUARANTEE</span>
            </div>
            <p className="text-xs text-[#E6D7BC] leading-relaxed">
              12-Month or 15,000 km full warranty on all replaced parts and technical labor associated with this service.
            </p>
          </div>
        </div>
      </div>

      {/* Inclusions / Checklist */}
      {service.features && service.features.length > 0 && (
        <div className="bg-[#FAF8F5] border border-[#E6D7BC] p-8 md:p-12">
          <SectionHeading
            eyebrow="SERVICE SCOPE"
            title="What is Included in This Service"
            subtitle="Detailed checklist performed during every procedure."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {service.features.map((feat: string, idx: number) => (
              <div key={idx} className="flex items-start space-x-3 bg-white p-4 border border-[#E6D7BC]">
                <Check className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[#1F1B14] font-medium">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
