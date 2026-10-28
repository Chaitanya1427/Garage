"use client";

import React, { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SERVICES_DATA } from "@/data/content";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface BookingFormProps {
  initialServiceSlug?: string;
}

export default function BookingForm({ initialServiceSlug }: BookingFormProps) {
  const dbServices = useQuery(api.content.getByKey, { key: "services" });
  const dbPricing = useQuery(api.content.getByKey, { key: "pricingPackages" });

  let serviceOptions = SERVICES_DATA.map((s) => ({ slug: s.slug, title: s.title, startingPrice: s.startingPrice }));
  if (dbServices?.value) {
    try {
      const parsed = JSON.parse(dbServices.value);
      if (Array.isArray(parsed) && parsed.length > 0) {
        serviceOptions = parsed.map((s: any) => ({
          slug: s.slug || (s.title ? s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "service"),
          title: s.title || s.name || "Service",
          startingPrice: s.startingPrice || "₹999",
        }));
      }
    } catch (e) {}
  }

  // Also append dynamic pricing packages if available
  if (dbPricing?.value) {
    try {
      const parsedPricing = JSON.parse(dbPricing.value);
      if (Array.isArray(parsedPricing) && parsedPricing.length > 0) {
        const pkgOptions = parsedPricing.map((p: any) => ({
          slug: p.id || (p.name ? p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "pkg"),
          title: `Package: ${p.name}`,
          startingPrice: p.price || "₹1,800",
        }));
        serviceOptions = [...serviceOptions, ...pkgOptions];
      }
    } catch (e) {}
  }

  const [formData, setFormData] = useState({
    bikeCategory: "Street / Naked",
    brand: "",
    model: "",
    regNumber: "",
    serviceId: initialServiceSlug || (serviceOptions[0]?.slug || "periodic-service"),
    preferredDate: "",
    preferredTime: "Morning (08:00 - 11:00)",
    pickupDrop: "No",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `Hello RoadCrafters Garage! 🛠️
I would like to book a machine service appointment:

• Name: ${formData.name}
• Phone: ${formData.phone}
• Email: ${formData.email || "N/A"}
• Category: ${formData.bikeCategory}
• Machine: ${formData.brand} ${formData.model} ${formData.regNumber ? `(${formData.regNumber})` : ""}
• Service Requested: ${formData.serviceId}
• Preferred Date: ${formData.preferredDate || "Earliest available"} (${formData.preferredTime})
• Transport Pickup: ${formData.pickupDrop}
${formData.notes ? `• Notes: ${formData.notes}` : ""}

Please confirm my lift bay allocation. Thank you!`;

    const waUrl = `https://wa.me/918668412375?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-[#FAF8F5] border border-[#E6D7BC] p-8 md:p-12 text-center space-y-6">
        <div className="w-16 h-16 bg-[#1F1B14] text-[#C5A059] rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A059]">
            MACHINE APPOINTMENT REQUESTED
          </span>
          <h3 className="font-serif text-3xl text-[#1F1B14] font-medium">
            Thank you, {formData.name || "Valued Rider"}
          </h3>
          <p className="text-sm text-[#6E6B65] max-w-lg mx-auto leading-relaxed">
            Your appointment request for a <strong className="text-[#1F1B14]">{formData.brand} {formData.model}</strong> has been logged in our scheduling queue. A Road Crafters Technical Advisor will contact you at <strong>{formData.phone}</strong> shortly to confirm lift bay allocation and pickup timing.
          </p>
        </div>

        <div className="bg-white p-6 text-left max-w-md mx-auto text-xs space-y-2 border border-[#E6D7BC]">
          <div className="flex justify-between">
            <span className="text-[#6E6B65]">Machine:</span>
            <span className="font-semibold text-[#1F1B14]">{formData.brand} {formData.model} ({formData.bikeCategory})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6E6B65]">Service:</span>
            <span className="font-semibold text-[#1F1B14]">{formData.serviceId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6E6B65]">Preferred Slot:</span>
            <span className="font-semibold text-[#1F1B14]">{formData.preferredDate || "Earliest Available"} | {formData.preferredTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6E6B65]">Van Pickup Required:</span>
            <span className="font-semibold text-[#1F1B14]">{formData.pickupDrop}</span>
          </div>
        </div>

        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2.5 bg-[#1F1B14] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#2C2316] transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Bike Category selection tabs */}
      <div>
        <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1B14] mb-2">
          1. Machine Category
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {["Street / Naked", "Sportbike", "Cruiser", "Adventure / Dual"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFormData({ ...formData, bikeCategory: cat })}
              className={`py-2.5 text-xs font-semibold tracking-wide border transition-all ${
                formData.bikeCategory === cat
                  ? "bg-[#1F1B14] text-white border-[#1F1B14]"
                  : "bg-white text-[#1F1E1B] border-[#E6D7BC] hover:border-[#C5A059]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Brand & Model & Reg */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1B14] mb-1.5">
            Machine Brand *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Triumph, Royal Enfield, Ducati"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            className="w-full px-4 py-2.5 bg-white border border-[#E6D7BC] text-sm text-[#1F1E1B] focus:outline-none focus:border-[#C5A059]"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1B14] mb-1.5">
            Model & Displacement *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Street Triple 765, Interceptor 650"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            className="w-full px-4 py-2.5 bg-white border border-[#E6D7BC] text-sm text-[#1F1E1B] focus:outline-none focus:border-[#C5A059]"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1B14] mb-1.5">
            Registration Number
          </label>
          <input
            type="text"
            placeholder="e.g. AB12 CDE"
            value={formData.regNumber}
            onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
            className="w-full px-4 py-2.5 bg-white border border-[#E6D7BC] text-sm text-[#1F1E1B] focus:outline-none focus:border-[#C5A059]"
          />
        </div>
      </div>

      {/* Service Selection */}
      <div>
        <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1B14] mb-1.5">
          2. Required Service / Diagnostic *
        </label>
        <select
          value={formData.serviceId}
          onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
          className="w-full px-4 py-2.5 bg-white border border-[#E6D7BC] text-sm text-[#1F1E1B] focus:outline-none focus:border-[#C5A059]"
        >
          {serviceOptions.map((srv) => (
            <option key={srv.slug} value={srv.slug}>
              {srv.title} (Call for Quote)
            </option>
          ))}
          <option value="unspecified-repair">General Diagnostic & Inspection</option>
        </select>
      </div>

      {/* Preferred Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1B14] mb-1.5">
            Preferred Date *
          </label>
          <input
            type="date"
            required
            value={formData.preferredDate}
            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
            className="w-full px-4 py-2.5 bg-white border border-[#E6D7BC] text-sm text-[#1F1E1B] focus:outline-none focus:border-[#C5A059]"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1B14] mb-1.5">
            Preferred Time Slot
          </label>
          <select
            value={formData.preferredTime}
            onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
            className="w-full px-4 py-2.5 bg-white border border-[#E6D7BC] text-sm text-[#1F1E1B] focus:outline-none focus:border-[#C5A059]"
          >
            <option>Morning (08:00 - 11:00)</option>
            <option>Midday (11:00 - 14:00)</option>
            <option>Afternoon (14:00 - 17:00)</option>
          </select>
        </div>
      </div>

      {/* Pickup & Drop Option */}
      <div>
        <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1B14] mb-1.5">
          Machine Transport Van Pickup Required?
        </label>
        <div className="flex space-x-6 items-center pt-1">
          {["No", "Yes (Within 15km)"].map((opt) => (
            <label key={opt} className="flex items-center space-x-2 text-sm text-[#1F1E1B] cursor-pointer">
              <input
                type="radio"
                name="pickupDrop"
                checked={formData.pickupDrop.startsWith(opt.split(" ")[0])}
                onChange={() => setFormData({ ...formData, pickupDrop: opt })}
                className="accent-[#C5A059]"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Contact Details */}
      <div className="pt-2 border-t border-[#E6D7BC] space-y-4">
        <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1B14]">
          3. Contact Details
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-[#6E6B65] mb-1">Full Name *</label>
            <input
              type="text"
              required
              placeholder="John Smith"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#E6D7BC] text-sm text-[#1F1E1B] focus:outline-none focus:border-[#C5A059]"
            />
          </div>
          <div>
            <label className="block text-xs text-[#6E6B65] mb-1">Phone Number *</label>
            <input
              type="tel"
              required
              placeholder="+91 86684 12375"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#E6D7BC] text-sm text-[#1F1E1B] focus:outline-none focus:border-[#C5A059]"
            />
          </div>
          <div>
            <label className="block text-xs text-[#6E6B65] mb-1">Email Address *</label>
            <input
              type="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#E6D7BC] text-sm text-[#1F1E1B] focus:outline-none focus:border-[#C5A059]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-[#6E6B65] mb-1">
            Additional Notes / Observed Symptoms
          </label>
          <textarea
            rows={3}
            placeholder="Please mention any abnormal engine noise, brake lever feel, chain slack, or specific requests..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-2.5 bg-white border border-[#E6D7BC] text-sm text-[#1F1E1B] focus:outline-none focus:border-[#C5A059]"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 bg-[#1F1B14] hover:bg-[#2C2316] text-white font-semibold text-xs uppercase tracking-widest border border-[#1F1B14] transition-all flex items-center justify-center space-x-2 group"
      >
        <span>Request Appointment via WhatsApp</span>
        <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}
