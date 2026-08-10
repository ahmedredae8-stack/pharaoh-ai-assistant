import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { APP_HTML } from "@/legacy/markup";
import "@/legacy/legacy.css";

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