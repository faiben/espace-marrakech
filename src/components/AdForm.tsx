"use client";

import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { useAppSettings } from "@/hooks/useAppSettings";
import { Ad, PaymentMethod } from "@/types";
import { X } from "lucide-react";

interface AdFormProps {
  ad?: Ad | null;
  onSave: (ad: Ad) => void;
  onClose: () => void;
}

export function AdForm({ ad, onSave, onClose }: AdFormProps) {
  const { isArabic, L, t } = useLang();
  const { settings } = useAppSettings();
  const [titleFr, setTitleFr] = useState(ad?.titleFr ?? "");
  const [titleAr, setTitleAr] = useState(ad?.titleAr ?? "");
  const [imageUrl, setImageUrl] = useState(ad?.imageUrl ?? "");
  const [linkUrl, setLinkUrl] = useState(ad?.linkUrl ?? "");
  const [advertiserName, setAdvertiserName] = useState(ad?.advertiserName ?? "");
  const [advertiserEmail, setAdvertiserEmail] = useState(ad?.advertiserEmail ?? "");
  const [position, setPosition] = useState<"banner" | "sidebar" | "inline">(ad?.position ?? "banner");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(ad?.paymentMethod ?? "cash");
  const [startsAt, setStartsAt] = useState(ad?.startsAt ?? new Date().toISOString().split("T")[0]);
  const [expiresAt, setExpiresAt] = useState(ad?.expiresAt ?? "");
  const [status, setStatus] = useState<"pending" | "approved" | "rejected" | "expired">(ad?.status ?? "pending");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: ad?.id ?? `ad-${Date.now()}`,
      titleFr,
      titleAr,
      imageUrl,
      linkUrl,
      advertiserName,
      advertiserEmail,
      status,
      position,
      paymentMethod,
      startsAt,
      expiresAt,
      impressions: ad?.impressions ?? 0,
      clicks: ad?.clicks ?? 0,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto card-shadow" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-emerald-100">
          <h3 className="font-bold text-navy-800">
            {ad ? (L("Modifier l\u2019annonce","تعديل الإعلان")) : (L("Nouvelle annonce","إضافة إعلان"))}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-navy-50"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-navy-700 mb-1">{ L("Titre (FR)","العنوان بالفرنسية") }</label>
              <input value={titleFr} onChange={(e) => setTitleFr(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm bg-white text-navy-800 focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-navy-700 mb-1">{ L("Titre (AR)","العنوان بالعربية") }</label>
              <input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm bg-white text-navy-800 focus:outline-none focus:ring-2 focus:ring-primary-500" dir="rtl" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-navy-700 mb-1">{ L("URL de l\u2019image","رابط الصورة") }</label>
            <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm bg-white text-navy-800 focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-xs font-medium text-navy-700 mb-1">{ L("URL de destination","رابط الإعلان") }</label>
            <input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm bg-white text-navy-800 focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="https://..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-navy-700 mb-1">{ L("Nom de l\u2019annonceur","اسم المعلن") }</label>
              <input value={advertiserName} onChange={(e) => setAdvertiserName(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm bg-white text-navy-800 focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-navy-700 mb-1">{ L("Email annonceur","بريد المعلن") }</label>
              <input type="email" value={advertiserEmail} onChange={(e) => setAdvertiserEmail(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm bg-white text-navy-800 focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-navy-700 mb-1">{ L("Position","الموضع") }</label>
              <select value={position} onChange={(e) => setPosition(e.target.value as typeof position)} className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm bg-white">
                <option value="banner">{ L("Bannière","بانر") }</option>
                <option value="sidebar">{ L("Barre latérale","شريط جانبي") }</option>
                <option value="inline">{ L("Intégré","داخل المحتوى") }</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-navy-700 mb-1">{ L("Statut","الحالة") }</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm bg-white">
                <option value="pending">{ L("En attente","قيد المراجعة") }</option>
                <option value="approved">{ L("Approuvé","مقبول") }</option>
                <option value="rejected">{ L("Rejeté","مرفوض") }</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-navy-700 mb-1">{ L("Mode de paiement","طريقة الدفع") }</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)} className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm bg-white">
              <option value="cash">{t.cashPayment}</option>
              <option value="credit_card" disabled>{t.creditCardPayment} — { L("Bientôt disponible","قريباً") }</option>
              <option value="bank_transfer">{t.bankTransfer}</option>
            </select>
          </div>
          {paymentMethod === "bank_transfer" && settings.bankName && (
            <div className="bg-emerald-50 rounded-xl p-3 text-xs space-y-1">
              <p className="font-bold text-navy-800 mb-2">{t.bankDetailsTitle}</p>
              <div className="flex justify-between"><span className="text-navy-500">{t.bankNameLabel}</span><span className="text-navy-700">{settings.bankName}</span></div>
              <div className="flex justify-between"><span className="text-navy-500">{t.accountHolderLabel}</span><span className="text-navy-700">{settings.bankAccountHolder}</span></div>
              <div className="flex justify-between"><span className="text-navy-500">{t.ibanLabel}</span><span className="text-navy-700">{settings.bankIban}</span></div>
              <div className="flex justify-between"><span className="text-navy-500">{t.ribLabel}</span><span className="text-navy-700">{settings.bankRib}</span></div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-navy-700 mb-1">{ L("Date de début","تاريخ البداية") }</label>
              <input type="date" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm bg-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-navy-700 mb-1">{ L("Date de fin","تاريخ النهاية") }</label>
              <input type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm bg-white" />
            </div>
          </div>
          {imageUrl && (
            <div>
              <p className="text-xs text-navy-500 mb-1">{ L("Aperçu","معاينة") }</p>
              <img src={imageUrl} alt="" className="w-full h-auto max-h-32 object-cover rounded-lg border border-emerald-100" />
            </div>
          )}
          <button type="submit" className="w-full px-4 py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors">
            { L("Enregistrer","حفظ") }
          </button>
        </form>
      </div>
    </div>
  );
}
