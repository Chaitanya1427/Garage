"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Spare Parts", href: "/spare-parts" },
    { name: "About Us", href: "/about" },
    { name: "Locations", href: "/locations" },
    { name: "Blog", href: "/blog" },
  ];

  // Homepage: Transparent floating glassmorphic nav that doesn't hide the background
  // Other pages: Classic warm cream palette
  const headerBgClass = isHome
    ? isScrolled
      ? "bg-[#0F0D0B]/90 backdrop-blur-xl border-b border-[#C5A059]/20 shadow-2xl"
      : "bg-gradient-to-b from-[#0F0D0A]/90 via-[#0F0D0A]/30 to-transparent border-none"
    : "bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E6D7BC]";

  const brandTextClass = isHome
    ? "text-white group-hover:text-[#C5A059]"
    : "text-[#1F1B14] group-hover:text-[#C5A059]";

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${headerBgClass}`}>
      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center space-x-3.5">
          <div className="relative w-12 sm:w-14 h-12 sm:h-14 rounded-full overflow-hidden border-2 border-[#C5A059] shadow-[0_0_20px_rgba(197,160,89,0.35)] ring-1 ring-[#C5A059]/40 group-hover:ring-[#FCE9C8] transition-all duration-300 bg-[#1F1B14] flex items-center justify-center">
            <img
              src="/logo-19th.png"
              alt="RoadCrafters Garage Logo"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col">
            <span className={`font-sans text-lg sm:text-xl font-bold tracking-wider transition-colors leading-tight ${brandTextClass}`}>
              ROAD CRAFTERS
            </span>
            <span className="text-[8.5px] uppercase tracking-[0.26em] font-semibold text-[#C5A059]">
              YOU SAY IT AND WE DO IT
            </span>
          </div>
        </Link>

        {/* Desktop Links: Sculpted Floating Capsule Dock */}
        <nav className={`hidden lg:flex items-center space-x-1 px-3 py-1.5 rounded-full backdrop-blur-xl transition-all ${
          isHome
            ? "bg-[#161310]/70 border border-[#C5A059]/30 shadow-2xl shadow-black/80"
            : "bg-[#FAF8F5] border border-[#E6D7BC] shadow-sm"
        }`}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const linkStyles = isHome
              ? isActive
                ? "text-[#120F0D] bg-gradient-to-r from-[#C5A059] to-[#D8B46D] shadow-md font-bold"
                : "text-[#FAF8F5]/85 hover:text-white hover:bg-white/10"
              : isActive
                ? "text-white bg-[#1F1B14] shadow-sm font-bold"
                : "text-[#1F1E1B] hover:text-[#C5A059] hover:bg-[#E6D7BC]/40";

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-[11.5px] font-semibold tracking-wider uppercase transition-all duration-200 ${linkStyles}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button: Sculpted Gold Pill */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            href="/book"
            className={`inline-flex items-center justify-center px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 rounded-full group ${
              isHome
                ? "text-[#120F0D] bg-gradient-to-r from-[#C5A059] via-[#D8B46D] to-[#C5A059] hover:from-[#D4AF67] hover:to-[#E5C380] border border-[#FCE9C8]/40 shadow-[0_4px_20px_rgba(197,160,89,0.30)] hover:shadow-[0_6px_25px_rgba(197,160,89,0.50)] hover:scale-[1.03]"
                : "text-white bg-[#1F1B14] hover:bg-[#2C2316] border border-[#1F1B14] shadow-sm hover:scale-[1.02]"
            }`}
          >
            <span>Book a Service</span>
            <ArrowRight className={`w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform ${isHome ? "text-[#120F0D]" : "text-[#C5A059]"}`} />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 focus:outline-none transition-colors ${
            isHome ? "text-white hover:text-[#C5A059]" : "text-[#1F1B14] hover:text-[#C5A059]"
          }`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden px-6 py-6 space-y-4 border-b ${
          isHome
            ? "bg-[#141210]/95 backdrop-blur-xl border-[#C5A059]/30 text-white"
            : "bg-[#FAF8F5] border-[#E6D7BC]"
        }`}>
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-1.5 border-b ${
                  isHome
                    ? "border-white/10 text-white hover:text-[#C5A059]"
                    : "border-[#E6D7BC]/60 text-[#1F1E1B] hover:text-[#C5A059]"
                } ${
                  pathname === link.href ? "text-[#C5A059] font-semibold" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-2">
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#1F1B14] bg-[#C5A059] hover:bg-[#D4AF67] transition-colors rounded-md"
            >
              Book a Service
              <ArrowRight className="w-4 h-4 ml-2 text-[#1F1B14]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
