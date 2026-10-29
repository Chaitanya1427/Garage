import React, { Suspense } from "react";
import BookingForm from "@/components/BookingForm";
import SectionHeading from "@/components/SectionHeading";
import { ShieldCheck, Phone, Clock, FileCheck } from "lucide-react";

export const metadata = {
  title: "Book a Machine Service Appointment | RoadCrafters Garage (रोडक्राफ्टर्स गराज)",
  description:
    "Reserve a machine service appointment at RoadCrafters Garage (रोडक्राफ्टर्स गराज) in Porvorim, Goa. Call +91 86684 12375.",
};

export default function BookPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="border-b border-[#E6D7BC] pb-8">
        <h1 className="font-serif text-4xl sm:text-5xl font-medium text-[#1F1B14]">
          Book a Machine Service Appointment
        </h1>
        <p className="mt-3 text-base text-[#6E6B65] max-w-2xl">
          Reserve your machine check-in date. A dedicated RoadCrafters Technical Advisor will review your requirements and confirm your lift bay allocation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Main Booking Form */}
        <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#E6D7BC] p-6 sm:p-10">
          <Suspense fallback={<div className="p-8 text-center text-xs text-[#6E6B65]">Loading Booking Engine...</div>}>
            <BookingForm />
          </Suspense>
        </div>

        {/* Side panel: WHAT HAPPENS NEXT */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#1F1B14] text-[#FAF8F5] p-8 border border-[#2C2316] space-y-6">
            <h2 className="font-serif text-2xl font-medium">
              What Happens Next?
            </h2>

            <div className="space-y-5">
              <div className="flex items-start space-x-4">
                <div className="w-7 h-7 bg-[#2C2316] text-[#C5A059] font-bold text-xs flex items-center justify-center flex-shrink-0 border border-[#C5A059]/40">
                  1
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-white">Advisor Confirmation</h3>
                  <p className="text-xs text-[#E6D7BC] mt-1 leading-relaxed">
                    Our service advisor reviews your request, verifies part availability, and confirms your timing window via phone or email.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-7 h-7 bg-[#2C2316] text-[#C5A059] font-bold text-xs flex items-center justify-center flex-shrink-0 border border-[#C5A059]/40">
                  2
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-white">Reception & Digital Scan</h3>
                  <p className="text-xs text-[#E6D7BC] mt-1 leading-relaxed">
                    Upon arrival, your vehicle undergoes a baseline diagnostic interrogation and 68-point body and mechanical inspection.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-7 h-7 bg-[#2C2316] text-[#C5A059] font-bold text-xs flex items-center justify-center flex-shrink-0 border border-[#C5A059]/40">
                  3
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-white">Digital Inspection & Estimate</h3>
                  <p className="text-xs text-[#E6D7BC] mt-1 leading-relaxed">
                    You receive an itemized estimate with photographs on your phone. No work proceeds without your explicit digital approval.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-7 h-7 bg-[#2C2316] text-[#C5A059] font-bold text-xs flex items-center justify-center flex-shrink-0 border border-[#C5A059]/40">
                  4
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-white">Precision Service & Delivery</h3>
                  <p className="text-xs text-[#E6D7BC] mt-1 leading-relaxed">
                    Work is completed to factory specs, road tested by a master technician, washed, and returned with a 12-month warranty ledger.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF8F5] border border-[#E6D7BC] p-6 space-y-3">
            <h3 className="font-serif text-lg font-semibold text-[#1F1B14]">
              Prefer to speak to an Advisor immediately?
            </h3>
            <p className="text-xs text-[#6E6B65]">
              Our garage direct line is open daily (Closes at 10:00 PM).
            </p>
            <div className="flex flex-col space-y-2 pt-1">
              <a
                href="tel:+918668412375"
                className="inline-flex items-center text-xs font-bold text-[#1F1B14] hover:text-[#C5A059] space-x-2"
              >
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span>Call +91 86684 12375</span>
              </a>
              <a
                href="https://wa.me/918668412375"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold text-[#C5A059] hover:underline space-x-2"
              >
                <span className="w-4 h-4 text-center font-bold text-[10px] bg-[#C5A059] text-[#1F1B14] rounded-full flex items-center justify-center">W</span>
                <span>WhatsApp +91 86684 12375</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
