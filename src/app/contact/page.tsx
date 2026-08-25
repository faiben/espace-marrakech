"use client";

import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { useContactMessageStore } from "@/hooks/useContactMessageStore";
import { faqArticles } from "@/data";
import { Mail, Send, CheckCircle, ChevronDown, ChevronUp, HelpCircle, MessageSquare, AlertCircle, Lightbulb, Handshake } from "lucide-react";
import clsx from "clsx";

const contactCategories = [
  { key: "generalQuestion", icon: <HelpCircle size={16} /> },
  { key: "reportIssue", icon: <AlertCircle size={16} /> },
  { key: "suggestion", icon: <Lightbulb size={16} /> },
  { key: "partnership", icon: <Handshake size={16} /> },
];

export default function ContactPage() {
  const { t, isArabic, lang } = useLang();
  const { addMessage } = useContactMessageStore();
  const [form, setForm] = useState({ name: "", email: "", category: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError("");
    try {
      await addMessage({
        name: form.name,
        email: form.email,
        category: form.category,
        subject: form.subject,
        message: form.message,
      });
      setSent(true);
      setForm({ name: "", email: "", category: "", subject: "", message: "" });
      setTimeout(() => { setSent(false); }, 4000);
    } catch (err) {
      console.error(err);
      setSendError(isArabic ? "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى." : "Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-navy-800 mb-8">{t.contactTitle}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div>
          <div className="bg-white rounded-2xl border border-emerald-100 card-shadow p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">{t.sendMessage}</h2>
            {sendError && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                {sendError}
              </div>
            )}
            {sent ? (
              <div className="text-center py-10">
                <CheckCircle size={48} className="mx-auto text-green-500 mb-3" />
                <p className="text-lg font-semibold text-green-700">{t.messageSent}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">{t.nameLabel}</label>
                    <input
                      required type="text" value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">{t.emailLabel}</label>
                    <input
                      required type="email" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">{t.contactCategory}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {contactCategories.map((cat) => (
                      <button
                        key={cat.key}
                        type="button"
                        onClick={() => setForm({ ...form, category: cat.key })}
                        className={clsx(
                          "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors border",
                          form.category === cat.key
                            ? "bg-primary-50 border-primary-300 text-primary-700"
                            : "bg-navy-50 border-emerald-200 text-navy-600 hover:bg-emerald-100"
                        )}
                      >
                        {cat.icon} {t[cat.key as keyof typeof t] as string}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">{t.contactSubject}</label>
                  <input
                    required type="text" value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">{t.contactMessage}</label>
                  <textarea
                    required rows={5} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-emerald-200 text-sm"
                  />
                </div>
                <button type="submit" disabled={sending} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors disabled:opacity-60">
                  <Send size={16} /> {sending ? (isArabic ? "جاري الإرسال..." : "Envoi...") : t.sendMessage}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-bold text-navy-800 mb-4">{t.help}</h2>
          <div className="space-y-3">
            {faqArticles.map((faq) => (
              <div key={faq.id} className="bg-white rounded-xl border border-emerald-100 card-shadow overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium text-navy-800">
                    { lang === "ar" ? faq.titleAr : faq.titleFr }
                  </span>
                  {expandedFaq === faq.id ? <ChevronUp size={18} className="text-navy-400" /> : <ChevronDown size={18} className="text-navy-400" />}
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-4 pb-4 text-sm text-navy-600 border-t border-emerald-100 pt-3">
                    { lang === "ar" ? faq.contentAr : faq.contentFr }
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
