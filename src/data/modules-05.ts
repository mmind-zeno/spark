// Rich slide format for Modul 05 — KI & Berufe der Zukunft
import type { Block, RichSlide } from "@/data/modules-01";
export type { Block, RichSlide };

export const MODUL_05_SLIDES: RichSlide[] = [
  {
    label: "Die ehrliche Antwort",
    title: "Nimmt KI meinen Job? — Die ehrliche Antwort",
    blocks: [
      { type: "image", src: "/slides/05/s01.png", alt: "Mensch und Roboter geben sich die Hand im modernen Büro" },
      {
        type: "intro",
        emoji: "🤝",
        text: "Nicht «KI vs. Mensch» — sondern «Mensch mit KI vs. Mensch ohne KI». Das ist der entscheidende Unterschied.",
      },
      {
        type: "stat-grid",
        stats: [
          { emoji: "📉", value: "85 Mio.", label: "Jobs verdrängt bis 2030 (WEF)" },
          { emoji: "📈", value: "97 Mio.", label: "Neue Jobs entstehen (WEF)" },
          { emoji: "✅", value: "+12 Mio.", label: "Netto-Wachstum" },
          { emoji: "⚠️", value: "30%", label: "Aller Arbeitsstunden automatisierbar (McKinsey)" },
        ],
      },
      {
        type: "highlight",
        emoji: "💡",
        label: "Die wichtigste Erkenntnis",
        text: "Bestimmte AUFGABEN werden automatisiert — nicht ganze BERUFE. Ein Buchhalter der Excel-Tabellen tippt: gefährdet. Ein Buchhalter der strategisch berät: nicht gefährdet.",
      },
    ],
  },
  {
    label: "Was die Maschine übernimmt",
    title: "Was Routine ist, übernimmt die Maschine",
    blocks: [
      { type: "image", src: "/slides/05/s02.png", alt: "Bürodesks die sich in automatisierte Workflows verwandeln" },
      {
        type: "intro",
        emoji: "🤖",
        text: "Die am stärksten betroffenen Bereiche sind nicht verschwinden — sie werden effizienter. Weniger Stellen, mehr Output pro Person.",
      },
      {
        type: "risk-pyramid",
        levels: [
          { emoji: "📋", title: "Sachbearbeitung", desc: "Dateneingabe, Formulare, Routineprüfungen → 1 Person macht was früher 5 machten", badge: "HOCH", bg: "#FEF2F2", color: "#DC2626" },
          { emoji: "📞", title: "Kundenservice Tier 1", desc: "KI-Chatbots übernehmen 80% der Anfragen — komplexe gehen weiter zum Menschen", badge: "HOCH", bg: "#FFF7ED", color: "#EA580C" },
          { emoji: "🖊️", title: "Basis-Content", desc: "Standard-Texte, Produktbeschreibungen: 100 Texte/Tag → direkt betroffen", badge: "MITTEL", bg: "#FEFCE8", color: "#CA8A04" },
          { emoji: "📊", title: "Datenanalyse Basis", desc: "Standard-Reports automatisiert — Interpretation und Empfehlungen bleiben beim Menschen", badge: "MITTEL", bg: "#F0FDF4", color: "#16A34A" },
        ],
      },
    ],
  },
  {
    label: "Neue Berufe",
    title: "Berufe, die 2020 noch nicht existierten",
    blocks: [
      { type: "image", src: "/slides/05/s03.png", alt: "Neue Berufsbilder als Icons verbunden durch leuchtende Linien" },
      {
        type: "intro",
        emoji: "🚀",
        text: "Der Arbeitsmarkt von 2030 braucht Rollen, für die es heute noch keine Ausbildung gibt — aber du kannst sie jetzt lernen.",
      },
      {
        type: "duties-list",
        items: [
          { title: "Prompt Engineer", desc: "KI durch präzise Anweisungen optimal steuern — USA: 80.000–300.000 USD/Jahr, +500% Nachfrage seit 2022" },
          { title: "AI Trainer / RLHF Specialist", desc: "KI durch Feedback-Bewertung trainieren — wächst massiv, viele Remote-Positionen" },
          { title: "AI Ethics Officer", desc: "KI-Systeme auf Fairness und Bias bewerten — Pflichtrolle unter EU AI Act (Hochrisiko)" },
          { title: "AI Integration Specialist", desc: "KI in Unternehmensprozesse implementieren — der «KI-Übersetzer» zwischen IT und Business" },
          { title: "AI Literacy Coach", desc: "Teams KI-Nutzung beibringen — wie dieser Kurs! Einer der am schnellsten wachsenden Berufe" },
        ],
      },
    ],
  },
  {
    label: "Mensch als Dirigent",
    title: "Der Mensch als Dirigent — KI als Orchester",
    blocks: [
      { type: "image", src: "/slides/05/s04.png", alt: "Mensch dirigiert Orchester aus KI-Robotern mit dramatischer Beleuchtung" },
      {
        type: "intro",
        emoji: "🎼",
        text: "Nicht: Mensch ODER Maschine. Sondern: Mensch DIRIGIERT Maschine. Das ist das neue Arbeitsmodell.",
      },
      {
        type: "checklist",
        title: "5 Dinge die KI (noch) nicht kann:",
        items: [
          "Echte Empathie — einen trauernden Kunden wirklich begleiten",
          "Ethisches Urteil — in komplexen Dilemmas die richtige Entscheidung treffen",
          "Physische Präsenz — Handwerk, Pflege, Sport",
          "Kreative Originalität — echte Innovation aus dem Nichts (KI remixed immer)",
          "Verantwortung übernehmen — für Fehler gerade stehen",
        ],
      },
      {
        type: "highlight",
        emoji: "🎯",
        label: "Die neue Kernkompetenz",
        text: "Wissen WANN man KI nutzt — und wann nicht. Die Ausgabe von KI kritisch bewerten. KI so führen, dass sie das tut was man will.",
      },
    ],
  },
  {
    label: "Handwerk & KI",
    title: "Warum der Schreiner sicherer ist als du denkst",
    blocks: [
      { type: "image", src: "/slides/05/s05.png", alt: "Handwerker mit AR-Brille und KI-Overlay an Wand und Holz" },
      {
        type: "intro",
        emoji: "🔨",
        text: "Handwerk ist weniger gefährdet als viele Bürojobs — physische Präsenz ist nicht digitalisierbar. Aber KI macht Handwerker produktiver.",
      },
      {
        type: "two-col",
        cols: [
          {
            emoji: "🛡️",
            title: "Warum sicher",
            titleColor: "#065F46",
            items: [
              "Physische Präsenz nicht digitalisierbar",
              "Unstrukturierte Umgebungen überfordern Roboter",
              "Vertrauen zum Kunden ist persönlich",
              "Jede Baustelle ist einzigartig",
            ],
            bg: "#ECFDF5",
            border: "#A7F3D0",
            textColor: "#064E3B",
          },
          {
            emoji: "⚡",
            title: "Wo KI hilft",
            titleColor: "#1E40AF",
            items: [
              "Schreinerei: KI optimiert Zuschnitte → –30% Verschnitt",
              "Elektriker: AR-Brille zeigt Leitungsverlauf",
              "Bau: KI erkennt Mängel auf Fotos",
              "Garten: KI-Pflanzenkrankheits-App",
            ],
            bg: "#EFF6FF",
            border: "#BFDBFE",
            textColor: "#1E3A8A",
          },
        ],
      },
    ],
  },
  {
    label: "KI & Kreativität",
    title: "Bedrohung oder mächtigstes Werkzeug der Geschichte?",
    blocks: [
      { type: "image", src: "/slides/05/s06.png", alt: "Kreativstudio mit KI-generierter Kunst und menschlichem Künstler" },
      {
        type: "intro",
        emoji: "🎨",
        text: "KI generiert in Sekunden was früher Stunden brauchte. Die Frage ist nicht ob KI kreativ ist — sondern wer die Kreativität steuert.",
      },
      {
        type: "two-col",
        cols: [
          {
            emoji: "🤖",
            title: "Was KI kann",
            titleColor: "#7C3AED",
            items: [
              "Midjourney/DALL-E: Profi-Bilder in Sekunden",
              "Suno/Udio: komplette Songs in 30s",
              "Sora/Runway: Videos aus Text",
              "GitHub Copilot: +30–40% Coding-Speed",
            ],
            bg: "#FDF4FF",
            border: "#E9D5FF",
            textColor: "#4C1D95",
          },
          {
            emoji: "👤",
            title: "Was KI nicht kann",
            titleColor: "#065F46",
            items: [
              "Echte emotionale Tiefe aus Erfahrung",
              "Kulturellen Kontext wirklich verstehen",
              "Verantwortung für kreative Vision",
              "Originäre Ideen (remixed immer nur)",
            ],
            bg: "#ECFDF5",
            border: "#A7F3D0",
            textColor: "#064E3B",
          },
        ],
      },
      {
        type: "highlight",
        emoji: "📈",
        label: "Die Verschiebung",
        text: "Graphic Designer die KI nutzen → 5x produktiver. Die es nicht tun → verlieren Aufträge. Der Wert liegt im Konzept, der Kuration und Kommunikation — nicht in der Produktion.",
      },
    ],
  },
  {
    label: "KI & Gesundheit",
    title: "KI rettet Leben — aber ersetzt keine Ärzte",
    blocks: [
      { type: "image", src: "/slides/05/s07.png", alt: "Arzt und KI analysieren gemeinsam medizinische Bilder" },
      {
        type: "intro",
        emoji: "🏥",
        text: "KI hat das Potenzial Millionen Leben zu retten — aber die Entscheidung bleibt immer beim Menschen.",
      },
      {
        type: "stat-grid",
        stats: [
          { emoji: "🔬", value: "Dermatologen-Niveau", label: "KI erkennt Hautkrebs aus Fotos (Stanford)" },
          { emoji: "💊", value: "4–5 Jahre", label: "Medikamenten-Entwicklung (statt 12)" },
          { emoji: "🧬", value: "AlphaFold", label: "50-Jahre-Problem der Proteinfaltung gelöst" },
          { emoji: "🤝", value: "Immer", label: "KI diagnostiziert — Arzt entscheidet" },
        ],
      },
      {
        type: "highlight",
        emoji: "⚕️",
        label: "Pflege",
        text: "Sturzerkennungs-KI ohne Kamerabild (Datenschutz), Medikamenten-Erinnerungen, mentale Gesundheit (Woebot) — KI entlastet Pflegende für die menschliche Fürsorge.",
      },
    ],
  },
  {
    label: "KI & Bildung",
    title: "Personalisiertes Lernen — endlich für alle",
    blocks: [
      { type: "image", src: "/slides/05/s08.png", alt: "Schüler mit adaptivem KI-Tutor auf holografischem Display" },
      {
        type: "intro",
        emoji: "📚",
        text: "30 Schüler, 1 Lehrer, 1 Tempo — passt für die Mitte, nicht für die Enden. KI macht individuelles Lernen skalierbar.",
      },
      {
        type: "duties-list",
        items: [
          { title: "Adaptives Lernen", desc: "Khan Academy «Khanmigo»: KI-Tutor passt Schwierigkeitsgrad in Echtzeit an jeden Schüler an" },
          { title: "Sofortiges Feedback", desc: "Aufsatz schreiben → sofortige stilistische Rückmeldung ohne auf den Lehrer zu warten" },
          { title: "Sprachenlernen", desc: "Duolingo mit KI: persönliche Konversation + Aussprachefeedback in Echtzeit" },
          { title: "Barrierefreiheit", desc: "Echtzeit-Untertitel, Text-to-Speech, Übersetzung — Lerninhalte in jeder Sprache" },
        ],
      },
      {
        type: "highlight",
        emoji: "👩‍🏫",
        label: "Für Lehrer",
        text: "Mehr Zeit für Motivation, Beziehung und Inspiration — die Aufgaben, die wirklich einen Unterschied machen und die KI nie übernehmen kann.",
      },
    ],
  },
  {
    label: "Unsere Region",
    title: "Was die KI-Revolution für unsere Region bedeutet",
    blocks: [
      { type: "image", src: "/slides/05/s09.png", alt: "Liechtenstein Alpen mit digitalem Datennetzwerk-Overlay" },
      {
        type: "intro",
        emoji: "🏔️",
        text: "FL und die Schweiz haben einen guten Ausgangspunkt — aber KI verändert auch hier die Arbeitswelt fundamental.",
      },
      {
        type: "two-col",
        cols: [
          {
            emoji: "🇱🇮",
            title: "Liechtenstein",
            titleColor: "#1E40AF",
            items: [
              "2% Arbeitslosigkeit — guter Start",
              "Finanzsektor, Industrie, Maschinenbau stark betroffen",
              "Chance: KI-Hub dank EWR + günstige Steuern",
              "AI-Lab.li baut regionale KI-Kompetenz auf",
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
              "UBS: KI spart tausende Back-Office-Stellen",
              "Novartis/Roche: Milliarden in KI-Forschung",
              "Uhren: «Swiss Made» + KI → Premiumisierung",
              "Nationaler KI-Aktionsplan 2025 verabschiedet",
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
    label: "KI lernen — kostenlos",
    title: "Wo du KI-Skills lernst — jetzt, kostenlos",
    blocks: [
      { type: "image", src: "/slides/05/s10.png", alt: "Person mit leuchtenden Zertifikaten als Lernpfad-Treppe" },
      {
        type: "intro",
        emoji: "🎓",
        text: "Die besten KI-Ressourcen sind kostenlos — und in 1 Woche kannst du mehr lernen als die meisten in 1 Jahr.",
      },
      {
        type: "checklist",
        title: "Top kostenlose Ressourcen:",
        items: [
          "Google AI Essentials (Coursera) — ~15 Stunden, kostenlos zum Audit",
          "Microsoft AI Skills Initiative — LinkedIn Learning, kostenlos",
          "Anthropic Prompt Engineering Guide — kostenlos online",
          "fast.ai — praktisches Deep Learning, komplett kostenlos",
          "YouTube: «3Blue1Brown» — intuitive neuronale Netze",
          "Promptingguide.ai — Prompt Engineering von A–Z",
        ],
      },
      {
        type: "highlight",
        emoji: "⚡",
        label: "Wichtigste Ressource",
        text: "Einfach anfangen. Die beste Stunde Lernzeit ist die erste echte Nutzungsstunde — nicht das nächste Tutorial.",
      },
    ],
  },
  {
    label: "Dein Commitment",
    title: "3 Fragen die deine Zukunft formen",
    blocks: [
      { type: "image", src: "/slides/05/s11.png", alt: "Person am Scheideweg mit drei leuchtenden Zukunftspfaden" },
      {
        type: "action-steps",
        steps: [
          {
            emoji: "❓",
            when: "Frage 1: Was ist Routine?",
            action: "Liste alle Aufgaben die du regelmässig mechanisch erledigst — das sind Kandidaten für KI. Mehr Zeit für was nur du kannst.",
          },
          {
            emoji: "💎",
            when: "Frage 2: Was macht dich einzigartig?",
            action: "Welche Kombination aus Wissen, Erfahrung und Beziehungen hast du? Das ist dein Wettbewerbsvorteil den KI nicht replizieren kann.",
          },
          {
            emoji: "🎯",
            when: "Frage 3: Welche KI-Kompetenz in 12 Monaten?",
            action: "1 konkrete Fähigkeit wählen. 1 Stunde/Woche = 52 Stunden/Jahr = Experten-Niveau. Was ist deine?",
          },
        ],
      },
      {
        type: "quote",
        text: "«KI wird nicht alle Jobs wegnehmen. Aber Menschen die KI nutzen, werden die ersetzen die es nicht tun.»",
        author: "Kai-Fu Lee, AI-Pionier",
      },
      {
        type: "highlight",
        emoji: "🎓",
        label: "Alle 5 Module abgeschlossen?",
        text: "Lade jetzt dein persönliches SPARK-Zertifikat herunter — du hast es verdient!",
      },
    ],
  },
];
