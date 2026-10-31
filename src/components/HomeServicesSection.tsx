"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { SERVICES_DATA } from "@/data/content";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function HomeServicesSection() {
  const dbServices = useQuery(api.content.getByKey, { key: "services" });

  let displayServices = SERVICES_DATA;
  if (dbServices?.value) {
    try {
      const parsed = JSON.parse(dbServices.value);
      if (Array.isArray(parsed) && parsed.length > 0) {
        displayServices = parsed.map((srv: any, idx: number) => ({
          ...SERVICES_DATA[idx % SERVICES_DATA.length],
          ...srv,
          title: srv.title || srv.name,
          shortDesc: srv.shortDesc || srv.description || "",
        }));
      }
    } catch (e) {}
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="BIKE SPECIALTIES"
        title="Bespoke Care. Comprehensive Capability."
        subtitle="From periodic maintenance to ECU diagnostics, chain sync, and fork servicing, every job is performed to exacting standards."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayServices.slice(0, 6).map((service: any) => (
          <ServiceCard key={service.id || service.slug || service.title} service={service} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/services"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-[#1F1B14] hover:text-[#C5A059] border-b border-[#1F1B14] pb-1 transition-colors"
        >
          View All {displayServices.length} Specialized Bike Services
          <ArrowRight className="w-4 h-4 ml-2 text-[#C5A059]" />
        </Link>
      </div>
    </section>
  );
}
