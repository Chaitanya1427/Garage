export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: "machine" | "specialist";
  estimatedTime: string;
  startingPrice: string;
  image: string;
  features: string[];
  processSteps: { step: string; title: string; desc: string }[];
}

export interface PackageItem {
  id: string;
  name: string;
  price: string;
  subtitle: string;
  recommendedFor: string;
  features: string[];
  popular?: boolean;
}

export interface GarageFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface LocationItem {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  facilities: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  heroImage: string;
  content: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

// 100% Authentic Component-Focused Machine & Technical Engineering Photography
export const classNamesImages = {
  hero: "/logo-19th.png", // Official Illuminated 3D Brand Crest & Dark Atelier Visual
  garageMain: "/garage_photos/garage-main-hall.jpg", // Main Garage Hall
  diagnostics: "/garage_photos/engine-diagnostics-bay.jpg", // Garage Bay Maintenance
  brakeService: "/garage_photos/hydraulic-lift-bays.jpg", // Master Machine Technicians at Work
  chainSprocket: "/garage_photos/chain-alignment-station.jpg", // Drive Chain & Gear Servicing
  suspension: "/garage_photos/suspension-overhaul-bay.jpg", // Suspension & Alignment Station
  tyresWheels: "/garage_photos/tyre-wheel-balancing.jpg", // Spare Parts & Tyre Inventory
  detailing: "/garage_photos/detailing-washing-bay.jpg", // Detailing & Washing Area
  electrical: "/garage_photos/electrical-testing-station.jpg", // Battery & Electrical Testing Bay
  toolsGrid: "/garage_photos/calibrated-hand-tools.jpg", // OEM Parts & Calibrated Hand Tools
  exteriorFront: "/garage_photos/chain-alignment-station.jpg", // Official Garage Workshop Facility
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "periodic-service",
    slug: "periodic-service",
    title: "Periodic Maintenance Service",
    shortDesc: "Comprehensive factory-scheduled servicing following precise manufacturer guidelines, Motul ester synthetic fluids, and a 32-point rider safety checklist.",
    fullDesc: "Regular maintenance is the foundation of peak machine performance and mechanical longevity. Our Periodic Service covers exact OEM specs for street, sport, cruiser, and adventure bikes—keeping your engine smooth, responsive, and warranty protected.",
    category: "machine",
    estimatedTime: "2 - 3 Hours",
    startingPrice: "₹1,800",
    image: "/services/periodic-service.jpg",
    features: [
      "Motul / Castrol 100% Synthetic Engine Oil refresh",
      "OEM High-flow Oil Filter replacement",
      "32-point Rider Safety & Torque audit",
      "Drive chain tensioning, ultrasonic cleaning & lube",
      "Spark plug gap audit & throttle sync check",
      "Digital machine service ledger update"
    ],
    processSteps: [
      { step: "01", title: "Paddock Stand Elevation", desc: "Mount machine on paddock stands for full chassis inspection." },
      { step: "02", title: "Sump Drain & Filter Change", desc: "Evacuate hot engine oil and clean magnetic sump drain bolt." },
      { step: "03", title: "Precision Refill & Chain Sync", desc: "Refill to exact c.c. capacity and adjust chain slack." },
      { step: "04", title: "Technician Test Ride", desc: "Road test by a master machine technician." }
    ]
  },
  {
    id: "engine-diagnostics",
    slug: "engine-diagnostics",
    title: "Machine Engine Diagnostics",
    shortDesc: "Computer OBD diagnostic scans, fuel injection mapping, sensor telemetry trace, and electronic ignition troubleshooting.",
    fullDesc: "Modern high-performance machines feature sophisticated ECU ignition and EFI systems. When a check engine light illuminates or throttle response stutters, our diagnostic engineers use dedicated electronic diagnostic rigs to pinpoint anomalies without guesswork.",
    category: "machine",
    estimatedTime: "1 - 1.5 Hours",
    startingPrice: "₹1,200",
    image: "/services/engine-diagnostics.jpg",
    features: [
      "Factory ECU software scan (Ducati, BMW Motorrad, Triumph, Japanese OEM)",
      "Live EFI throttle position & O2 sensor data logging",
      "Ignition coil waveform & stator charging output test",
      "ABS & Traction Control (TC) sensor diagnostic sweep",
      "Itemized diagnostic report with fixed repair quotes",
      "Fault code memory clear upon resolution"
    ],
    processSteps: [
      { step: "01", title: "OBD Interface Connection", desc: "Plug diagnostic interface into main machine harness." },
      { step: "02", title: "Live Telemetry Analysis", desc: "Monitor real-time AFR, manifold pressure, and coolant temp." },
      { step: "03", title: "Sensor Physical Audit", desc: "Verify electronic readings with physical gauge checks." },
      { step: "04", title: "Action Plan", desc: "Clear transparent quote provided before proceeding." }
    ]
  },
  {
    id: "brake-service",
    slug: "brake-service",
    title: "Brake System & Caliper Service",
    shortDesc: "Complete hydraulic brake system overhaul, Brembo/Nissin pad fitment, rotor thickness measurement, and DOT 4 pressure bleeding.",
    fullDesc: "Your machine's braking system is your primary life safety system. We perform full caliper disassembly, slider pin degreasing, high-friction ceramic or sintered pad fitment, and hydraulic pressure flushing to guarantee precise lever feel.",
    category: "machine",
    estimatedTime: "1.5 Hours",
    startingPrice: "₹1,500",
    image: "/services/brake-service.jpg",
    features: [
      "Brake rotor runout & micrometer thickness measurement",
      "Sintered / Ceramic high-friction brake pad installation",
      "Hydraulic pressure fluid bleed (DOT 4 / 5.1)",
      "Caliper piston ultrasonic cleaning & seal check",
      "Brake lever pivot lubrication & freeplay adjustment",
      "Bedding-in procedure & stopping distance test"
    ],
    processSteps: [
      { step: "01", title: "Micrometer Audit", desc: "Measure rotor wear down to hundredths of a millimeter." },
      { step: "02", title: "Caliper Overhaul", desc: "Clean brake dust from pistons and re-lube slider pins." },
      { step: "03", title: "Pad Installation", desc: "Torque caliper mounting bolts to exact factory Nm." },
      { step: "04", title: "Pressure Bleed", desc: "Evacuate air bubbles for immediate firm lever feel." }
    ]
  },
  {
    id: "chain-sprocket",
    slug: "chain-sprocket",
    title: "Chain & Sprocket Maintenance",
    shortDesc: "Ultrasonic chain degreasing, laser wheel alignment, link wear measurement, and high-tack synthetic lubricant application.",
    fullDesc: "A dry or misaligned drive chain saps rear wheel horsepower and accelerates sprocket wear. We thoroughly clean O-ring/X-ring chains, inspect front and rear sprocket teeth profiles, and align the rear axle using precision laser targets.",
    category: "machine",
    estimatedTime: "45 Mins",
    startingPrice: "₹800",
    image: "/services/chain-sprocket.jpg",
    features: [
      "Kerosene / Ultrasonic solvent deep chain bath",
      "Laser rear wheel alignment check",
      "Sprocket tooth wear & hook profile inspection",
      "Chain slack adjustment to factory mm specifications",
      "High-tack Motul Factory Line chain lube application",
      "Master link clip / rivet security verification"
    ],
    processSteps: [
      { step: "01", title: "Deep Clean", desc: "Strip road grime, old lube, and grit using chain brushes." },
      { step: "02", title: "Wear Measurement", desc: "Check 20-link stretch measurement against service limit." },
      { step: "03", title: "Laser Axle Alignment", desc: "Align swingarm adjuster blocks with laser alignment tool." },
      { step: "04", title: "Synthetic Lube", desc: "Apply water-resistant synthetic lube to O-ring seals." }
    ]
  },
  {
    id: "suspension-service",
    slug: "suspension-service",
    title: "Front Fork & Rear Suspension Service",
    shortDesc: "Telescopic & USD fork seal replacement, damping fluid refresh, rear shock linkage lube, and rider sag setup.",
    fullDesc: "Proper suspension tuning transforms cornering confidence and ride stability. We service front upside-down (USD) and conventional forks with OEM seals and Motul fork oil, plus adjust preload and rebound dampening for your weight.",
    category: "specialist",
    estimatedTime: "3 Hours",
    startingPrice: "₹2,800",
    image: "/services/suspension-service.jpg",

    features: [
      "Front fork oil evacuation & flush",
      "SKF / OEM leak-proof fork dust & oil seal replacement",
      "Inner stanchion chrome inspection for pitting or scratches",
      "Rear suspension linkage disassembly & grease refresh",
      "Rider static sag measurement & clicker baseline setup",
      "Steering head bearing play inspection"
    ],
    processSteps: [
      { step: "01", title: "Fork Disassembly", desc: "Remove fork legs and measure spring free length." },
      { step: "02", title: "Seal Replacement", desc: "Fit new low-friction SKF oil seals using driver tools." },
      { step: "03", title: "Fluid Measurement", desc: "Fill precise oil height (mm) with correct weight fluid." },
      { step: "04", title: "Sag Setup", desc: "Adjust rider sag to 30% of total travel." }
    ]
  },
  {
    id: "tyres-wheels",
    slug: "tyres-wheels",
    title: "Tyres & Wheel Balancing",
    shortDesc: "Pirelli, Metzeler, Michelin tyre fitment, dynamic wheel balancing, spoke tensioning, and valve replacement.",
    fullDesc: "Your tires are the only contact patch between your machine and the tarmac. We mount premium performance tires using scratch-free rim clamps, replace tubeless valves, and dynamically balance wheels for high-speed smoothness.",
    category: "machine",
    estimatedTime: "1 Hour",
    startingPrice: "₹900",
    image: "/services/tyres-wheels.jpg",
    features: [
      "Scratch-free tyre mounting on precision pneumatic tyre machine",
      "Dynamic wheel balancing on precision machine spindle",
      "Rim true & spoke tension check for spoked wheels",
      "High-pressure right-angle valve stem replacement",
      "Wheel bearing play & dust seal inspection",
      "Tread depth & compound heat-cycle log"
    ],
    processSteps: [
      { step: "01", title: "Dismount & Bead Break", desc: "Break bead safely without marring alloy rims." },
      { step: "02", title: "New Tyre Mounting", desc: "Fit fresh rubber matching directional rotation arrow." },
      { step: "03", title: "Spindle Balance", desc: "Balance wheel using adhesive lead-free weights." },
      { step: "04", title: "Torque Fitment", desc: "Reinstall axle nut with pinch bolts to factory Nm." }
    ]
  },
  {
    id: "battery-electrical",
    slug: "battery-electrical",
    title: "Battery & Electrical System Audit",
    shortDesc: "AGM/Gel battery conductance test, stator output voltage audit, starter motor relay service, and auxiliary light wiring.",
    fullDesc: "Electrical failures on a machine leave you stranded. We test battery CCA health under starter load, verify alternator stator output across RPMs, and repair corroded wiring harnesses or auxiliary accessories.",
    category: "machine",
    estimatedTime: "1 Hour",
    startingPrice: "₹700",
    image: "/services/battery-electrical.jpg",
    features: [
      "Conductance battery CCA load test",
      "Stator AC output & regulator/rectifier DC voltage test",
      "Parasitic draw current leak detection",
      "Starter motor relay & solenoid contact service",
      "Fuse box & ground terminal anti-corrosion sealing",
      "Clean waterproof connector assembly"
    ],
    processSteps: [
      { step: "01", title: "Load Test", desc: "Simulate starter draw to test battery cell health." },
      { step: "02", title: "Stator Output Sweep", desc: "Measure AC voltage at 5,000 RPM." },
      { step: "03", title: "Regulator Check", desc: "Confirm DC charging stays between 13.8V and 14.5V." },
      { step: "04", title: "Terminal Seal", desc: "Apply dielectric grease to battery terminals." }
    ]
  },
  {
    id: "bike-detailing",
    slug: "bike-detailing",
    title: "Atelier Machine Detailing & Ceramic Protection",
    shortDesc: "Engine degreasing, multi-stage paint polish, exhaust header rust removal, and 9H nano-ceramic tank & fairing coating.",
    fullDesc: "Restore your machine's showroom shine. Our detailing suite includes delicate hand washing, engine fin degreasing, stainless exhaust polishing, and durable ceramic coating to protect paintwork against UV, bug splatters, and road grime.",
    category: "specialist",
    estimatedTime: "1 Day",
    startingPrice: "₹3,500",
    image: "/services/bike-detailing.jpg",
    features: [
      "pH-neutral snow foam wash & degreaser treatment",
      "Engine fin & spoke brush deep cleaning",
      "Multi-stage machine paint correction on tank & fairings",
      "Exhaust header pipe de-tarnishing & metal polish",
      "9H Nano-Ceramic hydrophobic coating application",
      "Matte finish / leather seat nourishment treatment"
    ],
    processSteps: [
      { step: "01", title: "Foam Wash & Degrease", desc: "Safe foam wash isolating electrical components." },
      { step: "02", title: "Paint Correction", desc: "Remove light swirl marks and fuel tank scratches." },
      { step: "03", title: "Exhaust Restoration", desc: "Polish stainless headers to eliminate heat discoloration." },
      { step: "04", title: "Ceramic Cure", desc: "Apply 9H quartz ceramic layer for hydrophobic shine." }
    ]
  }
];

