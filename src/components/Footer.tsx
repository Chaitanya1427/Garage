"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Footer() {
  const dbBusiness = useQuery(api.content.getByKey, { key: "businessDetails" });

  let name = "ROAD CRAFTERS";
  let phone = "+91 86684 12375";
  let whatsapp = "+918668412375";
  let hours = "Mon – Sun: 08:00 AM – 10:00 PM";
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
  const cleanWa = whatsapp.replace(/[^0-9]/g, "");  return (
    <footer className="bg-[#1F1B14] text-[#FAF8F5] border-t border-[#2C2316]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3.5">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#C5A059] shadow-md bg-[#1F1B14] flex items-center justify-center">
                <img
                  src="/logo-19th.png"
                  alt="RoadCrafters Garage Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-2xl font-bold tracking-tight text-white uppercase">
                  {name}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#C5A059]">
                  YOU SAY IT AND WE DO IT
                </span>
              </div>
            </div>
            <p className="text-sm text-[#D4C4A8] max-w-md leading-relaxed">
              Independent high-performance machine service and diagnostic garage dedicated to meticulous mechanical craftsmanship, OBD diagnostics, chain sync, and transparent pricing for riders.
            </p>
            <div className="pt-2 text-xs text-[#D4C4A8] space-y-2">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-[#C5A059] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span>{address}</span>
              </a>
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-2 hover:text-[#C5A059] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                <span>{phone}</span>
              </a>
              <a
                href={`https://wa.me/${cleanWa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                <span className="w-3.5 h-3.5 text-center font-bold text-[10px] bg-emerald-500 text-black rounded-full flex items-center justify-center">W</span>
                <span>WhatsApp: {phone}</span>
              </a>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                contact@roadcraftersgarage.com
              </p>
              <div className="pt-1 flex items-center gap-3 text-[11px] text-[#D4C4A8]">
                <span className="bg-[#2C2316] px-2 py-0.5 text-[#C5A059] font-semibold">★ 5.0 (55 reviews)</span>
                <span className="bg-[#2C2316] px-2 py-0.5 text-[#FAF8F5]">Rider Friendly</span>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="font-serif text-lg font-medium text-white mb-4 tracking-wide border-b border-[#2C2316] pb-2">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D4C4A8]">
              <li>
                <Link href="/services/periodic-service" className="hover:text-[#C5A059] transition-colors">
                  Periodic Maintenance
                </Link>
              </li>
              <li>
                <Link href="/services/engine-diagnostics" className="hover:text-[#C5A059] transition-colors">
                  OBD Diagnostics
                </Link>
              </li>
              <li>
                <Link href="/services/brake-service" className="hover:text-[#C5A059] transition-colors">
                  Brake Service
                </Link>
              </li>
              <li>
                <Link href="/services/chain-sprocket" className="hover:text-[#C5A059] transition-colors">
                  Chain & Sprocket
                </Link>
              </li>
              <li>
                <Link href="/services/suspension-service" className="hover:text-[#C5A059] transition-colors">
                  Suspension Overhaul
                </Link>
              </li>
              <li>
                <Link href="/services/tyres-wheels" className="hover:text-[#C5A059] transition-colors">
                  Tyres & Wheels
                </Link>
              </li>
              <li>
                <Link href="/services/bike-detailing" className="hover:text-[#C5A059] transition-colors">
                  Bike Detailing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-serif text-lg font-medium text-white mb-4 tracking-wide border-b border-[#2C2316] pb-2">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D4C4A8]">
              <li>
                <Link href="/about" className="hover:text-[#C5A059] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/spare-parts" className="hover:text-[#C5A059] transition-colors">
                  Spare Parts
                </Link>
              </li>
              <li>
                <Link href="/garage" className="hover:text-[#C5A059] transition-colors">
                  The Garage
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-[#C5A059] transition-colors">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#C5A059] transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C5A059] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours & Booking */}
          <div>
            <h4 className="font-serif text-lg font-medium text-white mb-4 tracking-wide border-b border-[#2C2316] pb-2">
              Hours & Booking
            </h4>
            <div className="text-xs text-[#D4C4A8] space-y-3">
              <div>
                <p className="font-semibold text-white">Flagship Machine Garage</p>
                <p className="text-[#C5A059] font-semibold mt-1">Open — Closes at 10:00 PM</p>
                <p className="text-[#D4C4A8] mt-1">{hours}</p>
              </div>
              <div className="pt-2">
                <Link
                  href="/book"
                  className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] hover:text-[#C5A059] transition-colors"
                >
                  Book Appointment
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-[#C5A059]" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-[#2C2316] flex flex-col md:flex-row justify-between items-center text-xs text-[#D4C4A8] gap-4">
          <p>© {new Date().getFullYear()} RoadCrafters Garage (रोडक्राफ्टर्स गैरेज). All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/faq" className="hover:text-white">
              FAQ
            </Link>
            <span className="text-[#2C2316]">|</span>
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <span className="text-[#2C2316]">|</span>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
