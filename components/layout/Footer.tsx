"use client";

import Link from "next/link";
import Image from "next/image";
import { scrollTo } from "@/lib/scrollTo";

function ScrollUpButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Tilbake til toppen"
      className="group flex items-center gap-2 px-4 py-2 border transition-all duration-300 hover:border-white/30 hover:bg-white/5"
      style={{ borderColor: "var(--color-dark-border)", cursor: "none" }}
    >
      <span className="text-[0.65rem] font-medium tracking-[0.12em] uppercase transition-colors duration-300 group-hover:text-white"
        style={{ color: "var(--color-text-subtle)" }}>
        Tilbake til toppen
      </span>
      <svg
        width="10" height="12" viewBox="0 0 10 12" fill="none"
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        <path d="M5 11V1M1 5l4-4 4 4"
          stroke="currentColor" strokeWidth="1.4"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ color: "var(--color-text-subtle)" }}
        />
      </svg>
    </button>
  );
}

const footerLinks = [
  { label: "Tjenester", id: "tjenester" },
  { label: "Prosjekter", id: "prosjekter" },
  { label: "Prosessen", id: "prosessen" },
  { label: "Kontakt", id: "kontakt" },
];

const services = [
  "Webdesign & Utvikling",
  "Søkemotoroptimalisering",
  "Google Business Profile",
  "Digital Markedsføring",
  "Leadgenerering",
  "Annonsering",
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--color-dark)", color: "white" }}>
      <div className="container-site py-20">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b"
          style={{ borderColor: "var(--color-dark-border)" }}>

          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block mb-4 group">
              <Image
                src="/LOGO3.png"
                alt="Metrics Studios"
                width={280}
                height={80}
                className="h-16 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
                style={{ mixBlendMode: "lighten" }}
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs"
              style={{ color: "var(--color-text-subtle)" }}>
              Digitale løsninger for bedrifter som vil vokse. Premium nettsider, SEO og markedsføring.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2 md:col-start-6">
            <p className="text-[0.65rem] font-medium tracking-[0.14em] uppercase mb-5"
              style={{ color: "var(--color-text-subtle)" }}>
              Navigasjon
            </p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm transition-colors duration-300 hover:text-white"
                    style={{ color: "var(--color-text-subtle)" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <p className="text-[0.65rem] font-medium tracking-[0.14em] uppercase mb-5"
              style={{ color: "var(--color-text-subtle)" }}>
              Tjenester
            </p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}
                  className="text-sm"
                  style={{ color: "var(--color-text-subtle)" }}>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="text-[0.65rem] font-medium tracking-[0.14em] uppercase mb-5"
              style={{ color: "var(--color-text-subtle)" }}>
              Kontakt
            </p>

            {/* Person */}
            <div className="mb-5 pb-5 border-b" style={{ borderColor: "var(--color-dark-border)" }}>
              <p className="text-sm font-medium text-white mb-0.5">Daniel Christiansson</p>
              <p className="text-xs mb-3" style={{ color: "var(--color-text-subtle)" }}>
                Daglig Leder
              </p>
              <a
                href="tel:+4746584867"
                className="text-sm block mb-1.5 hover:text-white transition-colors duration-300"
                style={{ color: "var(--color-text-subtle)" }}>
                +47 465 84 867
              </a>
              <a
                href="mailto:post@metricstudios.no"
                className="text-sm block hover:text-white transition-colors duration-300"
                style={{ color: "var(--color-text-subtle)" }}>
                post@metricstudios.no
              </a>
            </div>

            <div>
              <p className="text-[0.65rem] font-medium tracking-[0.14em] uppercase mb-2"
                style={{ color: "var(--color-text-subtle)" }}>
                Hovedkontor
              </p>
              <p className="text-sm" style={{ color: "var(--color-text-subtle)" }}>
                Prinsensgate 8<br />
                0152 Oslo<br />
                Norge
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8">
          <p className="text-xs" style={{ color: "var(--color-text-subtle)" }}>
            © 2025 Metrics Studios. Alle rettigheter forbeholdt.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-xs" style={{ color: "var(--color-dark-border)" }}>
              Designet & utviklet med presisjon.
            </p>
            <ScrollUpButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
