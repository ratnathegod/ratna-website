"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

const links = [
  { icon: Mail, href: "mailto:placeholder@example.com", label: "Email" },
  { icon: Github, href: "https://github.com/ratnathegod", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com", label: "LinkedIn" },
  { icon: FileText, href: "#", label: "Resume" },
];

export function FloatingDock() {
  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
      aria-label="Social links"
    >
      <div className="flex items-center gap-1 rounded-2xl border border-white/[0.08] bg-[#0c0d12]/80 px-2 py-2 shadow-2xl shadow-black/60 backdrop-blur-2xl">
        {links.map(({ icon: Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            aria-label={label}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 hover:bg-white/[0.08]"
          >
            <Icon className="h-[18px] w-[18px] text-white/40 transition-colors duration-200 group-hover:text-white/90" />
            <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-lg border border-white/[0.06] bg-[#0e1018]/90 px-2.5 py-1 text-[11px] text-white/70 opacity-0 shadow-xl backdrop-blur-sm transition-all duration-200 group-hover:-top-11 group-hover:opacity-100">
              {label}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
}
