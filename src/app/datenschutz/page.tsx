"use client";

import Link from "next/link";

export default function DatenschutzPage() {
  return (
    <div className="min-h-dvh bg-[#FAFAFA]">
      <div className="max-w-2xl mx-auto px-4 py-8 pb-16">
        <Link href="/" className="text-indigo-500 hover:text-indigo-700 text-sm mb-6 inline-block">
          ← Zurück
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Datenschutzerklärung</h1>

        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">Verantwortliche Stelle</h2>
            <p>
              MMIND GmbH<br />
              Industriestrasse 24<br />
              9487 Schaan, Liechtenstein<br />
              E-Mail: info@mmind.ai<br />
              Web: mmind.ai
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">Welche Daten wir verarbeiten</h2>
            <p className="mb-2">SPARK erhebt nur anonyme Nutzungsdaten ohne Personenbezug:</p>
            <ul className="space-y-2">
              <li className="flex gap-2"><span className="text-indigo-500 shrink-0">•</span><span><strong>Lernfortschritt:</strong> Wird ausschliesslich lokal in deinem Browser gespeichert (localStorage). Wir haben keinen Zugriff darauf.</span></li>
              <li className="flex gap-2"><span className="text-indigo-500 shrink-0">•</span><span><strong>Modul-Aufrufe:</strong> Beim Öffnen eines Moduls wird die Modul-ID anonym protokolliert (kein Nutzer-Identifier, keine IP-Adresse gespeichert).</span></li>
              <li className="flex gap-2"><span className="text-indigo-500 shrink-0">•</span><span><strong>Zertifikat-Downloads:</strong> Anzahl der heruntergeladenen Zertifikate (Gesamtzähler, ohne Personenbezug). Der Name im Zertifikat wird nicht an uns übermittelt — die PDF-Erstellung erfolgt vollständig in deinem Browser.</span></li>
              <li className="flex gap-2"><span className="text-indigo-500 shrink-0">•</span><span><strong>NPS-Feedback:</strong> Falls du nach dem Quiz eine Bewertung (0–10) und optionalen Kommentar abgibst, wird dies anonym gespeichert. Es wird kein Name, keine E-Mail oder andere personenbezogene Information erfasst.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">Kein Login, keine Cookies</h2>
            <p>
              SPARK benötigt keine Registrierung und setzt keine Tracking-Cookies. Es werden keine Cookies für Werbezwecke oder Cross-Site-Tracking verwendet.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">Datenspeicherung</h2>
            <p>
              Die anonymen Nutzungsstatistiken werden in einer PostgreSQL-Datenbank auf einem Server in der EU (Hetzner, Deutschland) gespeichert. Es findet keine Weitergabe an Dritte statt.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">Rechtsgrundlage</h2>
            <p>
              Die Verarbeitung anonymer Nutzungsstatistiken erfolgt auf Basis von berechtigtem Interesse (Art. 6 Abs. 1 lit. f DSGVO) zur Qualitätssicherung und Verbesserung der Trainingsplattform im Rahmen des Erasmus-Programms.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">Hosting</h2>
            <p>
              Diese Website wird auf Servern der Hetzner Online GmbH (Deutschland) betrieben. Hetzner ist nach DSGVO als Auftragsverarbeiter tätig.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">Deine Rechte</h2>
            <p className="mb-2">
              Da wir keine personenbezogenen Daten erheben, ist eine Auskunft oder Löschung zu einzelnen Nutzern nicht möglich. Du kannst deinen lokalen Lernfortschritt jederzeit selbst löschen:
            </p>
            <div className="bg-gray-100 rounded-xl px-4 py-3 font-mono text-xs text-gray-700">
              Browsereinstellungen → Websitedaten löschen → spark.mmind.space
            </div>
            <p className="mt-3">
              Bei Fragen zum Datenschutz wende dich an: <a href="mailto:info@mmind.ai" className="text-indigo-500 hover:underline">info@mmind.ai</a>
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">Änderungen</h2>
            <p>
              Diese Datenschutzerklärung gilt ab Mai 2025. Bei wesentlichen Änderungen wird die Seite aktualisiert.
            </p>
          </section>

        </div>

        <div className="mt-10 text-center text-xs text-gray-400">
          MMIND GmbH · Schaan, Liechtenstein · mmind.ai
        </div>
      </div>
    </div>
  );
}
