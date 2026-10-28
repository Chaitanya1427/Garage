"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Wrench, 
  Gauge, 
  CheckCircle2, 
  Cpu, 
  AlertTriangle, 
  Phone, 
  ArrowRight, 
  BookOpen, 
  ShieldCheck, 
  Flame, 
  Sliders, 
  Check, 
  Sparkles,
  Layers,
  Activity
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

// Maintenance Schedule Matrix
const MAINTENANCE_SCHEDULES = [
  {
    interval: "1,000 km",
    title: "Break-In & Factory Baseline",
    badge: "INITIAL AUDIT",
    desc: "Essential run-in servicing to clear metal wear particulates, seat valve seats, and verify chassis torque specs.",
    tasks: [
      "Magnetic engine sump drain & particulate decontamination",
      "OEM high-flow engine oil filter installation",
      "Motul 100% synthetic break-in fluid refill",
      "Full chassis fastener & axle nut torque re-audit",
      "Throttle free-play & clutch lever clearance setup",
      "Drive chain initial stretch take-up and laser alignment"
    ]
  },
  {
    interval: "4,000 km",
    title: "Periodic Maintenance Service",
    badge: "FACTORY INTERVAL",
    desc: "Scheduled periodic refresh to preserve high-RPM throttle responsiveness, clutch bite, and internal thermal longevity.",
    tasks: [
      "Motul 300V / Castrol synthetic oil drain & refresh",
      "OEM high-flow oil filter replacement",
      "Drive chain ultrasonic solvent wash, tensioning & lube",
      "Brake pad thickness & hydraulic line pressure check",
      "Spark plug electrode gap check & carbon clear",
      "32-point rider safety and chassis torque audit"
    ]
  },
  {
    interval: "8,000 km",
    title: "Mid-Cycle Mechanical Overhaul",
    badge: "THROTTLE & BRAKE SYNC",
    desc: "In-depth component servicing focusing on fuel delivery balance, ignition accuracy, and hydraulic brake feel.",
    tasks: [
      "Electronic throttle body vacuum synchronization",
      "DOT 4 / 5.1 high-temperature brake fluid pressure bleed",
      "High-flow air filter ultrasonic wash or replacement",
      "Battery conductance & starter circuit CCA load test",
      "Wheel bearing axial play & dust seal audit",
      "Steering head race & swingarm pivot lubrication"
    ]
  },
  {
    interval: "15,000 km",
    title: "Major Atelier Inspection",
    badge: "CHASSIS & SUSPENSION",
    desc: "Full comprehensive mechanical inspection to restore factory handling precision and dampening performance.",
    tasks: [
      "Inverted USD front fork fluid evacuation & SKF seal rebuild",
      "Engine valve clearance micrometer check & shim adjustment",
      "Fuel injector ultrasonic spray pattern calibration",
      "Drive sprocket hook profile & chain pitch measurement",
      "Cooling system radiator flush & silicate-free coolant fill",
      "Complete ECU diagnostic telemetry & software log update"
    ]
  }
];

// Technical Engineering Baselines
const TECHNICAL_BASELINES = [
  {
    icon: Sliders,
    title: "Drive Chain Tension & Slack",
    metric: "25 – 35 mm",
    status: "Service Tolerance",
    desc: "Measure vertical free-play at the midpoint of the lower chain run with the machine resting upright on paddock stands.",
    tips: [
      "Too tight causes premature countershaft bearing wear",
      "Too loose causes violent snatching and sprocket wear",
      "Verify axle alignment marks using laser target tools"
    ]
  },
  {
    icon: Gauge,
    title: "Cold Tyre Pressure Baselines",
    metric: "29 / 33 to 33 / 41 PSI",
    status: "Standard Cold Range",
    desc: "Pressures must always be verified when tyres have rested for at least 3 hours. Never measure when tyres are warm.",
    tips: [
      "Solo Street: 29 PSI (Front) • 33 PSI (Rear)",
      "Supersport / High-Speed: 32 PSI (Front) • 36 PSI (Rear)",
      "Two-Up Touring / Luggage: 33 PSI (Front) • 41 PSI (Rear)"
    ]
  },
  {
    icon: Flame,
    title: "Brake Pad Friction Material Limit",
    metric: "1.5 mm Min",
    status: "Critical Safety Threshold",
    desc: "Replace pads immediately when friction compound reaches 1.5mm thickness or when backing plate wear indicators align.",
    tips: [
      "Never allow backing plate metal to score brake rotor",
      "Flush brake fluid every 12 months to prevent vapor lock",
      "Check disc runout: Maximum allowable wobble is 0.15mm"
    ]
  },
  {
    icon: Activity,
    title: "Engine Oil Viscosity Standards",
    metric: "10W-40 / 15W-50",
    status: "JASO MA2 / API SN",
    desc: "Use only 100% ester synthetic motorcycle oils designed for wet-clutch anti-slippage and high shear stability.",
    tips: [
      "Never use car engine oils (contain friction modifiers)",
      "Check sight glass with machine vertical on level surface",
      "Oil level should rest precisely between MIN & MAX markings"
    ]
  }
];

