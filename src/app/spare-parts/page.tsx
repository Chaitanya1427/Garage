import React from "react";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import SparePartsClient from "@/components/SparePartsClient";

export const metadata = {
  title: "Genuine Machine Components & OEM Spare Parts | RoadCrafters Garage",
  description:
    "100% Genuine OEM high-performance machine components, Motul synthetic lubricants, Brembo brake pads, SKF seals, and high-performance filters in Porvorim, Goa.",
};

export default function SparePartsPage() {
  return (
    <ConvexClientProvider>
      <SparePartsClient />
    </ConvexClientProvider>
  );
}
