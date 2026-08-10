import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "فرعون Ai - بروتوكول الدفاع السيبراني" },
      {
        name: "description",
        content: "منصة فرعون Ai التعليمية لتعلم الأمن السيبراني بالعربية عبر مسارات ودروس تفاعلية.",
      },
      { property: "og:title", content: "فرعون Ai - بروتوكول الدفاع السيبراني" },
      {
        property: "og:description",
        content: "منصة فرعون Ai التعليمية لتعلم الأمن السيبراني بالعربية عبر مسارات ودروس تفاعلية.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/pharaoh/index.html"
      title="فرعون Ai"
      className="fixed inset-0 h-full w-full border-0"
    />
  );
}
