"use client";

import React, { useState, useEffect } from "react";
import { Search, Save, Globe, Eye, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const PAGE_OPTIONS = [
  { path: "/", label: "Homepage (/)" },
  { path: "/services", label: "Services Listing (/services)" },
  { path: "/about", label: "About Us (/about)" },
  { path: "/resources", label: "Technical Resources & Guides (/resources)" },
  { path: "/contact", label: "Contact & Tech Support (/contact)" },
  { path: "/blog", label: "Technical Blog (/blog)" },
  { path: "/faq", label: "FAQ Page (/faq)" },
  { path: "/garage", label: "Garage Facilities (/garage)" },
];

const DEFAULT_SEO: Record<string, { title: string; desc: string; keywords: string }> = {
  "/": {
    title: "RoadCrafters Garage (रोडक्राफ्टर्स गराज) | Flagship Bike & Superbike Garage in Porvorim, Goa",
    desc: "RoadCrafters Garage is a top-rated 5.0★ Flagship Bike Garage in Porvorim, Goa. Meticulous servicing, OBD diagnostics, brake service, chain & suspension overhauls.",
    keywords: "RoadCrafters Garage, Bike Garage, Porvorim Garage, Bike Diagnostics Goa, Superbike Service Goa",
  },
  "/services": {
    title: "High-Performance Bike Repair & Maintenance Services | RoadCrafters Garage Porvorim",
    desc: "Comprehensive bike servicing, synthetic engine oil replacements, brake disc refacing, OBD fault scanning, and full suspension tuning in Goa.",
    keywords: "Bike services Goa, high-performance engine oil, OBD scan bike, brake overhaul, superbike repair",
  },
  "/about": {
    title: "About RoadCrafters Garage | Expert Bike Technicians in Goa",
    desc: "RoadCrafters Garage combines master craftsmanship with state-of-the-art diagnostic technology for performance bikes and superbikes.",
    keywords: "About RoadCrafters, bike technicians Porvorim, bike garage Goa",
  },
  "/resources": {
    title: "Bike Engineering Resources & Specifications | RoadCrafters Garage",
    desc: "Factory-calibrated maintenance intervals, cold tyre pressure standards, interactive 32-point pre-ride checklist, and OBD diagnostic guides.",
    keywords: "Bike maintenance schedule, tyre pressure chart, bike pre-ride checklist, OBD fault codes Goa",
  },
  "/contact": {
    title: "Contact Technical Support & Appointments | RoadCrafters Garage",
    desc: "Book a bike service bay or talk to our lead technicians. Located in Porvorim, Goa. Direct WhatsApp & Call: +91 86684 12375.",
    keywords: "Contact RoadCrafters, book bike appointment Goa, WhatsApp bike repair",
  },
};

export default function AdminSeoPage() {
  const [selectedPath, setSelectedPath] = useState("/");
  const existingSeoList = useQuery(api.seo.listAll);
  const upsertSeoMutation = useMutation(api.seo.upsertPageSeo);

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [form, setForm] = useState({
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    canonicalUrl: "",
    ogImageUrl: "",
  });

  // Load SEO config whenever selectedPath or database changes
  useEffect(() => {
    const found = existingSeoList?.find((item: any) => item.pagePath === selectedPath);
    const defaults = DEFAULT_SEO[selectedPath] || DEFAULT_SEO["/"];

    if (found) {
      setForm({
        metaTitle: found.metaTitle,
        metaDescription: found.metaDescription,
        keywords: found.keywords || "",
        canonicalUrl: found.canonicalUrl || `https://roadcraftersgarage.com${selectedPath}`,
        ogImageUrl: found.ogImageUrl || "",
      });
    } else {
      setForm({
        metaTitle: defaults.title,
        metaDescription: defaults.desc,
        keywords: defaults.keywords,
        canonicalUrl: `https://roadcraftersgarage.com${selectedPath}`,
        ogImageUrl: "",
      });
    }
  }, [selectedPath, existingSeoList]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      await upsertSeoMutation({
        pagePath: selectedPath,
        metaTitle: form.metaTitle,
        metaDescription: form.metaDescription,
        keywords: form.keywords,
        canonicalUrl: form.canonicalUrl,
        ogImageUrl: form.ogImageUrl,
      });

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save SEO config:", err);
      alert("Failed to save SEO meta tags.");
    } finally {
      setSaving(false);
    }
  };

  const titleLen = form.metaTitle.length;
  const descLen = form.metaDescription.length;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8D1C5] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[#A96F43] text-xs font-semibold uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Search Engine Optimization</span>
          </div>
          <h1 className="font-serif text-3xl font-medium text-[#17352D]">
            On-Page SEO Manager
          </h1>
          <p className="text-xs text-[#6E706B] mt-1">
            Refine meta tags, target focus keywords, and preview how search engines display RoadCrafters Garage.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-[#17352D] hover:bg-[#23443A] text-white text-xs font-semibold uppercase tracking-widest transition-all flex items-center space-x-2 shadow-sm self-start sm:self-auto disabled:opacity-50"
        >
          <Save className="w-4 h-4 text-[#A96F43]" />
          <span>{saving ? "Saving Changes..." : "Save Meta Tags"}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-100 border border-emerald-300 p-4 text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>On-Page SEO settings saved to Convex database successfully!</span>
        </div>
      )}

      {/* Page Path Selector */}
      <div className="bg-white p-6 border border-[#E2DDD5] shadow-sm space-y-4">
        <label className="block text-xs uppercase tracking-wider font-semibold text-[#17352D]">
          Select Page to Configure SEO
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PAGE_OPTIONS.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => setSelectedPath(item.path)}
              className={`p-3 text-left border text-xs font-medium transition-all ${
                selectedPath === item.path
                  ? "bg-[#17352D] text-white border-[#17352D] shadow-sm"
                  : "bg-stone-50 text-[#202522] border-[#E2DDD5] hover:border-[#A96F43]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Google SERP Snippet Preview */}
      <div className="bg-white border border-[#E2DDD5] p-6 shadow-sm space-y-3">
        <div className="flex items-center space-x-2 text-[#17352D] border-b border-[#E2DDD5] pb-2">
          <Eye className="w-4 h-4 text-[#A96F43]" />
          <h2 className="font-serif text-lg font-medium">Google SERP Search Preview</h2>
        </div>

        <div className="p-4 bg-stone-50 border border-stone-200 font-sans max-w-2xl">
          <div className="flex items-center space-x-2 text-xs text-[#202124] mb-1">
            <span className="w-4 h-4 rounded-full bg-[#17352D] text-white text-[9px] flex items-center justify-center font-bold">R</span>
            <span className="text-stone-700 text-xs">https://roadcraftersgarage.com {selectedPath}</span>
          </div>
          <h3 className="text-xl font-normal text-[#1a0dab] hover:underline cursor-pointer leading-snug">
            {form.metaTitle || "Meta Title Preview"}
          </h3>
          <p className="text-sm text-[#4d5156] mt-1 leading-relaxed">
            {form.metaDescription || "Meta description snippet will appear here..."}
          </p>
        </div>
      </div>

      {/* Meta Input Form */}
      <form onSubmit={handleSave} className="bg-white p-6 border border-[#E2DDD5] shadow-sm space-y-6">
        <h2 className="font-serif text-xl font-medium text-[#17352D] border-b border-[#E2DDD5] pb-3">
          Meta Tags & OpenGraph Configuration
        </h2>

        <div className="space-y-5">
          {/* Meta Title */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#17352D]">
                Page Meta Title *
              </label>
              <span className={`text-[11px] font-mono ${titleLen >= 50 && titleLen <= 60 ? "text-emerald-700 font-bold" : "text-stone-500"}`}>
                {titleLen} / 60 characters (Optimal: 50–60)
              </span>
            </div>
            <input
              type="text"
              required
              value={form.metaTitle}
              onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#E2DDD5] text-sm text-[#202522] focus:outline-none focus:border-[#A96F43]"
            />
          </div>

          {/* Meta Description */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#17352D]">
                Meta Description Snippet *
              </label>
              <span className={`text-[11px] font-mono ${descLen >= 150 && descLen <= 160 ? "text-emerald-700 font-bold" : "text-stone-500"}`}>
                {descLen} / 160 characters (Optimal: 150–160)
              </span>
            </div>
            <textarea
              rows={3}
              required
              value={form.metaDescription}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#E2DDD5] text-sm text-[#202522] focus:outline-none focus:border-[#A96F43]"
            />
          </div>

          {/* Focus Keywords */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#17352D] mb-1">
              Focus Target Keywords
            </label>
            <input
              type="text"
              value={form.keywords}
              onChange={(e) => setForm({ ...form, keywords: e.target.value })}
              placeholder="e.g. Machine Garage Porvorim, High-Performance Garage Goa, OBD Diagnostics"
              className="w-full px-4 py-2.5 bg-white border border-[#E2DDD5] text-sm text-[#202522] focus:outline-none focus:border-[#A96F43]"
            />
          </div>

          {/* Canonical & OG Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#17352D] mb-1">
                Canonical URL
              </label>
              <input
                type="text"
                value={form.canonicalUrl}
                onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-[#E2DDD5] text-sm font-mono text-[#202522] focus:outline-none focus:border-[#A96F43]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#17352D] mb-1">
                OpenGraph Social Share Image URL
              </label>
              <input
                type="text"
                value={form.ogImageUrl}
                onChange={(e) => setForm({ ...form, ogImageUrl: e.target.value })}
                placeholder="https://roadcraftersgarage.com/garage_photos/WhatsApp%20Image%202026-09-18%20at%2011.25.46.jpeg"
                className="w-full px-4 py-2.5 bg-white border border-[#E2DDD5] text-sm font-mono text-[#202522] focus:outline-none focus:border-[#A96F43]"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
