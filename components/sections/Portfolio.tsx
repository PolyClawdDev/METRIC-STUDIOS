"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

const projectAccents = ["#1C3829", "#2A4A3E", "#1F3530"];
const projectPatterns = [
  [{ w: "70%", h: 12, opacity: 1 }, { w: "45%", h: 8, opacity: 0.6 }, { w: "100%", h: 4, opacity: 0.3 }],
  [{ w: "55%", h: 16, opacity: 1 }, { w: "80%", h: 6, opacity: 0.5 }, { w: "35%", h: 10, opacity: 0.8 }],
  [{ w: "90%", h: 8, opacity: 0.7 }, { w: "60%", h: 14, opacity: 1 }, { w: "75%", h: 5, opacity: 0.4 }],
];

export default function Portfolio() {
  const { tr } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      id="prosjekter"
      className="section-gap"
      style={{ backgroundColor: "var(--color-muted)" }}
      ref={ref}
    >
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div>
            <motion.div
              className="label mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              {tr.portfolio.label}
            </motion.div>
            <motion.h2
              className="text-display-size font-display font-light text-foreground text-balance"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {tr.portfolio.heading}
            </motion.h2>
          </div>
          <motion.p
            className="text-sm max-w-xs text-right hidden md:block"
            style={{ color: "var(--color-text-muted)" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {tr.portfolio.sub}
          </motion.p>
        </div>

        {/* Projects */}
        <div className="space-y-4">
          {tr.portfolio.projects.map((project, i) => (
            <motion.div
              key={project.client}
              className="group relative border overflow-hidden transition-colors duration-500"
              style={{
                backgroundColor: hoveredId === i ? projectAccents[i] : "var(--color-background)",
                borderColor: "var(--color-border)",
              }}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.12 + 0.2, ease: [0.22, 1, 0.36, 1] }}
              onHoverStart={() => setHoveredId(i)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-8 md:p-10 items-center">
                <div className="hidden md:block md:col-span-1">
                  <span
                    className="text-[0.65rem] font-medium tracking-[0.14em] uppercase transition-colors duration-500"
                    style={{ color: hoveredId === i ? "rgba(255,255,255,0.4)" : "var(--color-text-subtle)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="md:col-span-3">
                  <h3
                    className="text-xl md:text-2xl font-display font-medium mb-1 transition-colors duration-500"
                    style={{ color: hoveredId === i ? "white" : "var(--color-foreground)" }}
                  >
                    {project.client}
                  </h3>
                  <p
                    className="text-xs font-medium tracking-[0.08em] uppercase transition-colors duration-500"
                    style={{ color: hoveredId === i ? "rgba(255,255,255,0.5)" : "var(--color-text-muted)" }}
                  >
                    {project.category}
                  </p>
                </div>

                <div className="md:col-span-4">
                  <p
                    className="text-sm leading-relaxed transition-colors duration-500"
                    style={{ color: hoveredId === i ? "rgba(255,255,255,0.7)" : "var(--color-text-muted)" }}
                  >
                    {project.desc}
                  </p>
                </div>

                <div className="md:col-span-2 hidden lg:flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.6rem] font-medium tracking-[0.08em] uppercase px-2.5 py-1 transition-colors duration-500"
                      style={{
                        backgroundColor: hoveredId === i ? "rgba(255,255,255,0.1)" : "var(--color-muted-2)",
                        color: hoveredId === i ? "rgba(255,255,255,0.7)" : "var(--color-text-muted)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="md:col-span-2 flex items-center justify-end">
                  <div className="text-right">
                    <p
                      className="text-2xl font-display font-medium transition-colors duration-500"
                      style={{ color: hoveredId === i ? "white" : "var(--color-accent)" }}
                    >
                      {project.result}
                    </p>
                    <p
                      className="text-xs transition-colors duration-500"
                      style={{ color: hoveredId === i ? "rgba(255,255,255,0.4)" : "var(--color-text-subtle)" }}
                    >
                      {project.year}
                    </p>
                  </div>
                </div>
              </div>

              <motion.div className="h-px" style={{ backgroundColor: "var(--color-border)" }} />
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-10 text-xs text-center"
          style={{ color: "var(--color-text-subtle)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {tr.portfolio.note}
        </motion.p>
      </div>
    </section>
  );
}
