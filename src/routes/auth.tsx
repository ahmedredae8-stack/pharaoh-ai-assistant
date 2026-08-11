import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";

type AuthSearch = { redirect?: string | undefined };

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): AuthSearch => ({
    redirect: typeof search["redirect"] === "string" ? search["redirect"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "تسجيل الدخول - فرعون Ai" },
      {
        name: "description",
        content: "سجّل الدخول لحفظ تقدّمك في فرعون Ai على السحابة والوصول لاشتراكك من أي جهاز.",
      },
      { property: "og:title", content: "تسجيل الدخول - فرعون Ai" },
      {
        property: "og:description",
        content: "احفظ تقدّمك واستعد اشتراكك على أي جهاز في منصة فرعون Ai.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function safeRedirect(value: string | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

function AuthPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/auth" });
  const destination = safeRedirect(search.redirect);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  }, []);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") void navigate({ to: destination });
    });
    return () => data.subscription.unsubscribe();
  }, [destination, navigate]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}${destination}` },
        });
        if (error) throw error;
        if (!data.session) {
          toast.success("تم إنشاء الحساب. تفقّد بريدك لتأكيد التسجيل.");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "تعذّر إتمام العملية");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    setBusy(true);
    try {
      sessionStorage.setItem("pharaoh:after-auth", destination);
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error("تعذّر تسجيل الدخول عبر Google");
        return;
      }
      if (result.redirected) return;
      void navigate({ to: destination });
    } finally {
      setBusy(false);
    }
  }

  return (
    <main dir="rtl" className="flex min-h-screen items-center justify-center bg-cyber-dark px-4">
      <div className="w-full max-w-sm rounded-2xl border border-cyber-gold/25 bg-black/40 p-6">
        <h1 className="text-center text-2xl font-bold text-cyber-gold">فرعون Ai</h1>
        <p className="mt-1 text-center text-sm text-slate-400">
          {mode === "signin" ? "سجّل الدخول لحفظ تقدّمك" : "أنشئ حسابًا جديدًا"}
        </p>

        <button
          onClick={() => void google()}
          disabled={busy}
          className="mt-6 w-full rounded-xl border border-cyber-blue/40 bg-cyber-blue/10 px-4 py-3 text-sm font-bold text-cyber-blue disabled:opacity-50"
        >
          المتابعة باستخدام Google
        </button>

        <div className="my-4 text-center text-xs text-slate-500">أو</div>

        <form onSubmit={submit} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="البريد الإلكتروني"
            className="w-full rounded-xl border border-cyber-gold/20 bg-black/40 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyber-gold/60"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة المرور"
            className="w-full rounded-xl border border-cyber-gold/20 bg-black/40 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyber-gold/60"
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-cyber-gold px-4 py-3 text-sm font-bold text-cyber-dark disabled:opacity-50"
          >
            {mode === "signin" ? "دخول" : "إنشاء حساب"}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-xs">
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-cyber-blue underline"
          >
            {mode === "signin" ? "ليس لديك حساب؟ سجّل الآن" : "لديك حساب؟ سجّل الدخول"}
          </button>
          <a href="/" className="text-slate-400 hover:text-slate-200">
            المتابعة كضيف
          </a>
        </div>
      </div>
    </main>
  );
}