export const PACKAGES_DATA: PackageItem[] = [
  {
    id: "essential-rider",
    name: "Essential Rider",
    price: "₹1,800",
    subtitle: "Recommended every 4,000 km or 6 months for smooth daily commuting.",
    recommendedFor: "Commuter & Street Bikes (100cc - 250cc)",
    features: [
      "100% Synthetic Engine Oil Change (up to 1.5L)",
      "OEM Engine Oil Filter Replacement",
      "32-Point Rider Safety & Torque Audit",
      "Drive Chain Clean, Adjust & Lube",
      "Spark Plug Condition & Gap Check",
      "Brake Freeplay & Fluid Reservoir Check",
      "Complimentary Machine Wash"
    ]
  },
  {
    id: "complete-tune",
    name: "Complete Tune & Care",
    price: "₹3,500",
    subtitle: "Our most popular annual maintenance package for total peace of mind.",
    recommendedFor: "Sport, Cruiser & Naked Bikes (250cc - 650cc)",
    popular: true,
    features: [
      "Motul 7100 100% Synthetic Ester Oil Change (up to 2.5L)",
      "OEM Oil Filter + Air Filter Replacement",
      "Full Computer OBD Diagnostic System Scan",
      "Front & Rear Brake Caliper Service & Bleed",
      "Throttle Body / Carburetor Sync Check",
      "Battery CCA Load & Charging System Test",
      "Steering Head Bearing & Swingarm Play Check",
      "Ultrasonic Chain Deep Clean & Alignment",
      "Complimentary Doorstep Pickup & Drop"
    ]
  },
  {
    id: "apex-performance",
    name: "Apex Performance Service",
    price: "₹6,500",
    subtitle: "Comprehensive full-scope overhaul for high-performance and touring machines.",
    recommendedFor: "Superbikes & Adventure Tourers (650cc+)",
    features: [
      "Premium Factory Synthetic Oil (up to 4L)",
      "OEM Oil, Air, and Fuel Strainer Replacement",
      "Full ECU Telemetry Interrogation & Sensor Log",
      "Front Fork Seals & Damping Oil Refresh",
      "Brembo / Nissin Brake Fluid Flush (DOT 5.1)",
      "Coolant System Flush & Pressure Hold Test",
      "Valve Clearance Check & Shimming (if required)",
      "Full Machine Ceramic Spray Detailing",
      "12-Month / 10,000 km Service Warranty"
    ]
  }
];

