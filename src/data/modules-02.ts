// Rich slide format for Modul 02 — ChatGPT Deep Dive
import type { Block, RichSlide } from "@/data/modules-01";

export type { Block, RichSlide };

export const MODUL_02_SLIDES: RichSlide[] = [
  {
    label: "Was ist ChatGPT?",
    title: "Keine Suchmaschine — kein Orakel",
    blocks: [
      { type: "image", src: "/slides/02/s01.png", alt: "Freundlicher KI-Chatbot-Roboter mit Icons" },
      {
        type: "intro",
        emoji: "🤖",
        text: "ChatGPT generiert Text basierend auf Wahrscheinlichkeiten — es sucht nichts, es weiss nichts. Es hat Muster aus Milliarden Texten gelernt.",
      },
      {
        type: "stat-grid",
        stats: [
          { emoji: "📚", value: "1 Bio.", label: "Trainings-Token" },
          { emoji: "🌍", value: "180+", label: "Länder verfügbar" },
          { emoji: "👤", value: "200 Mio.", label: "Wöchentliche Nutzer" },
          { emoji: "⚡", value: "0.75", label: "Wörter pro Token" },
        ],
      },
      {
        type: "two-col",
        cols: [
          {
            emoji: "✅",
            title: "Stärken",
            titleColor: "#065F46",
            items: [
              "Formulieren & Umschreiben",
              "Zusammenfassen",
              "Erklären & Strukturieren",
              "Übersetzen mit Kontext",
              "Brainstorming & Ideen",
            ],
            bg: "#ECFDF5",
            border: "#A7F3D0",
            textColor: "#064E3B",
          },
          {
            emoji: "❌",
            title: "Schwächen",
            titleColor: "#991B1B",
            items: [
              "Aktuelle Fakten (kein Web)",
              "Genaue Berechnungen",
              "Quellenangaben prüfen",
              "Aktuelles Datum/Uhrzeit",
              "Halluzinationen möglich",
            ],
            bg: "#FEF2F2",
            border: "#FECACA",
            textColor: "#7F1D1D",
          },
        ],
      },
      {
        type: "highlight",
        emoji: "💡",
        label: "Die beste Analogie",
        text: "ChatGPT ist wie ein Mensch, der extrem viel gelesen hat — aber alles aus dem Gedächtnis sagt, ohne nachzuschauen.",
      },
    ],
  },
  {
    label: "Wie LLMs funktionieren",
    title: "Die Magie dahinter — einfach erklärt",
    blocks: [
      { type: "image", src: "/slides/02/s02.png", alt: "Abstraktes neuronales Netzwerk mit Tokens" },
      {
        type: "intro",
        emoji: "🔬",
        text: "Ein Large Language Model (LLM) arbeitet nicht mit Bedeutung — es berechnet das wahrscheinlichste nächste Wort. Milliardenmal. Sehr schnell.",
      },
      {
        type: "duties-list",
        items: [
          { title: "Training", desc: "Das Modell liest Milliarden Texte aus dem Internet" },
          { title: "Lernen", desc: "Es lernt: «Nach diesem Wort kommt wahrscheinlich dieses»" },
          { title: "Tokenisierung", desc: "Es arbeitet nicht mit Wörtern, sondern Tokens (~0.75 Wörter)" },
          { title: "Kontext", desc: "Deine Eingabe (Prompt) gibt dem Modell den Startpunkt" },
          { title: "Ausgabe", desc: "Es wählt Token für Token das Wahrscheinlichste — bis zur Antwort" },
        ],
      },
      {
        type: "scenario",
        question: "Vervollständige: «Die Katze sitzt auf der...»",
        verdict: "allowed",
        answer: "Das Modell «weiss» die Antwort nicht — es kennt nur das Muster aus Millionen Texten. Genau das macht es so mächtig und so limitiert zugleich.",
      },
    ],
  },
  {
    label: "Prompt-Grundregeln",
    title: "Garbage In, Garbage Out",
    blocks: [
      { type: "image", src: "/slides/02/s03.png", alt: "Person am Laptop mit Glühbirne — guter Prompt" },
      {
        type: "intro",
        emoji: "🎯",
        text: "Die Qualität deiner Eingabe bestimmt die Qualität der Ausgabe — direkt und massgeblich. Gute Prompts sind eine Skill wie gute Google-Suchen.",
      },
      {
        type: "checklist",
        title: "Die 4 Grundregeln eines guten Prompts:",
        items: [
          "Kontext geben — Wer bist du? Was ist die Situation?",
          "Aufgabe klar formulieren — Was genau soll ChatGPT tun?",
          "Format angeben — Liste? Tabelle? 3 Sätze? Auf Deutsch?",
          "Beispiel mitgeben — «Schreib wie dieses Beispiel: [...]»",
        ],
      },
      {
        type: "two-col",
        cols: [
          {
            emoji: "❌",
            title: "Schlechter Prompt",
            titleColor: "#991B1B",
            items: [
              "«Schreib was über Marketing»",
              "→ Vage, kein Kontext",
              "→ Zu generisch",
              "→ Unbrauchbares Ergebnis",
            ],
            bg: "#FEF2F2",
            border: "#FECACA",
            textColor: "#7F1D1D",
          },
          {
            emoji: "✅",
            title: "Guter Prompt",
            titleColor: "#065F46",
            items: [
              "«Du bist Marketing-Experte für KMUs. 5 Social-Media-Posts für ein veganes Restaurant. 2–3 Sätze, Deutsch, locker.»",
            ],
            bg: "#ECFDF5",
            border: "#A7F3D0",
            textColor: "#064E3B",
          },
        ],
      },
    ],
  },
  {
    label: "Profi-Techniken",
    title: "4 Techniken die wirklich funktionieren",
    blocks: [
      { type: "image", src: "/slides/02/s04.png", alt: "4 Technik-Icons: Rolle, Denken, Beispiele, Verfeinern" },
      {
        type: "intro",
        emoji: "🚀",
        text: "Diese 4 Techniken kennen Profis — und sie machen den Unterschied zwischen durchschnittlichen und exzellenten KI-Ergebnissen.",
      },
      {
        type: "risk-pyramid",
        levels: [
          {
            emoji: "🎭",
            title: "Role Prompting",
            desc: "«Verhalte dich wie ein erfahrener Anwalt und prüfe diesen Vertrag auf Risiken»",
            badge: "ROLLEN",
            bg: "#FFF7ED",
            color: "#D97706",
          },
          {
            emoji: "🧠",
            title: "Chain of Thought",
            desc: "«Denke Schritt für Schritt nach, bevor du antwortest» → ~40% weniger Fehler",
            badge: "DENKEN",
            bg: "#EFF6FF",
            color: "#2563EB",
          },
          {
            emoji: "📋",
            title: "Few-Shot",
            desc: "«Hier sind 2 Beispiele wie ich das haben möchte: [...]. Jetzt mach das für: [...]»",
            badge: "BEISPIELE",
            bg: "#F0FDF4",
            color: "#16A34A",
          },
          {
            emoji: "🔄",
            title: "Iterieren",
            desc: "«Das ist gut, aber mach es kürzer / formeller / mit mehr Beispielen»",
            badge: "VERFEINERN",
            bg: "#FDF4FF",
            color: "#9333EA",
          },
        ],
      },
      {
        type: "highlight",
        emoji: "⚡",
        label: "Profi-Tipp",
        text: "Kombiniere alle vier: Gib eine Rolle, bitte ums Schritt-für-Schritt-Denken, liefere 1–2 Beispiele, dann verfeinere iterativ.",
      },
    ],
  },
  {
    label: "10 Anwendungen",
    title: "10 Dinge, die du ab heute anders machst",
    blocks: [
      { type: "image", src: "/slides/02/s05.png", alt: "Person mit schwebenden Produktivitäts-Icons" },
      {
        type: "intro",
        emoji: "💼",
        text: "Diese 10 Anwendungen sind sofort nutzbar — kein technisches Vorwissen nötig, einfach ausprobieren.",
      },
      {
        type: "action-steps",
        steps: [
          { emoji: "✉️", when: "E-Mails", action: "Entwurf schreiben lassen, dann anpassen — spart 80% der Schreibzeit" },
          { emoji: "📝", when: "Zusammenfassungen", action: "Langen Text einfügen → «Fasse in 5 Punkten zusammen»" },
          { emoji: "🌍", when: "Übersetzungen", action: "Besser als Google Translate — versteht Kontext und Tonalität" },
          { emoji: "💡", when: "Brainstorming", action: "«Gib mir 20 Ideen für...» — dann die besten 3 auswählen" },
          { emoji: "📊", when: "Daten erklären", action: "«Erkläre mir diese Statistik in einfachen Worten»" },
          { emoji: "🎯", when: "Feedback", action: "«Was ist schwach an diesem Text? Was würdest du verbessern?»" },
          { emoji: "📅", when: "Planung", action: "«Erstelle mir einen Wochenplan für das Projekt XY»" },
          { emoji: "🔍", when: "Recherche", action: "«Was sind die wichtigsten Argumente für und gegen...»" },
          { emoji: "🖊️", when: "Schreiben", action: "Blogposts, Social Posts, Bewerbungen — Erstentwürfe in Sekunden" },
          { emoji: "🎓", when: "Lernen", action: "«Erkläre mir [Thema] wie einem 10-Jährigen» — dann tiefer gehen" },
        ],
      },
    ],
  },
  {
    label: "Branchen-Nutzung",
    title: "Wie Profis ChatGPT wirklich nutzen",
    blocks: [
      { type: "image", src: "/slides/02/s06.png", alt: "Produktivitätskurve mit Berufssilhouetten" },
      {
        type: "intro",
        emoji: "📈",
        text: "Studien zeigen 20–40% Produktivitätssteigerung bei konsequenter Nutzung — das ist kein Hype, das sind gemessene Ergebnisse.",
      },
      {
        type: "two-col",
        cols: [
          {
            emoji: "📣",
            title: "Marketing & HR",
            titleColor: "#92400E",
            items: [
              "Kampagnen-Ideen & Ad-Copy",
              "Zielgruppen-Analyse",
              "Stellenbeschreibungen",
              "Interview-Fragen",
              "Onboarding-Docs",
            ],
            bg: "#FFFBEB",
            border: "#FDE68A",
            textColor: "#78350F",
          },
          {
            emoji: "💻",
            title: "Tech & Beratung",
            titleColor: "#1E40AF",
            items: [
              "Code schreiben & debuggen",
              "Dokumentation (GitHub Copilot)",
              "Präsentationen strukturieren",
              "Berichte & Analysen",
              "Formeln erklären",
            ],
            bg: "#EFF6FF",
            border: "#BFDBFE",
            textColor: "#1E3A8A",
          },
        ],
      },
      {
        type: "stat-grid",
        stats: [
          { emoji: "⏱️", value: "20–40%", label: "Produktivitätssteigerung" },
          { emoji: "✍️", value: "10x", label: "Schnellere Erstentwürfe" },
          { emoji: "🌍", value: "90+", label: "Unterstützte Sprachen" },
          { emoji: "💰", value: "20$/Mo", label: "ChatGPT Plus Preis" },
        ],
      },
    ],
  },
  {
    label: "Custom GPTs",
    title: "Dein persönlicher KI-Assistent",
    blocks: [
      { type: "image", src: "/slides/02/s07.png", alt: "Konfigurierbarer KI-Assistent mit Einstellungs-Icons" },
      {
        type: "intro",
        emoji: "🔧",
        text: "Custom GPTs sind vorkonfigurierte ChatGPT-Versionen mit eigenem Kontext und Verhalten — keine Programmierung nötig, nur eine Textbeschreibung.",
      },
      {
        type: "duties-list",
        items: [
          { title: "Rolle definieren", desc: "Wie soll er sich verhalten? Welchen Ton? Welche Expertise?" },
          { title: "Wissen geben", desc: "PDFs, Dokumente, Webseiten hochladen als Wissensbase" },
          { title: "Grenzen setzen", desc: "Was darf er antworten? Was nicht?" },
          { title: "Testen", desc: "Im Gespräch direkt ausprobieren und verfeinern" },
        ],
      },
      {
        type: "forbidden-list",
        items: [
          { emoji: "🏛️", title: "EU AI Act Checker", desc: "Prüft KI-Systeme automatisch auf Compliance-Risiken" },
          { emoji: "📄", title: "Vertragscheck-Assistent", desc: "Analysiert Mietverträge auf problematische Klauseln" },
          { emoji: "🍽️", title: "Rezept-Coach", desc: "Erstellt Rezepte basierend auf Vorräten und Intoleranzen" },
          { emoji: "📚", title: "Lernbegleiter", desc: "Erklärt Themen immer auf dem gleichen Niveau, passt sich an" },
        ],
        exception: "Erstellen: ChatGPT → Explore GPTs → Create → Anleitung folgen (15 Min.)",
      },
    ],
  },
  {
    label: "Halluzinationen",
    title: "Wenn ChatGPT lügt — und es nicht merkt",
    blocks: [
      { type: "image", src: "/slides/02/s08.png", alt: "Lupe zeigt Warnung in Chat-Bubble" },
      {
        type: "intro",
        emoji: "⚠️",
        text: "ChatGPT erfindet Fakten die plausibel klingen aber falsch sind — mit derselben Selbstsicherheit wie richtige Antworten. Das Modell «weiss» nicht was es nicht weiss.",
      },
      {
        type: "two-col",
        cols: [
          {
            emoji: "🎭",
            title: "Typische Halluzinationen",
            titleColor: "#991B1B",
            items: [
              "Erfundene Studien (echte Autoren)",
              "Falsche Gesetze & Paragrafen",
              "Erfundene Zitate",
              "Falsche Jahreszahlen",
              "Nicht-existierende Bücher",
            ],
            bg: "#FEF2F2",
            border: "#FECACA",
            textColor: "#7F1D1D",
          },
          {
            emoji: "🛡️",
            title: "Wann kritisch prüfen",
            titleColor: "#065F46",
            items: [
              "Medizinische Ratschläge",
              "Rechtliche Fragen",
              "Historische Fakten",
              "Zahlen & Statistiken",
              "Quellenangaben",
            ],
            bg: "#ECFDF5",
            border: "#A7F3D0",
            textColor: "#064E3B",
          },
        ],
      },
      {
        type: "highlight",
        emoji: "🔍",
        label: "Die goldene Regel",
        text: "ChatGPT ist ein Startpunkt, kein Endpunkt. Wichtiges immer mit einer zweiten Quelle verifizieren — besonders bei Fakten, Zahlen und Recht.",
      },
    ],
  },
  {
    label: "Datenschutz",
    title: "Was darf ich reingeben — und was nicht?",
    blocks: [
      { type: "image", src: "/slides/02/s09.png", alt: "Goldenes Schloss schützt private Dokumente" },
      {
        type: "intro",
        emoji: "🔒",
        text: "In der öffentlichen Version kann OpenAI Chats für das Training nutzen. Was du eingibst, verlässt deinen Computer — das hat Konsequenzen.",
      },
      {
        type: "forbidden-list",
        items: [
          { emoji: "🔑", title: "Passwörter & API-Keys", desc: "Zugangsdaten niemals eingeben — einmal geteilt, immer potenziell kompromittiert" },
          { emoji: "👤", title: "Kundendaten", desc: "Namen, E-Mails, Adressen von echten Personen — DSGVO-Verstos möglich" },
          { emoji: "💼", title: "Vertrauliche Unternehmensdaten", desc: "Finanzdaten, Strategiepläne, interne Berichte" },
          { emoji: "🏥", title: "Gesundheitsdaten", desc: "Patientendaten, Krankenakten — streng geschützt" },
        ],
        exception: "Lösung für Unternehmen: ChatGPT Team/Enterprise — Daten werden NICHT für Training genutzt.",
      },
      {
        type: "checklist",
        title: "Das ist sicher einzugeben:",
        items: [
          "Anonymisierte Texte («Ein Kunde hat folgendes Problem...»)",
          "Öffentlich verfügbare Informationen",
          "Deine eigenen kreativen Texte",
          "Allgemeine Fachfragen ohne Personenbezug",
        ],
      },
    ],
  },
  {
    label: "KI-Vergleich 2026",
    title: "GPT-4o vs. Claude vs. Gemini",
    blocks: [
      { type: "image", src: "/slides/02/s10.png", alt: "Drei KI-Modelle auf Siegertreppchen" },
      {
        type: "intro",
        emoji: "🏆",
        text: "Kein Modell ist in allem besser — jedes hat Stärken. Das Ziel: das Richtige für die Aufgabe nutzen, nicht einfach das bekannteste.",
      },
      {
        type: "risk-pyramid",
        levels: [
          {
            emoji: "💬",
            title: "GPT-4o (OpenAI)",
            desc: "Bestes Allroundmodell · Stärken: Coding, Bild-Analyse, breite Nutzung",
            badge: "ALLROUND",
            bg: "#F0FDF4",
            color: "#16A34A",
          },
          {
            emoji: "📝",
            title: "Claude Sonnet (Anthropic)",
            desc: "Stärke: Lange Dokumente, nuanciertes Schreiben, Datenschutz (EU-Server möglich)",
            badge: "SCHREIBEN",
            bg: "#EFF6FF",
            color: "#2563EB",
          },
          {
            emoji: "🔍",
            title: "Gemini (Google)",
            desc: "Stärke: Google-Integration, Echtzeit-Web-Zugriff, multimodal",
            badge: "GOOGLE",
            bg: "#FFF7ED",
            color: "#D97706",
          },
        ],
      },
      {
        type: "stat-grid",
        stats: [
          { emoji: "🆓", value: "Kostenlos", label: "GPT-4o Mini / Gemini Free" },
          { emoji: "💎", value: "20$/Mo", label: "GPT-4o Plus / Claude Pro" },
          { emoji: "🏢", value: "25$/Mo", label: "ChatGPT Team (kein Training)" },
          { emoji: "🌍", value: "2030", label: "EU-Server: Google/MS versprochen" },
        ],
      },
      {
        type: "highlight",
        emoji: "🎯",
        label: "Empfehlung",
        text: "Für den Einstieg: ChatGPT Free. Für professionellen Einsatz mit Datenschutz: ChatGPT Team oder Claude Pro. Für Google-Workspace-Nutzer: Gemini.",
      },
    ],
  },
  {
    label: "7-Tage-Challenge",
    title: "Von Anfänger zu Profi — in 7 Tagen",
    blocks: [
      { type: "image", src: "/slides/02/s11.png", alt: "7-Stufen-Treppe mit Sternen und goldenem Sonnenaufgang" },
      {
        type: "intro",
        emoji: "🏃",
        text: "7 Tage, 7 konkrete Aufgaben — je 10–15 Minuten. Am Ende hast du mehr ChatGPT-Erfahrung als 90% aller Nutzer.",
      },
      {
        type: "timeline",
        events: [
          { date: "Tag 1", desc: "E-Mail mit ChatGPT schreiben lassen — vergleiche mit deiner eigenen Version" },
          { date: "Tag 2", desc: "Einen langen Text zusammenfassen lassen (Artikel, PDF, Meeting-Protokoll)" },
          { date: "Tag 3", desc: "Role Prompting ausprobieren — ChatGPT als Experte deiner Wahl" },
          { date: "Tag 4", desc: "Chain of Thought nutzen für eine komplexe Entscheidung", active: true },
          { date: "Tag 5", desc: "Einen Custom GPT erkunden oder selbst erstellen" },
          { date: "Tag 6", desc: "Etwas Kreatives: Gedicht, Geschichte, Konzept — lass dich überraschen" },
          { date: "Tag 7", desc: "Reflektieren: Was hat am besten funktioniert? Was nutzt du ab jetzt täglich?" },
        ],
      },
      {
        type: "quote",
        text: "Die KI selbst zu nutzen ist die beste Schulung — keine Theorie ersetzt 10 Minuten echte Praxis.",
        author: "Phi Yen Oehri, MMIND.ai",
      },
      {
        type: "highlight",
        emoji: "💬",
        label: "Bereit für das Quiz?",
        text: "Bestehe das Quiz und verdiene dein «Prompt Master»-Badge + bis zu 150 XP!",
      },
    ],
  },
];
