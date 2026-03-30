"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const capabilities = [
  "bygge nettsider som selger",
  "anskaffe kunder via sosiale medier",
  "implementere AI i bedriften din",
  "rangere øverst på Google",
  "generere kvalifiserte leads",
  "automatisere arbeidsflyten din",
  "vokse digitalt — målbart",
];

const INTERVAL = 3000;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function CapabilityReel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % capabilities.length), INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative overflow-hidden border-y"
      style={{
        backgroundColor: "var(--color-background)",
        borderColor: "var(--color-border)",
        paddingBlock: "clamp(4rem, 8vw, 7rem)",
      }}
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-16">

          {/* Left — static label */}
          <div className="lg:col-span-4">
            <p className="label mb-4">Hva vi gjør</p>
            <h2
              className="font-display font-light text-foreground"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", lineHeight: 1.2 }}
            >
              Vi hjelper bedriften din med å
            </h2>
          </div>

          {/* Divider */}
          <div
            className="hidden lg:block lg:col-span-1 h-16 w-px mx-auto"
            style={{ backgroundColor: "var(--color-border)" }}
          />

          {/* Right — cycling capability */}
          <div className="lg:col-span-7 relative" style={{ minHeight: "3.5rem" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ y: 32, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -32, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex items-center gap-5"
              >
                {/* Counter */}
                <span
                  className="flex-shrink-0 text-[0.65rem] font-medium tracking-[0.14em] uppercase tabular-nums"
                  style={{ color: "var(--color-text-subtle)" }}
                >
                  {String(index + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(capabilities.length).padStart(2, "0")}
                </span>

                {/* Accent line */}
                <div
                  className="flex-shrink-0 w-8 h-px"
                  style={{ backgroundColor: "var(--color-accent)" }}
                />

                {/* Text */}
                <span
                  className="font-display font-light italic"
                  style={{
                    fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
                    color: "var(--color-accent)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}
                >
                  {capabilities[index]}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div
              className="absolute -bottom-6 left-0 right-0 h-px"
              style={{ backgroundColor: "var(--color-border)" }}
            >
              <motion.div
                key={index}
                className="h-full"
                style={{ backgroundColor: "var(--color-accent)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: INTERVAL / 1000, ease: "linear" }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
