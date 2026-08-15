import { createFileRoute, Link } from "@tanstack/react-router";

import { PROGRAM, TOTAL_HOURS, TOTAL_WEEKS } from "@/lib/courses";
import { PATH_LABELS } from "@/lib/products";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "كورسات أمن سيبراني عملية من الصفر — 24 أسبوعًا | فرعون Ai" },
      {
        name: "description",
        content:
          "برنامج عملي أسبوعي لتعلّم الأمن السيبراني من الصفر: معمل منزلي، تمارين حقيقية، مصادر مجانية، وتسليم عملي كل أسبوع حتى مستوى قابل للتوظيف.",
      },
      { property: "og:title", content: "كورسات أمن سيبراني عملية من الصفر — 24 أسبوعًا" },
      {
        property: "og:description",
        content: "24 أسبوعًا بمعامل وتسليمات حقيقية تنقلك من الصفر إلى وظيفة في الأمن السيبراني.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Courses,
});

function Courses() {
  return (
    <div dir="rtl" className="min-h-screen bg-cyber-dark px-4 py-10 text-foreground">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="text-sm text-cyber-blue hover:underline">
          ← رجوع للتطبيق
        </Link>

        <h1 className="mt-6 text-3xl font-black text-cyber-gold md:text-4xl">
          كورسات عملية — من الصفر إلى محترف في {TOTAL_WEEKS} أسبوعًا
        </h1>
        <p className="mt-3 leading-8 text-muted-foreground">
          كل أسبوع له هدف واحد، معمل تنفّذه بيدك، مصدر مجاني موثوق، وتسليم يدخل ملفك المهني. مجموع
          الجهد ≈ {TOTAL_HOURS} ساعة عمل حقيقي — بمعدل 8 ساعات أسبوعيًا تنهيه في ستة أشهر.
        </p>

        <div className="mt-10 space-y-10">
          {PROGRAM.map((term) => (
            <section key={term.id}>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold text-cyber-gold">{term.title}</h2>
                <span className="text-xs text-cyber-blue">{PATH_LABELS[term.pathId]}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{term.subtitle}</p>

              <div className="mt-4 space-y-4">
                {term.weeks.map((w) => (
                  <article
                    key={w.week}
                    className="rounded-xl border border-cyber-blue/20 bg-black/40 p-5"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-bold text-foreground">
                        <span className="text-cyber-blue">أسبوع {w.week}</span> — {w.title}
                      </h3>
                      <span className="text-xs text-muted-foreground">{w.hours} ساعات</span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{w.goal}</p>
                    <dl className="mt-3 space-y-2 text-sm leading-7">
                      <div>
                        <dt className="inline font-bold text-cyber-gold">المعمل: </dt>
                        <dd className="inline text-muted-foreground">{w.lab}</dd>
                      </div>
                      <div>
                        <dt className="inline font-bold text-cyber-gold">المصدر: </dt>
                        <dd className="inline text-muted-foreground">{w.resource}</dd>
                      </div>
                      <div>
                        <dt className="inline font-bold text-cyber-gold">التسليم: </dt>
                        <dd className="inline text-muted-foreground">{w.deliverable}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-cyber-gold/30 bg-cyber-gold/5 p-6 text-center">
          <p className="leading-8 text-muted-foreground">
            نفّذ أسبوعًا واحدًا فقط الآن — ثم تابع تقدّمك داخل التطبيق.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link to="/" className="rounded-full bg-cyber-gold px-5 py-2 font-bold text-cyber-dark">
              ابدأ التعلّم
            </Link>
            <Link
              to="/roadmap"
              className="rounded-full border border-cyber-blue/50 px-5 py-2 font-bold text-cyber-blue"
            >
              خطة المراحل
            </Link>
            <Link
              to="/progress"
              className="rounded-full border border-cyber-blue/50 px-5 py-2 font-bold text-cyber-blue"
            >
              لوحة تقدّمي
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
