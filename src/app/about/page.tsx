import React from "react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { classNamesImages } from "@/data/content";

export const metadata = {
  title: "About Us | RoadCrafters Garage (रोडक्राफ्टर्स गैरेज)",
  description:
    "Learn about our heritage, philosophy, factory certifications, and master technicians at RoadCrafters Garage (रोडक्राफ्टर्स गैरेज) in Porvorim, Goa.",
};

export default function AboutPage() {
  return (
    <div className="py-12 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="border-b border-[#E6D7BC] pb-12">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1F1B14] leading-tight">
          Built on Craftsmanship. Driven by Trust.
        </h1>
        <p className="mt-6 text-lg text-[#6E6B65] max-w-3xl leading-relaxed">
          Established as a rider-first alternative to impersonal main dealer service centres, RoadCrafters Garage (रोडक्राफ्टर्स गैरेज) was built with a clear mandate: deliver uncompromising mechanical craftsmanship, factory-grade machine OBD diagnostics, and transparent pricing without corporate inflation.
        </p>
      </div>

      {/* Editorial Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <SectionHeading
            eyebrow="OUR PHILOSOPHY"
            title="No Shortcuts. No Guesswork."
          />
          <p className="text-sm text-[#6E6B65] leading-relaxed">
            Modern high-performance machines are complex integrations of mechanical, hydraulic, and software systems. We believe that proper machine care requires both traditional mechanical empathy and cutting-edge electronic diagnosis.
          </p>
          <p className="text-sm text-[#6E6B65] leading-relaxed">
            Every technician in our garage undergoes continuous training on factory service bulletins, electrical architecture, and precision tool calibration. When you trust us with your machine, you receive clear communication, photographic evidence of all findings, and fixed quotes.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-6 border-t border-[#E6D7BC]">
            <div>
              <span className="block font-serif text-3xl font-semibold text-[#1F1B14]">100%</span>
              <span className="text-xs text-[#6E6B65]">OEM Parts & Fluid Guarantee</span>
            </div>
            <div>
              <span className="block font-serif text-3xl font-semibold text-[#1F1B14]">12 Mos</span>
              <span className="text-xs text-[#6E6B65]">Comprehensive Service Warranty</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="border border-[#E6D7BC] bg-white p-2">
            <img
              src={classNamesImages.electrical}
              alt="Master Technician at RoadCrafters Garage"
              className="w-full h-[450px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-[#FAF8F5] border border-[#E6D7BC] p-8 md:p-12">
        <SectionHeading
          eyebrow="MILESTONES"
          title="Dedicated Machine Service Excellence"
          subtitle="Our journey building a rider-first machine service center in Porvorim, Goa."
        />

        <div className="mt-12 space-y-8 relative before:absolute before:inset-0 before:left-3 md:before:left-1/2 before:w-0.5 before:bg-[#E6D7BC]">
          {[
            {
              year: "2010",
              title: "Garage Founded",
              desc: "Established as a specialist independent garage for high-performance machines with dedicated hydraulic lifts."
            },
            {
              year: "2014",
              title: "Garage Facility Expansion",
              desc: "Added laser alignment bays, hydraulic machine lifts, and clean detailing suite."
            },
            {
              year: "2018",
              title: "Factory Diagnostic Suite Integrated",
              desc: "Invested in official dealer software interfaces for major performance machine brands."
            },
            {
              year: "2022",
              title: "Digital Ledger & Transport Launch",
              desc: "Introduced digital service records and covered machine transport pickup services."
            },
            {
              year: "2026",
              title: "Flagship Goa Garage",
              desc: "Operating full-scope machine engineering and diagnostic atelier at Bay 9, Alcon Regency, Porvorim, Goa."
            }
          ].map((item, idx) => (
            <div
              key={item.year}
              className={`relative flex flex-col md:flex-row items-start ${
                idx % 2 === 0 ? "md:flex-row-reverse text-left" : "text-left"
              }`}
            >
              <div className="w-full md:w-1/2 px-6 py-4 bg-white border border-[#E6D7BC] z-10">
                <span className="text-xs font-bold text-[#FAF8F5] bg-[#1F1B14] border border-[#C5A059] px-2 py-0.5 inline-block mb-2">
                  {item.year}
                </span>
                <h3 className="font-serif text-xl font-medium text-[#1F1B14]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#6E6B65] mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
