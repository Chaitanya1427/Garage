"use client";

import React, { useState, useEffect } from "react";
import { Settings, Save, CheckCircle2, Wrench, Clock, Phone, MapPin, Star, HelpCircle, Plus, Trash2, Tag, ListPlus } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { SERVICES_DATA, REVIEWS_DATA, PACKAGES_DATA, SPARE_PARTS_DATA } from "@/data/content";

const DEFAULT_BUSINESS_INFO = {
  name: "RoadCrafters Garage (रोडक्राफ्टर्स गराज)",
  phone: "+91 86684 12375",
  whatsapp: "+918668412375",
  hours: "Open — Closes at 10:00 PM",
  address: "Bay 9, Alcon Regency, Village Panchayat, near Nexa Showroom, Defence Colony, Aradi Socorro, Porvorim, Goa 403521",
};

const DEFAULT_FAQ_ITEMS = [
  {
    question: "Do you use genuine OEM spare parts and Motul synthetic oils?",
    answer: "Yes, we exclusively install genuine factory parts and premium Motul/Castrol 100% synthetic engine oils for optimum engine protection and longevity."
  },
  {
    question: "How long does a Periodic Service take?",
    answer: "A standard periodic service takes approximately 2 to 3 hours, including our 32-point rider safety inspection, ultrasonic chain cleaning, and test ride."
  },
  {
    question: "Do you offer machine pick-up and drop-off in Porvorim & nearby Goa areas?",
    answer: "Yes, we offer doorstep machine pick-up and drop-off service across Porvorim, Panjim, Mapusa, and surrounding Goa regions."
  }
];

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<"pricing" | "services" | "business" | "reviews" | "faqs" | "spareParts">("spareParts");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateContentMutation = useMutation(api.content.updateByKey);

  // Queries for Convex content
  const dbPricing = useQuery(api.content.getByKey, { key: "pricingPackages" });
  const dbServices = useQuery(api.content.getByKey, { key: "services" });
  const dbBusiness = useQuery(api.content.getByKey, { key: "businessDetails" });
  const dbReviews = useQuery(api.content.getByKey, { key: "reviews" });
  const dbFaqs = useQuery(api.content.getByKey, { key: "faqs" });
  const dbSpareParts = useQuery(api.content.getByKey, { key: "sparePartsCategories" });

  // State
  const [pricingPackages, setPricingPackages] = useState<any[]>(PACKAGES_DATA);
  const [services, setServices] = useState<any[]>(SERVICES_DATA);
  const [business, setBusiness] = useState<any>(DEFAULT_BUSINESS_INFO);
  const [reviews, setReviews] = useState<any[]>(REVIEWS_DATA);
  const [faqs, setFaqs] = useState<any[]>(DEFAULT_FAQ_ITEMS);
  const [spareParts, setSpareParts] = useState<any[]>(SPARE_PARTS_DATA);

  useEffect(() => {
    if (dbPricing?.value) {
      try { setPricingPackages(JSON.parse(dbPricing.value)); } catch (e) {}
    }
    if (dbServices?.value) {
      try { setServices(JSON.parse(dbServices.value)); } catch (e) {}
    }
    if (dbBusiness?.value) {
      try { setBusiness(JSON.parse(dbBusiness.value)); } catch (e) {}
    }
    if (dbReviews?.value) {
      try { setReviews(JSON.parse(dbReviews.value)); } catch (e) {}
    }
    if (dbFaqs?.value) {
      try { setFaqs(JSON.parse(dbFaqs.value)); } catch (e) {}
    }
    if (dbSpareParts?.value) {
      try { setSpareParts(JSON.parse(dbSpareParts.value)); } catch (e) {}
    }
  }, [dbPricing, dbServices, dbBusiness, dbReviews, dbFaqs, dbSpareParts]);

  const handleSave = async (key: string, data: any) => {
    setSaving(true);
    setSuccess(false);

    try {
      await updateContentMutation({
        key,
        value: JSON.stringify(data, null, 2),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(`Failed to save ${key}:`, err);
      alert(`Failed to save ${key}. Check Convex database connection.`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8D1C5] pb-6">
        <div>
          <h1 className="font-serif text-3xl font-medium text-[#17352D]">
            Site Content & Business Manager
          </h1>
          <p className="text-xs text-[#6E706B] mt-1">
            Update garage service packages, rates, business hours, contact numbers, and customer reviews.
          </p>
        </div>

        <button
          onClick={() => {
            if (activeTab === "pricing") handleSave("pricingPackages", pricingPackages);
            if (activeTab === "services") handleSave("services", services);
            if (activeTab === "business") handleSave("businessDetails", business);
            if (activeTab === "reviews") handleSave("reviews", reviews);
            if (activeTab === "faqs") handleSave("faqs", faqs);
            if (activeTab === "spareParts") handleSave("sparePartsCategories", spareParts);
          }}
          disabled={saving}
          className="px-6 py-2.5 bg-[#17352D] hover:bg-[#23443A] text-white text-xs font-semibold uppercase tracking-widest transition-all flex items-center space-x-2 shadow-sm self-start sm:self-auto disabled:opacity-50"
        >
          <Save className="w-4 h-4 text-[#A96F43]" />
          <span>{saving ? "Saving Changes..." : "Save Section"}</span>
        </button>
      </div>

      {success && (
        <div className="bg-emerald-100 border border-emerald-300 p-4 text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Changes saved to Convex database successfully!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white border border-[#E2DDD5] p-1 flex items-center space-x-1 shadow-sm overflow-x-auto">
        <button
          onClick={() => setActiveTab("spareParts")}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === "spareParts" ? "bg-[#17352D] text-[#A96F43]" : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <ListPlus className="w-4 h-4" />
          <span>Spare Parts CMS</span>
        </button>
        <button
          onClick={() => setActiveTab("pricing")}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === "pricing" ? "bg-[#17352D] text-[#A96F43]" : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Pricing Packages</span>
        </button>
        <button
          onClick={() => setActiveTab("services")}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === "services" ? "bg-[#17352D] text-[#A96F43]" : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Services & Rates</span>
        </button>
        <button
          onClick={() => setActiveTab("business")}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === "business" ? "bg-[#17352D] text-[#A96F43]" : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>Business Details</span>
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === "reviews" ? "bg-[#17352D] text-[#A96F43]" : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Google Reviews</span>
        </button>
        <button
          onClick={() => setActiveTab("faqs")}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === "faqs" ? "bg-[#17352D] text-[#A96F43]" : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>FAQs</span>
        </button>
      </div>

      {/* Tab 0: Pricing Packages */}
      {activeTab === "pricing" && (
        <div className="space-y-6">
          <div className="bg-white border border-[#E2DDD5] p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2DDD5] pb-4 mb-6">
              <div>
                <h2 className="font-serif text-xl font-medium text-[#17352D]">
                  Machine Service Packages & Pricing Cards ({pricingPackages.length})
                </h2>
                <p className="text-xs text-[#6E706B] mt-0.5">
                  Manage package titles, prices (₹), category tags, descriptions, and feature bullet points.
                </p>
              </div>

              <button
                onClick={() => {
                  const newPkg = {
                    id: `custom-pkg-${Date.now()}`,
                    name: "Custom Service Package",
                    price: "₹2,500",
                    subtitle: "Custom service package tailored for riders.",
                    recommendedFor: "All High-Performance Machines",
                    popular: false,
                    features: [
                      "Full Synthetic Engine Oil Change",
                      "32-Point Safety Audit",
                      "Chain Clean & Lube"
                    ]
                  };
                  setPricingPackages([...pricingPackages, newPkg]);
                }}
                className="px-4 py-2 bg-[#17352D] hover:bg-[#23443A] text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-colors self-start"
              >
                <Plus className="w-3.5 h-3.5 text-[#A96F43]" />
                <span>Add Pricing Package</span>
              </button>
            </div>

            <div className="space-y-8">
              {pricingPackages.map((pkg, idx) => (
                <div key={pkg.id || idx} className="p-6 bg-[#FAF8F3] border border-[#E2DDD5] shadow-sm relative space-y-4">
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between border-b border-[#E2DDD5] pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 bg-[#17352D] text-[#A96F43] rounded-full flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <h3 className="font-serif text-lg font-semibold text-[#17352D]">
                        {pkg.name || "Untitled Package"}
                      </h3>
                      {pkg.popular && (
                        <span className="bg-[#B47A4A] text-white text-[10px] uppercase font-bold tracking-widest px-2 py-0.5">
                          Most Popular
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Delete package "${pkg.name}"?`)) {
                          setPricingPackages(pricingPackages.filter((_, i) => i !== idx));
                        }
                      }}
                      className="text-stone-400 hover:text-red-600 p-1 transition-colors flex items-center gap-1 text-xs"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Card</span>
                    </button>
                  </div>

                  {/* Form Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-[#17352D] mb-1">
                        Package Name
                      </label>
                      <input
                        type="text"
                        value={pkg.name || ""}
                        onChange={(e) => {
                          const updated = [...pricingPackages];
                          updated[idx].name = e.target.value;
                          setPricingPackages(updated);
                        }}
                        className="w-full px-3 py-2 bg-white border border-[#E2DDD5] text-xs font-semibold"
                        placeholder="e.g. Essential Rider"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-[#17352D] mb-1">
                        Price (₹)
                      </label>
                      <input
                        type="text"
                        value={pkg.price || ""}
                        onChange={(e) => {
                          const updated = [...pricingPackages];
                          updated[idx].price = e.target.value;
                          setPricingPackages(updated);
                        }}
                        className="w-full px-3 py-2 bg-white border border-[#E2DDD5] text-xs font-bold text-[#17352D]"
                        placeholder="e.g. ₹1,800"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-[#17352D] mb-1">
                        Category / Recommended For Tag
                      </label>
                      <input
                        type="text"
                        value={pkg.recommendedFor || ""}
                        onChange={(e) => {
                          const updated = [...pricingPackages];
                          updated[idx].recommendedFor = e.target.value;
                          setPricingPackages(updated);
                        }}
                        className="w-full px-3 py-2 bg-white border border-[#E2DDD5] text-xs text-[#B47A4A] font-semibold"
                        placeholder="e.g. Commuter & Street Bikes (100cc - 250cc)"
                      />
                    </div>

                    <div className="flex items-center pt-6">
                      <label className="flex items-center space-x-2 text-xs font-semibold text-[#17352D] cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={!!pkg.popular}
                          onChange={(e) => {
                            const updated = [...pricingPackages];
                            updated[idx].popular = e.target.checked;
                            setPricingPackages(updated);
                          }}
                          className="w-4 h-4 accent-[#B47A4A]"
                        />
                        <span>Mark as "Most Popular" Card</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-semibold text-[#17352D] mb-1">
                      Package Description / Subtitle
                    </label>
                    <textarea
                      rows={2}
                      value={pkg.subtitle || ""}
                      onChange={(e) => {
                        const updated = [...pricingPackages];
                        updated[idx].subtitle = e.target.value;
                        setPricingPackages(updated);
                      }}
                      className="w-full px-3 py-2 bg-white border border-[#E2DDD5] text-xs text-stone-700"
                      placeholder="e.g. Recommended every 4,000 km or 6 months for smooth daily commuting."
                    />
                  </div>

                  {/* Features Bullet Points Section */}
                  <div className="border-t border-[#E2DDD5] pt-4 mt-2">
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-[11px] uppercase font-semibold text-[#17352D]">
                        Features & Included Services ({pkg.features?.length || 0} Bullet Points)
                      </label>
                      <button
                        onClick={() => {
                          const updated = [...pricingPackages];
                          if (!updated[idx].features) updated[idx].features = [];
                          updated[idx].features.push("New Feature Item");
                          setPricingPackages(updated);
                        }}
                        className="px-2.5 py-1 bg-stone-200 hover:bg-stone-300 text-stone-800 text-[10px] font-semibold uppercase tracking-wider flex items-center space-x-1"
                      >
                        <Plus className="w-3 h-3 text-[#A96F43]" />
                        <span>Add Bullet Point</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(pkg.features || []).map((feat: string, fIdx: number) => (
                        <div key={fIdx} className="flex items-center space-x-2">
                          <span className="text-stone-400 text-xs font-bold w-4">{fIdx + 1}.</span>
                          <input
                            type="text"
                            value={feat}
                            onChange={(e) => {
                              const updated = [...pricingPackages];
                              updated[idx].features[fIdx] = e.target.value;
                              setPricingPackages(updated);
                            }}
                            className="flex-1 px-3 py-1.5 bg-white border border-[#E2DDD5] text-xs"
                            placeholder="e.g. 100% Synthetic Engine Oil Change"
                          />
                          <button
                            onClick={() => {
                              const updated = [...pricingPackages];
                              updated[idx].features = updated[idx].features.filter((_: any, i: number) => i !== fIdx);
                              setPricingPackages(updated);
                            }}
                            className="p-1 text-stone-400 hover:text-red-600"
                            title="Remove bullet point"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Services */}
      {activeTab === "services" && (
        <div className="space-y-6">
          <div className="bg-white border border-[#E2DDD5] p-6 shadow-sm">
            <h2 className="font-serif text-xl font-medium text-[#17352D] mb-4">
              Garage Service Packages ({services.length})
            </h2>
            <div className="space-y-6">
              {services.map((srv, idx) => (
                <div key={srv.id || idx} className="p-4 bg-stone-50 border border-[#E2DDD5] space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-[#17352D]">Service Name</label>
                      <input
                        type="text"
                        value={srv.title}
                        onChange={(e) => {
                          const updated = [...services];
                          updated[idx].title = e.target.value;
                          setServices(updated);
                        }}
                        className="w-full px-3 py-2 bg-white border border-[#E2DDD5] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-[#17352D]">Price (₹)</label>
                      <input
                        type="text"
                        value={srv.startingPrice}
                        onChange={(e) => {
                          const updated = [...services];
                          updated[idx].startingPrice = e.target.value;
                          setServices(updated);
                        }}
                        className="w-full px-3 py-2 bg-white border border-[#E2DDD5] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-[#17352D]">Est. Time</label>
                      <input
                        type="text"
                        value={srv.estimatedTime}
                        onChange={(e) => {
                          const updated = [...services];
                          updated[idx].estimatedTime = e.target.value;
                          setServices(updated);
                        }}
                        className="w-full px-3 py-2 bg-white border border-[#E2DDD5] text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase font-semibold text-[#17352D]">Short Description</label>
                    <input
                      type="text"
                      value={srv.shortDesc || srv.description}
                      onChange={(e) => {
                        const updated = [...services];
                        updated[idx].shortDesc = e.target.value;
                        setServices(updated);
                      }}
                      className="w-full px-3 py-2 bg-white border border-[#E2DDD5] text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Business Details */}
      {activeTab === "business" && (
        <div className="bg-white border border-[#E2DDD5] p-6 shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-medium text-[#17352D] border-b border-[#E2DDD5] pb-3">
            Garage Contact & Location Info
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#17352D] mb-1">
                Garage Name
              </label>
              <input
                type="text"
                value={business.name || "RoadCrafters Garage (रोडक्राफ्टर्स गराज)"}
                onChange={(e) => setBusiness({ ...business, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-[#E2DDD5] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#17352D] mb-1">
                Primary Phone Number
              </label>
              <input
                type="text"
                value={business.phone || "+91 86684 12375"}
                onChange={(e) => setBusiness({ ...business, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-[#E2DDD5] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#17352D] mb-1">
                WhatsApp Phone Number
              </label>
              <input
                type="text"
                value={business.whatsapp || "+918668412375"}
                onChange={(e) => setBusiness({ ...business, whatsapp: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-[#E2DDD5] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#17352D] mb-1">
                Working Hours
              </label>
              <input
                type="text"
                value={business.hours || "Open — Closes at 10:00 PM"}
                onChange={(e) => setBusiness({ ...business, hours: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-[#E2DDD5] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#17352D] mb-1">
              Full Garage Address
            </label>
            <textarea
              rows={2}
              value={business.address || "Bay 9, Alcon Regency, Village Panchayat, near Nexa Showroom, Defence Colony, Aradi Socorro, Porvorim, Goa 403521"}
              onChange={(e) => setBusiness({ ...business, address: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#E2DDD5] text-sm"
            />
          </div>
        </div>
      )}

      {/* Tab 3: Reviews */}
      {activeTab === "reviews" && (
        <div className="bg-white border border-[#E2DDD5] p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2DDD5] pb-3">
            <h2 className="font-serif text-xl font-medium text-[#17352D]">
              Customer Reviews ({reviews.length})
            </h2>
            <button
              onClick={() => setReviews([...reviews, { author: "New Customer", badge: "1 review", date: "Recently", rating: 5, comment: "Great service!" }])}
              className="px-3 py-1.5 bg-[#17352D] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 text-[#A96F43]" />
              <span>Add Review</span>
            </button>
          </div>

          <div className="space-y-4">
            {reviews.map((rev, idx) => (
              <div key={idx} className="p-4 bg-stone-50 border border-[#E2DDD5] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="grid grid-cols-2 gap-4 flex-1 mr-4">
                    <input
                      type="text"
                      value={rev.author || rev.name}
                      onChange={(e) => {
                        const updated = [...reviews];
                        updated[idx].author = e.target.value;
                        setReviews(updated);
                      }}
                      className="px-3 py-1.5 bg-white border text-xs font-semibold"
                    />
                    <input
                      type="text"
                      value={rev.badge || rev.vehicle || "5.0 ★ Review"}
                      onChange={(e) => {
                        const updated = [...reviews];
                        updated[idx].badge = e.target.value;
                        setReviews(updated);
                      }}
                      className="px-3 py-1.5 bg-white border text-xs"
                    />
                  </div>
                  <button
                    onClick={() => setReviews(reviews.filter((_, i) => i !== idx))}
                    className="text-stone-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={rev.comment || rev.text}
                  onChange={(e) => {
                    const updated = [...reviews];
                    updated[idx].comment = e.target.value;
                    setReviews(updated);
                  }}
                  className="w-full px-3 py-1.5 bg-white border text-xs text-stone-700"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: FAQs */}
      {activeTab === "faqs" && (
        <div className="bg-white border border-[#E2DDD5] p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2DDD5] pb-3">
            <h2 className="font-serif text-xl font-medium text-[#17352D]">
              Frequently Asked Questions ({faqs.length})
            </h2>
            <button
              onClick={() => setFaqs([...faqs, { question: "New Question?", answer: "Answer details..." }])}
              className="px-3 py-1.5 bg-[#17352D] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 text-[#A96F43]" />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4 bg-stone-50 border border-[#E2DDD5] space-y-3">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...faqs];
                      updated[idx].question = e.target.value;
                      setFaqs(updated);
                    }}
                    className="w-full px-3 py-1.5 bg-white border text-xs font-semibold mr-4"
                  />
                  <button
                    onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))}
                    className="text-stone-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => {
                    const updated = [...faqs];
                    updated[idx].answer = e.target.value;
                    setFaqs(updated);
                  }}
                  className="w-full px-3 py-1.5 bg-white border text-xs text-stone-700"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Spare Parts CMS */}
      {activeTab === "spareParts" && (
        <div className="bg-white border border-[#E2DDD5] p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2DDD5] pb-4">
            <div>
              <h2 className="font-serif text-xl font-medium text-[#17352D]">
                High-Performance Machine Spare Parts Inventory Categories ({spareParts.length})
              </h2>
              <p className="text-xs text-[#6E706B] mt-0.5">
                Manage spare part categories, descriptions, quality badges, available items, and photo assets.
              </p>
            </div>
            <button
              onClick={() =>
                setSpareParts([
                  ...spareParts,
                  {
                    id: `part-${Date.now()}`,
                    title: "New Spare Part Category",
                    description: "Category description and brand details.",
                    badge: "100% Genuine",
                    items: ["OEM Part Item 1", "OEM Part Item 2"],
                    image: "/garage_photos/calibrated-hand-tools.jpg",
                  },
                ])
              }
              className="px-3.5 py-2 bg-[#17352D] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 text-[#A96F43]" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="space-y-6">
            {spareParts.map((cat, idx) => (
              <div key={cat.id || idx} className="p-5 bg-stone-50 border border-[#E2DDD5] space-y-4 rounded-sm">
                <div className="flex items-center justify-between border-b border-[#E2DDD5] pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-[#A96F43]">#{idx + 1}</span>
                    <input
                      type="text"
                      value={cat.title}
                      onChange={(e) => {
                        const updated = [...spareParts];
                        updated[idx].title = e.target.value;
                        setSpareParts(updated);
                      }}
                      className="font-bold text-sm px-2.5 py-1 bg-white border border-[#E2DDD5] text-[#17352D] w-64 sm:w-80"
                      placeholder="Category Title"
                    />
                  </div>
                  <button
                    onClick={() => setSpareParts(spareParts.filter((_, i) => i !== idx))}
                    className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                      Badge Tag
                    </label>
                    <input
                      type="text"
                      value={cat.badge}
                      onChange={(e) => {
                        const updated = [...spareParts];
                        updated[idx].badge = e.target.value;
                        setSpareParts(updated);
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-[#E2DDD5]"
                      placeholder="e.g. 100% Genuine / OEM Grade"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                      Category Image Path
                    </label>
                    <input
                      type="text"
                      value={cat.image}
                      onChange={(e) => {
                        const updated = [...spareParts];
                        updated[idx].image = e.target.value;
                        setSpareParts(updated);
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-[#E2DDD5]"
                      placeholder="/garage_photos/..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={cat.description}
                      onChange={(e) => {
                        const updated = [...spareParts];
                        updated[idx].description = e.target.value;
                        setSpareParts(updated);
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-[#E2DDD5] text-stone-700"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-[11px] font-semibold text-stone-600 uppercase">
                      Stocked Items / Models (Comma separated or editable list)
                    </label>
                    <textarea
                      rows={3}
                      value={Array.isArray(cat.items) ? cat.items.join("\n") : cat.items}
                      onChange={(e) => {
                        const updated = [...spareParts];
                        updated[idx].items = e.target.value.split("\n").filter((i: string) => i.trim().length > 0);
                        setSpareParts(updated);
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-[#E2DDD5] text-stone-700 font-mono text-[11px]"
                      placeholder="Enter 1 item per line"
                    />
                    <span className="text-[10px] text-stone-500">Enter each part item or model on a new line.</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
