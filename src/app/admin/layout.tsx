"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Search, Settings, LogOut, ExternalLink, ShieldCheck, Tag } from "lucide-react";
import ConvexClientProvider from "@/components/ConvexClientProvider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setAuthenticated(true);
      return;
    }

    const token = localStorage.getItem("rc_admin_token");
    if (!token) {
      router.push("/admin/login");
    } else {
      setAuthenticated(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("rc_admin_token");
    document.cookie = "rc_admin_token=; path=/; max-age=0;";
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <ConvexClientProvider>{children}</ConvexClientProvider>;
  }

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-[#1F1B14] flex items-center justify-center text-[#FAF8F5]">
        <div className="animate-pulse flex items-center gap-2 text-sm text-[#C5A059]">
          <ShieldCheck className="w-5 h-5" />
          <span>Verifying Admin Permissions...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Pricing CMS", href: "/admin/content", icon: Tag },
    { name: "Blog Posts", href: "/admin/blogs", icon: FileText },
    { name: "On-Page SEO", href: "/admin/seo", icon: Search },
    { name: "Site Content", href: "/admin/content", icon: Settings },
  ];

  return (
    <ConvexClientProvider>
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans">
        {/* Admin Header Microbar */}
        <header className="bg-[#1F1B14] text-white border-b border-[#2C2316] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link href="/admin" className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-[#C5A059] shadow-md bg-[#1F1B14] flex items-center justify-center">
                  <img
                    src="/logo-19th.png"
                    alt="RoadCrafters Garage Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-sm font-bold tracking-tight text-white leading-tight">
                    ROAD CRAFTERS
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
                    ADMIN CMS
                  </span>
                </div>
              </Link>

              {/* Nav links */}
              <nav className="hidden md:flex items-center space-x-1 pl-6 border-l border-[#2C2316]">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                        isActive
                          ? "bg-[#2C2316] text-[#C5A059]"
                          : "text-[#D4C4A8] hover:text-white hover:bg-[#2C2316]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/"
                target="_blank"
                className="text-xs text-[#D4C4A8] hover:text-[#C5A059] flex items-center gap-1 transition-colors"
              >
                <span>Live Website</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-950/60 hover:bg-red-900 border border-red-800/40 text-red-200 text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors"
              >
                <LogOut className="w-3 h-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Navigation */}
        <div className="md:hidden bg-[#1F1B14] border-b border-[#2C2316] px-4 py-2 flex items-center space-x-2 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5 ${
                  isActive ? "bg-[#2C2316] text-[#C5A059]" : "text-[#D4C4A8]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </ConvexClientProvider>
  );
}
