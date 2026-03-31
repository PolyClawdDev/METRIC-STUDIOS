"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileSearch, MapPin, FileText, Cpu, BarChart2, Megaphone } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const icons = [FileSearch, MapPin, FileText, Cpu, BarChart2, Megaphone];

export default function SeoSection() {
  const { tr } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      className="section-gap"
      style={{ backgroundColor: "var(--color-background)" }}
      ref={ref}
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left side */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <motion.div
                className="label mb-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
              >
                {tr.seo.label}
              </motion.div>
              <motion.h2
                className="text-heading-size font-display font-light text-foreground mb-6 text-balance"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {tr.seo.heading}{" "}
                <span className="font-display italic" style={{ color: "var(--color-accent)" }}>
                  {tr.seo.headingItalic}
                </span>
              </motion.h2>
              <motion.p
                className="text-sm leading-relaxed mb-8 max-w-sm text-balance"
                style={{ color: "var(--color-text-muted)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {tr.seo.body}
              </motion.p>

              <motion.div
                className="p-6 border-l-2"
                style={{
                  borderColor: "var(--color-accent)",
                  backgroundColor: "var(--color-accent-subtle)",
                }}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-sm leading-relaxed font-medium" style={{ color: "var(--color-accent)" }}>
                  {tr.seo.quote}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right feature grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px"
              style={{ backgroundColor: "var(--color-border)" }}>
              {tr.seo.features.map((feature, i) => {
                const Icon = icons[i];
                return (
                  <motion.div
                    key={feature.title}
                    className="group p-7 transition-colors duration-400"
                    style={{ backgroundColor: "var(--color-background)" }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: i * 0.09 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ backgroundColor: "var(--color-muted)" }}
                  >
                    <div
                      className="mb-4 transition-colors duration-300 group-hover:text-accent"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-sm font-medium text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                      {feature.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
