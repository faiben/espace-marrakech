"use client";

import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useBusinessStore } from "@/hooks/useBusinessStore";
import { useArtisanStore } from "@/hooks/useArtisanStore";
import { BusinessCard } from "@/components/BusinessCard";
import { ArtisanCard } from "@/components/ArtisanCard";
import { Heart, LogIn } from "lucide-react";
import Link from "next/link";

export default function FavorisPage() {
  const { t, L } = useLang();
  const { user, loading: authLoading } = useAuth();
  const { allBusinesses } = useBusinessStore();
  const { allArtisans } = useArtisanStore();

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
          <LogIn size={48} className="mx-auto text-primary-400 mb-4" />
          <h2 className="text-xl font-bold text-navy-800 mb-2">
            {L("Connectez-vous pour voir vos favoris", "سجّل الدخول لعرض مفضلاتك")}
          </h2>
          <p className="text-navy-500 mb-6">
            {L("Vos commerces et artisans préférés seront enregistrés dans votre compte.", "سيتم حفظ المحلات والحرفيين المفضلين لديك في حسابك.")}
          </p>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
          >
            {t.login}
          </Link>
        </div>
      </div>
    );
  }

  const favBusinesses = allBusinesses.filter((b) => user.favorites.includes(b.id));
  const favArtisans = allArtisans.filter((a) => user.favorites.includes(a.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-navy-800 mb-8">{t.favoritesTitle}</h1>

      {favBusinesses.length === 0 && favArtisans.length === 0 ? (
        <div className="text-center py-20">
          <Heart size={64} className="mx-auto text-navy-300 mb-4" />
          <h2 className="text-xl font-semibold text-navy-600 mb-2">{t.noFavorites}</h2>
          <p className="text-navy-400 mb-6">
            {L("Explorez notre annuaire et ajoutez vos commerces et artisans préférés", "استكشف دليلنا وأضف تجارتك وحرفيينك المفضلين إلى مفضلاتك")}
          </p>
          <a
            href="/annuaire"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
          >
            {t.ctaAnnuaire}
          </a>
        </div>
      ) : (
        <div className="space-y-10">
          {favBusinesses.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-navy-800 mb-4">{t.annuaire}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favBusinesses.map((b) => (
                  <BusinessCard key={b.id} business={b} />
                ))}
              </div>
            </div>
          )}
          {favArtisans.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-navy-800 mb-4">{t.artisans}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favArtisans.map((a) => (
                  <ArtisanCard key={a.id} artisan={a} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
