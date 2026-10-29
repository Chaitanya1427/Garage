import React from "react";
import Metadata from "next";
import Link from "next/link";
import { Shield, Lock, FileText, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Road Crafters Garage",
  description:
    "Privacy Policy for Road Crafters Garage Ltd. Learn how we handle customer machine telemetry data, booking details, and payment information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#1F1B14] hover:text-[#C5A059] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Page Header */}
        <div className="bg-[#1F1B14] text-[#FAF8F5] p-8 sm:p-12 mb-10 border border-[#2C2316] shadow-md">
          <div className="flex items-center space-x-3 mb-4">
            <Lock className="w-6 h-6 text-[#C5A059]" />
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
              Legal & Compliance
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-[#E6D7BC] text-sm max-w-2xl leading-relaxed">
            Effective Date: September 1, 2026. This policy outlines how Road Crafters Garage Ltd collects, uses, and safeguards information regarding your machine, bookings, and personal data.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white p-8 sm:p-12 border border-[#E6D7BC] shadow-sm space-y-10 text-[#1F1B14]">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#1F1B14] border-b border-[#E6D7BC] pb-2">
              1. Information We Collect
            </h2>
            <p className="text-sm leading-relaxed text-[#6E6B65]">
              When you book a service, request diagnostic support, or drop off your machine at Road Crafters Garage, we collect necessary operational details to perform mechanical service:
            </p>
            <ul className="list-disc pl-5 text-sm space-y-1.5 text-[#6E6B65]">
              <li><strong>Contact Information:</strong> Full name, phone number, email address, and billing address.</li>
              <li><strong>Machine Telemetry & Details:</strong> Make, model, VIN/registration number, odometer reading, ECU diagnostic fault codes, service history, and custom modifications.</li>
              <li><strong>Service Logs:</strong> Diagnostic scan reports, technician notes, high-definition inspection photo logs, and replacement component serial numbers.</li>
              <li><strong>Transport Details:</strong> Pickup and drop-off address location data for enclosed machine transport requests.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#1F1B14] border-b border-[#E6D7BC] pb-2">
              2. How We Use Your Information
            </h2>
            <p className="text-sm leading-relaxed text-[#6E6B65]">
              Your data is strictly used to deliver high-precision machine care and warranty verification:
            </p>
            <ul className="list-disc pl-5 text-sm space-y-1.5 text-[#6E6B65]">
              <li>To perform requested diagnostics, engine rebuilds, suspension tuning, and scheduled maintenance.</li>
              <li>To issue electronic inspection reports and digital health certificates before handover.</li>
              <li>To validate our 12-Month / 10,000 km parts and craftsmanship warranty.</li>
              <li>To notify you via SMS/Email regarding garage status, parts approval requests, and pickup readiness.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#1F1B14] border-b border-[#E6D7BC] pb-2">
              3. Data Security & Storage
            </h2>
            <p className="text-sm leading-relaxed text-[#6E6B65]">
              We implement enterprise-grade security protocols. Electronic diagnostic logs and owner contact records are encrypted at rest and in transit. We do not sell, rent, or trade customer information or machine telemetry data to third-party advertisers or insurance brokers.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#1F1B14] border-b border-[#E6D7BC] pb-2">
              4. Payment & Billing Privacy
            </h2>
            <p className="text-sm leading-relaxed text-[#6E6B65]">
              All payment transactions processed at our garage reception counter or online portal use PCI-DSS compliant payment gateways. Road Crafters Garage does not store raw credit card numbers or banking PINs on local garage servers.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#1F1B14] border-b border-[#E6D7BC] pb-2">
              5. Your Legal Rights
            </h2>
            <p className="text-sm leading-relaxed text-[#6E6B65]">
              Under UK GDPR and international data protection laws, machine owners have the right to request a complete copy of their vehicle’s digital diagnostic logs, update contact preferences, or request data deletion subject to statutory invoice record-keeping retention periods.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 pt-4 border-t border-[#E6D7BC]">
            <h2 className="font-serif text-lg font-semibold text-[#1F1B14]">
              Contact Data Protection Officer
            </h2>
            <p className="text-sm text-[#6E6B65]">
              If you have any questions regarding this Privacy Policy or your machine data records, contact our privacy desk at:
            </p>
            <div className="text-xs bg-[#FAF8F5] p-4 border border-[#E6D7BC] space-y-1 font-mono text-[#1F1B14]">
              <p>RoadCrafters Garage (रोडक्राफ्टर्स गराज) – Legal & Compliance</p>
              <p>Bay 9, Alcon Regency, Village Panchayat, near Nexa Showroom, Defence Colony, Aradi Socorro, Porvorim, Goa 403521, India</p>
              <p>Email: contact@roadcraftersgarage.com | Phone: +91 86684 12375</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
