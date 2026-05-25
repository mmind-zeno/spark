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
              MMIND GmbH
              <br />
              Industriestrasse 24
              <br />
              9487 Schaan, Liechtenstein
              <br />
              E-Mail: info@mmind.ai
              <br />
              Web: mmind.ai
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">Welche Daten wir verarbeiten</h2>
            <p className="mb-2">SPARK erhebt nur die für den Betrieb nötigen Daten — ohne Login:</p>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-indigo-500 shrink-0">•</span>
                <span>
                  <strong>Lernfortschritt:</strong> Primär lokal in deinem Browser (localStorage). Optional kannst du
                  den Fortschritt per Sync-Code auf unseren Server hochladen (7 Tage Speicherung, dann automatische
                  Löschung).
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 shrink-0">•</span>
                <span>
                  <strong>Modul-Aufrufe:</strong> Beim ersten Öffnen eines Moduls pro Sitzung wird die Modul-ID anonym
                  protokolliert (Erasmus-KPI).
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 shrink-0">•</span>
                <span>
                  <strong>Zertifikat:</strong> Beim Download wird dein Name und der erreichte XP-Stand zur
                  Verifikation in unserer Datenbank gespeichert. Die PDF-Erstellung erfolgt in deinem Browser; der
                  Name erscheint auf dem Zertifikat und ist über die Verifikations-ID online prüfbar.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 shrink-0">•</span>
                <span>
                  <strong>NPS-Feedback:</strong> Optional nach bestandenem Quiz: Bewertung (0–10) und optionaler
                  Kommentar, anonym ohne Nutzer-ID.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 shrink-0">•</span>
                <span>
                  <strong>Offline-Modus:</strong> Ein Service Worker speichert besuchte Seiten und Bilder lokal auf
                  deinem Gerät — keine Übermittlung an Dritte.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">Kein Login, keine Tracking-Cookies</h2>
            <p>
              SPARK benötigt keine Registrierung und setzt keine Werbe- oder Tracking-Cookies. Technisch notwendige
              lokale Speicherung (localStorage, Service Worker Cache) dient ausschliesslich der Lernfunktion.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">Datenspeicherung</h2>
            <p>
              Serverseitige Statistiken und Zertifikatsdaten werden in PostgreSQL auf einem Server in der EU (Hetzner,
              Deutschland) gespeichert. Es findet keine Weitergabe an Dritte statt.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">Rechtsgrundlage</h2>
            <p>
              Anonyme Nutzungsstatistiken: berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO). Zertifikatsname:
              Vertragserfüllung bzw. berechtigtes Interesse an verifizierbaren Abschlussnachweisen im Erasmus-Programm.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">Deine Rechte</h2>
            <p className="mb-2">
              Lokalen Fortschritt kannst du jederzeit im Dashboard zurücksetzen oder in den Browsereinstellungen
              löschen. Bei Zertifikatsdaten wende dich an{" "}
              <a href="mailto:info@mmind.ai" className="text-indigo-500 hover:underline">
                info@mmind.ai
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">Änderungen</h2>
            <p>Diese Datenschutzerklärung gilt ab Mai 2025. Bei wesentlichen Änderungen wird die Seite aktualisiert.</p>
          </section>
        </div>

        <div className="mt-10 text-center text-xs text-gray-400">
          MMIND GmbH · Schaan, Liechtenstein · mmind.ai
        </div>
      </div>
    </div>
  );
}
