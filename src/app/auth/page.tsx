"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import clsx from "clsx";

type AuthMode = "login" | "register";

export default function AuthPage() {
  const { t, isArabic, L } = useLang();
  const { user, login, register } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "resident" as string });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "register") {
      if (form.password !== form.confirmPassword) {
        setError(L("Les mots de passe ne correspondent pas","كلمتا المرور غير متطابقتين"));
        return;
      }
      if (form.password.length < 6) {
        setError(L("Le mot de passe doit contenir au moins 6 caractères","كلمة المرور 6 أحرف على الأقل"));
        return;
      }
      const result = await register(form.name, form.email, form.password, form.role as any);
      if (!result.ok) { setError(result.error || ""); return; }
    } else {
      const result = await login(form.email, form.password);
      if (!result.ok) { setError(result.error || ""); return; }
    }
    setSubmitted(true);
  };

  const handleGoogleLogin = async () => {
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: typeof window !== "undefined" ? `${window.location.origin}/dashboard` : "/dashboard",
      },
    });
    if (error) setError(error.message);
  };

  const roles = [
    { key: "resident", label: t.resident, icon: "👤" },
    { key: "merchant", label: t.merchant, icon: "🏪" },
    { key: "artisan", label: t.artisanUser, icon: "🔧" },
    { key: "jobseeker", label: t.jobseeker, icon: "💼" },
    { key: "employer", label: t.employer, icon: "🏢" },
  ];

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center bg-white rounded-2xl border border-emerald-100 card-shadow p-10 max-w-md">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <h2 className="text-xl font-bold text-navy-800 mb-2">{t.welcomeBack} !</h2>
          <p className="text-navy-500 mb-4">{ L("Connexion réussie","تم تسجيل الدخول بنجاح") }</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
          >
            {t.dashboard}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl gradient-marrakesh flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-xl">EM</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-800">
            {mode === "login" ? t.loginTitle : t.registerTitle}
          </h1>
        </div>

        <div className="bg-white rounded-2xl border border-emerald-100 card-shadow p-6">
          <div className="flex bg-navy-50 rounded-lg p-1 mb-6">
            <button
              onClick={() => { setMode("login"); setError(""); }}
              className={clsx("flex-1 py-2 rounded-md text-sm font-medium transition-colors", mode === "login" ? "bg-white text-navy-800 shadow" : "text-navy-500")}
            >
              {t.login}
            </button>
            <button
              onClick={() => { setMode("register"); setError(""); }}
              className={clsx("flex-1 py-2 rounded-md text-sm font-medium transition-colors", mode === "register" ? "bg-white text-navy-800 shadow" : "text-navy-500")}
            >
              {t.register}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">{t.nameLabel}</label>
                  <input
                    required type="text" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm"
                    placeholder={ L("Mohamed Amine","محمد أمين") }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-2">{t.roleLabel}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {roles.map((r) => (
                      <button
                        key={r.key}
                        type="button"
                        onClick={() => setForm({ ...form, role: r.key })}
                        className={clsx(
                          "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors border",
                          form.role === r.key
                            ? "bg-primary-50 border-primary-300 text-primary-700"
                            : "bg-navy-50 border-emerald-200 text-navy-600 hover:bg-navy-50"
                        )}
                      >
                        <span>{r.icon}</span>
                        <span className="truncate">{r.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">{t.emailLabel}</label>
              <input
                required type="email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">{t.passwordLabel}</label>
              <input
                required type="password" value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm"
              />
            </div>

            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">{t.confirmPassword}</label>
                <input
                  required type="password" value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm"
                />
              </div>
            )}

            <button type="submit" className="w-full py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors">
              {mode === "login" ? t.login : t.register}
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-emerald-100"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-navy-400 uppercase tracking-wide">{ L("Ou","أو") }</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-emerald-200 bg-white text-navy-700 font-medium hover:bg-navy-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              { L("Continuer avec Google","المتابعة مع Google") }
            </button>
          </form>

          {mode === "login" && (
            <div className="mt-4 p-3 rounded-lg bg-navy-50 text-xs text-navy-500">
              <p className="font-medium text-navy-700 mb-1">
                { L("Compte admin par défaut :","حساب المدير الافتراضي:") }
              </p>
              <p>Email: <span className="font-mono text-primary-600">admin@espace-marrakesh.ma</span></p>
              <p>Mot de passe: <span className="font-mono text-primary-600">admin123</span></p>
            </div>
          )}

          <div className="text-center mt-4 text-sm text-navy-500">
            {mode === "login" ? t.noAccount : t.hasAccount}{" "}
            <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }} className="text-primary-600 font-medium hover:text-primary-700">
              {mode === "login" ? t.register : t.login}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
