"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

export default function Process() {
  const { tr } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="prosessen"
      className="section-gap"
      style={{ backgroundColor: "var(--color-background)" }}
      ref={ref}
    >
      <div className="container-site">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="md:col-span-7">
            <motion.div
              className="label mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              {tr.process.label}
            </motion.div>
            <motion.h2
              className="text-display-size font-display font-light text-foreground text-balance"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {tr.process.heading}{" "}
              <span className="font-display italic" style={{ color: "var(--color-text-muted)" }}>
                {tr.process.headingItalic}
              </span>
            </motion.h2>
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          <motion.div
            className="absolute left-[calc(2rem+0.5px)] top-0 bottom-0 w-px origin-top hidden md:block"
            style={{ backgroundColor: "var(--color-border)" }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="space-y-0">
            {tr.process.steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 md:py-12 border-b relative"
                style={{ borderColor: "var(--color-border)" }}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12 + 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="md:col-span-1 flex items-start md:justify-center pt-1">
                  <div className="relative">
                    <motion.div
                      className="w-4 h-4 rounded-full border-2 transition-colors duration-300 group-hover:border-accent"
                      style={{
                        backgroundColor: "var(--color-background)",
                        borderColor: "var(--color-border-strong)",
                        position: "relative",
                        zIndex: 1,
                      }}
                      whileHover={{ scale: 1.3 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <div className="hidden md:flex md:col-span-1 items-start pt-0">
                  <span
                    className="text-[0.65rem] font-medium tracking-[0.14em] uppercase mt-0.5"
                    style={{ color: "var(--color-text-subtle)" }}
                  >
                    {step.num}
                  </span>
                </div>

                <div className="md:col-span-4">
                  <h3 className="text-xl md:text-2xl font-display font-medium text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                    {step.title}
                  </h3>
                </div>

                <div className="md:col-span-4">
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text-muted)" }}>
                    {step.desc}
                  </p>
                  <p
                    className="text-[0.65rem] font-medium tracking-[0.1em] uppercase"
                    style={{ color: "var(--color-text-subtle)" }}
                  >
                    {step.detail}
                  </p>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 h-px"
                  style={{ backgroundColor: "var(--color-accent)" }}
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