// 32-Point Pre-Ride Checklist
const CHECKLIST_SECTIONS = [
  {
    category: "Tyres & Wheels",
    items: [
      { id: "t1", label: "Cold tyre pressure verified with digital gauge" },
      { id: "t2", label: "Tread depth checked across centre and shoulders" },
      { id: "t3", label: "Tyre surface inspected for embedded nails or cuts" },
      { id: "t4", label: "Wheel rims inspected for dents or spoke loose play" },
      { id: "t5", label: "Valve stem caps firmly secured on both wheels" }
    ]
  },
  {
    category: "Controls & Cables",
    items: [
      { id: "c1", label: "Front brake lever firmness and bite checked" },
      { id: "c2", label: "Rear brake pedal travel and resistance verified" },
      { id: "c3", label: "Throttle grip snaps back smoothly upon release" },
      { id: "c4", label: "Clutch lever free-play within 2-3mm specification" },
      { id: "c5", label: "Handlebar turns stop-to-stop with zero cable pull" }
    ]
  },
  {
    category: "Fluids & Powertrain",
    items: [
      { id: "f1", label: "Engine oil level verified via sight glass / dipstick" },
      { id: "f2", label: "Front & rear brake fluid clear and above MIN line" },
      { id: "f3", label: "Coolant level verified in reservoir tank" },
      { id: "f4", label: "Drive chain properly tensioned (25-35mm slack)" },
      { id: "f5", label: "Drive chain clean and lubricated with synthetic lube" },
      { id: "f6", label: "Zero fluid leaks beneath engine or fork sliders" }
    ]
  },
  {
    category: "Electrical & Chassis",
    items: [
      { id: "e1", label: "Headlight high / low beams illuminate brightly" },
      { id: "e2", label: "Brake light activates with both hand lever and foot pedal" },
      { id: "e3", label: "Turn indicators and hazard flashers operational" },
      { id: "e4", label: "Side stand kill switch cuts engine when put in gear" },
      { id: "e5", label: "Mirrors adjusted and securely torqued" }
    ]
  }
];

