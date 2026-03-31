"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Search, MapPin, BarChart3, Target, Zap, TrendingUp, BrainCircuit } from "lucide-react";
import { EASE_OUT } from "@/lib/animation";
import type { Variants } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

const icons = [Globe, Search, MapPin, BarChart3, Target, Zap, TrendingUp, BrainCircuit];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

export default function Services() {
  const { tr } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section
      id="tjenester"
      className="section-gap"
      style={{ backgroundColor: "var(--color-dark)" }}
      ref={ref}
    >
      <div className="container-site">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="md:col-span-7">
            <motion.div
              className="label label-dark mb-6"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {tr.services.label}
            </motion.div>
            <motion.h2
              className="text-display-size font-display font-light text-white text-balance"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {tr.services.heading}
            </motion.h2>
          </div>
          <div className="md:col-span-4 md:col-start-9 flex items-end">
            <motion.p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-subtle)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {tr.services.sub}
            </motion.p>
          </div>
        </div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px"
          style={{ backgroundColor: "var(--color-dark-border)" }}
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {tr.services.items.map((service, idx) => {
            const Icon = icons[idx];
            const isNew = service.badge === tr.services.badgeNew || service.badge === "Nytt" || service.badge === "New";
            return (
              <motion.div
                key={service.number}
                className="group relative p-8 md:p-10 flex flex-col gap-6 transition-colors duration-500"
                style={{ backgroundColor: "var(--color-dark)" }}
                variants={cardVariant}
                whileHover={{ backgroundColor: "var(--color-dark-card)" }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <span
                    className="text-[0.65rem] font-medium tracking-[0.14em] uppercase"
                    style={{ color: "var(--color-dark-border)" }}
                  >
                    {service.number}
                  </span>
                  {service.badge && (
                    <span
                      className="text-[0.6rem] font-medium tracking-[0.1em] uppercase px-2.5 py-1 border"
                      style={isNew ? {
                        borderColor: "#4ade80",
                        color: "#4ade80",
                        backgroundColor: "rgba(74,222,128,0.08)",
                      } : {
                        borderColor: "var(--color-accent)",
                        color: "var(--color-accent-subtle)",
                        backgroundColor: "rgba(28,56,41,0.15)",
                      }}
                    >
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Icon */}
                <motion.div
                  className="w-10 h-10 flex items-center justify-center"
                  style={{ color: "var(--color-accent-subtle)" }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon size={22} strokeWidth={1.5} />
                </motion.div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-3 group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-subtle)" }}>
                    {service.desc}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.6rem] font-medium tracking-[0.08em] uppercase px-2.5 py-1"
                      style={{
                        backgroundColor: "var(--color-dark-border)",
                        color: "var(--color-text-subtle)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px"
                  style={{ backgroundColor: "var(--color-accent)" }}
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
