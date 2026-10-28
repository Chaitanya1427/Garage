import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  dark?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  dark = false,
}: SectionHeadingProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto max-w-3xl",
    right: "text-right ml-auto max-w-3xl",
  };

  return (
    <div className={`mb-12 ${alignClasses[align]}`}>
      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight ${
          dark ? "text-white" : "text-[#1F1B14]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-base sm:text-lg leading-relaxed ${
            dark ? "text-stone-300" : "text-[#6E706B]"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
