// Rich slide format for Modul 01 — EU AI Act
// Each slide has typed visual blocks instead of plain markdown text

export type Block =
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "intro"; emoji: string; text: string }
  | { type: "stat-grid"; stats: { emoji: string; value: string; label: string }[] }
  | { type: "highlight"; emoji: string; label?: string; text: string }
  | { type: "risk-pyramid"; levels: { emoji: string; title: string; desc: string; badge: string; bg: string; color: string }[] }
  | { type: "forbidden-list"; items: { emoji: string; title: string; desc: string }[]; exception?: string }
  | { type: "duties-list"; items: { title: string; desc: string }[] }
  | { type: "timeline"; events: { date: string; desc: string; active?: boolean }[] }
  | { type: "two-col"; cols: { emoji: string; title: string; titleColor: string; items: string[]; bg: string; border: string; textColor: string }[] }
  | { type: "checklist"; title?: string; items: string[] }
  | { type: "scenario"; question: string; verdict: "forbidden" | "allowed"; answer: string }
  | { type: "action-steps"; steps: { emoji: string; when: string; action: string }[] }
  | { type: "quote"; text: string; author?: string }
  | { type: "penalty-box"; penalties: { value: string; label: string }[] };

export type RichSlide = {
  label: string;
  title: string;
  blocks: Block[];
};

