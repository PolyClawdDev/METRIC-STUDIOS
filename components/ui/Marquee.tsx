"use client";

import { motion } from "framer-motion";

const items = [
  "Webdesign",
  "SEO",
  "Leadgenerering",
  "Google Ads",
  "Digital Markedsføring",
  "Meta Ads",
  "UX Design",
  "Nettsider",
  "Google Business",
  "Performance Marketing",
  "AI Implementering",
  "Kundeanskaffelse",
  "Automatisering",
];

const Separator = () => (
  <span
    className="mx-6 inline-block w-1 h-1 rounded-full align-middle"
    style={{ backgroundColor: "var(--color-accent)", opacity: 0.6 }}
    aria-hidden="true"
  />
);

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-5 border-y"
      style={{
        backgroundColor: "var(--color-dark)",
        borderColor: "var(--color-dark-border)",
      }}
    >
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to right, var(--color-dark), transparent)",
        }}
        aria-hidden="true"
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to left, var(--color-dark), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="marquee-track flex items-center whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span
              className="text-[0.65rem] font-medium tracking-[0.2em] uppercase"
              style={{ color: "var(--color-text-subtle)" }}
            >
              {item}
            </span>
            <Separator />
          </span>
        ))}
      </div>
    </div>
  );
}
