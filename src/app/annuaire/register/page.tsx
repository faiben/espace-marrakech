"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useBusinessStore } from "@/hooks/useBusinessStore";
import { useAppSettings } from "@/hooks/useAppSettings";
import { BusinessCategory, PackageType, PaymentMethod } from "@/types";
import {
  CheckCircle, Zap, Crown, ArrowLeft, Store, ChevronDown,
  Banknote, CreditCard, Building2,
} from "lucide-react";
import clsx from "clsx";

type Step = "plan" | "account" | "details" | "payment" | "done";

const categoryOptions: BusinessCategory[] = [
  "restaurant", "cafe", "boulangerie", "pharmacie", "coiffeur", "epicerie",
  "artisanat", "dentiste", "clinique", "medecin", "avocat", "immobilier",
  "garage", "electronique", "vetements", "education", "sport", "beaute",
  "hotel", "droguerie", "location_voiture", "autre"
];

const plans = [
  {
    id: "free" as PackageType,
    icon: Store,
    iconBg: "bg-emerald-100 text-primary-600",
    price: 0,
    label: { fr: "Gratuit", ar: "مجاني" },
    desc: { fr: "Pour commencer", ar: "للبدء" },
    features: {
      fr: [
        "Fiche commerce dans l'annuaire",
        "1 photo maximum",
        "Numéro de téléphone visible",
        "Catégorie et adresse",
      ],
      ar: [
        "صفحة تجارية في الدليل",
        "صورة واحدة كحد أقصى",
        "رقم الهاتف مرئي",
        "الفئة والعنوان",
      ],
    },
    cta: { fr: "Commencer gratuitement", ar: "ابدأ مجاناً" },
  },
  {
    id: "pro" as PackageType,
    icon: Zap,
    iconBg: "bg-blue-100 text-blue-600",
    price: 99,
    label: { fr: "Pro", ar: "برو" },
    desc: { fr: "Pour les commerces ambitieux", ar: "للتجار الطموحين" },
    features: {
      fr: [
        "Fiche prioritaire dans les résultats",
        "Jusqu'à 3 photos",
        "Vidéo YouTube intégrée",
        "Bouton WhatsApp direct",
        "Bouton Itinéraire Google Maps",
        "Badge « Pro » sur la fiche",
        "Lien email et site web",
      ],
      ar: [
        "صفحة مميزة في نتائج البحث",
        "حتى 3 صور",
        "فيديو يوتيوب مدمج",
        "زر واتساب مباشر",
        "زر الاتجاهات على خرائط جوجل",
        "شارة « برو » على الصفحة",
        "رابط البريد الإلكتروني والموقع",
      ],
    },
    cta: { fr: "Passer au Pro — 99 DH/mois", ar: "اشترك برو — 99 درهم/شهر" },
    popular: true,
  },
  {
    id: "premium" as PackageType,
    icon: Crown,
    iconBg: "bg-amber-100 text-amber-600",
    price: 159,
    label: { fr: "Premium", ar: "بريميوم" },
    desc: { fr: "Pour les pros de Marrakech", ar: "للكفاءات في مراكش" },
    features: {
      fr: [
        "Tout le plan Pro inclus",
        "Photos illimitées",
        "Vidéo intégrée",
        "Mise en avant sur la page d'accueil",
        "Badge « Premium Premium » doré",
        "Position dans les résultats les plus élevés",
        "Statistiques et analyse de vues",
        "Support prioritaire",
      ],
      ar: [
        "جميع مميزات برو",
        "صور غير محدودة",
        "فيديو مدمج",
        "ظهور في الصفحة الرئيسية",
        "شارة « بريميوم » ذهبية",
        "أعلى مرتبة في نتائج البحث",
        "إحصائيات وتحليل المشاهدات",
        "دعم أولوي",
      ],
    },
    cta: { fr: "Passer au Premium — 159 DH/mois", ar: "اشترك بريميوم — 159 درهم/شهر" },
  },
];