export const GARAGE_FEATURES: GarageFeature[] = [
  {
    id: "lifts",
    title: "Heavy-Duty Hydraulic Machine Lifts",
    subtitle: "Safe clamp stations for all bike categories",
    description: "Our garage is equipped with pneumatic machine lifts featuring rubber-lined wheel chocks, ensuring your machine is raised to comfortable working height without scratching rims or exhausts.",
    image: "/garage_photos/hydraulic-lift-bays.jpg"
  },
  {
    id: "diagnostics",
    title: "Dedicated Machine OBD Diagnostic Rig",
    subtitle: "Official OEM software for European & Global Bikes",
    description: "We utilize specialized diagnostic software to interface directly with ECU electronics on Ducati, BMW Motorrad, Triumph, KTM, Royal Enfield, and Japanese brands.",
    image: "/garage_photos/suspension-overhaul-bay.jpg"
  },
  {
    id: "chain-station",
    title: "Ultrasonic Cleaning & Laser Alignment Station",
    subtitle: "Precision chain bath & laser wheel tracking",
    description: "Dedicated chain maintenance bay with ultrasonic solvent tanks and laser alignment gear to ensure zero rear wheel misalignment and minimal drag.",
    image: "/garage_photos/chain-alignment-station.jpg"
  },
  {
    id: "tools",
    title: "Calibrated Precision Hand Tools",
    subtitle: "Hazet & Motion Pro specialized bike tools",
    description: "Every axle nut, triple clamp bolt, and engine case fastener is torqued using calibrated digital torque wrenches to exact factory Nm limits.",
    image: "/garage_photos/calibrated-hand-tools.jpg"
  }
];

