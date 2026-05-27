import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum — SPARK",
  description: "Impressum der SPARK KI-Trainingsplattform",
};

const MMIND_IMPRESSUM_URL = "https://mmind.ai/impressum";

export default function ImpressumPage() {
  return (
    <div className="min-h-dvh bg-[#FAFAFA]">
      <div className="max-w-2xl mx-auto px-4 py-8 pb-16">
        <Link href="/" className="text-indigo-500 hover:text-indigo-700 text-sm mb-6 inline-block">
          ← Zurück
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Impressum</h1>
        <p className="text-sm text-gray-500 mb-6">SPARK · Stand: Mai 2026</p>

        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">Anbieter</h2>
            <p>
              MMIND GmbH
              <br />
              Duxgass 55
              <br />
              9494 Schaan, Fürstentum Liechtenstein
              <br />
              Tel.: +41 76 458 32 96
              <br />
              E-Mail:{" "}
              <a href="mailto:info@mmind.ai" className="text-indigo-500 hover:underline">
                info@mmind.ai
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">Dienst</h2>
            <p>
              SPARK ist eine kostenlose, webbasierte KI-Lernplattform unter{" "}
              <strong>spark.mmind.space</strong> ohne Login. Nutzer können Module absolvieren,
              Quizzes bestehen und optional ein PDF-Zertifikat herunterladen.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">Haftung</h2>
            <p>
              Die Lerninhalte und KI-generierten Texte dienen der Information und ersetzen keine
              professionelle Beratung. MMIND übernimmt keine Gewähr für Richtigkeit, Vollständigkeit
              und Aktualität. Entscheidungen triffst du in eigener Verantwortung.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 text-base mb-2">Vollständiges Impressum</h2>
            <p>
              Das vollständige Impressum und weitere rechtliche Hinweise der MMIND GmbH findest du unter{" "}
              <a
                href={MMIND_IMPRESSUM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline"
              >
                mmind.ai/impressum
              </a>
              . Datenschutz:{" "}
              <Link href="/datenschutz" className="text-indigo-500 hover:underline">
                Datenschutzerklärung SPARK
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
