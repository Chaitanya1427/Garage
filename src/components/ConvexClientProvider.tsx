"use client";

import React, { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "https://oceanic-elk-40.convex.cloud";

let convexClient: ConvexReactClient;
try {
  convexClient = new ConvexReactClient(convexUrl);
} catch (e) {
  convexClient = new ConvexReactClient("https://oceanic-elk-40.convex.cloud");
}

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convexClient}>{children}</ConvexProvider>;
}
