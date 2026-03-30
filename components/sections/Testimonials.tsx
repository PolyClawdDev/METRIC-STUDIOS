"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const SLIDE_DURATION = 8000;

const testimonials = [
  {
    quote:
      "Nettsiden vi fikk er ikke bare vakker — den genererer faktisk leads. Vi har doblet antall henvendelser siden lansering, og Google-rangeringen vår har aldri vært bedre.",
    author: "Morten Hansen",
    role: "Daglig leder",
    company: "Bergmann Bygg",
    initials: "MH",
  },
  {
    quote:
      "Endelig et byrå som forstår at design og SEO henger uløselig sammen. Vi er nå #1 på Google for de viktigste lokale søkene. Det er resultater som faktisk betyr noe.",
    author: "Lena Nordvik",
    role: "Partner",
    company: "Nordvik Eiendom",
    initials: "LN",
  },
  {
    quote:
      "Profesjonell, presis og leverte langt over forventningene. Vår digitale tilstedeværelse er fullstendig transformert. Vi ser mer seriøse ut, og kundene merker det.",
    author: "Thomas Solberg",
    role: "Klinikksjef",
    company: "Solberg Klinikk",
    initials: "TS",
  },
  {
    quote:
      "Metrics Studios leverte en komplett digital løsning som langt oversteg forventningene. Trafikken økte med 180% på tre måneder. Kan ikke anbefale dem nok.",
    author: "Kristoffer Aaberg",
    role: "Daglig leder",
    company: "Aaberg Rørlegger",
    initials: "KA",
  },
  {
    quote:
      "Endelig en nettside som faktisk ser ut som merkevaren vi vil være. Responstiden er blant de raskeste jeg har opplevd — og resultatet er rett og slett imponerende.",
    author: "Silje Magnusson",
    role: "Gründer",
    company: "Magnusson Interiør",
    initials: "SM",
  },
  {
    quote:
      "Vi hadde prøvd to andre byråer uten særlige resultater. Metrics Studios forstod umiddelbart hva vi trengte og leverte en løsning som faktisk konverterer besøkende til klienter.",
    author: "Anders Bakken",
    role: "Partner",
    company: "Bakken Advokater",
    initials: "AB",
  },
  {
    quote:
      "Bookingene våre økte med 60% etter lansering. Nettsiden ser ekstremt profesjonell ut, og vi dukker nå opp øverst på Google lokalt. Utrolig god investering.",
    author: "Hanne Eriksen",
    role: "Eier",
    company: "Eriksen Frisørsalong",
    initials: "HE",
  },
  {
    quote:
      "Jeg var skeptisk til digital markedsføring, men Metrics Studios beviste at det virker. Nye kunder finner oss nå via Google daglig — noe vi aldri hadde opplevd før.",
    author: "Ole Martin Haugen",
    role: "Daglig leder",
    company: "Haugen Transport",
    initials: "OH",
  },
  {
    quote:
      "Grundig, strukturert og med blikk for detaljer. De leverte ikke bare en nettside — de bygde et digitalt fundament vi kan vokse på. Imponerende håndverk.",
    author: "Vibeke Lund",
    role: "Regnskapssjef",
    company: "Lund Regnskapskontor",
    initials: "VL",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  const goTo = useCallback((idx: number) => {
    setCurrent((idx + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance via simple setTimeout — restarts cleanly on each slide
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(next, SLIDE_DURATION);
    return () => clearTimeout(id);
  }, [current, paused, next]);

  const t = testimonials[current];

  return (
    <section
      className="section-gap relative overflow-hidden"
      style={{ backgroundColor: "var(--color-dark)" }}
      ref={ref}
    >
      {/* Progress bar — thin line at very top, resets per slide via key */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-20"
        style={{ backgroundColor: "var(--color-dark-border)" }}
      >
        <div
          key={current}
          className={`h-full testimony-progress${paused ? " paused" : ""}`}
          style={{
            backgroundColor: "var(--color-accent)",
            "--progress-duration": `${SLIDE_DURATION}ms`,
          } as React.CSSProperties}
        />
      </div>

      <div className="container-site">
        {/* Header row */}
        <div className="flex items-end justify-between mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="label label-dark mb-4">Kunder</p>
            <h2 className="text-display-size font-display font-light text-white">
              Hva de sier.
            </h2>
          </motion.div>

          {/* Counter + arrows */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span
              className="text-[0.65rem] font-medium tracking-[0.14em] uppercase tabular-nums hidden sm:block"
              style={{ color: "var(--color-dark-border)" }}
            >
              {String(current + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(total).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              {[
                { label: "Forrige", action: prev, d: "M14 5H0M4 1L0 5l4 4", vb: "0 0 14 10" },
                { label: "Neste",   action: next, d: "M0 5h14M10 1l4 4-4 4", vb: "0 0 14 10" },
              ].map(({ label, action, d, vb }) => (
                <button
                  key={label}
                  onClick={action}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center border transition-all duration-300 hover:border-white/30 hover:bg-white/5"
                  style={{ borderColor: "var(--color-dark-border)" }}
                >
                  <svg width="14" height="10" viewBox={vb} fill="none">
                    <path d={d} stroke="var(--color-text-subtle)" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Carousel body */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center max-w-4xl mx-auto"
            >
              {/* Stars */}
              <div className="flex gap-1.5 mb-10">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 1.5l1.8 3.6 4 .58-2.9 2.83.68 4L8 10.35 4.42 12.5l.68-4L2.2 5.68l4-.58L8 1.5z"
                      fill="var(--color-accent)"
                    />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p
                className="font-display font-light italic leading-relaxed mb-12"
                style={{
                  fontSize: "clamp(1.35rem, 2.5vw, 2rem)",
                  color: "rgba(255,255,255,0.90)",
                  letterSpacing: "-0.01em",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Divider */}
              <div
                className="w-8 h-px mb-10"
                style={{ backgroundColor: "var(--color-accent)" }}
              />

              {/* Author */}
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{t.author}</p>
                  <p
                    className="text-xs mt-0.5 tracking-wide"
                    style={{ color: "var(--color-text-subtle)" }}
                  >
                    {t.role}&nbsp;·&nbsp;{t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Dot navigation */}
        <motion.div
          className="flex justify-center gap-2 mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Gå til anmeldelse ${i + 1}`}
              className="transition-all duration-500"
              style={{
                height: 4,
                width: i === current ? 28 : 4,
                borderRadius: 2,
                backgroundColor:
                  i === current
                    ? "var(--color-accent)"
                    : "var(--color-dark-border)",
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
