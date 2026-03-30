"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollUp() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollUp}
          aria-label="Tilbake til toppen"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-6 left-6 z-[9989] flex flex-col items-center gap-1.5 group"
          style={{ cursor: "none" }}
        >
          <div
            className="w-11 h-11 flex items-center justify-center border transition-all duration-300 group-hover:border-foreground"
            style={{
              backgroundColor: "var(--color-background)",
              borderColor: "var(--color-border)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            }}
          >
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <path
                d="M6 13V1M1 6l5-5 5 5"
                stroke="var(--color-foreground)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className="text-[0.58rem] font-medium tracking-[0.12em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ color: "var(--color-text-muted)" }}
          >
            Topp
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
