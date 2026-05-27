import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz — SPARK",
  description: "Datenschutzerklärung der SPARK KI-Trainingsplattform von MMIND GmbH",
};

const MMIND_PRIVACY_URL = "https://mmind.ai/datenschutz";

export default function DatenschutzPage() {
  return (
    <div className="min-h-dvh bg-[#FAFAFA]">
      <div className="max-w-2xl mx-auto px-4 py-8 pb-16">
        <Link href="/" className="text-indigo-500 hover:text-indigo-700 text-sm mb-6 inline-block">
          ← Zurück
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Datenschutzerklärung</h1>
        <p className="text-sm text-gray-500 mb-6">
          SPARK KI-Trainingsplattform · Stand: Mai 2026
        </p>

        <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
          <section className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
            <h2 className="font-bold text-gray-900 text-base mb-2">Übergeordnete Datenschutzerklärung</h2>
            <p>
              SPARK wird von der MMIND GmbH betrieben. Diese Erklärung beschreibt die Datenverarbeitung
              speziell im Zusammenhang mit der Nutzung von SPARK unter{" "}
              <strong>spark.mmind.space</strong>. Für allgemeine Informationen zu MMIND (Website mmind.ai,
              Newsletter, Veranstaltungen, Zahlungsabwicklung, Auftragsverarbeiter, Drittstaatübermittlungen
              und weitere Services) gilt ergänzend die umfassende Datenschutzerklärung der MMIND GmbH:
            </p>
            <p className="mt-3">
              <a
                href={MMIND_PRIVACY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Datenschutzerklärung auf mmind.ai →
              </a>
            </p>
            <p className="mt-3 text-gray-600">
              Bei Widersprüchen zwischen dieser SPARK-spezifischen Erklärung und der MMIND-Erklärung geht im
              Zweifel die spezifischere Regelung für SPARK vor; im Übrigen gelten die Bestimmungen auf mmind.ai.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">1. Verantwortliche Stelle</h2>
            <p>
              Verantwortlich für die Datenverarbeitung im Rahmen von SPARK ist:
            </p>
            <p className="mt-2">
              MMIND GmbH
              <br />
              Duxgass 55
              <br />
              9494 Schaan, Fürstentum Liechtenstein
              <br />
              E-Mail:{" "}
              <a href="mailto:info@mmind.ai?subject=Datenschutz%20SPARK" className="text-indigo-500 hover:underline">
                info@mmind.ai
              </a>{" "}
              (Betreff: „Datenschutz SPARK“)
              <br />
              Web:{" "}
              <a href="https://mmind.ai" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">
                mmind.ai
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">2. Anwendbares Recht und Geltungsbereich</h2>
            <p>
              Wir verarbeiten personenbezogene Daten im Einklang mit der Europäischen Datenschutz-Grundverordnung
              (DSGVO, Verordnung (EU) 2016/679) in der im EWR-Abkommen enthaltenen Fassung, dem Liechtensteinischen
              Datenschutzgesetz (DSG) sowie — soweit Sie Ihren Wohnsitz in der Schweiz haben — dem Schweizerischen
              Datenschutzgesetz (nDSG), soweit anwendbar.
            </p>
            <p className="mt-2">
              Diese Erklärung gilt für alle Besucher und Nutzer von SPARK, unabhängig davon, ob ein
              Vertragsverhältnis mit MMIND besteht. SPARK richtet sich nicht an Minderjährige (Personen unter 18 Jahren).
              Wir erheben wissentlich keine Daten von Minderjährigen.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">3. Beschreibung von SPARK</h2>
            <p>
              SPARK ist eine webbasierte, gamifizierte Lernplattform zu Themen der Künstlichen Intelligenz. Die Nutzung
              erfolgt ohne Registrierung und ohne Login. Lernfortschritt, XP, Badges und Quiz-Ergebnisse werden
              primär lokal im Browser gespeichert. Optional können Sie einen Sync-Code nutzen, um Fortschritte
              geräteübergreifend zu übertragen. Nach Abschluss aller Module können Sie ein PDF-Zertifikat mit
              frei wählbarem Namen erstellen und herunterladen; dieses kann über eine Zertifikats-ID online verifiziert werden.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">4. Kategorien verarbeiteter Daten</h2>
            <p className="mb-3">
              Im Folgenden beschreiben wir, welche Daten bei der Nutzung von SPARK anfallen können. Nicht jede
              Kategorie betrifft jeden Nutzer — es hängt von Ihrer konkreten Nutzung ab.
            </p>

            <h3 className="font-semibold text-gray-900 mb-2">4.1 Technische Verbindungs- und Zugriffsdaten</h3>
            <p className="mb-3">
              Bei jedem Aufruf von SPARK übermittelt Ihr Browser automatisch technische Daten an unseren Server
              (z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene URL, Referrer-URL, Browsertyp,
              Betriebssystem, Gerätetyp). Diese Daten werden in Server-Logfiles verarbeitet und dienen der
              Bereitstellung, Stabilität und Sicherheit der Plattform.
            </p>
            <p className="mb-4 text-gray-600">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem Betrieb).
              Speicherdauer: in der Regel maximal 30 Tage, sofern keine längere Aufbewahrung aus Sicherheitsgründen erforderlich ist.
            </p>

            <h3 className="font-semibold text-gray-900 mb-2">4.2 Lernfortschritt (lokal im Browser)</h3>
            <p className="mb-4">
              Ihr Lernfortschritt (gelesene Slides, abgeschlossene Module, Quiz-Ergebnisse, XP, Badges,
              optional NPS-Status, letzte Zertifikats-ID) wird primär in <strong>localStorage</strong> Ihres
              Browsers gespeichert. Diese Daten verlassen Ihr Gerät nicht automatisch. Sie können den
              Fortschritt im Dashboard zurücksetzen oder in den Browsereinstellungen die Website-Daten löschen.
              <br />
              <span className="text-gray-600">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Funktionsfähigkeit der Plattform).
              </span>
            </p>

            <h3 className="font-semibold text-gray-900 mb-2">4.3 Geräte-Sync (optional)</h3>
            <p className="mb-4">
              Wenn Sie einen Sync-Code erstellen oder importieren, wird ein Snapshot Ihres Fortschritts
              (JSON-Daten) auf unserem Server gespeichert. Der Sync-Code ist ein zufälliger, von Ihnen
              weitergegebener Schlüssel — es besteht kein Nutzerkonto. Die Daten werden nach spätestens{" "}
              <strong>7 Tagen</strong> automatisch gelöscht. Eine Zuordnung zu einer natürlichen Person ist nur
              möglich, wenn Sie den Sync-Code oder Inhalt Dritten mitteilen.
              <br />
              <span className="text-gray-600">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch aktive Nutzung der Sync-Funktion)
                bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der von Ihnen gewünschten Funktion).
              </span>
            </p>

            <h3 className="font-semibold text-gray-900 mb-2">4.4 Modul-Aufrufe (anonyme Statistik)</h3>
            <p className="mb-4">
              Beim ersten Öffnen eines Moduls pro Browsersitzung wird die Modul-ID (z. B. „01“) serverseitig
              protokolliert, ohne Zuordnung zu Name, E-Mail oder Login. Zweck: aggregierte Nutzungsstatistik
              zur Auswertung der Plattformnutzung.
              <br />
              <span className="text-gray-600">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Betriebs- und Reichweitenanalyse).
              </span>
            </p>

            <h3 className="font-semibold text-gray-900 mb-2">4.5 Zertifikat und Verifikation</h3>
            <p className="mb-4">
              Wenn Sie ein Zertifikat herunterladen, verarbeiten wir:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>den von Ihnen eingegebenen <strong>Namen</strong> (frei wählbar),</li>
              <li>den erreichten <strong>XP-Stand</strong> und die Anzahl abgeschlossener Module,</li>
              <li>eine eindeutige <strong>Zertifikats-ID</strong> (z. B. SPARK-XXXX-XXXX),</li>
              <li>Zeitpunkt der Ausstellung,</li>
              <li>einen technischen <strong>Abschluss-Hash</strong> zur Vermeidung von Doppelzählungen.</li>
            </ul>
            <p className="mb-4">
              Die PDF-Datei wird in Ihrem Browser erstellt; der Name erscheint auf dem Zertifikat. Über die
              Verifikationsseite kann jede Person mit der Zertifikats-ID prüfen, ob das Zertifikat registriert ist;
              der Name wird dort in abgeschwächter Form angezeigt (z. B. Vorname und Initial des Nachnamens).
              <br />
              <span className="text-gray-600">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Durchführung der von Ihnen angeforderten Leistung)
                und Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an nachprüfbaren Abschlussnachweisen).
                Speicherdauer: für die Dauer des Betriebs der Verifikationsfunktion; Löschung auf Anfrage, soweit
                keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
              </span>
            </p>

            <h3 className="font-semibold text-gray-900 mb-2">4.6 NPS-Feedback (optional)</h3>
            <p className="mb-4">
              Nach bestandenem Quiz können Sie freiwillig eine Bewertung (Skala 0–10) und optional einen
              Kommentar abgeben. Es wird keine Nutzer-ID gespeichert; die Angaben werden mit der Modul-ID
              verknüpft.
              <br />
              <span className="text-gray-600">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch freiwillige Abgabe)
                bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Qualitätsverbesserung).
              </span>
            </p>

            <h3 className="font-semibold text-gray-900 mb-2">4.7 Progressive Web App (PWA) und Offline-Cache</h3>
            <p className="mb-4">
              SPARK kann als PWA installiert werden. Ein <strong>Service Worker</strong> speichert besuchte Seiten,
              Skripte und Bilder lokal auf Ihrem Gerät, um Offline-Nutzung und schnellere Ladezeiten zu ermöglichen.
              Diese Daten werden nicht an Dritte übermittelt. Sie können den Cache in den Browsereinstellungen löschen
              oder die PWA deinstallieren.
              <br />
              <span className="text-gray-600">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an nutzerfreundlicher Bereitstellung).
              </span>
            </p>

            <h3 className="font-semibold text-gray-900 mb-2">4.8 Keine besonderen Kategorien</h3>
            <p>
              Wir verarbeiten keine besonderen Kategorien personenbezogener Daten im Sinne von Art. 9 DSGVO
              (z. B. Gesundheitsdaten, biometrische Daten, Daten über religiöse oder politische Überzeugungen),
              sofern Sie diese nicht freiwillig in Kommentarfeldern (NPS) eingeben. Bitte unterlassen Sie solche
              Angaben in Freitextfeldern.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">5. Cookies und ähnliche Technologien</h2>
            <p className="mb-2">
              SPARK setzt <strong>keine Werbe-, Marketing- oder Analyse-Cookies</strong> Dritter ein und
              verwendet kein externes Tracking (z. B. Google Analytics, Facebook Pixel).
            </p>
            <p className="mb-2">
              Technisch genutzt werden:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>
                <strong>localStorage / Session Storage</strong> im Browser — für Lernfortschritt und Einstellungen
                (technisch erforderlich für die Kernfunktion),
              </li>
              <li>
                <strong>Service-Worker-Cache</strong> — für Offline-Funktion und Performance (lokal auf Ihrem Gerät).
              </li>
            </ul>
            <p>
              Diese Speicherungen sind für den Betrieb von SPARK erforderlich und erfolgen ohne gesonderte
              Einwilligung, soweit sie technisch notwendig sind (Art. 6 Abs. 1 lit. f DSGVO). Details zu Cookies
              auf anderen MMIND-Websites finden Sie in der{" "}
              <a href={MMIND_PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">
                Datenschutzerklärung auf mmind.ai
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">6. Hosting, Auftragsverarbeiter und Speicherort</h2>
            <p className="mb-2">
              Serverseitige Daten (Statistiken, Sync-Snapshots, Zertifikatsregister, NPS, Modul-Aufrufe) werden in
              einer <strong>PostgreSQL-Datenbank</strong> auf Servern der <strong>Hetzner Online GmbH</strong> in
              Deutschland (EU/EWR) gespeichert. Die Anwendung läuft in Docker-Containern auf einem von MMIND
              betriebenen Server; der öffentliche Zugriff erfolgt über HTTPS (TLS-Verschlüsselung) über
              spark.mmind.space.
            </p>
            <p className="mb-2">
              Mit Hetzner wurde ein Auftragsverarbeitungsvertrag (AVV) gemäss Art. 28 DSGVO abgeschlossen, soweit
              erforderlich. Eine Übermittlung personenbezogener Daten aus SPARK an Dritte zu Werbe- oder
              Marketingzwecken findet nicht statt.
            </p>
            <p>
              Weitere von MMIND eingesetzte Auftragsverarbeiter (z. B. Hostinger, Beehiiv, Stripe) betreffen
              primär mmind.ai und andere MMIND-Services, nicht den Kerndatenbestand von SPARK — siehe{" "}
              <a href={MMIND_PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">
                mmind.ai/datenschutz
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">7. Datenübermittlung in Drittstaaten</h2>
            <p>
              Die durch SPARK erhobenen serverseitigen Daten werden in der Regel ausschliesslich innerhalb des
              Europäischen Wirtschaftsraums (EWR) verarbeitet. Soweit im Rahmen des Zugangs zu SPARK dennoch
              Datenübermittlungen in Staaten ausserhalb des EWR erfolgen könnten (z. B. durch CDN, DNS oder
              Infrastruktur von Drittanbietern), erfolgen diese nur unter den Voraussetzungen der DSGVO
              (insbesondere Angemessenheitsbeschluss, Standardvertragsklauseln). Allgemeine Regelungen zu
              Drittstaatübermittlungen bei MMIND:{" "}
              <a href={MMIND_PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">
                mmind.ai/datenschutz
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">8. Speicherdauer (Übersicht)</h2>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-indigo-500 shrink-0">•</span>
                <span><strong>Server-Logfiles:</strong> in der Regel bis zu 30 Tage</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 shrink-0">•</span>
                <span><strong>Sync-Snapshots:</strong> maximal 7 Tage, danach automatische Löschung</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 shrink-0">•</span>
                <span><strong>Modul-Aufrufe / NPS:</strong> bis zur manuellen Löschung oder Einstellung des Betriebs, sofern keine kürzere Frist ausgewiesen wird</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 shrink-0">•</span>
                <span><strong>Zertifikatsdaten:</strong> für die Dauer der Verifikationsfunktion; Löschung auf begründeten Antrag</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 shrink-0">•</span>
                <span><strong>localStorage / PWA-Cache:</strong> bis Sie diese im Browser löschen oder den Fortschritt zurücksetzen</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">9. Datensicherheit</h2>
            <p>
              Wir treffen angemessene technische und organisatorische Massnahmen (u. a. Verschlüsselung der
              Übertragung per HTTPS, Zugriffsbeschränkungen auf Server und Datenbank, regelmässige Updates),
              um personenbezogene Daten vor Verlust, unbefugtem Zugriff und Missbrauch zu schützen. Die
              Datenübertragung im Internet kann trotz Verschlüsselung nicht vollständig ausgeschlossen werden;
              für die Sicherheit ausserhalb unseres Einflussbereichs (z. B. Ihr Endgerät, WLAN) übernehmen wir
              keine Haftung.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">10. Künstliche Intelligenz und Lerninhalte</h2>
            <p>
              SPARK vermittelt Wissen über Künstliche Intelligenz. Die Lerninhalte können KI-generierte oder
              KI-unterstützte Texte und Illustrationen enthalten. Es findet <strong>keine automatisierte
              Entscheidungsfindung</strong> im Sinne von Art. 22 DSGVO statt, die Ihnen gegenüber rechtliche
              Wirkung entfaltet. Es wird kein systematisches Profiling zu Werbezwecken betrieben. Soweit Sie
              freiwillig Texte in Kommentarfelder eingeben, werden diese nicht zur Trainierung externer KI-Modelle
              durch MMIND verwendet, sofern nicht gesondert ausgewiesen.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">11. Ihre Rechte</h2>
            <p className="mb-3">
              Sie haben — je nach anwendbarem Recht — insbesondere folgende Rechte. Anträge richten Sie bitte an{" "}
              <a href="mailto:info@mmind.ai?subject=Datenschutz%20SPARK" className="text-indigo-500 hover:underline">
                info@mmind.ai
              </a>{" "}
              (Betreff: „Datenschutz SPARK“) mit Angabe, welche Daten betroffen sind. Wir antworten in der Regel
              innerhalb von 30 Tagen (Art. 12 Abs. 3 DSGVO).
            </p>
            <ul className="space-y-2">
              <li><strong>Auskunft</strong> (Art. 15 DSGVO) — welche Daten wir über Sie verarbeiten</li>
              <li><strong>Berichtigung</strong> (Art. 16 DSGVO) — Korrektur unrichtiger Daten</li>
              <li><strong>Löschung</strong> (Art. 17 DSGVO) — soweit keine Aufbewahrungspflichten entgegenstehen</li>
              <li><strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
              <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO) — soweit die Verarbeitung auf Einwilligung oder Vertrag beruht</li>
              <li><strong>Widerspruch</strong> (Art. 21 DSGVO) — gegen Verarbeitung auf Basis berechtigter Interessen</li>
              <li><strong>Widerruf einer Einwilligung</strong> (Art. 7 Abs. 3 DSGVO) — für die Zukunft, ohne Rückwirkung</li>
              <li><strong>Beschwerde bei einer Aufsichtsbehörde</strong> (Art. 77 DSGVO)</li>
            </ul>
            <p className="mt-3 text-gray-600">
              Lokalen Lernfortschritt können Sie jederzeit im SPARK-Dashboard zurücksetzen. Für serverseitige
              Zertifikats- oder Sync-Daten kontaktieren Sie uns unter der oben genannten E-Mail.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">12. Aufsichtsbehörden</h2>
            <p className="mb-2">
              Sie haben das Recht, Beschwerde bei einer Datenschutzaufsichtsbehörde einzureichen, z. B.:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>
                <strong>Datenschutzstelle Liechtenstein</strong> — Städtle 38, Postfach 684, LI-9490 Vaduz ·{" "}
                <a href="https://www.datenschutzstelle.li" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">
                  www.datenschutzstelle.li
                </a>
              </li>
              <li>
                <strong>EDÖB (Schweiz)</strong> — für betroffene Personen mit Wohnsitz in der Schweiz ·{" "}
                <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">
                  www.edoeb.admin.ch
                </a>
              </li>
              <li>
                <strong>Nationale Behörde im EU/EWR-Wohnsitzstaat</strong> — am Ort Ihres gewöhnlichen Aufenthalts,
                Arbeitsplatzes oder des mutmasslichen Verstosses
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">13. Änderungen dieser Erklärung</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen (z. B. bei neuen Funktionen,
              geänderten Rechtslagen oder technischen Anpassungen). Massgeblich ist die auf dieser Seite
              veröffentlichte Fassung. Bei wesentlichen Änderungen werden wir Sie durch einen Hinweis auf der
              Plattform informieren, soweit zumutbar.
            </p>
            <p className="mt-2">
              Vollständige Unternehmens-Datenschutzinformation:{" "}
              <a href={MMIND_PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">
                mmind.ai/datenschutz
              </a>
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-xs text-gray-400 space-y-1">
          <div>MMIND GmbH · 9494 Schaan, Liechtenstein</div>
          <div>
            <a href={MMIND_PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">
              mmind.ai/datenschutz
            </a>
            {" · "}
            <a href="mailto:info@mmind.ai" className="text-indigo-500 hover:underline">
              info@mmind.ai
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
