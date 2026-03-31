"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useLang } from "@/contexts/LanguageContext";

const metricValues = [3, 3, 40, 95];

export default function Results() {
  const { tr } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      className="section-gap"
      style={{ backgroundColor: "var(--color-dark)" }}
      ref={ref}
    >
      <div className="container-site">
        {/* Heading */}
        <div className="mb-16 md:mb-20 max-w-2xl">
          <motion.div
            className="label label-dark mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            {tr.results.label}
          </motion.div>
          <motion.h2
            className="text-display-size font-display font-light text-white text-balance"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {tr.results.heading}{" "}
            <span className="font-display italic" style={{ color: "var(--color-accent-subtle)" }}>
              {tr.results.headingItalic}
            </span>
          </motion.h2>
        </div>

        {/* Metrics Row */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px mb-16 md:mb-20"
          style={{ backgroundColor: "var(--color-dark-border)" }}
        >
          {tr.results.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="p-8 md:p-10"
              style={{ backgroundColor: "var(--color-dark)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="text-4xl md:text-5xl font-display font-light mb-3"
                style={{ color: "var(--color-accent-subtle)" }}
              >
                {m.prefix}
                <AnimatedCounter value={metricValues[i]} suffix={m.suffix} />
              </div>
              <p className="text-sm font-medium text-white mb-1.5">{m.label}</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-subtle)" }}>
                {m.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{ backgroundColor: "var(--color-dark-border)" }}>
          {tr.results.valueProps.map((vp, i) => (
            <motion.div
              key={vp.title}
              className="group p-8 md:p-10 flex gap-6 transition-colors duration-500"
              style={{ backgroundColor: "var(--color-dark)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 + 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ backgroundColor: "var(--color-dark-card)" }}
            >
              <div
                className="mt-1 w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors duration-300 group-hover:border-accent"
                style={{ borderColor: "var(--color-dark-border)" }}
              />
              <div>
                <h3 className="text-base font-medium text-white mb-2">{vp.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-subtle)" }}>
                  {vp.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