export const LOCATIONS_DATA: LocationItem[] = [
  {
    id: "porvorim-goa",
    name: "RoadCrafters Garage (रोडक्राफ्टर्स गराज)",
    city: "Porvorim, Goa",
    address: "Bay 9, Alcon Regency, Village Panchayat, near Nexa Showroom, Defence Colony, Aradi Socorro, Porvorim, Goa 403521, India",
    phone: "+91 86684 12375",
    email: "contact@roadcraftersgarage.com",
    hours: "Open — Closes at 10:00 PM",
    facilities: [
      "Flagship Machine Garage",
      "OBD Diagnostic Scans",
      "Customer First Service",
      "Hydraulic Lifts & Tuning",
      "OEM Parts & Synthetic Fluids",
      "Doorstep Pickup & Drop"
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "chain-care-guide",
    slug: "machine-chain-care-and-alignment",
    title: "The Rider's Guide to Drive Chain Tension & Laser Alignment",
    excerpt: "A dry or misaligned drive chain causes sluggish power delivery and rapid sprocket wear on high-performance machines. Learn how to inspect slack and align your rear wheel correctly.",
    category: "Maintenance Guide",
    author: {
      name: "Marcus Vance",
      role: "Chief Machine Master",
      avatar: "/logo-19th.png"
    },
    publishedAt: "August 28, 2026",
    readTime: "5 min read",
    heroImage: "/garage_photos/blog-cover-journal.jpg",
    content: [
      "Your machine's drive chain transfers all your engine's horsepower and torque directly to the rear tire contact patch. Yet, chain maintenance is often neglected until noise or binding occurs.",
      "1. Understanding Chain Slack: Every machine has a specified chain slack measurement (typically 25mm to 35mm) measured midway between the front and rear sprockets. Too tight, and you risk snapping the chain or damaging output shaft bearings when the swingarm compresses. Too loose, and the chain can derail or lash violently against the swingarm guard.",
      "2. The Danger of Swingarm Alignment Markers: Stamped alignment notch marks on swingarms are notoriously inaccurate. A misalignment of just 1.5 degrees causes uneven sprocket tooth wear and pulls the rear tire sideways during cornering.",
      "3. Proper Cleaning Protocol: Never use gasoline or harsh wire brushes on O-ring or X-ring chains. Use a specialized chain cleaner or kerosene with a soft nylon brush to dissolve grit without drying internal rubber seals.",
      "4. Synthetic Lubrication: Apply high-tack synthetic chain lube to the inner side of the chain while rotating the rear wheel by hand. Allow at least 15 minutes for solvent evaporation before riding to prevent fling-off."
    ]
  },
  {
    id: "synthetic-oil-high-performance-machines",
    slug: "synthetic-engine-oil-for-high-performance-machines",
    title: "Why Car Engine Oil Will Ruin Your Machine's Wet Clutch",
    excerpt: "High-performance machine engines share lubrication between the crankshaft, gearbox, and wet clutch. Discover why JASO MA2 specification oil is non-negotiable.",
    category: "Engine Science",
    author: {
      name: "David Sterling",
      role: "Lead Diagnostic Technician",
      avatar: "/logo-19th.png"
    },
    publishedAt: "August 15, 2026",
    readTime: "6 min read",
    heroImage: "/garage_photos/electrical-testing-station.jpg",
    content: [
      "A common misconception among owners is that high-grade automotive engine oil can be used in high-performance machines. However, automotive oils contain friction-modifying additives designed purely to maximize fuel economy.",
      "In a high-performance machine, the engine oil also bathes the wet clutch plates and transmission gears. Energy-conserving car oils cause the clutch friction plates to slip under acceleration, destroying the clutch pack in short order.",
      "Always select oils meeting JASO MA or JASO MA2 specifications. JASO MA2 oils are engineered with controlled friction characteristics that prevent clutch slippage while providing extreme shear stability for transmission gear teeth operating at 14,000+ RPM."
    ]
  },
  {
    id: "brake-fluid-fade",
    slug: "understanding-machine-brake-fade",
    title: "5 Signs Your Machine Brakes Need Immediate Service",
    excerpt: "Spongy brake levers and fluid discoloration signal dangerous brake fade. Here is how to keep your stopping performance sharp.",
    category: "Braking & Safety",
    author: {
      name: "Marcus Vance",
      role: "Chief Machine Master",
      avatar: "/logo-19th.png"
    },
    publishedAt: "July 30, 2026",
    readTime: "5 min read",
    heroImage: "/garage_photos/tyre-wheel-balancing.jpg",
    content: [
      "High-performance braking systems operate under intense thermal stress. Because you rely primarily on your front brake lever for up to 80% of your stopping power, maintaining hydraulic integrity is vital.",
      "1. Soft or Spongy Lever Feel: If pulling the front brake lever feels mushy or touches the handlebar grip, moisture has boiled inside the brake line or air bubbles have entered the hydraulic circuit.",
      "2. Dark Discolored Brake Fluid: DOT 4 brake fluid is naturally clear to light amber. As it absorbs atmospheric moisture over 12 to 24 months, its boiling point drops drastically, leading to vapor lock during heavy mountain descents.",
      "3. Pulsing Through the Lever: Rhythmic pulsation under braking indicates a warped brake rotor or uneven pad deposit buildup.",
      "4. Squealing or Metallic Grinding: Worn brake pads down to their wear indicators scrub directly against the steel rotor disc, gouging expensive grooves into the rotor face."
    ]
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: "Do I need to schedule an appointment for machine servicing?",
    answer: "We recommend booking your service appointment in advance so we can reserve a dedicated machine lift bay and ensure OEM filters and fluids are ready for your specific model.",
    category: "General"
  },
  {
    question: "How long does a standard periodic machine service take?",
    answer: "A standard periodic service along with our 32-point rider safety audit typically takes 2 to 3 hours. If additional repairs or parts are required, your advisor will send a digital estimate before proceeding.",
    category: "Service"
  },
  {
    question: "Do you offer doorstep pickup and drop-off for machines?",
    answer: "Yes! We operate specialized machine transport vans equipped with wheel chocks and soft tie-down straps to safely pick up and deliver your machine within a 15 km radius.",
    category: "Convenience"
  },
  {
    question: "Will servicing at Road Crafters Garage void my manufacturer warranty?",
    answer: "No. Servicing your machine at a certified independent facility using OEM-compliant parts and approved JASO MA2 synthetic oils does NOT void your manufacturer warranty.",
    category: "Warranty"
  },
  {
    question: "Do you provide a warranty on machine repairs and parts?",
    answer: "Yes, all mechanical repairs and OEM replacement components installed by Road Crafters Garage carry a comprehensive 12-Month or 10,000 km warranty covering both parts and labor.",
    category: "Warranty"
  },
  {
    question: "Which categories of machines do you service?",
    answer: "We service all high-performance machine categories including sport machines, cruisers, naked roadsters, adventure tourers, and premium scooters—ranging from everyday riders to 1000cc+ superbikes.",
    category: "Services"
  },
  {
    question: "Do you handle custom machine engineering or fork rebuilding?",
    answer: "Yes. Our garage features specialized fork seal driver kits, rear shock linkage press tools, and dedicated diagnostic rigs for deep mechanical overhauls.",
    category: "Specialist"
  }
];

export interface ReviewItem {
  id: string;
  author: string;
  badge?: string;
  date: string;
  rating: number;
  comment: string;
  ownerResponse?: string;
}

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Langston Dsouza",
    badge: "6 reviews",
    date: "a month ago",
    rating: 5,
    comment: "I have been looking for a good servicing centre for my Xpulse 200 4v as the Hero service centre are not that good. I gave my bike at RoadCrafters garage and they fixed it and now it's running better then ever. Highly recommended",
    ownerResponse: "Thank You Sir"
  },
  {
    id: "rev-2",
    author: "Nedan Heredia",
    badge: "1 review",
    date: "3 months ago",
    rating: 5,
    comment: "Really good servicing done for my vespa vx. Had my odometer fixed and ordered the cable, also fixed my front brake. Would recommend others to try"
  },
  {
    id: "rev-3",
    author: "Khemchand Singh",
    badge: "Blinkit Rider • 2 reviews",
    date: "a month ago",
    rating: 5,
    comment: "I'm working in blinkit. 1st time I found best service garage for machines. I suggest all of you please try once this garage service best and genuine rate.",
    ownerResponse: "Thank You"
  },
  {
    id: "rev-4",
    author: "Meraj Ahmad",
    badge: "4 reviews • 1 photo",
    date: "a month ago",
    rating: 5,
    comment: "Best machine garage in Porvorim, I'm satisfied with your service, technicians and master craftsman very good nature and price is perfect for any product and service,",
    ownerResponse: "Thank You"
  },
  {
    id: "rev-5",
    author: "Santosh L",
    badge: "1 review",
    date: "a month ago",
    rating: 5,
    comment: "Excellent service and owner is help full person even pick up bike and do servicing 24×7 service available",
    ownerResponse: "Thank You Sir"
  },
  {
    id: "rev-6",
    author: "Neha Shetty",
    badge: "3 reviews",
    date: "a month ago",
    rating: 5,
    comment: "Best service provider and genuine parts genuine charge road crafter garage is best",
    ownerResponse: "Thank You"
  },
  {
    id: "rev-7",
    author: "Sunil Kumar",
    badge: "1 review",
    date: "2 months ago",
    rating: 5,
    comment: "Best machine garage in Porvorim good and clean work"
  },
  {
    id: "rev-8",
    author: "Iswar Gavandar",
    badge: "1 review",
    date: "3 months ago",
    rating: 5,
    comment: "Good service and clean work staff also very friendly nice garage visit again 👍💯"
  },
  {
    id: "rev-9",
    author: "Verified Porvorim Rider",
    badge: "Activa Owner",
    date: "a month ago",
    rating: 5,
    comment: "Best garage in porvorim after service my scooty activa running smoothly thanks roadcrafters garage"
  },
  {
    id: "rev-10",
    author: "Bolo G",
    badge: "1 review",
    date: "4 months ago",
    rating: 5,
    comment: "This machine garage is Very good. And employee behavior is also good"
  }
];

