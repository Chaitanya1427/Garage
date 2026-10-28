import React from "react";
import Link from "next/link";
import { ArrowRight, Shield, Award, Wrench, Clock, Check } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import HomeServicesSection from "@/components/HomeServicesSection";
import FAQAccordion from "@/components/FAQAccordion";
import ReviewsSection from "@/components/ReviewsSection";
import LatestArticlesSection from "@/components/LatestArticlesSection";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { SERVICES_DATA, PACKAGES_DATA, FAQ_DATA, classNamesImages } from "@/data/content";

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION: 100VH FULL-BLEED SLEEK GARAGE SHOWCASE */}
      <section className="relative w-full h-[100vh] min-h-[680px] -mt-20 overflow-hidden flex flex-col justify-between items-center text-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-8 sm:pb-10">
        {/* Visual Background - Full Bleed Edge-to-Edge Showcase */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={classNamesImages.hero}
            alt="Road Crafters Official Garage Brand Crest with Illuminated Emblem and Precision Cafe Racer Atelier"
            className="w-full h-full object-cover object-[center_36%] filter contrast-[1.08] saturate-[1.15] brightness-[0.96]"
          />

          {/* Golden Atelier Studio Backlight Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(197,160,89,0.22)_0%,_transparent_65%)] pointer-events-none mix-blend-screen" />

          {/* Prime-Lens Cinematic Edge Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(15,13,10,0.40)_0%,_rgba(15,13,10,0.20)_45%,_rgba(10,9,8,0.76)_100%)] pointer-events-none" />

          {/* Soft Top/Bottom Framing Shadow for Nav & Metrics Legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />
        </div>

        {/* Center: Main Headline, Subtitle & Action CTAs */}
        <div className="relative z-20 max-w-2xl mx-auto flex flex-col items-center my-auto py-2">
          {/* Main H1 Headline: Reduced Size for Sleek Refined Luxury Proportion */}
          <h1 className="font-sans text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-wide text-white leading-[1.18] uppercase max-w-xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            You Say It and <br />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#FCE9C8] to-[#C5A059] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              We Do It.
              <svg className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full h-1.5 sm:h-2 text-[#C5A059]/60" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 15 Q 50 0, 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>

          {/* Subtitle: Centered & Refined with Strong Legibility */}
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-[#FAF8F5]/90 font-sans leading-relaxed max-w-lg drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] font-normal">
            Precision machine servicing, factory OBD diagnostics, hydraulic lift overhauls & genuine OEM spare parts performed by certified master technicians at our flagship garage.
          </p>

          {/* Centered Action Buttons - Rounded Gold Luxury Pills */}
          <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md">
            <Link
              href="/book"
              className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-[#C5A059] via-[#D8B46D] to-[#C5A059] hover:from-[#D4AF67] hover:to-[#E5C380] text-[#120F0D] text-xs font-bold uppercase tracking-widest transition-all duration-300 inline-flex items-center justify-center space-x-2 group shadow-xl hover:shadow-[#C5A059]/50 rounded-full hover:scale-[1.03] border border-[#FCE9C8]/40"
            >
              <span>Book a Service</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#120F0D] group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <a
              href="tel:+918668412375"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#141210]/80 hover:bg-white hover:text-[#120F0D] text-[#FAF8F5] text-xs font-bold uppercase tracking-widest transition-all duration-300 inline-flex items-center justify-center space-x-2 border border-[#C5A059]/40 shadow-xl rounded-full hover:scale-[1.03] backdrop-blur-md"
            >
              <span>Call Garage</span>
            </a>
          </div>

          {/* Subtle Facility Authenticity Tag */}
          <div className="mt-2.5 flex items-center justify-center gap-2 text-[9.5px] uppercase tracking-wider text-[#FAF8F5]/80 drop-shadow">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
            <span>Official Brand Crest • High-Performance Machine Atelier • Porvorim, Goa</span>
          </div>
        </div>

        {/* Bottom: Centered Sleek Glassmorphic Metrics Deck */}
        <div className="relative z-20 w-full max-w-4xl pb-1">
          <div className="bg-[#1F1B14]/85 backdrop-blur-xl border border-[#C5A059]/35 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 shadow-2xl shadow-black/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#C5A059]/20">
            <div className="flex flex-col items-center justify-center p-1 sm:p-2">
              <span className="font-sans text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF8F5] tracking-tight">10+</span>
              <span className="text-[10px] sm:text-xs font-bold text-[#C5A059] uppercase tracking-wider mt-0.5">Years Heritage</span>
              <span className="text-[10px] text-[#A69F93] mt-0.5">Goa's Premier Garage</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1 sm:p-2 pt-2 sm:pt-1">
              <span className="font-sans text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF8F5] tracking-tight">15,000+</span>
              <span className="text-[10px] sm:text-xs font-bold text-[#C5A059] uppercase tracking-wider mt-0.5">Bikes Serviced</span>
              <span className="text-[10px] text-[#A69F93] mt-0.5">Commuters to Superbikes</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1 sm:p-2 pt-2 sm:pt-1">
              <span className="font-sans text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF8F5] tracking-tight">Dual Lifts</span>
              <span className="text-[10px] sm:text-xs font-bold text-[#C5A059] uppercase tracking-wider mt-0.5">Hydraulic Bays</span>
              <span className="text-[10px] text-[#A69F93] mt-0.5">Zero-Damage Platform</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1 sm:p-2 pt-2 sm:pt-1">
              <span className="font-sans text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF8F5] tracking-tight">5.0 ★</span>
              <span className="text-[10px] sm:text-xs font-bold text-[#C5A059] uppercase tracking-wider mt-0.5">Google Rating</span>
              <span className="text-[10px] text-[#A69F93] mt-0.5">55+ Verified Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle Trust Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] border border-[#E6D7BC] rounded-xl py-5 px-6 sm:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#E6D7BC] shadow-sm">
          <div className="flex flex-col items-center justify-center p-2">
            <Award className="w-5 h-5 text-[#C5A059] mb-1" />
            <span className="font-semibold text-xs text-[#1F1B14]">5.0 ★ Rated Garage</span>
            <span className="text-[11px] text-[#6E6B65]">Verified Customer Reviews</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 pt-4 md:pt-2">
            <Shield className="w-5 h-5 text-[#C5A059] mb-1" />
            <span className="font-semibold text-xs text-[#1F1B14]">12-Month Guarantee</span>
            <span className="text-[11px] text-[#6E6B65]">Parts & Workmanship</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 pt-4 md:pt-2">
            <Wrench className="w-5 h-5 text-[#C5A059] mb-1" />
            <span className="font-semibold text-xs text-[#1F1B14]">Rider Focused</span>
            <span className="text-[11px] text-[#6E6B65]">Master Machine Techs</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 pt-4 md:pt-2">
            <Clock className="w-5 h-5 text-[#C5A059] mb-1" />
            <span className="font-semibold text-xs text-[#1F1B14]">Open Daily</span>
            <span className="text-[11px] text-[#6E6B65]">Quick Turnaround Service</span>
          </div>
        </div>
      </section>


      {/* 2. SERVICES SECTION */}
      <HomeServicesSection />

      {/* 3. FEATURED SERVICE - ENGINE DIAGNOSTICS */}
      <section className="bg-[#1F1B14] text-[#FAF8F5] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image side */}
            <div className="lg:col-span-6 relative">
              <div className="border border-[#2C2316] p-2 bg-[#2C2316]/30">
                <img
                  src={classNamesImages.diagnostics}
                  alt="High-Performance Machine Diagnostics Scan"
                  className="w-full h-[420px] sm:h-[480px] object-cover object-center shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#C5A059] text-white p-6 hidden sm:block max-w-xs shadow-lg">
                <span className="block text-xs uppercase tracking-widest font-semibold mb-1">
                  MACHINE OBD SCANNER
                </span>
                <p className="text-xs leading-relaxed">
                  Direct diagnostic interface for Ducati, BMW Motorrad, Triumph, KTM & Japanese OEMs.
                </p>
              </div>
            </div>

            {/* Text side */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
                High-Performance Machine Diagnostics
              </h2>
              <p className="text-base text-[#D4C4A8] leading-relaxed">
                Find the problem before it becomes an expensive breakdown. Our diagnostic technicians correlate fault codes with live sensor telemetry and fuel injection parameters for your machine.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Advanced machine OBD diagnostic scanning equipment",
                  "Live parameter logging for fuel injection, O2, & TPS sensors",
                  "Transparent digital inspection report sent to your phone",
                  "Clear itemized recommendations prior to any work"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-sm text-[#D4C4A8]">
                    <Check className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/book?service=engine-diagnostics"
                  className="inline-flex items-center px-7 py-3.5 bg-[#C5A059] hover:bg-[#D4AF37] text-white text-xs font-semibold uppercase tracking-widest transition-colors"
                >
                  Book Machine Diagnostics
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US - EDITORIAL STYLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="OUR STANDARDS"
          title="Built Around Precision & Trust."
          subtitle="Care that goes beyond the service checklist. Because your ride deserves meticulous attention."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-10 border-t border-[#E6D7BC] pt-12">
          {[
            {
              num: "01",
              title: "Experienced Machine Technicians",
              desc: "Certified master technicians with over 10 years of training across street, sport, cruiser, and adventure machine platforms."
            },
            {
              num: "02",
              title: "Transparent Digital Estimates",
              desc: "Detailed digital inspection reports with photographs and fixed quotes before a single bolt is turned."
            },
            {
              num: "03",
              title: "100% OEM & JASO MA2 Oils",
              desc: "We exclusively fit original manufacturer parts and premium ester synthetic oils built specifically for high-performance machine wet clutches."
            },
            {
              num: "04",
              title: "Digital Service Ledger",
              desc: "Comprehensive maintenance history logged digitally to protect your bike's long-term resale provenance."
            },
            {
              num: "05",
              title: "Doorstep Pickup & Drop",
              desc: "Complimentary covered van transport for your bike within 15 km of our garage facilities."
            },
            {
              num: "06",
              title: "12-Month Service Warranty",
              desc: "Complete warranty protection on all mechanical labor and installed components for 12 months or 10,000 km."
            }
          ].map((item) => (
            <div key={item.num} className="space-y-3">
              <span className="font-serif text-3xl font-semibold text-[#C5A059] block">
                {item.num}
              </span>
              <h3 className="font-serif text-xl font-medium text-[#1F1B14]">
                {item.title}
              </h3>
              <p className="text-sm text-[#6E6B65] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. GARAGE SHOWCASE */}
      <section className="bg-[#FAF8F5] border-y border-[#E6D7BC] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1F1B14]">
                Professional Equipment. Meticulous Workmanship.
              </h2>
            </div>
            <Link
              href="/garage"
              className="mt-4 md:mt-0 text-xs font-semibold uppercase tracking-wider text-[#1F1B14] hover:text-[#C5A059] inline-flex items-center gap-1.5"
            >
              Explore Full Garage →
            </Link>
          </div>

          {/* Grid of Garage Photos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-72 group overflow-hidden bg-stone-200 border border-[#E6D7BC]">
              <img
                src={classNamesImages.garageMain}
                alt="Machine on hydraulic lift"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <span className="text-sm font-serif font-medium text-white">
                  Heavy-Duty Hydraulic Machine Lift Stations
                </span>
              </div>
            </div>
            <div className="relative h-72 group overflow-hidden bg-stone-200 border border-[#E6D7BC]">
              <img
                src={classNamesImages.chainSprocket}
                alt="Chain maintenance station"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <span className="text-sm font-serif font-medium text-white">
                  Laser Rear Axle Alignment & Chain Station
                </span>
              </div>
            </div>
            <div className="relative h-72 group overflow-hidden bg-stone-200 border border-[#E6D7BC]">
              <img
                src={classNamesImages.detailing}
                alt="High-performance machine detailing studio"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <span className="text-sm font-serif font-medium text-white">
                  Ceramic Paint Protection & Detailing Suite
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SERVICE PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="TRANSPARENT WORKFLOW"
          title="How We Service Your Machine."
          subtitle="A structured 5-step workflow designed to keep you fully informed from drop-off to final handover."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 border-t border-[#E6D7BC] pt-12">
          {[
            { step: "01", title: "Book", desc: "Select your preferred machine service date online or by phone." },
            { step: "02", title: "Inspect", desc: "Complete 32-point rider safety audit and computer OBD scan." },
            { step: "03", title: "Approve", desc: "Review digital estimate with transparent pricing on your phone." },
            { step: "04", title: "Service", desc: "Factory specs applied using JASO MA2 synthetic oils and OEM parts." },
            { step: "05", title: "Deliver", desc: "Road test by master rider, wash, and key handover with digital ledger." }
          ].map((item) => (
            <div key={item.step} className="bg-white border border-[#E6D7BC] p-6 space-y-3 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A059] bg-[#1F1B14] px-2 py-0.5 inline-block">
                Step {item.step}
              </span>
              <h3 className="font-serif text-xl font-medium text-[#1F1B14]">
                {item.title}
              </h3>
              <p className="text-xs text-[#6E6B65] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>



      {/* 8. CUSTOMER REVIEWS */}
      <ReviewsSection />

      {/* 9. TECHNICAL JOURNAL / BLOG */}
      <LatestArticlesSection />

      {/* 10. FAQ PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="RIDER QUESTIONS"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about booking, warranty, JASO oil standards, and garage procedures."
          align="center"
        />
        <FAQAccordion items={FAQ_DATA.slice(0, 5)} />
        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="text-xs font-semibold uppercase tracking-wider text-[#1F1B14] hover:text-[#C5A059] border-b border-[#1F1B14] pb-0.5"
          >
            View All Rider Questions →
          </Link>
        </div>
      </section>

      {/* 9. BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1F1B14] text-[#FAF8F5] p-10 sm:p-16 border border-[#2C2316] flex flex-col md:flex-row items-center justify-between gap-8 shadow-md">
          <div className="space-y-3 max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium">
              Schedule Your Machine Service Today.
            </h2>
            <p className="text-sm text-[#D4C4A8]">
              Speak directly with a Road Crafters Technical Advisor or submit an online request for prioritized lift bay allocation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link
              href="/book"
              className="px-8 py-4 bg-[#C5A059] hover:bg-[#D4AF37] text-white text-xs font-semibold uppercase tracking-widest text-center transition-colors shadow-sm"
            >
              Book Service Online
            </Link>
            <a
              href="tel:+918668412375"
              className="px-8 py-4 bg-transparent border border-[#D4C4A8] hover:border-white text-white text-xs font-semibold uppercase tracking-widest text-center transition-colors"
            >
              Call +91 86684 12375
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