export default function BusinessRegisterPage() {
  const { t, isArabic, L, lang } = useLang();
  const { user, register } = useAuth();
  const { addBusiness } = useBusinessStore();
  const { settings } = useAppSettings();
  const router = useRouter();

  const [step, setStep] = useState<Step>("plan");
  const [selectedPlan, setSelectedPlan] = useState<PackageType>("free");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [error, setError] = useState("");

  const [account, setAccount] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [form, setForm] = useState({
    nameFr: "",
    nameAr: "",
    descriptionFr: "",
    descriptionAr: "",
    category: "restaurant" as BusinessCategory,
    address: "",
    phone: "",
    email: "",
    website: "",
    whatsapp: "",
  });

  useEffect(() => {
    if (user && step === "account") {
      setStep("details");
    }
  }, [user, step]);

  const plan = plans.find((p) => p.id === selectedPlan)!;

  function handlePlanSelect(id: PackageType) {
    setSelectedPlan(id);
  }

  function handlePlanConfirm() {
    if (user) {
      setStep("details");
    } else {
      setStep("account");
    }
  }

  async function handleAccountSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (account.password !== account.confirmPassword) {
      setError(L("Les mots de passe ne correspondent pas","كلمتا المرور غير متطابقتين"));
      return;
    }
    if (account.password.length < 6) {
      setError(L("Le mot de passe doit contenir au moins 6 caractères","كلمة المرور 6 أحرف على الأقل"));
      return;
    }

    const result = await register(account.name, account.email, account.password, "merchant");
    if (!result.ok) {
      setError(result.error || "");
      return;
    }
    setStep("details");
  }

  function handleDetailsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.nameFr.trim()) {
      setError(L("Veuillez saisir un nom en français","أدخل اسم بالفرنسية"));
      return;
    }
    if (!form.phone.trim()) {
      setError(L("Veuillez saisir un numéro de téléphone","أدخل رقم الهاتف"));
      return;
    }

    if (selectedPlan === "free") {
      const newBusiness = {
        id: `biz-${Date.now()}`,
        nameFr: form.nameFr.trim(),
        nameAr: form.nameAr.trim() || form.nameFr.trim(),
        descriptionFr: form.descriptionFr.trim() || "",
        descriptionAr: form.descriptionAr.trim() || "",
        category: form.category,
        address: form.address.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        website: form.website.trim(),
        whatsapp: form.whatsapp.trim(),
        lat: 34.0331,
        lng: -5.5473,
        rating: 0,
        reviewCount: 0,
        isSponsored: false,
        packageType: selectedPlan as PackageType,
        createdAt: new Date().toISOString().split("T")[0],
        userId: user?.id,
      };
      addBusiness(newBusiness as any);
      setStep("done");
    } else {
      setStep("payment");
    }
  }

  function handlePaymentSubmit() {
    const newBusiness = {
      id: `biz-${Date.now()}`,
      nameFr: form.nameFr.trim(),
      nameAr: form.nameAr.trim() || form.nameFr.trim(),
      descriptionFr: form.descriptionFr.trim() || "",
      descriptionAr: form.descriptionAr.trim() || "",
      category: form.category,
      address: form.address.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      website: form.website.trim(),
      whatsapp: form.whatsapp.trim(),
      lat: 34.0331,
      lng: -5.5473,
      rating: 0,
      reviewCount: 0,
      isSponsored: selectedPlan === "premium",
      packageType: selectedPlan as PackageType,
      paymentMethod,
      createdAt: new Date().toISOString().split("T")[0],
      userId: user?.id,
    };
    addBusiness(newBusiness as any);
    setStep("done");
  }

  return (
    <div className="min-h-[70vh] bg-[#EEF3F9]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-600 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          {step !== "plan" && step !== "done" && (
            <button
              onClick={() => setStep(step === "account" ? "plan" : step === "payment" ? "details" : "account")}
              className="inline-flex items-center gap-1 text-sm text-emerald-200 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={16} /> { L("Retour","رجوع") }
            </button>
          )}
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            { L("Inscrivez votre commerce sur Marrakech","سجّل متجرك على منصة مراكش") }
          </h1>
          <p className="text-emerald-100 text-lg max-w-xl mx-auto">
            { L("Rejoignez des milliers de commerçants et touvez des centaines de clients chaque jour","انضم لآلاف التجار واستفد من وصول مئات الزوار يومياً") }
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Step: Plan selection */}
        {step === "plan" && (
          <>
            <h2 className="text-2xl font-bold text-navy-800 text-center mb-8">
              { L("Choisissez votre formule","اختر خطتك") }
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {plans.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handlePlanSelect(p.id)}
                  className={clsx(
                    "relative bg-white rounded-2xl p-6 text-center cursor-pointer transition-all duration-200",
                    selectedPlan === p.id
                      ? "border-2 border-primary-500 ring-2 ring-primary-100 shadow-lg scale-[1.02]"
                      : "border border-gray-200 hover:border-primary-300 shadow-sm",
                    p.popular && "md:-mt-2"
                  )}
                >
                  {p.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow">
                        { L("Le plus populaire","الأكثر طلباً") }
                      </span>
                    </div>
                  )}
                  <div className={clsx("w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4", p.iconBg)}>
                    <p.icon size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-navy-800">{lang === "ar" ? p.label.ar : p.label.fr}</h3>
                  <p className="text-sm text-navy-500 mb-3">{lang === "ar" ? p.desc.ar : p.desc.fr}</p>
                  <div className="mb-4">
                    <span className="text-3xl font-extrabold text-primary-600">
                      {p.price === 0 ? (L("Gratuit","مجاني")) : `${p.price}`}
                    </span>
                    {p.price > 0 && (
                      <span className="text-sm text-navy-400 ml-1">DH/{ L("mois","شهر") }</span>
                    )}
                  </div>
                  <ul className="text-left space-y-2 mb-6">
                    {(lang === "ar" ? p.features.ar : p.features.fr).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-navy-600">
                        <CheckCircle size={14} className="text-primary-500 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanSelect(p.id);
                      handlePlanConfirm();
                    }}
                    className={clsx(
                      "w-full py-2.5 rounded-lg text-sm font-medium transition-colors",
                      selectedPlan === p.id
                        ? "bg-primary-600 text-white hover:bg-primary-700"
                        : "bg-navy-50 text-navy-700 hover:bg-navy-100"
                    )}
                  >
                    {lang === "ar" ? p.cta.ar : p.cta.fr}
                  </button>
                </div>
              ))}
            </div>

            <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-emerald-100 p-6 text-center">
              <h3 className="font-bold text-navy-800 mb-2">
                { L("Comment ça marche ?","كيف يعمل؟") }
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-navy-600 mt-4">
                <div>
                  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-2 font-bold">1</div>
                  <p className="font-medium text-navy-800 mb-1">{ L("Choisissez la formule","اختر الخطّة") }</p>
                  <p className="text-navy-500 text-xs">{ L("Gratuit, Pro ou Premium","مجاني، برو، أو بريميوم") }</p>
                </div>
                <div>
                  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-2 font-bold">2</div>
                  <p className="font-medium text-navy-800 mb-1">{ L("Renseignez votre commerce","أدخل بيانات المتجر") }</p>
                  <p className="text-navy-500 text-xs">{ L("Nom, catégorie, adresse...","الاسم، الفئة، العنوان...") }</p>
                </div>
                <div>
                  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-2 font-bold">3</div>
                  <p className="font-medium text-navy-800 mb-1">{ L("Publiez et c&apos;est parti!","انشر وانطلق!") }</p>
                  <p className="text-navy-500 text-xs">{ L("Immédiatement dans l&apos;annuaire","الفعل في الدليل مباشرة") }</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Step: Account creation */}
        {step === "account" && (
          <div className="max-w-lg mx-auto bg-white rounded-2xl border border-emerald-100 p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-1 text-center">
              { L("Créez votre compte","أنشئ حسابك") }
            </h2>
            <p className="text-sm text-navy-500 text-center mb-6">
              { L("Votre compte sera lié à votre commerce pour la gestion","حسابكم يُربط بمتجرك ليتمكنك من إدارة الفعل") }
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">{error}</div>
            )}

            <form onSubmit={handleAccountSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">{t.nameLabel}</label>
                <input
                  required type="text" value={account.name}
                  onChange={(e) => setAccount({ ...account, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm"
                  placeholder={ L("Mohamed Amine","محمد أمين") }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">{t.emailLabel}</label>
                <input
                  required type="email" value={account.email}
                  onChange={(e) => setAccount({ ...account, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">{t.passwordLabel}</label>
                <input
                  required type="password" value={account.password}
                  onChange={(e) => setAccount({ ...account, password: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">{t.confirmPassword}</label>
                <input
                  required type="password" value={account.confirmPassword}
                  onChange={(e) => setAccount({ ...account, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm"
                />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors">
                { L("Créer le compte","أنشئ الحساب") }
              </button>
            </form>

            <div className="text-center mt-4 text-sm text-navy-500">
              { L("Vous avez déjà un compte ?","لديك حساب بالفعل؟") }{" "}
              <button
                onClick={() => { setError(""); setStep("details"); }}
                className="text-primary-600 font-medium hover:text-primary-700"
              >
                { L("Connectez-vous","سجّل الدخول") }
              </button>
            </div>
          </div>
        )}

        {/* Step: Business details */}
        {step === "details" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-emerald-100 p-6 mb-4">
              <div className="flex items-center gap-3 mb-6">
                <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center", plan.iconBg)}>
                  <plan.icon size={20} />
                </div>
                <div>
                  <p className="text-sm text-navy-500">{ L("Formule choisie","الخطّة المختارة") }</p>
                  <p className="font-bold text-navy-800">
                    {lang === "ar" ? plan.label.ar : plan.label.fr}
                    {plan.price > 0 && <span className="text-primary-600 ml-1">{plan.price} DH/{ L("mois","شهر") }</span>}
                  </p>
                </div>
                <button
                  onClick={() => setStep("plan")}
                  className="ml-auto text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  { L("Changer","تغيير") }
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-emerald-100 p-6">
              <h2 className="text-xl font-bold text-navy-800 mb-6 text-center">
                { L("Informations du commerce","بيانات المتجر") }
              </h2>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">{error}</div>
              )}

              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">
                      { L("Nom en français *","الاسم بالفرنسية *") }
                    </label>
                    <input
                      required type="text" value={form.nameFr}
                      onChange={(e) => setForm({ ...form, nameFr: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm"
                      placeholder="Ex: Pâtisserie Aziza"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">
                      { L("Nom en arabe","الاسم بالعربية") }
                    </label>
                    <input
                      type="text" dir="rtl" value={form.nameAr}
                      onChange={(e) => setForm({ ...form, nameAr: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm"
                      placeholder="حلويات عزيزة"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">
                    { L("Catégorie","الفئة") }
                  </label>
                  <div className="relative">
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value as BusinessCategory })}
                      className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm appearance-none pr-8 bg-white"
                    >
                      {categoryOptions.map((cat) => (
                        <option key={cat} value={cat}>
                          {t.categories[cat]}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">
                    { L("Adresse complète","العنوان التفصيلي") }
                  </label>
                  <input
                    type="text" value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm"
                    placeholder={ L("Rue Mohammed V, n°12","شارع محمد الخامس، رقم 12") }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">
                      { L("Téléphone *","رقم الهاتف *") }
                    </label>
                    <input
                      required type="tel" value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm"
                      placeholder="05 99 XX XX XX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">
                      { L("Email","البريد الإلكتروني") }
                    </label>
                    <input
                      type="email" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm"
                      placeholder="contact@moncommerce.ma"
                    />
                  </div>
                </div>

                {selectedPlan !== "free" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy-700 mb-1">
                        { L("WhatsApp","رقم الواتساب") }
                      </label>
                      <input
                        type="tel" value={form.whatsapp}
                        onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm"
                        placeholder="+212 6 XX XX XX XX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-700 mb-1">
                        { L("Site web","الموقع الإلكتروني") }
                      </label>
                      <input
                        type="url" value={form.website}
                        onChange={(e) => setForm({ ...form, website: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm"
                        placeholder="https://www.moncommerce.ma"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">
                    { L("Description en français","وصف بالفرنسية") }
                  </label>
                  <textarea
                    rows={3} value={form.descriptionFr}
                    onChange={(e) => setForm({ ...form, descriptionFr: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm resize-none"
                    placeholder={ L("Décrivez brièvement votre activité","صف نشاطك باختصار") }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">
                    { L("Description en arabe","وصف بالعربية") }
                  </label>
                  <textarea
                    rows={3} dir="rtl" value={form.descriptionAr}
                    onChange={(e) => setForm({ ...form, descriptionAr: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm resize-none"
                    placeholder={ L("Décrivez brièvement votre activité","صف نشاطك باختصار") }
                  />
                </div>

                {selectedPlan === "premium" && (
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-700">
                    { L("💎 Le plan Premium vous offre une mise en avant sur la page d&apos;accueil et un badge doré. Vous pourrez ajouter photos et vidéo depuis votre tableau de bord.","💎 الخطّة البريميوم تمنحك ظهوراً على الصفحة الرئيسية وشارة ذهبية. يمكنك لاحقاً إضافة الصور والفيديو من لوحة التحكم.") }
                  </div>
                )}

                <button type="submit" className="w-full py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors text-lg">
                  { L("Publier mon commerce","نشر المتجر") }
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Step: Payment */}
        {step === "payment" && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-800 text-center mb-2">{t.selectPaymentMethod}</h2>
            <p className="text-navy-500 text-center mb-8">{t.paymentMethodSubtitle}</p>

            {/* Plan summary */}
            <div className="bg-white rounded-2xl border border-emerald-100 p-5 mb-6">
              <div className="flex items-center gap-3">
                <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center", plan.iconBg)}>
                  <plan.icon size={24} />
                </div>
                <div>
                  <p className="text-xs text-navy-400">{t.chosenPlan}</p>
                  <p className="font-bold text-navy-800">
                    {lang === "ar" ? plan.label.ar : plan.label.fr}
                    <span className="text-primary-600 ml-2">{plan.price} DH{t.perMonth}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Payment options */}
            <div className="space-y-4 mb-6">
              {/* Cash */}
              <button
                type="button"
                onClick={() => setPaymentMethod("cash")}
                className={clsx(
                  "w-full rounded-xl border-2 p-4 flex items-center gap-4 transition-all text-left",
                  paymentMethod === "cash"
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 hover:border-primary-300"
                )}
              >
                <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", paymentMethod === "cash" ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-400")}>
                  <Banknote size={22} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-navy-800">{t.cashPayment}</p>
                  <p className="text-sm text-navy-500">{t.cashPaymentDesc}</p>
                </div>
                <div className={clsx("w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0", paymentMethod === "cash" ? "border-primary-500" : "border-gray-300")}>
                  {paymentMethod === "cash" && <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />}
                </div>
              </button>

              {/* Credit Card */}
              <button
                type="button"
                onClick={() => setPaymentMethod("credit_card")}
                className={clsx(
                  "w-full rounded-xl border-2 p-4 flex items-center gap-4 transition-all text-left",
                  paymentMethod === "credit_card"
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 hover:border-primary-300"
                )}
              >
                <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", paymentMethod === "credit_card" ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-400")}>
                  <CreditCard size={22} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-navy-800">{t.creditCardPayment}</p>
                </div>
                <div className={clsx("w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0", paymentMethod === "credit_card" ? "border-primary-500" : "border-gray-300")}>
                  {paymentMethod === "credit_card" && <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />}
                </div>
              </button>

              {paymentMethod === "credit_card" && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
                  {t.creditCardNotAvailable}
                </div>
              )}

              {/* Bank Transfer */}
              <button
                type="button"
                onClick={() => setPaymentMethod("bank_transfer")}
                className={clsx(
                  "w-full rounded-xl border-2 p-4 flex items-center gap-4 transition-all text-left",
                  paymentMethod === "bank_transfer"
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 hover:border-primary-300"
                )}
              >
                <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", paymentMethod === "bank_transfer" ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-400")}>
                  <Building2 size={22} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-navy-800">{t.bankTransfer}</p>
                  <p className="text-sm text-navy-500">{t.bankTransferDesc}</p>
                </div>
                <div className={clsx("w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0", paymentMethod === "bank_transfer" ? "border-primary-500" : "border-gray-300")}>
                  {paymentMethod === "bank_transfer" && <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />}
                </div>
              </button>

              {paymentMethod === "bank_transfer" && settings.bankName && (
                <div className="bg-emerald-50 rounded-xl p-4 space-y-2 text-sm">
                  <p className="font-bold text-navy-800 mb-3">{t.bankDetailsTitle}</p>
                  <div className="flex justify-between"><span className="text-navy-500">{t.bankNameLabel}</span><span className="text-navy-800 font-medium">{settings.bankName}</span></div>
                  <div className="flex justify-between"><span className="text-navy-500">{t.accountHolderLabel}</span><span className="text-navy-800 font-medium">{settings.bankAccountHolder}</span></div>
                  <div className="flex justify-between"><span className="text-navy-500">{t.ibanLabel}</span><span className="text-navy-800 font-medium">{settings.bankIban}</span></div>
                  <div className="flex justify-between"><span className="text-navy-500">{t.ribLabel}</span><span className="text-navy-800 font-medium">{settings.bankRib}</span></div>
                </div>
              )}

              {paymentMethod === "bank_transfer" && !settings.bankName && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
                  {t.bankDetailsNotConfigured}
                </div>
              )}
            </div>

            <button
              onClick={handlePaymentSubmit}
              disabled={paymentMethod === "credit_card"}
              className={clsx(
                "w-full py-3 rounded-lg font-medium transition-colors text-lg",
                paymentMethod === "credit_card"
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-primary-600 text-white hover:bg-primary-700"
              )}
            >
              { L("Confirmer et publier","تأكيد النشر") }
            </button>
          </div>
        )}

        {/* Step: Done */}
        {step === "done" && (
          <div className="max-w-lg mx-auto bg-white rounded-2xl border border-emerald-100 p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-navy-800 mb-2">
              { L("Bienvenue sur Espace Marrakech !","مرحباً بك في منصة مراكش!") }
            </h2>
            <p className="text-navy-500 mb-6">
              { L("Votre commerce a bien été publié. Il est maintenant visible dans l&apos;annuaire.","تم نشر متجرك بنجاح. يظهر الآن في الدليل ويمكن للزوار اكتشافه.") }
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => router.push("/annuaire")}
                className="px-6 py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
              >
                { L("Voir l'annuaire","تصفح الدليل") }
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="px-6 py-2.5 rounded-lg bg-navy-50 text-navy-700 font-medium hover:bg-navy-100 transition-colors"
              >
                {t.dashboard}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
