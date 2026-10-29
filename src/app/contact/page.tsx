"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { classNamesImages } from "@/data/content";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function ContactPage() {
  const dbBusiness = useQuery(api.content.getByKey, { key: "businessDetails" });

  let name = "RoadCrafters Garage (रोडक्राफ्टर्स गराज)";
  let phone = "+91 86684 12375";
  let whatsapp = "+918668412375";
  let hours = "Open — Closes at 10:00 PM";
  let address = "Bay 9, Alcon Regency, Village Panchayat, near Nexa Showroom, Defence Colony, Aradi Socorro, Porvorim, Goa 403521, India";

  if (dbBusiness?.value) {
    try {
      const parsed = JSON.parse(dbBusiness.value);
      if (parsed.name) name = parsed.name;
      if (parsed.phone) phone = parsed.phone;
      if (parsed.whatsapp) whatsapp = parsed.whatsapp;
      if (parsed.hours) hours = parsed.hours;
      if (parsed.address) address = parsed.address;
    } catch (e) {}
  }

  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  const cleanWa = whatsapp.replace(/[^0-9]/g, "");

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    model: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `Hello ${name}! 🛠️
I have a technical inquiry from your website:

• Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone || "N/A"}
• Machine Make & Model: ${formData.model || "N/A"}
• Inquiry Details: ${formData.notes}

Please get back to me. Thank you!`;

    const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-[#E6D7BC] pb-8">
        <h1 className="font-serif text-4xl sm:text-5xl font-medium text-[#1F1B14]">
          Contact Technical Service
        </h1>
        <p className="mt-3 text-base text-[#6E6B65] max-w-2xl">
          Have a question about a specific machine OBD fault, chain service, or doorstep pickup? Contact our technical advisors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Form */}
        <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#E6D7BC] p-8 sm:p-10">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 bg-[#1F1B14] text-[#C5A059] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#1F1B14]">
                Message Sent Successfully
              </h3>
              <p className="text-xs text-[#6E6B65] max-w-md mx-auto">
                Thank you for contacting {name}. A technical advisor will respond to your inquiry within two business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#C5A059] underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="font-serif text-2xl font-medium text-[#1F1B14]">
                Send an Inquiry
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1B14] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-[#E6D7BC] text-sm text-[#1F1B14] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1B14] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-[#E6D7BC] text-sm text-[#1F1B14] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1B14] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder={phone}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-[#E6D7BC] text-sm text-[#1F1B14] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1B14] mb-1">
                    Machine Make & Model
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Royal Enfield Interceptor 650"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-[#E6D7BC] text-sm text-[#1F1B14] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F1B14] mb-1">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your inquiry, machine issue, or service request..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-[#E6D7BC] text-sm text-[#1F1B14] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1F1B14] hover:bg-[#2C2316] text-[#FAF8F5] text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2"
              >
                <span>Submit Technical Inquiry via WhatsApp</span>
                <Send className="w-3.5 h-3.5 text-[#C5A059]" />
              </button>
            </form>
          )}
        </div>

        {/* Right Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#1F1B14] text-[#FAF8F5] p-8 border border-[#2C2316] space-y-6">
            <h3 className="font-serif text-2xl font-medium">
              Direct Contact Lines
            </h3>

            <div className="space-y-4 text-xs text-[#E6D7BC]">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">{name}</span>
                  <p>{address}</p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xs font-semibold text-[#C5A059] hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Phone Hotline</span>
                  <a href={`tel:${cleanPhone}`} className="hover:text-[#C5A059] font-semibold text-[#FAF8F5]">{phone}</a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="w-4 h-4 text-center font-bold text-[10px] bg-emerald-500 text-black rounded-full flex items-center justify-center mt-0.5">W</span>
                <div>
                  <span className="font-semibold text-white block">WhatsApp Contact</span>
                  <a href={`https://wa.me/${cleanWa}`} target="_blank" rel="noopener noreferrer" className="text-[#C5A059] hover:underline font-semibold">{phone}</a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Service Desk Email</span>
                  <p>contact@roadcraftersgarage.com</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2C2316] space-y-2 text-xs">
                <p><strong className="text-white">Business Category:</strong> Flagship Garage for High-Performance Machines & Diagnostic Atelier</p>
                <p><strong className="text-white">Rating:</strong> <span className="text-[#C5A059] font-bold">5.0 ★</span> (55 reviews)</p>
                <p><strong className="text-white">Business Hours:</strong> <span className="text-[#C5A059]">{hours}</span></p>
                <p><strong className="text-white">Features:</strong> Rider Friendly Service</p>
              </div>
            </div>
          </div>

          <div className="border border-[#E6D7BC] bg-white p-2">
            <img
              src={classNamesImages.exteriorFront}
              alt="RoadCrafters Garage Facility Exterior"
              className="w-full h-56 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
