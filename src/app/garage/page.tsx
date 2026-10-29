import React from "react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { GARAGE_FEATURES, classNamesImages } from "@/data/content";

export const metadata = {
  title: "Inside Our Garage | RoadCrafters Garage (रोडक्राफ्टर्स गराज)",
  description:
    "Explore our flagship garage for high-performance machines in Porvorim, Goa featuring hydraulic lifts, factory OBD diagnostic rigs, laser chain alignment, and precision detailing bays.",
};

export default function GaragePage() {
  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-[#E6D7BC] pb-8">
        <h1 className="font-serif text-4xl sm:text-5xl font-medium text-[#1F1B14]">
          Inside the Flagship Machine Garage
        </h1>
        <p className="mt-3 text-base text-[#6E6B65] max-w-2xl">
          Professional hydraulic lift stations. Meticulous mechanical workmanship. Zero compromises on tools, diagnostics, or precision calibration.
        </p>
      </div>

      {/* Grid of Garage Infrastructure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {GARAGE_FEATURES.map((feature) => (
          <div key={feature.id} className="bg-[#FAF8F5] border border-[#E6D7BC] overflow-hidden flex flex-col justify-between">
            <div className="h-64 overflow-hidden bg-stone-200">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8 space-y-3">
              <span className="text-[10px] uppercase font-semibold tracking-widest text-[#C5A059]">
                {feature.subtitle}
              </span>
              <h3 className="font-serif text-2xl font-semibold text-[#1F1B14]">
                {feature.title}
              </h3>
              <p className="text-sm text-[#6E6B65] leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Garage Gallery Grid */}
      <div className="bg-[#1F1B14] text-[#FAF8F5] p-8 md:p-12 border border-[#2C2316]">
        <SectionHeading
          eyebrow="FULL GARAGE TOUR"
          title="Engineered for High-Performance Machines & Superbikes"
          subtitle="Every bay is calibrated to support precise torque tolerances, street bikes, sportbikes, cruisers, and adventure tourers."
          dark
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <img
            src={classNamesImages.garageMain}
            alt="Main Garage Bay"
            className="w-full h-40 object-cover border border-[#2C2316]"
          />
          <img
            src={classNamesImages.toolsGrid}
            alt="Calibrated Precision Tools"
            className="w-full h-40 object-cover border border-[#2C2316]"
          />
          <img
            src={classNamesImages.chainSprocket}
            alt="Chain Maintenance Rig"
            className="w-full h-40 object-cover border border-[#2C2316]"
          />
          <img
            src={classNamesImages.detailing}
            alt="Ceramic Detailing Bay"
            className="w-full h-40 object-cover border border-[#2C2316]"
          />
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/book"
            className="px-8 py-3.5 bg-[#C5A059] hover:bg-[#B38E47] text-[#1F1B14] text-xs font-semibold uppercase tracking-widest inline-block transition-colors"
          >
            Schedule Garage Inspection & Service
          </Link>
        </div>
      </div>
    </div>
  );
}
