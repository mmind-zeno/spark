// Rich slide format for Modul 03 — KI & Ernährung
import type { Block, RichSlide } from "@/data/modules-01";
export type { Block, RichSlide };

export const MODUL_03_SLIDES: RichSlide[] = [
  {
    label: "Einführung",
    title: "Von der Küche ins Labor — KI revolutioniert was wir essen",
    blocks: [
      { type: "image", src: "/slides/03/s01.png", alt: "Teller mit Gemüse und DNA-Helix — KI analysiert Ernährung" },
      {
        type: "intro",
        emoji: "🥗",
        text: "KI analysiert bereits was wir essen, wie wir essen — und was uns wirklich gut tut. Individuell, in Echtzeit, auf Basis deiner eigenen Körperdaten.",
      },
      {
        type: "stat-grid",
        stats: [
          { emoji: "😰", value: "800 Mio.", label: "Menschen mit Nahrungsmittelunverträglichkeiten" },
          { emoji: "🇪🇺", value: "1 von 3", label: "Europäer mit Intoleranz" },
          { emoji: "⏱️", value: "4–7 Jahre", label: "Ø Diagnosezeit Histamin" },
          { emoji: "🤖", value: "Tage", label: "KI-Diagnosezeit heute" },
        ],
      },
    ],
  },
  {
    label: "Personalisiert",
    title: "Dein Körper, deine Daten, deine Diät",
    blocks: [
      { type: "image", src: "/slides/03/s02.png", alt: "Körpersilhouette mit DNA, Mikrobiom und Glukosemonitor" },
      {
        type: "intro",
        emoji: "🧬",
        text: "Personalisierte Ernährung nutzt deine individuellen Körperdaten — DNA, Mikrobiom, Blutzucker — statt allgemeiner Empfehlungen.",
      },
      {
        type: "duties-list",
        items: [
          { title: "DNA-Test + KI", desc: "«Du verarbeitest Koffein langsam — reduziere Kaffee nach 14 Uhr»" },
          { title: "Mikrobiom-Analyse", desc: "«Deine Darmflora braucht mehr fermentierte Lebensmittel»" },
          { title: "Glukosemonitor + KI", desc: "«Reis lässt deinen Blutzucker stark schwanken — probiere Quinoa»" },
        ],
      },
      {
        type: "highlight",
        emoji: "📊",
        label: "ZOE-Studie (UK)",
        text: "2 Wochen Körperdaten → lebenslange personalisierte Empfehlungen → 30% bessere Blutzuckerwerte nach 3 Monaten vs. allgemeine Ernährungsempfehlungen.",
      },
    ],
  },
  {
    label: "Supermarkt",
    title: "Der KI-Assistent im Supermarkt",
    blocks: [
      { type: "image", src: "/slides/03/s03.png", alt: "Smartphone scannt Barcode mit grünem Häkchen" },
      {
        type: "intro",
        emoji: "🛒",
        text: "200+ versteckte Bezeichnungen für Gluten, E-Nummern die Histamin freisetzen — ohne KI ist das schlicht nicht handhabbar.",
      },
      {
        type: "two-col",
        cols: [
          {
            emoji: "😩",
            title: "Das Problem",
            titleColor: "#991B1B",
            items: [
              "200+ Bezeichnungen für Gluten",
              "E-Nummern = versteckte Liberatoren",
              "Ø 4–7 Jahre bis Diagnose",
              "Kreuzreaktionen unbekannt",
            ],
            bg: "#FEF2F2",
            border: "#FECACA",
            textColor: "#7F1D1D",
          },
          {
            emoji: "✅",
            title: "Was KI löst",
            titleColor: "#065F46",
            items: [
              "Barcode → sofortige Prüfung",
              "Foto der Zutatenliste → OCR + KI",
              "Semantisches Matching (Synonyme)",
              "Persönliches Intoleranz-Profil",
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
    label: "KI-Koch",
    title: "Der Koch, der dich kennt — und niemals schläft",
    blocks: [
      { type: "image", src: "/slides/03/s04.png", alt: "KI-Roboterkoch mit Zutaten-Icons" },
      {
        type: "intro",
        emoji: "👨‍🍳",
        text: "KI kennt dein Profil — Intoleranzen, Vorlieben, Nährstoffbedarf, vorhandene Zutaten — und generiert Rezepte die wirklich passen.",
      },
      {
        type: "checklist",
        title: "Was der KI-Koch kann:",
        items: [
          "Rezepte auf Basis deiner Intoleranzen und Vorräte",
          "Automatisch skalieren: 1, 4 oder 12 Personen",
          "Saison, Nachhaltigkeit und CO₂-Fussabdruck einbeziehen",
          "ChatGPT: «Ich habe Histamin-Intoleranz und noch: Karotten, Reis, Hühnchen. 3 Rezeptideen?»",
        ],
      },
      {
        type: "highlight",
        emoji: "📱",
        label: "Praxistools 2026",
        text: "ChatGPT (freie Beschreibung), Whisk/Google (Foto vom Kühlschrank → Rezept), DarfIch (Intoleranzprofil-basiert auf Deutsch)",
      },
    ],
  },
  {
    label: "Klima & Essen",
    title: "Was dein Frühstück das Klima kostet",
    blocks: [
      { type: "image", src: "/slides/03/s05.png", alt: "CO2-Vergleich Rind, Hühnchen, Linsen" },
      {
        type: "intro",
        emoji: "🌍",
        text: "Lebensmittel haben sehr unterschiedliche CO₂-Fussabdrücke. KI hilft dir, das in Echtzeit zu sehen — und bessere Entscheidungen zu treffen.",
      },
      {
        type: "risk-pyramid",
        levels: [
          { emoji: "🥩", title: "1 kg Rindfleisch", desc: "~27 kg CO₂ — entspricht 130 km Autofahrt", badge: "HOCH", bg: "#FEF2F2", color: "#DC2626" },
          { emoji: "🍗", title: "1 kg Hühnchen", desc: "~6 kg CO₂ — 6x weniger als Rind", badge: "MITTEL", bg: "#FFF7ED", color: "#EA580C" },
          { emoji: "🥑", title: "1 kg Avocado (import)", desc: "~2.5 kg CO₂ + hoher Wasserverbrauch", badge: "MITTEL", bg: "#FEFCE8", color: "#CA8A04" },
          { emoji: "🫘", title: "1 kg Linsen", desc: "~0.9 kg CO₂ — bestes Preis-Klima-Verhältnis", badge: "TIEF", bg: "#F0FDF4", color: "#16A34A" },
        ],
      },
      {
        type: "highlight",
        emoji: "♻️",
        label: "Fakt",
        text: "30% aller Lebensmittel weltweit werden weggeworfen. KI-optimierte Lieferketten und Nachfrageprognosen könnten das halbieren.",
      },
    ],
  },
  {
    label: "App-Vergleich",
    title: "Yuka, MyFitnessPal, DarfIch — wer kann was?",
    blocks: [
      { type: "image", src: "/slides/03/s06.png", alt: "Drei App-Screens nebeneinander im Vergleich" },
      {
        type: "intro",
        emoji: "📊",
        text: "Jede App hat ihre Nische — die richtige Wahl hängt von deinem konkreten Bedürfnis ab.",
      },
      {
        type: "two-col",
        cols: [
          {
            emoji: "🔍",
            title: "Yuka & MyFitnessPal",
            titleColor: "#92400E",
            items: [
              "✅ Barcode-Scan",
              "✅ Kalorientracking (MFP)",
              "❌ Kein Intoleranz-Profil",
              "❌ Kein Histamin-Check",
              "❌ Keine KI-Analyse",
            ],
            bg: "#FFFBEB",
            border: "#FDE68A",
            textColor: "#78350F",
          },
          {
            emoji: "🥗",
            title: "DarfIch",
            titleColor: "#065F46",
            items: [
              "✅ Barcode + OCR-Foto-Scan",
              "✅ Histamin / Gluten / Laktose",
              "✅ FODMAP / Fruktose / Sorbit",
              "✅ Claude KI — semantisch",
              "✅ Deutsch, DACH-optimiert",
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
    label: "Food Safety",
    title: "Wie KI verhindert, dass Essen uns krank macht",
    blocks: [
      { type: "image", src: "/slides/03/s07.png", alt: "Roboter sortiert Früchte auf Förderband mit KI-Erkennung" },
      {
        type: "intro",
        emoji: "🛡️",
        text: "KI überwacht die gesamte Lebensmittelkette — vom Feld bis zum Teller — und erkennt Probleme bevor sie beim Konsumenten ankommen.",
      },
      {
        type: "duties-list",
        items: [
          { title: "Qualitätskontrolle", desc: "Kamera-KI erkennt faules Obst am Förderband mit 99.8% Genauigkeit" },
          { title: "Kontaminationserkennung", desc: "KI-Sensoren riechen Bakterien in Fleisch bevor sie sichtbar werden" },
          { title: "Rückverfolgung", desc: "Blockchain + KI: Herkunft von Feld zu Teller in Sekunden nachverfolgen" },
          { title: "Allergen-Prävention", desc: "Produktionslinien-KI verhindert Kreuzkontamination automatisch" },
        ],
      },
      {
        type: "highlight",
        emoji: "⚡",
        label: "IBM + Walmart",
        text: "Rückverfolgung von Mangos: von 7 Tagen auf 2.2 Sekunden reduziert — bei einem Rückruf kann das Tausende von Erkrankungen verhindern.",
      },
    ],
  },
  {
    label: "Precision Farming",
    title: "Precision Farming — die Zukunft der Felder",
    blocks: [
      { type: "image", src: "/slides/03/s08.png", alt: "Drohne scannt Felder mit Pflanzendaten-Overlay" },
      {
        type: "intro",
        emoji: "🚁",
        text: "Drohnen, Sensoren und KI machen Landwirtschaft präziser als je zuvor — weniger Ressourcen, mehr Ertrag.",
      },
      {
        type: "stat-grid",
        stats: [
          { emoji: "📈", value: "+10–20%", label: "Mehr Ernteertrag" },
          { emoji: "💧", value: "–40%", label: "Weniger Wasserverbrauch" },
          { emoji: "🐛", value: "–30%", label: "Weniger Pestizide" },
          { emoji: "🌤️", value: "3 Monate", label: "KI-Ernteprognose im Voraus" },
        ],
      },
      {
        type: "highlight",
        emoji: "🏔️",
        label: "Vor unserer Haustür",
        text: "Kleinbauern in FL und Vorarlberg setzen KI-Apps für Wettervorhersage und Schädlingsfrüherkennung ein — Precision Farming ist kein Grosskonzern-Thema mehr.",
      },
    ],
  },
  {
    label: "DarfIch App",
    title: "Aus dem MMIND-Labor: Von der Idee zur App",
    blocks: [
      { type: "image", src: "/slides/03/s09.png", alt: "DarfIch App mit Intoleranz-Badges und Barcode-Scanner" },
      {
        type: "intro",
        emoji: "🔬",
        text: "DarfIch ist live — entwickelt von MMIND.ai für die 800 Millionen Menschen weltweit mit Nahrungsmittelunverträglichkeiten.",
      },
      {
        type: "action-steps",
        steps: [
          { emoji: "1️⃣", when: "Profil anlegen", action: "Welche Unverträglichkeiten? Welcher Schweregrad? (Histamin, Gluten, Laktose, Fruktose, Sorbit, FODMAP)" },
          { emoji: "2️⃣", when: "Produkt scannen", action: "Barcode → Open Food Facts API (3 Mio. Produkte) oder Foto der Zutatenliste → Claude Vision OCR" },
          { emoji: "3️⃣", when: "KI-Analyse", action: "Claude versteht Synonyme + versteckte Liberatoren — «E 220» = Schwefeldioxid = Histamin-Liberator" },
          { emoji: "4️⃣", when: "Ergebnis", action: "✅ Grün / ❌ Rot + Erklärung auf Deutsch warum ein Zutat problematisch ist" },
        ],
      },
    ],
  },
  {
    label: "Zukunft",
    title: "Was in 10 Jahren normal ist",
    blocks: [
      { type: "image", src: "/slides/03/s10.png", alt: "Futuristische Küche mit 3D-Drucker und Fermentationsbehältern" },
      {
        type: "intro",
        emoji: "🔮",
        text: "Die Ernährung der Zukunft ist hyper-personalisiert, nachhaltig — und wird durch KI in Echtzeit optimiert.",
      },
      {
        type: "two-col",
        cols: [
          {
            emoji: "🖨️",
            title: "Printed Food & Fermentation 2.0",
            titleColor: "#1E40AF",
            items: [
              "3D-Drucker für Lebensmittel",
              "Personalisierte Nährstoffprofile gedruckt",
              "NASA nutzt 3D-Foodprinting für Astronauten",
              "Precision Fermentation: Tierprotein ohne Tier",
            ],
            bg: "#EFF6FF",
            border: "#BFDBFE",
            textColor: "#1E3A8A",
          },
          {
            emoji: "📡",
            title: "Hyper-Personalisierung",
            titleColor: "#065F46",
            items: [
              "KI analysiert Echtzeit-Biomarker",
              "Ernährungsplan passt sich stündlich an",
              "CGM wird Standard wie Schrittzähler",
              "Smarte Küchen kochen nach Profil",
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
    label: "Dein Start",
    title: "3 Schritte die du diese Woche machst",
    blocks: [
      { type: "image", src: "/slides/03/s11.png", alt: "Person scannt Essen mit Smartphone, Chat-Bubble mit Rezeptvorschlag" },
      {
        type: "action-steps",
        steps: [
          {
            emoji: "🔍",
            when: "Schritt 1 — Entdecken",
            action: "Lade DarfIch oder Yuka herunter. Scanne 10 Produkte die du regelmässig kaufst — was lernst du?",
          },
          {
            emoji: "💬",
            when: "Schritt 2 — Ausprobieren",
            action: "Frage ChatGPT: «Ich habe [Unverträglichkeit XY]. Gib mir 5 Rezepte für diese Woche mit: [Zutaten]»",
          },
          {
            emoji: "🤔",
            when: "Schritt 3 — Reflektieren",
            action: "Wie viel Körperdaten möchtest du teilen für bessere Empfehlungen? Wo hilft KI beim Essen — wo nicht?",
          },
        ],
      },
      {
        type: "highlight",
        emoji: "🥗",
        label: "Bereit für das Quiz?",
        text: "Bestehe das Quiz und verdiene dein «NutriBot»-Badge + bis zu 150 XP!",
      },
    ],
  },
];
