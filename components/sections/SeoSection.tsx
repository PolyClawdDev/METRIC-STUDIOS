"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileSearch, MapPin, FileText, Cpu, BarChart2, Megaphone } from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "SEO-fundamentet",
    desc: "Tekniske meta-tags, schema markup, intern lenkestruktur og hastighetoptimalisering som Google belønner.",
  },
  {
    icon: MapPin,
    title: "Lokal synlighet",
    desc: "Google Business Profile, lokal søkeoptimalisering og Google Maps-tilstedeværelse for mer lokalt salg.",
  },
  {
    icon: FileText,
    title: "Innholdsstrategi",
    desc: "Søkeordsanalyse, optimaliserte tjenestetekster og blogginnhold som bygger autoritet over tid.",
  },
  {
    icon: Cpu,
    title: "Teknisk SEO",
    desc: "Core Web Vitals, crawlability, XML-sitemap og strukturerte data som hever rangeringene dine.",
  },
  {
    icon: BarChart2,
    title: "Tracking & Analyse",
    desc: "GA4, Google Search Console og konverteringssporing — så du alltid vet hva som fungerer.",
  },
  {
    icon: Megaphone,
    title: "Annonsering som supplement",
    desc: "Google Ads og Meta-annonser der organisk SEO trenger et ekstra dytt for å nå kunder raskere.",
  },
];

export default function SeoSection() {
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
                Synlighet
              </motion.div>
              <motion.h2
                className="text-heading-size font-display font-light text-foreground mb-6 text-balance"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                Mer enn{" "}
                <span className="font-display italic" style={{ color: "var(--color-accent)" }}>
                  en nettside.
                </span>
              </motion.h2>
              <motion.p
                className="text-sm leading-relaxed mb-8 max-w-sm text-balance"
                style={{ color: "var(--color-text-muted)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                En nettside er bare starten. Det handler om å bli funnet, bli husket og bli
                valgt — gang på gang. Vi bygger helhetlige digitale tilstedeværelser som
                jobber for deg, ikke bare ser bra ut.
              </motion.p>

              {/* Accent block */}
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
                  «87% av forbrukere starter et produktsøk på Google. Hvis du ikke er synlig
                  der, eksisterer du ikke for dem.»
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right feature grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px"
              style={{ backgroundColor: "var(--color-border)" }}>
              {features.map((feature, i) => {
                const Icon = feature.icon;
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
