import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { APP_HTML } from "@/legacy/markup";
import "@/legacy/legacy.css";

const TAILWIND_CONFIG = `tailwind.config = {
  theme: {
    extend: {
      colors: {
        'cyber-gold': '#FFD700',
        'cyber-gold-dim': '#C5A000',
        'cyber-dark': '#050b14',
        'cyber-blue': '#00F0FF',
        'glass-bg': 'rgba(16, 24, 39, 0.7)',
        'glass-border': 'rgba(255, 215, 0, 0.15)',
      },
      fontFamily: { sans: ['IBM Plex Sans Arabic', 'sans-serif'] },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s infinite',
        'grid-move': 'gridMove 20s linear infinite',
        'scanline': 'scanline 8s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        pulseGlow: {
          '0%, 100%': { opacity: 1, filter: 'drop-shadow(0 0 5px rgba(255,215,0,0.5))' },
          '50%': { opacity: 0.7, filter: 'drop-shadow(0 0 15px rgba(255,215,0,0.8))' },
        },
        gridMove: { '0%': { backgroundPosition: '0 0' }, '100%': { backgroundPosition: '0 100px' } },
        scanline: { '0%': { top: '-10%' }, '100%': { top: '110%' } },
        fadeIn: { '0%': { opacity: 0, transform: 'scale(0.95)' }, '100%': { opacity: 1, transform: 'scale(1)' } },
      },
    },
  },
}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "فرعون Ai - تعلّم الأمن السيبراني بالعربية" },
      {
        name: "description",
        content:
          "منصة فرعون Ai التفاعلية لتعلّم الأمن السيبراني بالعربية: مسارات متدرجة، معامل عملية، واختبارات لكل درس.",
      },
      { property: "og:title", content: "فرعون Ai - تعلّم الأمن السيبراني بالعربية" },
      {
        property: "og:description",
        content: "مسارات متدرجة ومعامل عملية تفاعلية لتعلّم الأمن السيبراني بالعربية.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;500;700;900&display=swap",
      },
    ],
    scripts: [{ src: "https://cdn.tailwindcss.com" }, { children: TAILWIND_CONFIG }],
  }),
  component: Index,
});

function Index() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    document.body.classList.add("antialiased", "pharaoh-body");

    let cancelled = false;
    void (async () => {
      const { bootPharaoh } = await import("@/legacy/engine");
      if (!cancelled) bootPharaoh();
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return <div ref={hostRef} dangerouslySetInnerHTML={{ __html: APP_HTML }} />;
}