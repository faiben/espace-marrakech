"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";
import { ArrowLeft, Shield, Cookie, Mail } from "lucide-react";

export default function CookiesPage() {
  const { t, isArabic, L } = useLang();

  const cookieTypes = [
    {
      name: L("Cookies essentiels","ملفات تعريف الارتباط الأساسية"),
      desc: L("Requis pour le bon fonctionnement du site. Vos préférences de langue et vos réglages sont stockés dans le localStorage de votre navigateur. Aucun consentement n\u2019est nécessaire pour ces cookies conformément à la Délibération D-939-2025.","ضرورية لعمل الموقع بشكل صحيح. تُخزَّن تفضيلات اللغة والإعدادات في localStorage الخاص بمتصفحك. لا يلزم الحصول على موافقتك لهذه الملفات وفقاً للقرار D-939-2025."),
    },
    {
      name: L("Cookies fonctionnels","ملفات تعريف الارتباط الوظيفية"),
      desc: L("Elles mémorisent vos préférences telles que votre quartier favori ou vos réglages de filtres. Vous pouvez les refuser sans impact sur le fonctionnement du site.","تتذكّر تفضيلاتك مثل الحي المفضل وإعدادات الفلاتر. يمكنك رفضها دون أي تأثير على عمل الموقع."),
    },
    {
      name: L("Cookies analytiques","ملفات تعريف الارتباط الإحصائية"),
      desc: L("Elles nous aident à comprendre comment les visiteurs utilisent le site afin d\u2019en améliorer le contenu. Les données sont collectées de manière totalement anonyme.","تساعدنا على فهم طريقة استخدام الزوار للموقع من أجل تحسين محتواه. تُجمَع البيانات بشكل مجهول تماماً."),
    },
  ];

  const legalTexts = [
    L("Loi n° 09-08 relative à la protection des personnes physiques à l\u2019égard du traitement des données à caractère personnel (Dahir n° 1-09-15 du 18 février 2009)","القانون رقم 09-08 المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي (ظهير شريف رقم 1-09-15 الصادر في 18 فبراير 2009)"),
    L("Décret n° 2-09-165 pris pour l\u2019application de la loi 09-08","المرسوم رقم 2-09-165 الصادر بتنفيذ القانون 09-08"),
    L("Délibération N° D-939-2025 du 28 novembre 2025 de la CNDP relative au modèle simplifié de déclaration des cookies","قرار اللجنة الوطنية لحماية المعطيات ذات الطابع الشخصي رقم D-939-2025 المؤرخ في 28 نونبر 2025 المتعلق بالنموذج المبسط لإعلان ملفات تعريف الارتباط"),
  ];

  const collectedData = [
    L("Votre langue préférée","اللغة المفضلة"),
    L("Votre quartier ou zone favorite","الحي أو المنطقة المفضلة"),
    L("Vos réglages de filtres","إعدادات الفلاتر"),
    L("Votre zone géographique approximative","منطقتك الجغرافية التقريبية"),
  ];

  const rights = [
    {
      article: "Art. 7",
      name: L("Droit d\u2019accès","حق الاطلاع"),
      desc: L("Le droit d\u2019accéder à l\u2019ensemble de vos données personnelles faisant l\u2019objet d\u2019un traitement.","حقك في الاطلاع على جميع معطياتك الشخصية التي تتم معالجتها."),
    },
    {
      article: "Art. 8",
      name: L("Droit de rectification","حق التصحيح"),
      desc: L("Le droit de faire rectifier ou compléter vos données inexactes ou incomplètes.","حقك في تصحيح أو تحديث المعطيات غير الدقيقة أو غير المكتملة."),
    },
    {
      article: "Art. 9",
      name: L("Droit d\u2019opposition","حق الاعتراض"),
      desc: L("Le droit de vous opposer au traitement de vos données pour des motifs légitimes.","حقك في الاعتراض على معالجة معطياتك لأسباب مشروعة."),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors mb-6">
        <ArrowLeft size={18} />
        <span>{t.home}</span>
      </Link>

      <div className="bg-white rounded-2xl border border-emerald-100 card-shadow p-6 md:p-10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-50 text-primary-600 shrink-0">
            <Cookie size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-navy-800">{t.cookiesPageTitle}</h1>
            <p className="text-sm text-navy-500 mt-1">{t.cookiesLastUpdated}</p>
          </div>
        </div>

        <div className="space-y-10">
          {/* Section 1 - What is a cookie */}
          <section>
            <h2 className="text-xl font-bold text-navy-800 mb-3">
              { L("Qu\u2019est-ce qu\u2019un cookie ?","ما هو ملف تعريف الارتباط؟") }
            </h2>
            <p className="text-navy-600 leading-relaxed mb-3">
              { L("Un cookie est un petit fichier texte déposé par un serveur sur votre terminal lors de la navigation sur un site. Il sert à mémoriser vos préférences et à améliorer votre expérience lors de vos prochaines visites.","ملف تعريف الارتباط هو ملف نصي صغير يقوم الخادم بتخزينه على جهازك أثناء تصفحك للموقع. يُستخدم لتذكر تفضيلاتك وتحسين تجربتك عند زياراتك القادمة.") }
            </p>
            <p className="text-navy-600 leading-relaxed">
              { L("Les cookies utilisés par ce site ne contiennent aucune donnée personnelle permettant de vous identifier.","ملفات تعريف الارتباط المستخدمة في هذا الموقع لا تحتوي على أي معطيات شخصية تتيح التعرف عليك.") }
            </p>
          </section>

          {/* Section 2 - Types of cookies */}
          <section>
            <h2 className="text-xl font-bold text-navy-800 mb-4">
              { L("Types de cookies utilisés","أنواع ملفات تعريف الارتباط المستخدمة") }
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cookieTypes.map((type, index) => (
                <div key={index} className="bg-navy-50 rounded-xl p-5">
                  <h3 className="font-bold text-navy-800 mb-2">{type.name}</h3>
                  <p className="text-sm text-navy-600 leading-relaxed">{type.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 - Legal basis */}
          <section>
            <h2 className="text-xl font-bold text-navy-800 mb-4">
              { L("Base légale","الأساس القانوني") }
            </h2>
            <ul className="space-y-2 mb-5">
              {legalTexts.map((legal, index) => (
                <li key={index} className="flex items-start gap-2 text-navy-600 leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                  <span>{legal}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 bg-primary-50 border border-primary-200 rounded-xl p-4">
              <Shield size={24} className="text-primary-600 shrink-0" />
              <p className="font-medium text-primary-700">
                { L("Ce site est conforme à la Loi 09-08 et aux délibérations de la CNDP","هذا الموقع مطابق للقانون 09-08 ولقرارات اللجنة الوطنية لحماية المعطيات ذات الطابع الشخصي") }
              </p>
            </div>
          </section>

          {/* Section 4 - Data controller */}
          <section>
            <h2 className="text-xl font-bold text-navy-800 mb-4">
              { L("Responsable du traitement","المسؤول عن المعالجة") }
            </h2>
            <div className="bg-navy-50 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Mail size={20} className="text-primary-600 mt-1 shrink-0" />
                <div className="space-y-1">
                  <p className="font-bold text-navy-800">Espace Marrakech</p>
                  <p className="text-navy-600">Marrakech, Maroc</p>
                  <a href="mailto:contact@espacemarrakesh.ma" className="text-primary-600 hover:text-primary-700 transition-colors">
                    contact@espacemarrakesh.ma
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 - Data collected */}
          <section>
            <h2 className="text-xl font-bold text-navy-800 mb-4">
              { L("Données collectées","البيانات المجمّعة") }
            </h2>
            <ul className="space-y-2 mb-4">
              {collectedData.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-navy-600 leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-navy-600 leading-relaxed">
              { L("Toutes ces données sont stockées localement dans votre navigateur via le localStorage et ne sont jamais envoyées à des serveurs.","جميع هذه البيانات مخزنة محلياً في متصفحك عبر localStorage ولا يتم إرسالها أبداً إلى أي خوادم.") }
            </p>
          </section>

          {/* Section 6 - Retention period */}
          <section>
            <h2 className="text-xl font-bold text-navy-800 mb-3">
              { L("Durée de conservation","مدة الاحتفاظ") }
            </h2>
            <p className="text-navy-600 leading-relaxed">
              { L("Les données ne sont pas conservées au-delà de 6 mois maximum, conformément à la Délibération D-939-2025 de la CNDP.","لا يتم الاحتفاظ بالبيانات لمدة تتجاوز 6 أشهر، وفقاً للقرار رقم D-939-2025 الصادر عن اللجنة الوطنية لحماية المعطيات ذات الطابع الشخصي.") }
            </p>
          </section>

          {/* Section 7 - Your rights */}
          <section>
            <h2 className="text-xl font-bold text-navy-800 mb-4">
              { L("Vos droits","حقوقك") }
            </h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              { L("Conformément à la Loi 09-08, vous disposez des droits suivants :","وفقاً للقانون 09-08، تتوفر لديك الحقوق التالية:") }
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rights.map((right, index) => (
                <div key={index} className="bg-navy-50 rounded-xl p-5">
                  <span className="inline-block px-2 py-0.5 rounded-md bg-primary-50 text-primary-700 text-xs font-semibold mb-2">
                    {right.article}
                  </span>
                  <h3 className="font-bold text-navy-800 mb-2">{right.name}</h3>
                  <p className="text-sm text-navy-600 leading-relaxed">{right.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8 - How to manage cookies */}
          <section>
            <h2 className="text-xl font-bold text-navy-800 mb-3">
              { L("Comment gérer les cookies","كيفية إدارة الكوكيز") }
            </h2>
            <p className="text-navy-600 leading-relaxed mb-3">
              { L("Vous pouvez à tout moment configurer ou supprimer les cookies depuis les réglages de votre navigateur :","يمكنك في أي وقت ضبط أو حذف ملفات تعريف الارتباط من خلال إعدادات متصفحك:") }
            </p>
            <ul className="space-y-2">
              <li className="text-navy-600 leading-relaxed">
                <strong className="text-navy-800">Chrome</strong> :{" "}
                { L("Paramètres → Confidentialité et sécurité → Cookies","الإعدادات ← الخصوصية والأمان ← ملفات تعريف الارتباط") }
              </li>
              <li className="text-navy-600 leading-relaxed">
                <strong className="text-navy-800">Firefox</strong> :{" "}
                { L("Options → Vie privée et sécurité → Cookies","الإعدادات ← الخصوصية والأمان ← الكوكيز") }
              </li>
              <li className="text-navy-600 leading-relaxed">
                <strong className="text-navy-800">Safari</strong> :{" "}
                { L("Préférences → Confidentialité → Cookies","التفضيلات ← الخصوصية ← ملفات تعريف الارتباط") }
              </li>
              <li className="text-navy-600 leading-relaxed">
                <strong className="text-navy-800">Edge</strong> :{" "}
                { L("Paramètres → Confidentialité et recherche → Cookies","الإعدادات ← الخصوصية والبحث ← الكوكيز") }
              </li>
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-emerald-100 mt-10 pt-6 flex items-center justify-center gap-2">
          <Mail size={16} className="text-primary-600" />
          <a href="mailto:contact@espacemarrakesh.ma" className="text-primary-600 hover:text-primary-700 transition-colors">
            contact@espacemarrakesh.ma
          </a>
        </div>
      </div>
    </div>
  );
}
