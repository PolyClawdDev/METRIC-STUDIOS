"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const points = [
  {
    num: "01",
    title: "Premium, ikke generisk",
    desc: "Skreddersydde løsninger designet for din bedrift og dine kunder. Aldri maler, alltid intensjon.",
  },
  {
    num: "02",
    title: "SEO innebygd fra start",
    desc: "Teknisk SEO er ikke en ettertanke — det er en del av hvert eneste valg vi tar i design og utvikling.",
  },
  {
    num: "03",
    title: "Direkte samarbeid",
    desc: "Du jobber alltid direkte med teamet vårt. Ingen mellomledd, ingen misforståelser, ingen forsinkelser.",
  },
  {
    num: "04",
    title: "Konverteringsfokusert design",
    desc: "Vakker design som faktisk leverer — ikke bare ser bra ut. Hvert element er satt der for en grunn.",
  },
  {
    num: "05",
    title: "Langsiktig strategi",
    desc: "Vi bygger for fremtiden din, ikke bare for leveransen. En partner du kan stole på over tid.",
  },
  {
    num: "06",
    title: "Premium posisjonering",
    desc: "Bedriften din skal se best ut i rommet — alltid. Fordi første inntrykk avgjør om de tar kontakt.",
  },
];

export default function WhyMe() {
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
          {/* Left sticky intro */}
          <div className="lg:col-span-4">
            <motion.div
              className="label mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              Fordeler
            </motion.div>
            <motion.h2
              className="text-heading-size font-display font-light text-foreground mb-6 text-balance"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Hvorfor velge oss?
            </motion.h2>
            <motion.p
              className="text-sm leading-relaxed max-w-xs text-balance"
              style={{ color: "var(--color-text-muted)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Du trenger ikke det største byrået. Du trenger det rette teamet — ett som forstår
              design, SEO og forretning på samme tid.
            </motion.p>
          </div>

          {/* Right grid of points */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px"
              style={{ backgroundColor: "var(--color-border)" }}>
              {points.map((point, i) => (
                <motion.div
                  key={point.num}
                  className="group p-8 relative"
                  style={{ backgroundColor: "var(--color-background)" }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.07 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ backgroundColor: "var(--color-muted)" }}
                >
                  <span
                    className="block text-[0.6rem] font-medium tracking-[0.14em] uppercase mb-4"
                    style={{ color: "var(--color-text-subtle)" }}
                  >
                    {point.num}
                  </span>
                  <h3 className="text-base font-medium text-foreground mb-3">
                    {point.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    {point.desc}
                  </p>

                  {/* Hover accent dot */}
                  <motion.div
                    className="absolute top-7 right-7 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "var(--color-accent)" }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
