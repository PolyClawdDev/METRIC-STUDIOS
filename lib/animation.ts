import type { Variants, Transition } from "framer-motion";

// Typed cubic-bezier easings
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.87, 0, 0.13, 1];

export const transition = (delay = 0, duration = 0.8): Transition => ({
  duration,
  delay,
  ease: EASE_OUT,
});

// Stagger container
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

// Word/line reveal (clips upward with blur)
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "110%", skewY: 3, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: "0%",
    skewY: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

// Standard fade up
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

// Card / item reveal
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_OUT } },
};
