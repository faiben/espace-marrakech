"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";
import { ArrowLeft, FileText, Scale, Shield, Mail, AlertTriangle } from "lucide-react";

export default function ConditionsPage() {
  const { t, isArabic, L } = useLang();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors mb-6">
        <ArrowLeft size={18} />
        <span>{t.home}</span>
      </Link>

      <div className="bg-white rounded-2xl border border-emerald-100 card-shadow p-6 md:p-10">
        <div className="flex items-start gap-4 mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-50 text-primary-600 shrink-0">
            <FileText size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-navy-800">
              { L("Conditions d\u2019Utilisation","شروط الاستخدام") }
            </h1>
            <p className="text-sm text-navy-500 mt-1">
              { L("Dernière mise à jour : 21 août 2026","آخر تحديث: 21 أغسطس 2026") }
            </p>
          </div>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-bold text-navy-800 mb-3">
              { L("Objet","الموضوع") }
            </h2>
            <p className="text-navy-600 leading-relaxed">
              { L("Les présentes conditions régissent votre utilisation du site espacemarrakesh.ma. En utilisant le site, vous acceptez ces conditions.","تحكم هذه الشروط استخدامك لموقع espacemarrakesh.ma. باستخدام الموقع، أنت توافق على هذه الشروط.") }
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-800 mb-3">
              { L("Description du service","وصف الخدمة") }
            </h2>
            <p className="text-navy-600 leading-relaxed">
              { L("Espace Marrakech est une plateforme reliant les résidents de Marrakech aux commerces locaux, artisans et offres d\u2019emploi. Le site est bilingue (français/arabe). La consultation est gratuite, l\u2019inscription est optionnelle pour publier.","سباس مراكش هو منصة تربط سكان مراكش بالتجار والحرفيين المحليين وفرص العمل. الموقع ثنائي اللغة (فرنسي/عربي). التصفح مجاني، والتسجيل اختياري للنشر.") }
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-800 mb-3">
              { L("Inscription et compte","الحساب") }
            </h2>
            <p className="text-navy-600 leading-relaxed mb-3">
              { L("Vous devez fournir des informations exactes lors de l\u2019inscription. Un seul compte par personne. Vous êtes responsable de vos identifiants de connexion.","يجب عليك تقديم معلومات دقيقة عند التسجيل. حساب واحد لكل شخص. أنت مسؤول عن بيانات الاتصال الخاصة بك.") }
            </p>
            <div className="flex items-start gap-2 bg-navy-50 rounded-xl p-4">
              <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" />
              <p className="text-sm text-navy-600">
                { L("L\u2019administration se réserve le droit de suspendre les comptes enfreignant ces conditions.","يحتفظ المسؤولون بالحق في تعليق الحسابات التي تنتهك هذه الشروط.") }
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-800 mb-3">
              { L("Utilisation du site","استخدام الموقع") }
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-navy-50 rounded-xl p-5">
                <h3 className="font-bold text-navy-800 mb-2">{ L("Autorisé","المسموح به") }</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-navy-600">
                  <li>{ L("Consulter et rechercher","التصفح والبحث") }</li>
                  <li>{ L("Contacter des commerces et artisans","التواصل مع التجار والحرفيين") }</li>
                  <li>{ L("Postuler à des offres d\u2019emploi","التقديم على عروض العمل") }</li>
                  <li>{ L("Laisser des avis sincères","نشر مراجعات وآراء حقيقية") }</li>
                </ul>
              </div>
              <div className="bg-navy-50 rounded-xl p-5">
                <h3 className="font-bold text-navy-800 mb-2">{ L("Interdit","الممنوع") }</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-navy-600">
                  <li>{ L("Spam et sollicitations","الرسائل غير المرغوب فيها") }</li>
                  <li>{ L("Annonces fictives","القوائم المزيفة") }</li>
                  <li>{ L("Contenu illégal","المحتوى غير القانوني") }</li>
                  <li>{ L("Scraping ou extraction de données","نسخ أو استخراج البيانات") }</li>
                  <li>{ L("Usurpation d\u2019identité","انتحال الهوية") }</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-800 mb-3">
              { L("Contenu généré par les utilisateurs","المحتوى المُنشأ من المستخدمين") }
            </h2>
            <p className="text-navy-600 leading-relaxed">
              { L("Les utilisateurs sont responsables du contenu qu\u2019ils publient (avis, offres d\u2019emploi, réclamations de commerces). La plateforme se réserve le droit de supprimer le contenu inapproprié.","المستخدمون مسؤولون عن المحتوى الذي ينشرونه (مراجعات، إعلانات عمل، مطالبات تجارية). تحتفظ المنصة بالحق في حذف المحتوى غير اللائق.") }
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-800 mb-3">
              { L("Propriété intellectuelle","المال الفكرية") }
            </h2>
            <p className="text-navy-600 leading-relaxed">
              { L("Le contenu du site (design, code, logos) appartient à Espace Marrakech. Les utilisateurs conservent les droits sur leur contenu personnel.","محتوى الموقع (التصميم، الكود، الشعارات) ينتمي إلى سباس مراكش. يحتفظ المستخدمون بحقوق محتواهم الشخصي.") }
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-800 mb-3">
              { L("Limitation de responsabilité","مسؤولية محدودة") }
            </h2>
            <p className="text-navy-600 leading-relaxed">
              { L("La plateforme agit en qualité d\u2019intermédiaire. Elle n\u2019est pas responsable de la qualité des services des commerces et artisans inscrits. Les utilisateurs doivent vérifier les informations de manière indépendante.","تقع المنصة بمنزلة وسيط. غير مسؤولة عن جودة الخدمات المقدمة من التجار والحرفيين المدرجين. يجب على المستخدمين التحقق من المعلومات بشكل مستقل.") }
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-800 mb-3">
              { L("Données personnelles","البيانات الشخصية") }
            </h2>
            <p className="text-navy-600 leading-relaxed mb-3">
              { L("Les données personnelles sont régies par la Loi 09-08.","تخضع البيانات الشخصية للقانون 09-08.") }
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/confidentialite" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                { L("Politique de confidentialité","سياسة الخصوصية") }
              </Link>
              <span className="text-navy-300">|</span>
              <Link href="/cookies" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                { L("Politique de cookies","سياسة الكوكيز") }
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-800 mb-3">
              { L("Modification des conditions","تعديل الشروط") }
            </h2>
            <p className="text-navy-600 leading-relaxed">
              { L("Ces conditions peuvent être modifiées à tout moment. La poursuite de votre utilisation du site vaut acceptation des conditions mises à jour.","قد يتم تعديل هذه الشروط في أي وقت. يُعتبر استمرارك في استخدام الموقع قبولاً للشروط المحدّثة.") }
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-800 mb-3">
              { L("Droit applicable","القانون المطبق") }
            </h2>
            <p className="text-navy-600 leading-relaxed">
              { L("Le site est soumis au droit marocain. Les litiges sont soumis à la juridiction compétente de Marrakech.","يخضع الموقع للقانون المغربي. تُحل النزاعات إلى ولاية المحاكم المختصة بمراكش.") }
            </p>
          </section>

          {/* Compliance Banner */}
          <div className="flex items-center gap-3 bg-primary-50 border border-primary-200 rounded-xl p-4">
            <Scale size={24} className="text-primary-600 shrink-0" />
            <p className="font-medium text-primary-700">
              { L("Plateforme conforme au droit marocain et à la Loi 09-08","المنصة متوافقة مع القانون المغربي والقانون 09-08") }
            </p>
          </div>
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