export interface SparePartCategory {
  id: string;
  title: string;
  description: string;
  badge: string;
  items: string[];
  image: string;
}

export const SPARE_PARTS_DATA: SparePartCategory[] = [
  {
    id: "engine-fluids",
    title: "Engine Oils & Lubricants",
    description: "Motul, Castrol, and Liqui Moly 100% Synthetic Ester fluids, brake fluids, and fork oils.",
    badge: "100% Genuine",
    items: ["Motul 7100 10W-40 / 10W-50 4T", "Motul 300V Factory Line Synthetic", "Motul DOT 4 / 5.1 Brake Fluid", "Motul Fork Oil Expert (10W / 15W)"],
    image: "/garage_photos/calibrated-hand-tools.jpg",
  },
  {
    id: "brakes",
    title: "Brake Components & Pads",
    description: "Brembo, Nissin, and EBC sintered and ceramic friction pads, disc rotors, and master cylinders.",
    badge: "OEM Grade",
    items: ["Brembo Sintered Brake Pads", "Nissin High-Friction Pads", "Stainless Steel Braided Brake Lines", "OEM Disc Rotors & Caliper Seal Kits"],
    image: "/garage_photos/hydraulic-lift-bays.jpg",
  },
  {
    id: "drive-chain",
    title: "Chain & Sprocket Kits",
    description: "DID, RK, and Rolon heavy-duty O-Ring / X-Ring gold drive chains and hardened steel sprockets.",
    badge: "Heavy Duty",
    items: ["DID 520 / 525 VX3 X-Ring Chain", "Rolon Brass Coated Chain & Sprocket Kits", "Front & Rear Alloy/Steel Sprockets", "Ultrasonic Chain Cleaner & Lube Spray"],
    image: "/garage_photos/chain-alignment-station.jpg",
  },
  {
    id: "filters-plugs",
    title: "Filters & Ignition Spark Plugs",
    description: "Mahle, Mann, K&N high-flow air filters, OEM oil filters, and NGK Iridium spark plugs.",
    badge: "High Flow",
    items: ["NGK Laser Iridium Spark Plugs", "K&N High-Flow Air Filters", "OEM Paper & Sponge Air Filters", "Mahle High-Efficiency Oil Filters"],
    image: "/garage_photos/engine-diagnostics-bay.jpg",
  },
  {
    id: "suspension-seals",
    title: "Suspension Seals & Bearings",
    description: "SKF low-friction fork seals, dust wipers, steering head bearings, and swingarm bush kits.",
    badge: "Precision Fit",
    items: ["SKF Dual-Compound Fork Seals", "NTN / NBC Wheel Bearings", "All Balls Racing Steering Bearings", "Mono-Shock Linkage Bush Kits"],
    image: "/garage_photos/suspension-overhaul-bay.jpg",
  },
  {
    id: "electrical-battery",
    title: "Batteries & Electrical Relays",
    description: "Amaron, Exide, and Yuasa maintenance-free AGM gel batteries, stator coils, and relays.",
    badge: "Warranty Covered",
    items: ["Yuasa AGM Maintenance-Free Batteries", "Amaron Pro Bike Rider Gel Batteries", "OEM Stator Coils & Rectifiers", "Heavy-Duty Starter Relays & Fuses"],
    image: "/garage_photos/electrical-testing-station.jpg",
  },
];
