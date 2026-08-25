"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Save, CheckCircle, User, Settings } from "lucide-react";
import Link from "next/link";

export default function DashboardSettingsPage() {
  const { t, L } = useLang();
  const { user, loading: authLoading, updateUser } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  if (authLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center text-navy-500">
        {L("Chargement...", "جاري التحميل...")}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center bg-white rounded-2xl border border-emerald-100 card-shadow p-10 max-w-md">
          <p className="text-4xl mb-4">🔒</p>
          <h2 className="text-xl font-bold text-navy-800 mb-2">{L("Connexion requise", "يجب تسجيل الدخول")}</h2>
          <button
            onClick={() => router.push("/auth")}
            className="mt-4 px-6 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
          >
            {t.login}
          </button>
        </div>
      </div>
    );
  }

  const roleLabel: Record<string, string> = {
    admin: L("Administrateur", "مدير"),
    resident: t.resident,
    merchant: t.merchant,
    artisan: t.artisanUser,
    jobseeker: t.jobseeker,
    employer: t.employer,
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name.trim() === user.name) return;
    setSaving(true);
    try {
      await updateUser(user.id, { name: name.trim() });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm bg-white text-navy-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-navy-50 disabled:text-navy-400";

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-navy-500 hover:text-navy-700 mb-6">
        <ArrowLeft size={16} /> {t.dashboard}
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <Settings size={28} className="text-primary-600" />
        <h1 className="text-3xl font-bold text-navy-800">{t.accountSettings}</h1>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-emerald-100 card-shadow p-6 space-y-5">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-navy-700 mb-1">
            <User size={14} /> {t.nameLabel}
          </label>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-700 mb-1">{t.emailLabel}</label>
          <input type="email" value={user.email} disabled readOnly className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-700 mb-1">{t.roleLabel}</label>
          <input type="text" value={roleLabel[user.role] || user.role} disabled readOnly className={inputClass} />
        </div>

        {saved && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700">
            <CheckCircle size={16} /> {L("Modifications enregistrées", "تم حفظ التعديلات")}
          </div>
        )}

        <button
          type="submit"
          disabled={saving || !name.trim() || name.trim() === user.name}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={16} /> {saving ? L("Enregistrement...", "جاري الحفظ...") : L("Enregistrer", "حفظ")}
        </button>
      </form>
    </div>
  );
}
