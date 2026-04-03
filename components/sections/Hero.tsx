"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { EASE_OUT, staggerContainer, wordReveal } from "@/lib/animation";
import { scrollTo } from "@/lib/scrollTo";
import { useLang } from "@/contexts/LanguageContext";

export default function Hero() {
  const { tr } = useLang();
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
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Aurora blob — top right */}
      <motion.div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={{
          width: "55vw",
          height: "55vw",
          background:
            "radial-gradient(circle, rgba(28,56,41,0.10) 0%, transparent 65%)",
          top: "-15%",
          right: "-8%",
          filter: "blur(72px)",
        }}
        animate={{ x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Aurora blob — bottom left */}
      <motion.div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={{
          width: "40vw",
          height: "40vw",
          background:
            "radial-gradient(circle, rgba(28,56,41,0.06) 0%, transparent 70%)",
          bottom: "5%",
          left: "-6%",
          filter: "blur(90px)",
        }}
        animate={{ x: [0, 30, 0], y: [0, -25, 0], scale: [1, 1.1, 1] }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      />

      {/* Aurora blob — center accent */}
      <motion.div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={{
          width: "30vw",
          height: "30vw",
          background:
            "radial-gradient(circle, rgba(28,56,41,0.04) 0%, transparent 70%)",
          top: "40%",
          left: "30%",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Subtle bottom vignette */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-background))",
        }}
      />

      <motion.div
        className="container-site flex-1 flex flex-col justify-center pt-20 relative z-10"
        style={{ y, opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* ── Text content ─────────────────────────── */}
          <div className="lg:col-span-7 xl:col-span-6">
            {/* Label */}
            <motion.div
              className="label mb-8 md:mb-10"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
            >
              Metrics Studios
            </motion.div>

            {/* Headline */}
            <motion.div
              className="mb-10 md:mb-12"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <h1 className="m-0 font-normal">
                <span className="block overflow-hidden pb-[0.12em]">
                  <motion.span
                    className="block font-display font-light text-hero-size text-foreground tracking-tight text-balance"
                    variants={wordReveal}
                  >
                    {tr.hero.titleLine1}
                  </motion.span>
                </span>
                <span className="block overflow-hidden mt-1 md:mt-2 pb-[0.2em]">
                  <motion.span
                    className="block font-display font-light italic text-hero-size tracking-tight text-balance"
                    style={{ color: "var(--color-accent)" }}
                    variants={wordReveal}
                  >
                    {tr.hero.titleLine2}
                  </motion.span>
                </span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              className="text-base md:text-lg font-light leading-relaxed max-w-2xl mb-10 md:mb-14 text-balance"
              style={{ color: "var(--color-text-muted)" }}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.55, ease: EASE_OUT }}
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
                className="inline-flex items-center gap-3 px-7 py-4 text-sm font-medium tracking-[0.06em] uppercase bg-foreground text-background transition-colors duration-300 hover:bg-accent"
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
                className="inline-flex items-center gap-2 px-7 py-4 text-sm font-medium tracking-[0.06em] uppercase border transition-all duration-300"
                style={
                  {
                    borderColor: "var(--color-border)",
                    color: "var(--color-foreground)",
                  } as React.CSSProperties
                }
              >
                {tr.hero.cta2}
              </MagneticButton>
            </motion.div>
          </div>

          {/* ── Hero visual ───────────────────────────── */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6">
            <HeroVisual />
          </div>
        </div>
      </motion.div>

      {/* ── Stats row ─────────────────────────────────── */}
      <motion.div
        className="container-site pb-8 md:pb-10 relative z-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.25, ease: EASE_OUT }}
        style={{ opacity: statsOpacity, y: statsY }}
      >
        <div
          className="grid grid-cols-2 md:grid-cols-4 border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          {tr.hero.stats.map((stat, i) => (
            <div
              key={i}
              className="pt-6 pb-2 pr-6"
              style={{
                borderRight:
                  i < 3 ? "1px solid var(--color-border)" : "none",
              }}
            >
              <p className="text-2xl md:text-3xl font-display font-medium text-foreground mb-1">
                {stat.value}
              </p>
              <p
                className="text-xs font-medium tracking-wide"
                style={{ color: "var(--color-text-muted)" }}
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

function HeroVisual() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 20 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [6, -6]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-6, 6]),
    springConfig
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      className="relative aspect-[4/5] max-w-lg ml-auto"
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.3, delay: 0.5, ease: EASE_OUT }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 900 }}
    >
      <motion.div
        className="w-full h-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Browser chrome mockup */}
        <motion.div
          className="absolute inset-0 overflow-hidden border rounded-sm"
          style={{
            backgroundColor: "var(--color-muted)",
            borderColor: "var(--color-border)",
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Browser chrome header */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b"
            style={{
              backgroundColor: "var(--color-background)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="flex gap-1.5">
              {[0, 1, 2].map((dot) => (
                <div
                  key={dot}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: "var(--color-muted-2)" }}
                />
              ))}
            </div>
            <div
              className="flex-1 h-5 rounded-sm mx-4"
              style={{ backgroundColor: "var(--color-muted-2)" }}
            />
          </div>

          {/* Website content mockup */}
          <div className="p-5 space-y-4">
            {/* Nav */}
            <div className="flex justify-between items-center mb-6">
              <div
                className="w-16 h-3 rounded-sm"
                style={{ backgroundColor: "var(--color-foreground)" }}
              />
              <div className="flex gap-3">
                {[48, 40, 36].map((w, i) => (
                  <div
                    key={i}
                    className="h-2 rounded-sm"
                    style={{
                      width: w,
                      backgroundColor: "var(--color-border-strong)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Hero text blocks */}
            <motion.div
              className="space-y-2 mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <div
                className="h-7 w-4/5 rounded-sm"
                style={{ backgroundColor: "var(--color-foreground)" }}
              />
              <div
                className="h-7 w-3/5 rounded-sm"
                style={{ backgroundColor: "var(--color-accent)" }}
              />
              <div
                className="h-3 w-full rounded-sm mt-3"
                style={{ backgroundColor: "var(--color-border)" }}
              />
              <div
                className="h-3 w-5/6 rounded-sm"
                style={{ backgroundColor: "var(--color-border)" }}
              />
            </motion.div>

            {/* CTA buttons mockup */}
            <motion.div
              className="flex gap-3 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              <div
                className="h-8 w-28 rounded-sm"
                style={{ backgroundColor: "var(--color-foreground)" }}
              />
              <div
                className="h-8 w-24 rounded-sm border"
                style={{ borderColor: "var(--color-border-strong)" }}
              />
            </motion.div>

            {/* Service card grid */}
            <motion.div
              className="grid grid-cols-2 gap-2.5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              {[
                { accent: false, h: 60 },
                { accent: true, h: 80 },
                { accent: true, h: 80 },
                { accent: false, h: 60 },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  className="rounded-sm p-3"
                  style={{
                    backgroundColor: card.accent
                      ? "var(--color-accent)"
                      : "var(--color-background)",
                    border: `1px solid var(--color-border)`,
                    height: card.h,
                  }}
                  animate={{ y: [0, i % 2 === 0 ? -4 : 4, 0] }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                >
                  <div
                    className="w-6 h-1.5 rounded-sm mb-2"
                    style={{
                      backgroundColor: card.accent
                        ? "rgba(255,255,255,0.4)"
                        : "var(--color-border-strong)",
                    }}
                  />
                  <div
                    className="w-full h-1.5 rounded-sm mb-1"
                    style={{
                      backgroundColor: card.accent
                        ? "rgba(255,255,255,0.2)"
                        : "var(--color-border)",
                    }}
                  />
                  <div
                    className="w-4/5 h-1.5 rounded-sm"
                    style={{
                      backgroundColor: card.accent
                        ? "rgba(255,255,255,0.15)"
                        : "var(--color-border)",
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Floating accent rectangles */}
        <motion.div
          className="absolute -top-4 -right-4 w-20 h-20 rounded-sm pointer-events-none"
          style={{ backgroundColor: "var(--color-accent)", opacity: 0.12 }}
          animate={{ rotate: [0, 6, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-6 -left-6 w-32 h-12 rounded-sm pointer-events-none"
          style={{ backgroundColor: "var(--color-accent)", opacity: 0.07 }}
          animate={{ rotate: [0, -3, 0], scale: [1, 1.05, 1] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Glow ring */}
        <motion.div
          className="absolute -inset-2 rounded-sm pointer-events-none"
          style={{
            boxShadow: "0 0 60px 10px rgba(28,56,41,0.06)",
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
