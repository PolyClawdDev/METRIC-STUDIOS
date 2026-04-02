"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { EASE_OUT, staggerContainer, wordReveal } from "@/lib/animation";
import { scrollTo } from "@/lib/scrollTo";
import { useLang } from "@/contexts/LanguageContext";

export default function Hero() {
  const { tr } = useLang();
  const words1 = [...tr.hero.words1];
  const words2 = [...tr.hero.words2];
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const statsOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const statsY = useTransform(scrollYProgress, [0, 0.2], ["0%", "40%"]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex flex-col overflow-hidden"
    >
      {/* Background video */}
      <video
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <source src="/BACKROUND.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay so text remains readable */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.38) 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Bottom fade into next section */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          zIndex: 2,
          background: "linear-gradient(to bottom, transparent, #0a0a0a)",
        }}
      />

      <motion.div
        className="container-site flex-1 flex flex-col justify-center pt-20 relative"
        style={{ y, opacity, zIndex: 3 }}
      >
        <div className="grid grid-cols-1 gap-12 items-center">
          {/* ── Text content ─────────────────────────── */}
          <div className="max-w-4xl">
            {/* Label */}
            <motion.div
              className="label mb-8 md:mb-10"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
              style={{ color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.2)" }}
            >
              Metrics Studios
            </motion.div>

            {/* Primary headline */}
            <motion.div
              className="mb-2"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <div className="flex flex-wrap gap-x-[0.22em] text-hero-size">
                {words1.map((word, i) => (
                  <div key={i}>
                    <motion.span
                      className="block font-display font-light text-hero-size"
                      style={{ color: "white" }}
                      variants={wordReveal}
                    >
                      {word}
                    </motion.span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Secondary headline (italic accent) */}
            <motion.div
              className="mb-10 md:mb-14"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.48 },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              <div className="flex flex-wrap gap-x-[0.22em] text-hero-size">
                {words2.map((word, i) => (
                  <div key={i}>
                    <motion.span
                      className="block font-display font-light italic text-hero-size"
                      style={{ color: "var(--color-accent)" }}
                      variants={wordReveal}
                    >
                      {word}
                    </motion.span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              className="text-base md:text-lg font-light leading-relaxed max-w-xl mb-10 md:mb-14 text-balance"
              style={{ color: "rgba(255,255,255,0.75)" }}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.85, ease: EASE_OUT }}
            >
              {tr.hero.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05, ease: EASE_OUT }}
            >
              <MagneticButton
                as="button"
                onClick={() => scrollTo("kontakt")}
                className="inline-flex items-center gap-3 px-7 py-4 text-sm font-medium tracking-[0.06em] uppercase bg-white text-black transition-colors duration-300 hover:bg-accent hover:text-white"
              >
                {tr.hero.cta1}
                <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                  <path
                    d="M0 4H14M11 1l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </MagneticButton>

              <MagneticButton
                as="button"
                onClick={() => scrollTo("prosjekter")}
                className="inline-flex items-center gap-2 px-7 py-4 text-sm font-medium tracking-[0.06em] uppercase border transition-all duration-300 hover:border-white hover:text-white"
                style={{ borderColor: "rgba(255,255,255,0.4)", color: "rgba(255,255,255,0.85)" }}
              >
                {tr.hero.cta2}
              </MagneticButton>
            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* ── Stats row ─────────────────────────────────── */}
      <motion.div
        className="container-site pb-8 md:pb-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.25, ease: EASE_OUT }}
        style={{ opacity: statsOpacity, y: statsY, position: "relative", zIndex: 3 }}
      >
        <div
          className="grid grid-cols-2 md:grid-cols-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.15)" }}
        >
          {tr.hero.stats.map((stat, i) => (
            <div
              key={i}
              className="pt-6 pb-2 pr-6"
              style={{
                borderRight:
                  i < 3 ? "1px solid rgba(255,255,255,0.15)" : "none",
              }}
            >
              <p className="text-2xl md:text-3xl font-display font-medium mb-1" style={{ color: "white" }}>
                {stat.value}
              </p>
              <p
                className="text-xs font-medium tracking-wide"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
