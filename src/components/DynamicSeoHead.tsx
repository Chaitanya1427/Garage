"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function DynamicSeoHead() {
  const pathname = usePathname();
  const pageSeoList = useQuery(api.seo.listAll);

  useEffect(() => {
    if (!pageSeoList || pageSeoList.length === 0) return;

    const matched = pageSeoList.find((item: any) => item.pagePath === pathname);
    if (matched) {
      if (matched.metaTitle) {
        document.title = matched.metaTitle;
      }
      if (matched.metaDescription) {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement("meta");
          metaDesc.setAttribute("name", "description");
          document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute("content", matched.metaDescription);
      }
      if (matched.keywords) {
        let metaKw = document.querySelector('meta[name="keywords"]');
        if (!metaKw) {
          metaKw = document.createElement("meta");
          metaKw.setAttribute("name", "keywords");
          document.head.appendChild(metaKw);
        }
        metaKw.setAttribute("content", matched.keywords);
      }
    }
  }, [pathname, pageSeoList]);

  return null;
}
