"use client";

import React from "react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { SERVICES_DATA } from "@/data/content";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function ServicesPage() {
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
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-[#E6D7BC] pb-8">
        <h1 className="font-serif text-4xl sm:text-5xl font-medium text-[#1F1B14]">
          Specialized Machine Engineering & Services
        </h1>
        <p className="mt-3 text-base text-[#6E6B65] max-w-2xl">
          Factory-scheduled maintenance, precision machine OBD diagnostics, and mechanical overhauls for all high-performance machines.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayServices.map((service: any) => (
          <ServiceCard key={service.id || service.title} service={service} />
        ))}
      </div>

      {/* Specialist CTA section */}
      <div className="bg-[#FAF8F5] border border-[#E6D7BC] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <h3 className="font-serif text-2xl font-semibold text-[#1F1B14]">
            Require a custom mechanical diagnostic or restoration quote?
          </h3>
          <p className="text-sm text-[#6E6B65] mt-2">
            Our technical masters handle precision mechanical refreshes, machine engine diagnostics, and custom setup.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 bg-[#1F1B14] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#2C2316] transition-colors whitespace-nowrap"
        >
          Consult Technical Master
        </Link>
      </div>
    </div>
  );
}
