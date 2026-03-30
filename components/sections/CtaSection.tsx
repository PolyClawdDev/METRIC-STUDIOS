"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CtaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section
      id="kontakt"
      className="section-gap relative overflow-hidden"
      style={{ backgroundColor: "var(--color-background)" }}
      ref={ref}
    >
      {/* Accent blob */}
      <motion.div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full pointer-events-none"
        style={{
          backgroundColor: "var(--color-accent)",
          opacity: 0.04,
          filter: "blur(80px)",
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-site relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="label justify-center mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            Kontakt
          </motion.div>

          <motion.h2
            className="text-display-size font-display font-light text-foreground mb-6 text-balance"
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Klar for å ta det{" "}
            <span className="font-display italic" style={{ color: "var(--color-accent)" }}>
              neste steget?
            </span>
          </motion.h2>

          <motion.p
            className="text-base md:text-lg font-light leading-relaxed max-w-lg mx-auto mb-12"
            style={{ color: "var(--color-text-muted)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            La oss bygge noe som skiller seg ut. Kontakt oss for en uforpliktende samtale
            om hva bedriften din trenger.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <MagneticButton
              as="a"
              href="mailto:post@metricsstudios.no"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-[0.06em] uppercase bg-foreground text-background hover:bg-accent transition-colors duration-400"
            >
              Ta kontakt nå
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                <path d="M0 4H14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
          </motion.div>

          {/* Email link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            <a
              href="mailto:post@metricsstudios.no"
              className="text-sm font-medium transition-colors duration-300 hover:text-accent"
              style={{ color: "var(--color-text-muted)" }}
            >
              post@metricsstudios.no
            </a>
          </motion.div>

          {/* Divider line decoration */}
          <div
            className="mt-16 pt-12 border-t grid grid-cols-1 md:grid-cols-3 gap-8"
            style={{ borderColor: "var(--color-border)" }}
          >
            {[
              { title: "Ingen skjulte kostnader", desc: "Klar pris fra start. Ingen overraskelser." },
              { title: "Rask responstid", desc: "Tilbakemelding innen 24 timer, alltid." },
              { title: "Fri konsultasjon", desc: "Vi snakker først — ingen forpliktelser." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
              >
                <p className="text-sm font-medium text-foreground mb-1">{item.title}</p>
                <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
