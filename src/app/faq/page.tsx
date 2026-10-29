import React from "react";
import FAQAccordion from "@/components/FAQAccordion";
import SectionHeading from "@/components/SectionHeading";
import { FAQ_DATA } from "@/data/content";

export const metadata = {
  title: "Frequently Asked Questions | RoadCrafters Garage (रोडक्राफ्टर्स गराज)",
  description:
    "Find answers to common questions regarding machine servicing, appointments, warranty coverage, parts policy, and diagnostic costs.",
};

export default function FAQPage() {
  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-[#E6D7BC] pb-8 text-center max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl sm:text-5xl font-medium text-[#1F1B14]">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-base text-[#6E6B65]">
          Clear answers about our machine service procedures, warranty terms, replacement parts policy, and booking options.
        </p>
      </div>

      <FAQAccordion items={FAQ_DATA} />
    </div>
  );
}