export const MODUL_01_SLIDES: RichSlide[] = [
  {
    label: "Einführung",
    title: "Der EU AI Act — Europas Antwort auf die KI-Revolution",
    blocks: [
      { type: "image", src: "/slides/01/s01.png", alt: "EU Netzwerk-Karte" },
      {
        type: "intro",
        emoji: "🌍",
        text: "Das weltweit erste umfassende KI-Gesetz trat 2024 in Kraft — und gilt auch für Firmen aus Liechtenstein, der Schweiz und den USA.",
      },
      {
        type: "stat-grid",
        stats: [
          { emoji: "📅", value: "2024", label: "In Kraft getreten" },
          { emoji: "📄", value: "144", label: "Seiten lang" },
          { emoji: "🌍", value: "27+", label: "EU-Länder betroffen" },
          { emoji: "⏱️", value: "10 Min.", label: "Diese Erklärung" },
        ],
      },
      {
        type: "highlight",
        emoji: "💡",
        label: "Kerngedanke",
        text: "Der AI Act ist wie die DSGVO für Datenschutz — nur für KI. Wer KI in der EU einsetzt oder anbietet, muss sich daran halten.",
      },
    ],
  },
  {
    label: "Warum Regeln?",
    title: "Ohne Regeln kein Vertrauen",
    blocks: [
      { type: "image", src: "/slides/01/s02.png", alt: "KI-Diskriminierung Beispiele" },
      {
        type: "intro",
        emoji: "⚖️",
        text: "KI trifft heute wichtige Entscheidungen über Menschen — Kredite, Bewerbungen, sogar Strafurteile.",
      },
      {
        type: "two-col",
        cols: [
          {
            emoji: "💼",
            title: "Amazon Recruiting-KI",
            titleColor: "#991B1B",
            items: [
              "KI benachteiligte Frauen",
              "Trainiert auf historischen Daten",
              "2018 eingestellt",
              "Niemand hatte es gemerkt",
            ],
            bg: "#FEF2F2",
            border: "#FECACA",
            textColor: "#7F1D1D",
          },
          {
            emoji: "📷",
            title: "Gesichtserkennung",
            titleColor: "#92400E",
            items: [
              "Schlechtere Erkennungsrate",
              "bei dunkler Hautfarbe",
              "MIT-Studie belegt",
              "Bias in Trainingsdaten",
            ],
            bg: "#FFFBEB",
            border: "#FDE68A",
            textColor: "#78350F",
          },
        ],
      },
      {
        type: "highlight",
        emoji: "🧑‍⚖️",
        label: "Fazit",
        text: "Algorithmen können diskriminieren — ohne dass es jemand merkt. Wer Macht hat, braucht Regeln.",
      },
    ],
  },
  {
    label: "4 Risikoklassen",
    title: "Von harmlos bis verboten — das KI-Risiko-Modell",
    blocks: [
      { type: "image", src: "/slides/01/s03.png", alt: "Risiko-Pyramide 4 Klassen" },
      {
        type: "intro",
        emoji: "🔬",
        text: "KI wird nach Gefährlichkeit in 4 Klassen eingeteilt — wie Chemikalien oder Medikamente. Je höher das Risiko, desto strenger die Regeln.",
      },
      {
        type: "risk-pyramid",
        levels: [
          {
            emoji: "🚫",
            title: "Klasse 1 — Inakzeptabel",
            desc: "Verboten — immer, ohne Ausnahme",
            badge: "VERBOTEN",
            bg: "#FEF2F2",
            color: "#DC2626",
          },
          {
            emoji: "⚠️",
            title: "Klasse 2 — Hohes Risiko",
            desc: "Erlaubt mit strengen Auflagen und Dokumentation",
            badge: "STRENG",
            bg: "#FFF7ED",
            color: "#EA580C",
          },
          {
            emoji: "ℹ️",
            title: "Klasse 3 — Begrenztes Risiko",
            desc: "Erlaubt mit Transparenzpflicht (Nutzer muss informiert werden)",
            badge: "TRANSPARENT",
            bg: "#FEFCE8",
            color: "#CA8A04",
          },
          {
            emoji: "✅",
            title: "Klasse 4 — Minimales Risiko",
            desc: "Erlaubt, fast ohne Einschränkungen (85% aller KI-Anwendungen)",
            badge: "FREI",
            bg: "#F0FDF4",
            color: "#16A34A",
          },
        ],
      },
    ],
  },
  {
    label: "Verbotene KI",
    title: "Diese KI ist in der EU verboten — Punkt.",
    blocks: [
      { type: "image", src: "/slides/01/s04.png", alt: "Verbotene KI Überwachung" },
      {
        type: "forbidden-list",
        items: [
          {
            emoji: "🏛️",
            title: "Social Scoring",
            desc: "Bürger nach Verhalten bewerten und Rechte einschränken (wie in China)",
          },
          {
            emoji: "📹",
            title: "Biometrische Echtzeit-Überwachung",
            desc: "Gesichtserkennung auf öffentlichen Plätzen durch Behörden",
          },
          {
            emoji: "🧠",
            title: "Unterschwellige Manipulation",
            desc: "KI die Menschen beeinflusst, ohne dass sie es merken",
          },
          {
            emoji: "🎯",
            title: "Ausnutzen von Schwächen",
            desc: "KI die Sucht, Minderjährige oder psychische Erkrankungen ausnutzt",
          },
        ],
        exception: "Ausnahme: Terrorismusbekämpfung — aber nur mit richterlicher Genehmigung",
      },
      {
        type: "scenario",
        question: "Ein Supermarkt möchte Ladendiebe per Kamera-KI erkennen. Erlaubt?",
        verdict: "forbidden",
        answer: "Nein — verstösst gegen das Verbot biometrischer Kategorisierung ohne ausdrückliche Einwilligung.",
      },
    ],
  },
  {
    label: "Hochrisiko-KI",
    title: "Erlaubt — aber unter strenger Aufsicht",
    blocks: [
      { type: "image", src: "/slides/01/s05.png", alt: "Hochrisiko KI Medizin und HR" },
      {
        type: "intro",
        emoji: "🏗️",
        text: "Hochrisiko-KI ist erlaubt — aber nur mit umfassender Dokumentation und menschlicher Kontrolle.",
      },
      {
        type: "two-col",
        cols: [
          {
            emoji: "🩺",
            title: "Medizin & Justiz",
            titleColor: "#1E40AF",
            items: [
              "KI-Diagnose & Operationsroboter",
              "KI-gestützte Urteilsempfehlungen",
              "Biometrische Identifikation",
            ],
            bg: "#EFF6FF",
            border: "#BFDBFE",
            textColor: "#1E3A8A",
          },
          {
            emoji: "🏢",
            title: "HR & Bildung",
            titleColor: "#065F46",
            items: [
              "Automatisches Bewerber-Screening",
              "KI-Prüfungsbewertung",
              "Kritische Infrastruktur",
            ],
            bg: "#ECFDF5",
            border: "#A7F3D0",
            textColor: "#064E3B",
          },
        ],
      },
      {
        type: "highlight",
        emoji: "📋",
        label: "Merksatz",
        text: "Hochrisiko = Risiko-Assessment + Dokumentation + menschliche Aufsicht + Registrierung bei EU-Behörde",
      },
    ],
  },
  {
    label: "Klassen 3 & 4",
    title: "Was du jeden Tag nutzt — und warum es meist OK ist",
    blocks: [
      { type: "image", src: "/slides/01/s06.png", alt: "Chatbot und Empfehlungs-KI Alltag" },
      {
        type: "intro",
        emoji: "📱",
        text: "85% aller KI-Anwendungen fallen in Klasse 3 oder 4 — mit wenig bis keinen Einschränkungen.",
      },
      {
        type: "two-col",
        cols: [
          {
            emoji: "ℹ️",
            title: "Klasse 3 — Transparent",
            titleColor: "#92400E",
            items: [
              "Chatbots → als KI kennzeichnen",
              "KI-Bilder/Videos → Deepfake-Label",
              "Emotionserkennung → Nutzer informieren",
            ],
            bg: "#FFFBEB",
            border: "#FDE68A",
            textColor: "#78350F",
          },
          {
            emoji: "✅",
            title: "Klasse 4 — Frei",
            titleColor: "#065F46",
            items: [
              "Spam-Filter ✅",
              "Netflix & Spotify-Empfehlungen ✅",
              "KI in Videospielen ✅",
              "Keine besonderen Auflagen",
            ],
            bg: "#F0FDF4",
            border: "#A7F3D0",
            textColor: "#064E3B",
          },
        ],
      },
      {
        type: "stat-grid",
        stats: [
          { emoji: "✅", value: "85%", label: "Aller KI-Apps in Klasse 3/4" },
          { emoji: "⚠️", value: "15%", label: "Hochrisiko oder verboten" },
        ],
      },
    ],
  },
  {
    label: "Pflichten",
    title: "Was du als Unternehmer wissen MUSST",
    blocks: [
      { type: "image", src: "/slides/01/s07.png", alt: "Compliance Checkliste und Bussgelder" },
      {
        type: "duties-list",
        items: [
          { title: "Risikomanagement", desc: "Risiken dokumentieren und aktiv minimieren" },
          { title: "Datenqualität", desc: "Trainingsdaten müssen repräsentativ und unverzerrt sein" },
          { title: "Transparenz", desc: "Nutzer müssen wissen, wenn KI eine Entscheidung trifft" },
          { title: "Menschliche Aufsicht", desc: "KI-Entscheidungen müssen überprüfbar und korrigierbar sein" },
          { title: "Genauigkeit & Robustheit", desc: "System muss zuverlässig und sicher funktionieren" },
        ],
      },
      {
        type: "penalty-box",
        penalties: [
          { value: "35 Mio. €", label: "Max. Bussgelder" },
          { value: "7%", label: "Weltweiter Jahresumsatz" },
          { value: "3%", label: "Bei mittleren Vergehen" },
          { value: "1,5%", label: "Falsche Informationen" },
        ],
      },
    ],
  },
  {
    label: "Zeitplan",
    title: "Was gilt ab wann? Der Fahrplan 2024–2027",
    blocks: [
      { type: "image", src: "/slides/01/s08.png", alt: "Zeitstrahl AI Act 2024 bis 2027" },
      {
        type: "intro",
        emoji: "🗓️",
        text: "Der AI Act wird schrittweise eingeführt — aber wichtige Verbote gelten bereits jetzt.",
      },
      {
        type: "timeline",
        events: [
          { date: "Aug 2024", desc: "AI Act offiziell in Kraft getreten" },
          { date: "Feb 2025", desc: "🔴 Verbote (Klasse 1) wirksam — jetzt schon Pflicht!", active: true },
          { date: "Aug 2025", desc: "Pflichten für General Purpose AI (GPT-4, Claude, Gemini...)" },
          { date: "Aug 2026", desc: "Hochrisiko-KI-Regeln vollständig wirksam" },
          { date: "Aug 2027", desc: "Alle restlichen Bestimmungen in Kraft" },
        ],
      },
      {
        type: "highlight",
        emoji: "⚠️",
        label: "Achtung",
        text: "«Ich kannte das Gesetz nicht» schützt nicht vor Strafe — die Verbote gelten seit Februar 2025!",
      },
    ],
  },
  {
    label: "FL & CH",
    title: "Betrifft uns das überhaupt?",
    blocks: [
      { type: "image", src: "/slides/01/s09.png", alt: "Liechtenstein und Schweiz im EU-Kontext" },
      {
        type: "two-col",
        cols: [
          {
            emoji: "🇱🇮",
            title: "Liechtenstein",
            titleColor: "#1E40AF",
            items: [
              "EWR-Mitglied → AI Act gilt direkt",
              "Umsetzung via EWR-Komitee",
              "Gleiche Inhalte wie EU-Regelung",
              "Vereinfachte Pflichten für KMU geplant",
            ],
            bg: "#EFF6FF",
            border: "#BFDBFE",
            textColor: "#1E3A8A",
          },
          {
            emoji: "🇨🇭",
            title: "Schweiz",
            titleColor: "#065F46",
            items: [
              "Kein EU/EWR → nicht direkt betroffen",
              "ABER: EU-Kunden = EU-Regeln",
              "Eigener CH-Rahmen ab 2026",
              "MMIND-Kunden in DE/AT → betroffen",
            ],
            bg: "#ECFDF5",
            border: "#A7F3D0",
            textColor: "#064E3B",
          },
        ],
      },
      {
        type: "highlight",
        emoji: "🎯",
        label: "Fazit für uns",
        text: "In FL seid ihr direkt betroffen. Als CH-Firma, die EU-Kunden hat, müsst ihr euch ebenfalls an den AI Act halten.",
      },
    ],
  },
  {
    label: "Selbst-Check",
    title: "5 Fragen — bist du AI Act ready?",
    blocks: [
      { type: "image", src: "/slides/01/s10.png", alt: "AI Act Compliance Checkliste" },
      {
        type: "intro",
        emoji: "🔍",
        text: "Beantworte diese 5 Fragen ehrlich. Wer alle mit Ja beantworten kann, ist grundlegend AI Act compliant.",
      },
      {
        type: "checklist",
        items: [
          "Ich weiss, welche KI-Systeme mein Unternehmen einsetzt",
          "Ich habe geprüft, in welche Risikoklasse sie fallen",
          "Ich informiere Nutzer, wenn KI eine Entscheidung trifft",
          "Es gibt einen Menschen, der KI-Entscheidungen prüfen kann",
          "Ich habe einen internen Ansprechpartner für KI-Compliance",
        ],
      },
      {
        type: "highlight",
        emoji: "📚",
        label: "Ressourcen",
        text: "EU AI Act Volltext: eur-lex.europa.eu · AI Act Explorer: artificialintelligenceact.eu · Beratung: mmind.ai",
      },
    ],
  },
  {
    label: "Nächste Schritte",
    title: "Dein nächster Schritt",
    blocks: [
      { type: "image", src: "/slides/01/s11.png", alt: "Person am Scheideweg mit KI-Wissen" },
      {
        type: "action-steps",
        steps: [
          {
            emoji: "⚡",
            when: "Sofort",
            action: "Prüfe welche KI-Tools du privat und beruflich nutzt — und was sie über dich wissen",
          },
          {
            emoji: "📅",
            when: "Diese Woche",
            action: "Lies den 1-seitigen EU AI Act Überblick (AI Act Explorer Tool ist kostenlos)",
          },
          {
            emoji: "🗣️",
            when: "Diesen Monat",
            action: "Sprich mit deinem Team über KI-Verantwortung — wer ist bei euch der AI Coordinator?",
          },
        ],
      },
      {
        type: "quote",
        text: "Mit KI-Macht kommt KI-Verantwortung.",
        author: "frei nach Spider-Man 🕷️",
      },
      {
        type: "highlight",
        emoji: "🏛️",
        label: "Bereit für das Quiz?",
        text: "Bestehe das Quiz und verdiene dein «AI Act Expert»-Badge + bis zu 150 XP!",
      },
    ],
  },
];
