"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { scrollTo } from "@/lib/scrollTo";
import { useLang } from "@/contexts/LanguageContext";

function LangSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-[0.65rem] font-medium tracking-[0.1em] uppercase border transition-all duration-300 hover:border-foreground"
        style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
        aria-label="Change language"
      >
        <span>{lang === "no" ? "🇳🇴" : "🇬🇧"}</span>
        <span>{lang.toUpperCase()}</span>
        <svg
          width="8" height="5" viewBox="0 0 8 5" fill="none"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-full mt-1 w-32 border shadow-sm overflow-hidden z-50"
            style={{ backgroundColor: "var(--color-background)", borderColor: "var(--color-border)" }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {(["no", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setOpen(false); }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[0.65rem] font-medium tracking-[0.1em] uppercase transition-colors duration-200 hover:bg-muted text-left"
                style={{
                  color: lang === l ? "var(--color-foreground)" : "var(--color-text-muted)",
                  backgroundColor: lang === l ? "var(--color-muted)" : "transparent",
                }}
              >
                <span>{l === "no" ? "🇳🇴" : "🇬🇧"}</span>
                <span>{l === "no" ? "Norsk" : "English"}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const { tr } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: tr.nav.services, id: "tjenester" },
    { label: tr.nav.projects, id: "prosjekter" },
    { label: tr.nav.process, id: "prosessen" },
    { label: tr.nav.contact, id: "kontakt" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backgroundColor: scrolled ? "rgba(250,250,248,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        }}
      >
        <div className="container-site flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/LOGO1.png"
              alt="Metrics Studios"
              width={220}
              height={60}
              className="h-14 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-xs font-medium tracking-[0.08em] uppercase text-text-muted hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-3">
            <LangSwitcher />
            <button
              onClick={() => scrollTo("kontakt")}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium tracking-[0.08em] uppercase bg-foreground text-background hover:bg-accent transition-colors duration-300"
            >
              {tr.nav.cta}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Meny"
          >
            <motion.span
              className="block h-px w-6 bg-foreground origin-center"
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-px w-6 bg-foreground"
              animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-px w-6 bg-foreground origin-center"
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: "var(--color-background)" }}
          >
            <div className="container-site flex flex-col justify-center h-full gap-8 pb-20">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    onClick={() => { scrollTo(link.id); setMenuOpen(false); }}
                    className="text-4xl font-display font-light text-foreground hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <button
                  onClick={() => { scrollTo("kontakt"); setMenuOpen(false); }}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-foreground text-background hover:bg-accent transition-colors duration-300"
                >
                  {tr.nav.cta}
                </button>
                <LangSwitcher />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