// OBD & Warning Lights Guide
const OBD_GUIDE = [
  {
    code: "MIL (Check Engine)",
    meaning: "Flashing Warning Light",
    severity: "CRITICAL — STOP RIDING",
    action: "Indicates an active cylinder misfire, loss of oil pressure, or severe knock. Pull over safely and shut down engine immediately. Contact our garage for flatbed recovery."
  },
  {
    code: "MIL (Check Engine)",
    meaning: "Solid Glowing Light",
    severity: "MODERATE FAULT",
    action: "Indicates a secondary sensor telemetry error (O2 sensor, throttle position drift, EVAP purge). Safe for gentle riding directly to RoadCrafters Garage for an OBD-II scan."
  },
  {
    code: "ABS Warning",
    meaning: "Light Stays On Above 10 km/h",
    severity: "BRAKE ASSIST DISABLED",
    action: "Standard hydraulic braking is still functional, but anti-lock skid protection is inactive. Usually caused by a dirty wheel speed tone ring sensor or sensor air gap."
  },
  {
    code: "Battery / Alternator",
    meaning: "Voltage Warning Indicator",
    severity: "CHARGING SYSTEM FAULT",
    action: "Stator alternator is under-charging (<13.2V) or battery cells have degraded. Machine may stall once electrical reserve drains. Stop auxiliary lights immediately."
  }
];

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<"schedules" | "specs" | "checklist" | "obd">("schedules");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalItems = CHECKLIST_SECTIONS.reduce((acc, sec) => acc + sec.items.length, 0);
  const completionPercent = Math.round((completedCount / totalItems) * 100);

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="border-b border-[#E6D7BC] pb-8">
        <div className="flex items-center space-x-2 text-xs font-semibold tracking-widest text-[#C5A059] uppercase mb-2">
          <BookOpen className="w-4 h-4" />
          <span>TECHNICAL ATELIER KNOWLEDGE BASE</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium text-[#1F1B14] leading-tight">
          Machine Engineering Resources & Specifications
        </h1>
        <p className="mt-3 text-base text-[#6E6B65] max-w-3xl leading-relaxed">
          Factory-calibrated maintenance schedules, cold tyre pressure standards, interactive pre-ride inspection checklists, and electronic OBD telemetry guides curated by our master technicians.
        </p>
      </div>

      {/* Navigation Pills */}
      <div className="flex flex-wrap gap-2 border-b border-[#E6D7BC] pb-4">
        {[
          { key: "schedules", label: "Service Schedules", icon: Wrench },
          { key: "specs", label: "Engineering Baselines", icon: Sliders },
          { key: "checklist", label: "32-Point Pre-Ride Audit", icon: CheckCircle2 },
          { key: "obd", label: "OBD Telemetry & Diagnostics", icon: Cpu }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`inline-flex items-center space-x-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 border ${
                isActive
                  ? "bg-[#1F1B14] text-[#FAF8F5] border-[#1F1B14] shadow-md"
                  : "bg-white text-[#6E6B65] border-[#E6D7BC] hover:border-[#C5A059] hover:text-[#1F1B14]"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#C5A059]" : ""}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SERVICE SCHEDULES */}
      {activeTab === "schedules" && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] bg-[#1F1B14] px-2.5 py-1 inline-block mb-2">
              FACTORY REFRESH MATRIX
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1F1B14]">
              High-Performance Machine Service Intervals
            </h2>
            <p className="text-sm text-[#6E6B65] mt-1 max-w-2xl">
              Strict interval benchmarks designed for high-compression engines, wet-clutch transmissions, and performance chassis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MAINTENANCE_SCHEDULES.map((sched, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#E6D7BC] hover:border-[#C5A059] transition-all duration-300 p-8 flex flex-col justify-between shadow-sm relative group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-serif text-3xl font-bold text-[#1F1B14] group-hover:text-[#C5A059] transition-colors">
                      {sched.interval}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#1F1B14] bg-[#FAF8F5] border border-[#E6D7BC] px-2.5 py-1">
                      {sched.badge}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#1F1B14] mb-2">
                    {sched.title}
                  </h3>
                  <p className="text-sm text-[#6E6B65] mb-6 leading-relaxed">
                    {sched.desc}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-[#E6D7BC]/50">
                    {sched.tasks.map((task, tIdx) => (
                      <div key={tIdx} className="flex items-start space-x-2.5">
                        <Check className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-[#1F1B14] leading-relaxed font-medium">
                          {task}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E6D7BC] flex justify-between items-center">
                  <span className="text-xs text-[#6E6B65]">Recommended OEM Fluid: Motul 100% Synthetic</span>
                  <Link
                    href="/book"
                    className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#C5A059] hover:underline gap-1"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: TECHNICAL BASELINES */}
      {activeTab === "specs" && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] bg-[#1F1B14] px-2.5 py-1 inline-block mb-2">
              PRECISION TOLERANCES
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1F1B14]">
              Essential Rider Engineering Standards
            </h2>
            <p className="text-sm text-[#6E6B65] mt-1 max-w-2xl">
              Factory tolerance baselines verified by master technicians during every chassis and safety inspection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TECHNICAL_BASELINES.map((spec, idx) => {
              const Icon = spec.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-[#E6D7BC] hover:border-[#C5A059] transition-all p-8 space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-[#FAF8F5] border border-[#E6D7BC] text-[#C5A059]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-[#1F1B14]">
                        {spec.title}
                      </h3>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C5A059] bg-[#1F1B14] px-2 py-0.5">
                      {spec.status}
                    </span>
                  </div>

                  <div className="bg-[#FAF8F5] p-4 border border-[#E6D7BC]">
                    <span className="text-xs text-[#6E6B65] block">Nominal Calibration Standard</span>
                    <span className="font-serif text-2xl font-bold text-[#1F1B14] block mt-0.5">
                      {spec.metric}
                    </span>
                    <p className="text-xs text-[#6E6B65] mt-2 leading-relaxed">
                      {spec.desc}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-[#1F1B14] block">
                      Critical Master Technician Notes:
                    </span>
                    {spec.tips.map((tip, tIdx) => (
                      <div key={tIdx} className="flex items-start space-x-2 text-xs text-[#6E6B65]">
                        <span className="text-[#C5A059] font-bold">•</span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: 32-POINT CHECKLIST */}
      {activeTab === "checklist" && (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] bg-[#1F1B14] px-2.5 py-1 inline-block mb-2">
                INTERACTIVE RIDER SAFETY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1F1B14]">
                32-Point Pre-Ride & Tour Safety Audit
              </h2>
              <p className="text-sm text-[#6E6B65] mt-1 max-w-2xl">
                Check off critical mechanical safety nodes interactively before your morning ride, mountain pass, or track session.
              </p>
            </div>

            {/* Live Progress Indicator */}
            <div className="bg-[#1F1B14] text-white p-4 border border-[#2C2316] min-w-[240px]">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-[#C5A059] uppercase tracking-wider font-semibold">Audit Progress</span>
                <span className="font-bold">{completedCount} / {totalItems} ({completionPercent}%)</span>
              </div>
              <div className="w-full bg-[#2C2316] h-2 rounded-none overflow-hidden">
                <div 
                  className="bg-[#C5A059] h-full transition-all duration-300"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
              {completionPercent === 100 && (
                <div className="mt-2 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Machine is Fully Prepared for Flight</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CHECKLIST_SECTIONS.map((sec, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#E6D7BC] p-6 space-y-4 shadow-sm"
              >
                <div className="border-b border-[#E6D7BC] pb-3 flex items-center justify-between">
                  <h3 className="font-serif text-lg font-semibold text-[#1F1B14]">
                    {sec.category}
                  </h3>
                  <span className="text-[11px] text-[#6E6B65]">
                    {sec.items.filter((it) => checkedItems[it.id]).length} / {sec.items.length} Checked
                  </span>
                </div>

                <div className="space-y-3">
                  {sec.items.map((item) => {
                    const isChecked = !!checkedItems[item.id];
                    return (
                      <label 
                        key={item.id}
                        className={`flex items-start space-x-3 p-3 border transition-colors cursor-pointer select-none ${
                          isChecked 
                            ? "bg-[#FAF8F5] border-[#C5A059]/40" 
                            : "bg-white border-[#E6D7BC]/40 hover:border-[#C5A059]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCheck(item.id)}
                          className="mt-0.5 w-4 h-4 rounded-none accent-[#C5A059] cursor-pointer"
                        />
                        <span className={`text-xs leading-relaxed font-medium ${
                          isChecked ? "line-through text-[#6E6B65]" : "text-[#1F1B14]"
                        }`}>
                          {item.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setCheckedItems({})}
              className="text-xs uppercase tracking-wider text-[#6E6B65] hover:text-[#1F1B14] underline"
            >
              Reset All Checklist Items
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: OBD & WARNING LIGHTS */}
      {activeTab === "obd" && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] bg-[#1F1B14] px-2.5 py-1 inline-block mb-2">
              ELECTRONIC TELEMETRY
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1F1B14]">
              ECU Fault Codes & Warning Indicator Protocol
            </h2>
            <p className="text-sm text-[#6E6B65] mt-1 max-w-2xl">
              Understand illuminated instrument cluster indicators before taking mechanical action.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {OBD_GUIDE.map((obd, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#E6D7BC] p-8 space-y-4 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#6E6B65] block">
                      Indicator Status
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#1F1B14] mt-0.5">
                      {obd.meaning}
                    </h3>
                  </div>
                  <span className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 border ${
                    obd.severity.includes("CRITICAL")
                      ? "bg-rose-50 border-rose-200 text-rose-700"
                      : "bg-[#1F1B14] border-[#2C2316] text-[#C5A059]"
                  }`}>
                    {obd.severity}
                  </span>
                </div>

                <div className="p-4 bg-[#FAF8F5] border border-[#E6D7BC]">
                  <span className="text-xs text-[#6E6B65] block font-semibold mb-1">
                    System Sub-Assembly: {obd.code}
                  </span>
                  <p className="text-xs text-[#1F1B14] leading-relaxed">
                    {obd.action}
                  </p>
                </div>

                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="text-[#6E6B65]">OBD Scanner Bay Available</span>
                  <a
                    href="tel:+918668412375"
                    className="font-semibold text-[#C5A059] hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Diagnostic Master</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Specialist Technical Master Hotline Callout */}
      <div className="bg-[#1F1B14] text-[#FAF8F5] p-8 md:p-12 border border-[#2C2316] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#C5A059]">
            <ShieldCheck className="w-4 h-4" />
            <span>ROADCRAFTERS DIRECT CONCIERGE</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
            Require Custom Technical Torque Specs or Immediate Diagnostic Support?
          </h3>
          <p className="text-sm text-[#D4C4A8] leading-relaxed">
            Our master mechanics provide direct consultations for OEM service manuals, suspension sag baselines, and bespoke machine performance upgrades.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <a
            href="tel:+918668412375"
            className="px-6 py-3.5 bg-[#C5A059] hover:bg-[#B38E47] text-[#1F1B14] text-xs font-bold uppercase tracking-widest transition-colors text-center inline-flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Master Mechanic</span>
          </a>
          <Link
            href="/book"
            className="px-6 py-3.5 bg-transparent border border-[#FAF8F5]/30 hover:border-[#C5A059] text-white hover:text-[#C5A059] text-xs font-bold uppercase tracking-widest transition-colors text-center whitespace-nowrap"
          >
            Book Workshop Bay
          </Link>
        </div>
      </div>
    </div>
  );
}
