// Rich slide format for Modul 04 — KI & Umwelt
import type { Block, RichSlide } from "@/data/modules-01";
export type { Block, RichSlide };

export const MODUL_04_SLIDES: RichSlide[] = [
  {
    label: "Klimaretter oder -killer?",
    title: "Die unbequeme Frage — beides?",
    blocks: [
      { type: "image", src: "/slides/04/s01.png", alt: "Erde halb grüner Wald, halb Rechenzentrum" },
      {
        type: "intro",
        emoji: "🌍",
        text: "KI kann Klimamodelle berechnen, Energie optimieren, Emissionen reduzieren. ABER: KI selbst verbraucht enorme Mengen Energie und Wasser.",
      },
      {
        type: "two-col",
        cols: [
          {
            emoji: "😰",
            title: "Das Energie-Problem",
            titleColor: "#991B1B",
            items: [
              "ChatGPT: 10x mehr Energie als Google-Suche",
              "GPT-4 Training: ~500 t CO₂",
              "= 1 Mensch fliegt 500x Zürich–New York",
              "Microsoft Wasserverbrauch: +34%/Jahr",
            ],
            bg: "#FEF2F2",
            border: "#FECACA",
            textColor: "#7F1D1D",
          },
          {
            emoji: "🌱",
            title: "Die Hoffnung",
            titleColor: "#065F46",
            items: [
              "KI-Stromnetze: –5–10% globale Emissionen",
              "DeepMind: –40% Rechenzentrum-Kühlung",
              "Präzisere Extremwetterwarnungen",
              "Illegale Abholzung in Echtzeit stoppen",
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
    label: "Mein Fussabdruck",
    title: "Was kostet meine ChatGPT-Nutzung wirklich?",
    blocks: [
      { type: "image", src: "/slides/04/s02.png", alt: "Energieverbrauch-Vergleich: Laptop, Server, Wasserkühlung" },
      {
        type: "intro",
        emoji: "💡",
        text: "Die Zahlen sind real — aber im Vergleich zu Flugreisen oder Fleischkonsum überschaubar. Bewusstsein hilft, Panik nicht.",
      },
      {
        type: "stat-grid",
        stats: [
          { emoji: "💬", value: "~0.003 kWh", label: "1 ChatGPT-Anfrage" },
          { emoji: "🔍", value: "~0.0003 kWh", label: "1 Google-Suche (10x weniger)" },
          { emoji: "💧", value: "~0.5 L", label: "Wasser pro 20 ChatGPT-Anfragen" },
          { emoji: "✈️", value: "5–15 kg", label: "CO₂ pro Jahr tägliche Nutzung" },
        ],
      },
      {
        type: "highlight",
        emoji: "📊",
        label: "Einordnung",
        text: "ChatGPT ein Jahr täglich nutzen ≈ 5–15 kg CO₂. Ein Flug Zürich–London = 100 kg CO₂ pro Person. Kontext ist alles.",
      },
    ],
  },
  {
    label: "Klima-KI",
    title: "Das Werkzeug das wir brauchen — um uns zu retten",
    blocks: [
      { type: "image", src: "/slides/04/s03.png", alt: "Satellit überwacht Klimadaten mit KI-Gehirn über Atmosphäre" },
      {
        type: "intro",
        emoji: "🛰️",
        text: "KI ist das mächtigste Werkzeug das wir für Klimaforschung je hatten — sie analysiert Daten in einer Geschwindigkeit die kein Mensch erreichen kann.",
      },
      {
        type: "duties-list",
        items: [
          { title: "Wettermodelle", desc: "DeepMind «GraphCast»: 10-Tages-Vorhersage heute besser als 7-Tage-Vorhersage vor 10 Jahren" },
          { title: "Klimamodelle", desc: "KI analysiert 1.000 Jahre Klimadaten in Stunden — findet versteckte Rückkopplungen" },
          { title: "Emissionsüberwachung", desc: "Satelliten + KI überwachen Methanemissionen weltweit in Echtzeit" },
          { title: "Abholzungsschutz", desc: "«Global Forest Watch»: KI erkennt illegale Abholzung innerhalb von Tagen" },
        ],
      },
    ],
  },
  {
    label: "Smart City",
    title: "Die Stadt die mitdenkt",
    blocks: [
      { type: "image", src: "/slides/04/s04.png", alt: "Smarte Stadt bei Nacht mit leuchtenden Verkehrsströmen" },
      {
        type: "intro",
        emoji: "🏙️",
        text: "Eine Smart City wertet Daten aus Sensoren, Kameras und Netzwerken mit KI aus — und macht das Stadtleben effizienter und nachhaltiger.",
      },
      {
        type: "risk-pyramid",
        levels: [
          { emoji: "🚦", title: "Verkehr", desc: "KI-gesteuerte Ampeln → –20–25% Stau und Abgase", badge: "–25%", bg: "#EFF6FF", color: "#2563EB" },
          { emoji: "💡", title: "Beleuchtung", desc: "Strassenlampen heller wenn jemand kommt → –40% Energie", badge: "–40%", bg: "#F0FDF4", color: "#16A34A" },
          { emoji: "🗑️", title: "Abfall", desc: "Sensoren in Mülltonnen → Leerung nur wenn nötig → –30% Fahrten", badge: "–30%", bg: "#FEFCE8", color: "#CA8A04" },
          { emoji: "💧", title: "Wasser", desc: "Leckage-Erkennung in Rohren → bis zu 30% weniger Wasserverlust", badge: "–30%", bg: "#FDF4FF", color: "#9333EA" },
        ],
      },
      {
        type: "highlight",
        emoji: "🇱🇮",
        label: "Nahe bei uns",
        text: "Vaduz testet Smart-Parking mit Sensoren + KI-App — Liechtenstein ist kleiner als viele Städte, aber ein ideales Testfeld für Smart-City-Konzepte.",
      },
    ],
  },
  {
    label: "KI & Natur",
    title: "KI als Naturschützer",
    blocks: [
      { type: "image", src: "/slides/04/s05.png", alt: "Wal mit KI-Erkennungslinien, Vogel mit Schallwellen, Regenwald-Sensoren" },
      {
        type: "intro",
        emoji: "🐋",
        text: "1 Million Tier- und Pflanzenarten sind vom Aussterben bedroht. Traditionelles Monitoring ist viel zu langsam — KI schafft das in Echtzeit.",
      },
      {
        type: "forbidden-list",
        items: [
          { emoji: "🐋", title: "Happywhale", desc: "KI erkennt individuelle Wale anhand von Atemspuren-Fotos — 50.000 Freiwillige + KI" },
          { emoji: "🦜", title: "Merlin App", desc: "KI identifiziert Vögel am Gesang in Echtzeit — 60 Mio. Downloads, 1 Mrd. Beobachtungen" },
          { emoji: "🌿", title: "Rainforest Connection", desc: "Akustische Sensoren + KI erkennen Kettensägen — verhindert aktiv illegale Abholzung" },
          { emoji: "🐘", title: "Kruger Nationalpark", desc: "KI-Kameranetze verhindern Wilderei — Wilderei um 70% reduziert" },
        ],
        exception: "Gemeinsam: KI skaliert Naturschutz von lokalen Projekten auf globale Überwachung.",
      },
    ],
  },
  {
    label: "Stromnetz",
    title: "Das Stromnetz der Zukunft — flexibel und grün",
    blocks: [
      { type: "image", src: "/slides/04/s06.png", alt: "Windturbinen und Solarplatten verbunden mit KI-Steuerung" },
      {
        type: "intro",
        emoji: "⚡",
        text: "Erneuerbare Energie ist unberechenbar — die Sonne scheint nicht immer, der Wind weht nicht immer. KI ist der Dirigent, der alles in Balance hält.",
      },
      {
        type: "checklist",
        title: "KI als Netz-Dirigent:",
        items: [
          "Vorhersage: Wann scheint Sonne wie stark? Wann weht Wind?",
          "Demand-Response: Industrie läuft wenn Strom günstig ist (nachts, bei viel Wind)",
          "Speichermanagement: Batteriespeicher optimal laden und entladen",
          "Micro-Grids: Dörfer produzieren und verwalten eigenen Strom",
        ],
      },
      {
        type: "highlight",
        emoji: "🌬️",
        label: "DeepMind in britischen Windparks",
        text: "KI verdoppelte die Vorhersagegenauigkeit — der Erlös für Windenergie stieg um 20%. Das ist der wirtschaftliche Treiber für grüne KI.",
      },
    ],
  },
  {
    label: "Recycling-KI",
    title: "Der Roboter der besser sortiert als wir",
    blocks: [
      { type: "image", src: "/slides/04/s07.png", alt: "Roboterarm sortiert Recycling auf Förderband mit KI-Erkennung" },
      {
        type: "intro",
        emoji: "♻️",
        text: "Falsch sortierter Müll kontaminiert ganze Chargen — und landet auf der Deponie. KI-Roboter sortieren schneller und genauer als jeder Mensch.",
      },
      {
        type: "stat-grid",
        stats: [
          { emoji: "🤖", value: "70–80", label: "Griffe pro Minute" },
          { emoji: "🎯", value: "95%+", label: "Erkennungsrate (250+ Kategorien)" },
          { emoji: "📈", value: "+20–30%", label: "Mehr Recycling in KI-Anlagen" },
          { emoji: "🇨🇭", value: "53%", label: "CH Recyclingquote heute" },
        ],
      },
      {
        type: "highlight",
        emoji: "👷",
        label: "Bonus",
        text: "Menschen arbeiten nicht mehr in gefährlichen Sortierbereichen — KI verbessert nicht nur die Umwelt, sondern auch die Arbeitssicherheit.",
      },
    ],
  },
  {
    label: "Digitaler Alltag",
    title: "Wie grün ist dein digitaler Alltag?",
    blocks: [
      { type: "image", src: "/slides/04/s08.png", alt: "CO2-Vergleich digitaler Tools als Symbole" },
      {
        type: "intro",
        emoji: "📱",
        text: "Nicht jede digitale Aktivität hat denselben ökologischen Fussabdruck — der Unterschied ist grösser als die meisten denken.",
      },
      {
        type: "risk-pyramid",
        levels: [
          { emoji: "📧", title: "E-Mail lesen / Google-Suche", desc: "~0.2–0.3 g CO₂ — vernachlässigbar", badge: "MINIMAL", bg: "#F0FDF4", color: "#16A34A" },
          { emoji: "🎬", title: "Netflix HD (1 Stunde)", desc: "~36 g CO₂ — durch Streaming-Infrastruktur", badge: "GERING", bg: "#FEFCE8", color: "#CA8A04" },
          { emoji: "💬", title: "ChatGPT-Session", desc: "~50–200 g CO₂ + ~500 ml Wasser", badge: "MITTEL", bg: "#FFF7ED", color: "#EA580C" },
          { emoji: "📹", title: "Video Call (Zoom, 1h)", desc: "~150 g CO₂ — Kamera, Audio, Server", badge: "MITTEL", bg: "#FEF2F2", color: "#DC2626" },
        ],
      },
    ],
  },
  {
    label: "Green AI",
    title: "Wie entwickeln wir nachhaltige KI?",
    blocks: [
      { type: "image", src: "/slides/04/s09.png", alt: "Grünes Rechenzentrum mit Solar und Wind in nordischer Landschaft" },
      {
        type: "intro",
        emoji: "🌱",
        text: "Nachhaltige KI ist kein Widerspruch — es gibt klare Prinzipien die den Energieverbrauch drastisch senken können.",
      },
      {
        type: "duties-list",
        items: [
          { title: "Effizienz first", desc: "Kleines Modell das reicht ist besser als grosses das mehr kann" },
          { title: "Grüner Strom", desc: "Rechenzentren mit 100% erneuerbarer Energie betreiben" },
          { title: "Standort", desc: "Skandinavien/Island: sauberer Strom + natürliche Kühlung" },
          { title: "Modell-Lebensdauer", desc: "Einmal trainieren, lange nutzen — kein ständiges Neu-Training" },
          { title: "Reporting", desc: "CO₂-Verbrauch von KI-Produkten transparent machen (EU AI Act ab 2026)" },
        ],
      },
    ],
  },
  {
    label: "Vor unserer Tür",
    title: "Nachhaltigkeit vor unserer Haustür",
    blocks: [
      { type: "image", src: "/slides/04/s10.png", alt: "Alpenlandschaft mit Solarplatten und KI-Stromnetz" },
      {
        type: "intro",
        emoji: "🏔️",
        text: "FL und die Bodenseeregion sind keine unbeschriebenen Blätter — hier passiert schon heute vieles im Bereich KI und Nachhaltigkeit.",
      },
      {
        type: "two-col",
        cols: [
          {
            emoji: "🇱🇮",
            title: "Liechtenstein",
            titleColor: "#1E40AF",
            items: [
              "FL Energiestrategie 2030: –30% Verbrauch",
              "LKW: KI-gestützte Laststeuerung (Pilot)",
              "Höchste PV-Dichte pro Kopf in Europa",
              "EWR → EU-Klimaregeln direkt bindend",
            ],
            bg: "#EFF6FF",
            border: "#BFDBFE",
            textColor: "#1E3A8A",
          },
          {
            emoji: "🇦🇹🇨🇭",
            title: "Vorarlberg & Schweiz",
            titleColor: "#065F46",
            items: [
              "illwerke vkw: KI für Pumpspeicher (Montafon)",
              "EPFL: KI für Klimamodellierung",
              "Axpo: KI-gestützte Stromhandelssysteme",
              "«Ländle» Energieautonomie-Programm",
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
    label: "Dein Beitrag",
    title: "5 konkrete Schritte — morgen umsetzbar",
    blocks: [
      { type: "image", src: "/slides/04/s11.png", alt: "5 Handlungs-Icons in aufsteigendem Bogen mit grünem Licht" },
      {
        type: "action-steps",
        steps: [
          { emoji: "🎯", when: "Bewusster nutzen", action: "Für einfache Fragen Google statt ChatGPT. Längere Konversationen > viele kurze Sessions." },
          { emoji: "🌍", when: "Green Tools wählen", action: "Europäische Anbieter bevorzugen — oft grünerer Strom als US-Server." },
          { emoji: "💬", when: "KI für Klimahandeln", action: "«Erstelle mir einen persönlichen Plan um meine CO₂-Emissionen um 20% zu senken»" },
          { emoji: "📢", when: "Teilen", action: "Erzähl 3 Menschen was du heute gelernt hast — Klimawissen multipliziert sich." },
          { emoji: "📡", when: "Dranbleiben", action: "climatetrace.org — globales KI-Emissions-Tracking in Echtzeit, kostenlos." },
        ],
      },
      {
        type: "highlight",
        emoji: "🌍",
        label: "Bereit für das Quiz?",
        text: "Bestehe das Quiz und verdiene dein «Eco Warrior»-Badge + bis zu 150 XP!",
      },
    ],
  },
];
