export type Slide = {
  title: string;
  content: string;
};

export type QuizOption = {
  label: string;
  text: string;
};

export type QuizQuestion = {
  question: string;
  options: QuizOption[];
  correct: string;
  explanation: string;
};

export type Module = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  author: string;
  emoji: string;
  color: string;
  colorHex: string;
  badge: string;
  badgeEmoji: string;
  badgeName: string;
  duration: string;
  learningGoals: string[];
  slides: Slide[];
  quiz: QuizQuestion[];
};

export const MODULES: Module[] = [
  {
    id: "01",
    number: 1,
    title: "EU AI Act",
    subtitle: "Europas Antwort auf die KI-Revolution",
    author: "Hartmut",
    emoji: "🏛️",
    color: "bg-red-500",
    colorHex: "#EF4444",
    badge: "ai-act-expert",
    badgeEmoji: "🏛️",
    badgeName: "AI Act Expert",
    duration: "~10 Min.",
    learningGoals: [
      "Die 4 Risikoklassen des EU AI Act verstehen",
      "Wissen was in FL und CH gilt",
      "Compliance-Pflichten für Unternehmen kennen",
    ],
    slides: [
      {
        title: "Der EU AI Act — Europas Antwort auf die KI-Revolution",
        content: `Das **weltweit erste umfassende KI-Gesetz** trat 2024 in Kraft.\n\n- Ziel: KI sicher, transparent und menschenrechtskonform machen\n- Gilt für alle, die KI in der EU einsetzen oder anbieten — auch Firmen aus FL, CH, USA\n- Vergleich: Wie die DSGVO für Datenschutz — nur für KI\n\n**Fun Fact:** Der AI Act ist 144 Seiten lang. Wir erklären ihn dir in 10 Minuten. 🎯`,
      },
      {
        title: "Ohne Regeln kein Vertrauen",
        content: `KI trifft heute Entscheidungen: Kreditvergabe, Jobzusagen, Strafurteile.\n\n**Das Problem:** Algorithmen können diskriminieren — ohne dass es jemand merkt.\n\n- Amazon-Recruiting-KI benachteiligte systematisch Frauen (2018, eingestellt)\n- Gesichtserkennung identifiziert dunkle Hautfarbe schlechter (MIT-Studie)\n\n**Der Gesetzgeber sagt:** Wer Macht hat, braucht Regeln.`,
      },
      {
        title: "Von harmlos bis verboten — das KI-Risiko-Modell",
        content: `KI wird nach Gefährlichkeit in **4 Klassen** eingeteilt (wie Chemikalien oder Medikamente).\n\nJe höher das Risiko, desto strenger die Regeln:\n\n🔴 **Klasse 1 (Inakzeptabel):** Verboten — immer\n🟠 **Klasse 2 (Hoch):** Erlaubt — aber mit strengen Auflagen\n🟡 **Klasse 3 (Begrenzt):** Erlaubt — mit Transparenzpflicht\n🟢 **Klasse 4 (Minimal):** Erlaubt — fast ohne Einschränkungen`,
      },
      {
        title: "Diese KI ist in der EU verboten — Punkt.",
        content: `**Verbotene Anwendungen (Klasse: Inakzeptabel):**\n\n- **Social Scoring:** Bürger nach Verhalten bewerten und Rechte einschränken (wie in China)\n- Biometrische Echtzeit-Überwachung auf öffentlichen Plätzen durch Behörden\n- Manipulation ohne Wissen der Person (Unterschwellige Beeinflussung)\n- KI, die Schwächen ausnutzt (Sucht, Minderjährige, psychische Erkrankungen)\n\n**Ausnahmen:** Terrorismusbekämpfung — aber nur mit richterlicher Genehmigung.`,
      },
      {
        title: "Erlaubt — aber unter Aufsicht",
        content: `**Hochrisiko-KI (Klasse 2) — diese Anwendungen sind betroffen:**\n\n- Medizintechnik: KI-Diagnose, Operationsroboter\n- Justiz: KI-gestützte Urteilsempfehlungen\n- HR/Recruiting: Automatisiertes Screening von Bewerbungen\n- Bildung: Automatische Prüfungsbewertung\n- Kritische Infrastruktur: Strom, Wasser, Verkehr\n\n**Pflichten:** Risiko-Assessment, Dokumentation, menschliche Aufsicht, Registrierung bei EU-Behörde.\n\n**Merksatz:** «Hochrisiko = viel Dokumentation + Mensch behält das letzte Wort»`,
      },
      {
        title: "Was du jeden Tag nutzt — und warum es meist OK ist",
        content: `**Klasse 3 — Begrenztes Risiko (Transparenzpflicht):**\n- Chatbots müssen sich als KI zu erkennen geben\n- KI-generierte Bilder/Videos müssen gekennzeichnet sein (Deepfakes)\n- Emotionserkennung am Arbeitsplatz → Nutzer muss informiert werden\n\n**Klasse 4 — Minimales Risiko:**\n- Spam-Filter ✅ · KI-Empfehlungssysteme (Netflix, Spotify) ✅ · KI in Videospielen ✅\n- Keine besonderen Auflagen — freiwillige Verhaltenskodizes empfohlen\n\n**Botschaft:** 85% aller KI-Anwendungen fallen in Klasse 3 oder 4.`,
      },
      {
        title: "Was du als Unternehmer wissen MUSST",
        content: `**5 Kernpflichten bei Hochrisiko-KI:**\n\n1. **Risikomanagement:** Risiken dokumentieren und minimieren\n2. **Datenqualität:** Trainingsdaten müssen repräsentativ und unverzerrt sein\n3. **Transparenz:** Nutzer müssen wissen, dass KI entscheidet\n4. **Menschliche Aufsicht:** KI-Entscheidungen müssen überprüfbar sein\n5. **Genauigkeit & Robustheit:** System muss zuverlässig funktionieren\n\n**Für KMUs:** Die meisten brauchen einen «AI Coordinator» (ähnlich wie Datenschutzbeauftragter)\n\n💸 **Kosten bei Verstoss:** Bis zu **35 Mio. €** oder **7% des weltweiten Jahresumsatzes**`,
      },
      {
        title: "Was gilt ab wann?",
        content: `**Timeline EU AI Act:**\n\n- 🗓️ **Aug 2024:** AI Act in Kraft getreten\n- ⚠️ **Feb 2025:** Verbote (Klasse 1) wirksam — JETZT schon!\n- 🤖 **Aug 2025:** Pflichten für General Purpose AI (GPT-4, Claude etc.)\n- 🏗️ **Aug 2026:** Hochrisiko-KI-Regeln vollständig wirksam\n- ✅ **Aug 2027:** Alle restlichen Bestimmungen\n\n**Wichtig:** «Ich kannte das Gesetz nicht» schützt nicht vor Strafe — ab Feb 2025 gilt es!`,
      },
      {
        title: "Betrifft uns das überhaupt?",
        content: `**Liechtenstein:**\n- FL ist **EWR-Mitglied** → AI Act gilt direkt (wie EU-Recht)\n- Umsetzungspflicht über EWR-Komitee\n- Kleine Unternehmen: Vereinfachte Dokumentationspflichten geplant\n\n**Schweiz:**\n- Kein EU/EWR-Mitglied → AI Act gilt nicht direkt\n- ABER: Wer Produkte/Dienste in der EU anbietet, muss EU-Regeln einhalten\n- CH arbeitet an eigenem KI-Regulierungsrahmen (2026+)\n\n**Botschaft:** In FL seid ihr direkt betroffen. Als CH-Firma, die EU-Kunden hat, auch.`,
      },
      {
        title: "5 Fragen — bist du AI Act ready?",
        content: `**Selbstcheck:**\n\n- ☐ Weiss ich, welche KI-Systeme mein Unternehmen einsetzt?\n- ☐ Habe ich geprüft, in welche Risikoklasse sie fallen?\n- ☐ Informiere ich meine Nutzer, wenn KI eine Entscheidung trifft?\n- ☐ Gibt es einen Menschen, der KI-Entscheidungen prüfen kann?\n- ☐ Habe ich einen internen Ansprechpartner für KI-Compliance?\n\n**Ressourcen:**\n- EU AI Act Volltext: eur-lex.europa.eu\n- AI Act Explorer (Tool): artificialintelligenceact.eu\n- MMIND AI Beratung: mmind.ai`,
      },
      {
        title: "Dein nächster Schritt",
        content: `**3 Handlungsempfehlungen:**\n\n1. **Sofort:** Prüfe welche KI-Tools du privat und beruflich nutzt\n2. **Diese Woche:** Lies den 1-seitigen EU AI Act Überblick\n3. **Diesen Monat:** Sprich mit deinem Team über KI-Verantwortung\n\n> «Mit KI-Macht kommt KI-Verantwortung.» — frei nach Spider-Man 🕷️\n\n**Jetzt:** Starte das Quiz und verdiene dein 🏛️ **«AI Act Expert»-Badge** !`,
      },
    ],
    quiz: [
      {
        question: "Der EU AI Act ist das weltweit erste umfassende KI-Gesetz. Seit wann ist er in Kraft?",
        options: [
          { label: "A", text: "Januar 2023" },
          { label: "B", text: "August 2024" },
          { label: "C", text: "März 2025" },
          { label: "D", text: "Januar 2027" },
        ],
        correct: "B",
        explanation: "Der EU AI Act trat im August 2024 in Kraft. Die verschiedenen Pflichten gelten dann schrittweise ab 2025, 2026 und 2027.",
      },
      {
        question: "Ein Unternehmen möchte eine KI einsetzen, die Bewerber automatisch nach Eignung bewertet und filtert. In welche Risikoklasse fällt dieses System?",
        options: [
          { label: "A", text: "Minimales Risiko — keine besonderen Auflagen" },
          { label: "B", text: "Begrenztes Risiko — Transparenzpflicht genügt" },
          { label: "C", text: "Hohes Risiko — strenge Auflagen und Dokumentation nötig" },
          { label: "D", text: "Inakzeptabel — verboten" },
        ],
        correct: "C",
        explanation: "Automatisiertes HR-Screening fällt unter Hochrisiko-KI. Der Arbeitgeber braucht ein Risiko-Assessment, muss das System dokumentieren und eine menschliche Kontrolle sicherstellen.",
      },
      {
        question: "Welche der folgenden KI-Anwendungen ist laut EU AI Act komplett verboten?",
        options: [
          { label: "A", text: "Ein Chatbot der Kundenservice übernimmt" },
          { label: "B", text: "Eine KI die Netflix-Empfehlungen macht" },
          { label: "C", text: "Ein System das Bürger nach ihrem Verhalten bewertet und ihnen Rechte einschränkt (Social Scoring)" },
          { label: "D", text: "Eine KI die Spam-Mails filtert" },
        ],
        correct: "C",
        explanation: "Social Scoring durch staatliche Stellen ist in der EU verboten — es verletzt Grundrechte und Menschenwürde. Die anderen drei Beispiele sind Klasse 3 oder 4 mit wenig bis keinen Auflagen.",
      },
      {
        question: "Liechtenstein ist EWR-Mitglied. Was bedeutet das für den EU AI Act?",
        options: [
          { label: "A", text: "FL kann selbst entscheiden ob es den Act übernimmt" },
          { label: "B", text: "Der AI Act gilt in FL direkt, wie EU-Recht" },
          { label: "C", text: "FL hat 10 Jahre Zeit zur Umsetzung" },
          { label: "D", text: "Nur Unternehmen über 250 Mitarbeitende sind betroffen" },
        ],
        correct: "B",
        explanation: "Als EWR-Mitglied übernimmt Liechtenstein EU-Recht — also auch den AI Act. Die Umsetzung erfolgt über das EWR-Komitee, aber die Inhalte sind identisch mit der EU-Regelung.",
      },
      {
        question: "Was kostet ein Verstoss gegen den EU AI Act maximal?",
        options: [
          { label: "A", text: "CHF 50.000 Bussgelder" },
          { label: "B", text: "1% des weltweiten Jahresumsatzes" },
          { label: "C", text: "35 Mio. € oder 7% des weltweiten Jahresumsatzes" },
          { label: "D", text: "Nur eine Verwarnung beim ersten Mal" },
        ],
        correct: "C",
        explanation: "Die Strafen sind abgestuft nach Schwere des Verstosses — bis zu 35 Mio. € oder 7% des weltweiten Jahresumsatzes. Das ist bewusst hoch angesetzt um Compliance zu erzwingen.",
      },
    ],
  },
  {
    id: "02",
    number: 2,
    title: "ChatGPT Deep Dive",
    subtitle: "Von den Grundlagen bis zum Profi-Prompting",
    author: "Phi Yen",
    emoji: "💬",
    color: "bg-amber-500",
    colorHex: "#F59E0B",
    badge: "prompt-master",
    badgeEmoji: "💬",
    badgeName: "Prompt Master",
    duration: "~10 Min.",
    learningGoals: [
      "Verstehen wie LLMs wirklich funktionieren",
      "Profi-Prompting-Techniken anwenden",
      "Grenzen und Datenschutzrisiken kennen",
    ],
    slides: [
      {
        title: "ChatGPT ist keine Suchmaschine — und kein Orakel",
        content: `ChatGPT = **Grosses Sprachmodell** (Large Language Model / LLM)\n\n- Es «sucht» nichts — es **generiert Text** basierend auf Wahrscheinlichkeiten\n- Kein Internetzugriff (ohne Plugins) — Wissen endet am Trainings-Cutoff\n- Es «weiss» nichts — es hat Muster aus Milliarden Texten gelernt\n\n✅ **Stärke:** Formulieren, Zusammenfassen, Erklären, Strukturieren\n❌ **Schwäche:** Aktuelle Fakten, Berechnungen, verlässliche Quellenangaben\n\n**Analogie:** ChatGPT ist wie ein Mensch, der extrem viel gelesen hat — aber alles aus dem Gedächtnis sagt, ohne nachzuschauen.`,
      },
      {
        title: "Die Magie dahinter — einfach erklärt",
        content: `**Wie funktioniert ein LLM? Schritt für Schritt:**\n\n1. **Training:** Das Modell liest Milliarden von Texten aus dem Internet\n2. **Lernen:** Es lernt: «Nach diesem Wort kommt wahrscheinlich dieses»\n3. **Token:** Es arbeitet nicht mit Wörtern, sondern «Token» (~0.75 Wörter)\n4. **Prompt:** Deine Eingabe gibt dem Modell Kontext für die nächste Wahrscheinlichkeit\n5. **Ausgabe:** Es wählt immer das «wahrscheinlichste» nächste Token — Wort für Wort\n\n**Experiment:** «Vervollständige: Die Katze sitzt auf der...»\n→ Das Modell «weiss» die Antwort nicht — es kennt nur Muster.`,
      },
      {
        title: "Garbage In, Garbage Out — Qualität beginnt bei dir",
        content: `**Die 4 Grundregeln guter Prompts:**\n\n1. **Kontext geben:** Wer bist du? Was ist die Situation?\n2. **Aufgabe klar formulieren:** Was genau soll ChatGPT tun?\n3. **Format angeben:** Liste? Tabelle? 3 Sätze? Auf Deutsch?\n4. **Beispiel mitgeben:** «Schreib wie dieses Beispiel: [Beispiel]»\n\n❌ **Schlechter Prompt:** «Schreib was über Marketing»\n\n✅ **Guter Prompt:** «Du bist ein Marketing-Experte für KMUs in der Schweiz. Schreib 5 Social-Media-Post-Ideen für ein Restaurant, das vegane Küche anbietet. Je 2–3 Sätze, auf Deutsch, locker und einladend.»`,
      },
      {
        title: "Profi-Techniken die wirklich funktionieren",
        content: `**Technik 1 — Role Prompting:**\n«Verhalte dich wie ein erfahrener Anwalt und prüfe diesen Vertrag auf Risiken»\n\n**Technik 2 — Chain of Thought:**\n«Denke Schritt für Schritt nach, bevor du antwortest»\n→ Reduziert Fehler bei komplexen Aufgaben um ~40%\n\n**Technik 3 — Few-Shot:**\n«Hier sind 2 Beispiele wie ich das haben möchte: [Bsp. 1], [Bsp. 2]. Jetzt mach das Gleiche für: [Aufgabe]»\n\n**Technik 4 — Iterieren:**\n«Das ist gut, aber mach es kürzer / formeller / mit mehr Beispielen»`,
      },
      {
        title: "10 Dinge, die du ab heute anders machst",
        content: `**Sofort anwendbar:**\n\n- ✉️ **E-Mails:** Entwurf schreiben lassen, dann anpassen\n- 📝 **Zusammenfassungen:** Langen Text einfügen → «Fasse in 5 Punkten zusammen»\n- 🌍 **Übersetzungen:** Besser als Google Translate — mit Kontext\n- 📅 **Planung:** «Erstelle mir einen Wochenplan für...»\n- 🔍 **Recherche:** «Was sind die wichtigsten Argumente für/gegen...»\n- 💡 **Brainstorming:** «Gib mir 20 Ideen für...»\n- 📊 **Daten erklären:** «Erkläre mir diese Statistik in einfachen Worten»\n- 🖊️ **Schreiben:** Blogposts, Social Posts, Bewerbungen\n- 🎯 **Feedback:** «Was ist schwach an diesem Text?»`,
      },
      {
        title: "Wie Profis ChatGPT wirklich nutzen",
        content: `**Branchen-Beispiele:**\n\n- **Marketers:** Kampagnen-Ideen, Zielgruppen-Analyse, Ad-Copy\n- **Entwickler:** Code schreiben, debuggen, dokumentieren (GitHub Copilot)\n- **Berater:** Präsentationen strukturieren, Recherche, Berichte\n- **HR:** Stellenbeschreibungen, Interview-Fragen, Onboarding-Docs\n- **Lehrer:** Lernmaterial erstellen, Übungen generieren, Erklärungen anpassen\n- **Buchhalter:** Formeln erklären, Daten interpretieren, Berichte strukturieren\n\n**Zeitersparnis:** Studien zeigen **20–40% Produktivitätssteigerung** bei konsequenter Nutzung.\n\n**Wichtig:** ChatGPT ersetzt nicht das Denken — es beschleunigt die Ausführung.`,
      },
      {
        title: "Dein persönlicher KI-Assistent — konfiguriert für dich",
        content: `**Was sind Custom GPTs?**\n- Vorkonfigurierte ChatGPT-Versionen mit eigenem Kontext und Verhalten\n- Du gibst vor: Wie soll er sich verhalten? Was weiss er? Was darf er nicht?\n- Keine Programmierung nötig — nur Beschreibung in normalem Text\n\n**Beispiele aus der Praxis:**\n- 🏛️ «EU AI Act Checker» — prüft deine KI-Systeme auf Compliance\n- 📄 «Vertragscheck-Assistent» — prüft Mietverträge auf Risiken\n- 🍽️ «Rezept-Coach» — erstellt Rezepte basierend auf Vorräten und Intoleranz\n- 📚 «Lernbegleiter» — erklärt Themen immer auf dem gleichen Niveau\n\n**Erstellen:** ChatGPT → Explore GPTs → Create → Anleitung folgen (15 Min.)`,
      },
      {
        title: "Wenn ChatGPT lügt — und merkt es nicht mal",
        content: `**Was sind Halluzinationen?**\n- ChatGPT erfindet Fakten, die plausibel klingen aber **falsch** sind\n- Erfundene Studien mit echten Autornamen\n- Falsche Gesetze, falsche Zitate, falsche Jahreszahlen\n- Das Modell «weiss» nicht was es nicht weiss\n\n**Wann ist das gefährlich?**\n- Medizinische Ratschläge → immer Arzt fragen\n- Rechtliche Fragen → immer Anwalt fragen\n- Historische Fakten → immer Quelle prüfen\n- Zahlen und Statistiken → immer verifizieren\n\n**Regel:** ChatGPT ist ein **Startpunkt**, kein Endpunkt. Wichtiges immer verifizieren.`,
      },
      {
        title: "Was darf ich reingeben — und was nicht?",
        content: `**NIEMALS in ChatGPT (Public Version):**\n- ❌ Passwörter, API-Keys, Zugangsdaten\n- ❌ Personenbezogene Daten von Kunden (Name, E-Mail, Adresse)\n- ❌ Vertrauliche Unternehmensinfos (Finanzdaten, Strategiepläne)\n- ❌ Patientendaten, Krankenakten\n- ❌ Interne Codes, Quellcode mit Sicherheits-Logik\n\n**Das ist OK:**\n- ✅ Anonymisierte Texte («Ein Kunde hat folgendes Problem...»)\n- ✅ Öffentliche Informationen\n- ✅ Deine eigenen kreativen Texte\n\n**Lösung für Firmen:** ChatGPT Team/Enterprise — Daten werden nicht für Training genutzt.`,
      },
      {
        title: "Der grosse KI-Vergleich 2026",
        content: `| Feature | GPT-4o | Claude Sonnet | Gemini |\n|---|---|---|---|\n| Texte schreiben | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |\n| Coding | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |\n| Bildanalyse | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |\n| Lange Dokumente | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |\n| Google-Integration | ❌ | ❌ | ✅ |\n| Datenschutz (EU) | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |\n\n**Fazit:** Kein Modell ist in allem besser. Nutze das Richtige für die Aufgabe.`,
      },
      {
        title: "Von Anfänger zu Profi — in 7 Tagen",
        content: `**7-Tage Challenge:**\n\n- **Tag 1:** E-Mail mit ChatGPT schreiben lassen\n- **Tag 2:** Einen komplexen Text zusammenfassen lassen\n- **Tag 3:** Role Prompting ausprobieren\n- **Tag 4:** Chain of Thought nutzen\n- **Tag 5:** Einen Custom GPT erkunden\n- **Tag 6:** Etwas Kreatives erstellen (Gedicht, Geschichte, Design-Brief)\n- **Tag 7:** Reflektieren — was hat am besten funktioniert?\n\n**Jetzt:** Starte das Quiz und verdiene dein 💬 **«Prompt Master»-Badge** !`,
      },
    ],
    quiz: [
      {
        question: "Was passiert genau wenn du ChatGPT eine Frage stellst?",
        options: [
          { label: "A", text: "ChatGPT sucht im Internet nach der besten Antwort" },
          { label: "B", text: "ChatGPT fragt andere KI-Systeme und kombiniert die Antworten" },
          { label: "C", text: "ChatGPT generiert Wort für Wort basierend auf Wahrscheinlichkeiten aus dem Training" },
          { label: "D", text: "ChatGPT liest aus einer riesigen Datenbank die gespeicherte Antwort aus" },
        ],
        correct: "C",
        explanation: "ChatGPT ist ein generatives Modell — es erzeugt Text Token für Token basierend auf erlernten Wahrscheinlichkeiten, sucht aber nicht aktiv nach Antworten oder liest aus einer Fakten-DB.",
      },
      {
        question: "Du willst ChatGPT nutzen um einen professionellen Kundenbrief zu schreiben. Welcher Prompt ist am besten?",
        options: [
          { label: "A", text: "«Schreib einen Brief»" },
          { label: "B", text: "«Schreib einen Kundenbrief auf Deutsch»" },
          { label: "C", text: "«Du bist ein erfahrener Kundenberater. Schreib einen freundlichen, formellen Brief an Herrn Müller der seinen Auftrag storniert hat. 3 Absätze, auf Deutsch.»" },
          { label: "D", text: "«Brief schreiben bitte danke»" },
        ],
        correct: "C",
        explanation: "Ein guter Prompt gibt Rolle, Kontext, Ziel, Format und Sprache vor. Je mehr relevanter Kontext, desto präziser und nützlicher die Ausgabe.",
      },
      {
        question: "ChatGPT «halluziniert» manchmal. Was bedeutet das?",
        options: [
          { label: "A", text: "ChatGPT wird langsam und reagiert träge" },
          { label: "B", text: "ChatGPT erfindet plausibel klingende aber falsche Informationen" },
          { label: "C", text: "ChatGPT weigert sich bestimmte Fragen zu beantworten" },
          { label: "D", text: "ChatGPT übersetzt Texte fehlerhaft" },
        ],
        correct: "B",
        explanation: "Halluzination bedeutet dass das Modell selbstsicher falsche Fakten, Quellen oder Zahlen erfindet — weil es Muster vervollständigt, nicht wirklich «nachschlägt». Wichtige Angaben immer verifizieren.",
      },
      {
        question: "Welche Information solltest du NIEMALS in die öffentliche ChatGPT-Version eingeben?",
        options: [
          { label: "A", text: "Eine anonymisierte Beschreibung eines Kundenproblems" },
          { label: "B", text: "Den Text eines öffentlichen Artikels den du zusammenfassen möchtest" },
          { label: "C", text: "Die Kundendaten (Name, E-Mail, Adresse) eines echten Klienten" },
          { label: "D", text: "Eine allgemeine Frage zu Marketingstrategien" },
        ],
        correct: "C",
        explanation: "Personenbezogene Daten von Dritten dürfen nicht in die öffentliche Version eingegeben werden — sie könnten für Training genutzt werden. Für sensible Firmendaten gibt es ChatGPT Team/Enterprise.",
      },
      {
        question: "Was ist die «Chain of Thought» Prompting-Technik?",
        options: [
          { label: "A", text: "Mehrere separate ChatGPT-Chats verknüpfen" },
          { label: "B", text: "ChatGPT auffordern, Schritt für Schritt zu denken bevor es antwortet" },
          { label: "C", text: "Eine Kette aus verschiedenen KI-Modellen hintereinanderschalten" },
          { label: "D", text: "Den Kontext aus alten Chats in neue kopieren" },
        ],
        correct: "B",
        explanation: "«Denke Schritt für Schritt nach» reduziert Fehler bei komplexen Aufgaben erheblich — das Modell «erklärt» seinen Denkweg und korrigiert sich dabei selbst häufiger.",
      },
    ],
  },
  {
    id: "03",
    number: 3,
    title: "KI & Ernährung",
    subtitle: "Von der Küche ins Labor — KI revolutioniert was wir essen",
    author: "Zeno",
    emoji: "🥗",
    color: "bg-green-500",
    colorHex: "#22C55E",
    badge: "nutribot",
    badgeEmoji: "🥗",
    badgeName: "NutriBot",
    duration: "~10 Min.",
    learningGoals: [
      "Wie KI personalisierte Ernährungsempfehlungen ermöglicht",
      "KI-Apps für Allergien und Unverträglichkeiten kennen",
      "Nachhaltigkeit und Precision Farming verstehen",
    ],
    slides: [
      {
        title: "Von der Küche ins Labor — KI revolutioniert was wir essen",
        content: `KI analysiert bereits was wir essen, wie wir essen und was uns gut tut.\n\n**Zahlen:**\n- 800 Mio. Menschen weltweit leiden an Nahrungsmittelunverträglichkeiten\n- 1 von 3 Europäern hat eine diagnostizierte oder nicht diagnostizierte Unverträglichkeit\n- KI kann Diagnosezeit von Jahren auf Tage reduzieren\n\n**Einstiegsfrage:** «Wer von euch isst heute anders als vor 5 Jahren — wegen Unverträglichkeiten?»`,
      },
      {
        title: "Dein Körper, deine Daten, deine Diät",
        content: `**Was ist personalisierte Ernährung?**\nErnährungsempfehlungen basierend auf deinen individuellen Körperdaten.\n\n**Wie KI das ermöglicht:**\n- DNA-Test + KI → «Du verarbeitest Koffein langsam, reduziere Kaffee»\n- Mikrobiom-Analyse → «Deine Darmflora braucht mehr fermentierte Lebensmittel»\n- Continuous Glucose Monitor + KI → «Reis lässt deinen Blutzucker stark schwanken»\n\n**Praxisbeispiel ZOE-Programm (UK):**\n2 Wochen Daten → lebenslange personalisierte Empfehlungen\n→ 30% bessere Blutzuckerwerte nach 3 Monaten vs. allgemeine Empfehlungen`,
      },
      {
        title: "Der KI-Assistent im Supermarkt",
        content: `**Das Problem:**\n- 200+ Bezeichnungen für Gluten auf Etiketten (Weizen, Dinkel, Kamut, Bulgur...)\n- Histamin-Liberatoren verstecken sich hinter E-Nummern (E 220 = Schwefeldioxid)\n- Durchschnittliche Diagnosezeit Histamin-Intoleranz: **4–7 Jahre**\n\n**Was KI löst:**\n- Barcode scannen → Sofortige Prüfung aller Zutaten gegen persönliches Profil\n- Foto der Zutatenliste → OCR + KI-Analyse in Sekunden\n- Semantisches Matching: KI versteht Synonyme und versteckte Zutaten\n\n**Beispiel DarfIch App:**\n1. Profil anlegen (Histamin-Intoleranz, stark)\n2. Barcode scannen im Supermarkt\n3. Sofort: ✅ Verträglich / ❌ Unverträglich + Erklärung warum`,
      },
      {
        title: "Der Koch, der dich kennt — und niemals schläft",
        content: `**Wie funktioniert KI-Rezeptempfehlung?**\nKI kennt dein Profil: Intoleranzen, Vorlieben, Nährstoffbedarf, vorhandene Zutaten.\n\n- Generiert Rezepte die passen — nicht generische «vegan»-Filter\n- Skaliert automatisch: Für 1, 4 oder 12 Personen\n- Berücksichtigt: Saison, Nachhaltigkeit, CO2-Fussabdruck, Budget\n\n**Praxistools 2026:**\n- **ChatGPT:** «Ich habe Histamin-Intoleranz und noch: Karotten, Reis, Hühnchen. 3 Rezeptideen?»\n- **Whisk (Google):** Foto-to-Rezept — Bild vom Kühlschrank → Rezeptvorschlag\n- **DarfIch:** Intoleranzprofil-basierte Rezepte`,
      },
      {
        title: "Was dein Frühstück das Klima kostet — und wie KI hilft",
        content: `**Der CO2-Footprint von Lebensmitteln:**\n- 1 kg Rindfleisch: ~27 kg CO2\n- 1 kg Hühnchen: ~6 kg CO2\n- 1 kg Linsen: ~0.9 kg CO2\n- 1 kg importierte Avocado: ~2.5 kg CO2 + Wasserverbrauch\n\n**Wie KI dabei hilft:**\n- Apps berechnen CO2-Footprint deiner Mahlzeit in Echtzeit\n- Empfiehlt saisonale, regionale Alternativen\n- Supermärkte: KI optimiert Bestellungen → weniger Lebensmittelverschwendung\n- Lieferkette: KI verhindert Überproduktion durch Nachfrageprognosen\n\n**Zahlen:** **30% aller Lebensmittel** weltweit werden weggeworfen — KI könnte dies halbieren.`,
      },
      {
        title: "Yuka, MyFitnessPal, DarfIch — wer kann was?",
        content: `| Feature | Yuka | MyFitnessPal | DarfIch |\n|---|---|---|---|\n| Barcode-Scan | ✅ | ✅ | ✅ |\n| Intoleranz-Profil | ❌ | ❌ | ✅ |\n| KI-Analyse | Teilweise | ❌ | ✅ Claude |\n| Histamin-Check | ❌ | ❌ | ✅ |\n| Kalorientracking | ❌ | ✅ | ❌ |\n| Sprache | DE/FR/EN | EN/DE | DE |\n\n**Fazit:** Jede App hat ihre Nische. DarfIch füllt die Lücke für Intoleranz-Betroffene im DACH-Raum.`,
      },
      {
        title: "Wie KI verhindert, dass Essen uns krank macht",
        content: `**Anwendungsfelder KI & Food Safety:**\n\n- **Qualitätskontrolle:** Kamera-KI erkennt faules Obst am Förderband (99.8% Genauigkeit)\n- **Kontaminationserkennung:** KI-Sensoren riechen Bakterien in Fleisch\n- **Rückverfolgung:** Blockchain + KI — von Feld zu Teller in Sekunden nachverfolgen\n- **Etikettenkontrolle:** KI prüft ob Inhaltsstoffe korrekt deklariert sind\n- **Allergen-Prävention:** Produktionslinien-KI verhindert Kreuzkontamination\n\n**Erfolgsgeschichte:**\nIBM Food Trust + Walmart: Rückverfolgung von Mangos von 7 Tagen auf **2.2 Sekunden** reduziert.`,
      },
      {
        title: "Precision Farming — die Zukunft der Felder",
        content: `**Was ist Precision Farming?**\n- Drohnen scannen Felder → KI erkennt kranke Pflanzen, Wassermangel, Schädlinge\n- Automatische Bewässerung: Nur so viel Wasser wie nötig, genau dort wo nötig\n- Ernteprogonse: KI sagt 3 Monate im Voraus wann und wie viel geerntet wird\n\n**Zahlen:**\n- Precision Farming steigert Ernteerträge um **10–20%**\n- Wasserverbrauch sinkt um bis zu **40%**\n- Schädlingsbekämpfungsmittel-Einsatz reduziert sich um **30%**\n\n**Beispiel FL/Vorarlberg:** Kleinbauern setzen auf KI-Apps für Wettervorhersage und Schädlingsfrüherkennung.`,
      },
      {
        title: "Aus dem MMIND-Labor: Von der Idee zur App",
        content: `**Was ist DarfIch?**\n- Health-Tech App für Menschen mit Nahrungsmittelunverträglichkeiten\n- Entwickelt von MMIND.ai, live auf darfich.mmind.space\n- Unterstützte Unverträglichkeiten: **Histamin, Gluten, Laktose, Fruktose, Sorbit, FODMAP**\n\n**Wie es funktioniert:**\n1. Profil anlegen (welche Unverträglichkeiten, Schweregrad)\n2. Barcode scannen → Open Food Facts API → 3 Millionen Produkte\n3. Alternativ: Foto der Zutatenliste → Claude Vision OCR\n4. Claude KI versteht Synonyme + versteckte Liberatoren\n5. Ergebnis: ✅ Grün / ❌ Rot + Erklärung auf Deutsch\n\n**Der KI-Clou:** Statische Datenbanken kennen «E 220». Claude weiss: E 220 = Schwefeldioxid = starker Histamin-Liberator → Rot!`,
      },
      {
        title: "Was in 10 Jahren normal ist",
        content: `**Trend 1 — Printed Food:**\n- 3D-Drucker für Lebensmittel — personalisierte Nährstoffprofile gedruckt\n- NASA nutzt 3D-Foodprinting bereits für Astronauten\n\n**Trend 2 — Fermentation 2.0:**\n- KI optimiert Fermentationsprozesse für maximale Nährstoffe\n- Precision Fermentation: Tierprotein ohne Tier (Milch, Ei aus Pilzen)\n\n**Trend 3 — Hyper-Personalisierung:**\n- KI analysiert Echtzeit-Biomarker → passt Ernährungsplan stündlich an\n- Continuous Glucose Monitoring wird Standard wie Schrittzähler\n\n**Trend 4 — KI-Koch:**\n- Smarte Küchen (Thermomix + KI) kochen vollautomatisch nach Profil`,
      },
      {
        title: "3 Schritte die du diese Woche machst",
        content: `**Schritt 1 — Entdecken:**\n- Lade eine Ernährungs-App herunter (Yuka, DarfIch oder ähnlich)\n- Scanne 10 Produkte die du regelmässig kaufst — was lernst du?\n\n**Schritt 2 — Ausprobieren:**\n- Frage ChatGPT: «Ich habe [Unverträglichkeit XY]. Gib mir 5 Rezepte für diese Woche mit: [Zutaten die ich habe]»\n- Bewerte das Ergebnis — was fehlt? Was überrascht dich?\n\n**Schritt 3 — Reflektieren:**\n- Möchtest du mehr Körperdaten teilen für bessere Empfehlungen? Wo ist KI-Unterstützung beim Essen sinnvoll — wo nicht?\n\n**Jetzt:** Starte das Quiz und verdiene dein 🥗 **«NutriBot»-Badge** !`,
      },
    ],
    quiz: [
      {
        question: "Was ist der Hauptvorteil von KI-gestützten Ernährungs-Apps gegenüber klassischen Kalorientrackers wie MyFitnessPal?",
        options: [
          { label: "A", text: "Sie sind immer kostenlos" },
          { label: "B", text: "Sie funktionieren ohne Internetverbindung" },
          { label: "C", text: "Sie können individuelle Unverträglichkeiten und versteckte Zutaten berücksichtigen" },
          { label: "D", text: "Sie sind genauer beim Kalorienzählen" },
        ],
        correct: "C",
        explanation: "Klassische Apps zählen Kalorien. KI-Apps wie DarfIch können semantisch verstehen — zum Beispiel dass «E 220» ein Histamin-Liberator ist und für Betroffene ein Problem darstellt.",
      },
      {
        question: "Du scannst ein Produkt mit der DarfIch App und hast Histamin-Intoleranz. Auf der Zutatenliste steht «Schwefeldioxid (E 220)». Was sollte die App anzeigen?",
        options: [
          { label: "A", text: "✅ Verträglich — Schwefeldioxid ist ein Konservierungsmittel, kein Histamin" },
          { label: "B", text: "❌ Unverträglich — E 220 ist ein starker Histamin-Liberator" },
          { label: "C", text: "⚠️ Unklar — zu wenig Daten vorhanden" },
          { label: "D", text: "✅ Verträglich — nur natürliche Zutaten lösen Reaktionen aus" },
        ],
        correct: "B",
        explanation: "E 220 (Schwefeldioxid) ist ein bekannter Histamin-Liberator — er lässt den Körper mehr Histamin ausschütten auch wenn es kein Histamin selbst enthält. Genau das erkennt die KI-Schicht von DarfIch.",
      },
      {
        question: "Wie viel Prozent der weltweit produzierten Lebensmittel werden weggeworfen?",
        options: [
          { label: "A", text: "5%" },
          { label: "B", text: "15%" },
          { label: "C", text: "30%" },
          { label: "D", text: "50%" },
        ],
        correct: "C",
        explanation: "Rund 30% aller Lebensmittel landen im Abfall — vom Feld bis zum Teller. KI kann durch bessere Nachfrageprognosen und optimierte Logistik einen grossen Teil davon verhindern.",
      },
      {
        question: "Was versteht man unter «Precision Farming»?",
        options: [
          { label: "A", text: "Landwirtschaft mit besonders teuren Maschinen" },
          { label: "B", text: "Datengestützte, KI-unterstützte Landwirtschaft die Ressourcen gezielt einsetzt" },
          { label: "C", text: "Biologische Landwirtschaft ohne Pestizide" },
          { label: "D", text: "Grossflächige Monokultur-Landwirtschaft" },
        ],
        correct: "B",
        explanation: "Precision Farming nutzt Sensoren, Drohnen und KI um Wasser, Dünger und Pestizide nur dort und dann einzusetzen wo es wirklich nötig ist — weniger Verbrauch, mehr Ertrag.",
      },
      {
        question: "Welche App ist speziell für Menschen mit Nahrungsmittelunverträglichkeiten in der DACH-Region entwickelt worden?",
        options: [
          { label: "A", text: "Yuka" },
          { label: "B", text: "MyFitnessPal" },
          { label: "C", text: "DarfIch" },
          { label: "D", text: "Lifesum" },
        ],
        correct: "C",
        explanation: "DarfIch (darfich.mmind.space) wurde von MMIND.ai speziell für Histamin-, Gluten-, Laktose- und Fruktose-Intoleranz entwickelt — mit Claude KI für semantisches Zutaten-Matching auf Deutsch.",
      },
    ],
  },
  {
    id: "04",
    number: 4,
    title: "KI & Umwelt",
    subtitle: "Klimaretter oder Klimakiller — die unbequeme Frage",
    author: "Phi Yen",
    emoji: "🌍",
    color: "bg-blue-500",
    colorHex: "#3B82F6",
    badge: "eco-warrior",
    badgeEmoji: "🌍",
    badgeName: "Eco Warrior",
    duration: "~10 Min.",
    learningGoals: [
      "Den ökologischen Fussabdruck von KI kennen",
      "Konkrete Umwelt-Anwendungen von KI verstehen",
      "Bewusster mit KI-Tools umgehen",
    ],
    slides: [
      {
        title: "Die unbequeme Frage — beides?",
        content: `KI kann Klimamodelle berechnen, Energie optimieren, Emissionen reduzieren.\n**ABER:** KI selbst verbraucht enorme Mengen Energie und Wasser.\n\n**Zahlen die erschrecken:**\n- Eine ChatGPT-Anfrage verbraucht ~**10x mehr Energie** als eine Google-Suche\n- Das Training von GPT-4 erzeugte ~500 Tonnen CO2 (= 1 Mensch fliegt 500x Zürich–New York)\n- Microsofts Wasserverbrauch für KI-Rechenzentren: +34% in einem Jahr\n\n**Zahlen die hoffen lassen:**\n- KI-optimierte Stromnetze könnten globale Emissionen um **5–10% senken**\n- Google DeepMind reduzierte Kühlenergie seiner Rechenzentren um **40%** mit KI`,
      },
      {
        title: "Was kostet meine ChatGPT-Nutzung wirklich?",
        content: `**Vergleiche die verstehen lassen:**\n- 1 ChatGPT-Anfrage: ~0.001–0.01 kWh\n- 1 Google-Suche: ~0.0003 kWh\n- 1 Stunde Netflix streamen: ~0.1 kWh\n\n**Wasser als unterschätztes Problem:**\n- Rechenzentren kühlen mit Wasser\n- 1 ChatGPT-Konversation (20–50 Anfragen): ~**0.5 Liter Wasser**\n- Microsoft Redmond Campus: 6 Milliarden Liter Wasser 2022 für KI-Rechenzentren\n\n**Was das bedeutet:**\n- Deine ChatGPT-Nutzung hat einen ökologischen Fussabdruck\n- Er ist klein im Vergleich zu Flugreisen — aber er wächst exponentiell`,
      },
      {
        title: "Das Werkzeug das wir brauchen — um uns zu retten",
        content: `**Wettermodelle:**\n- Europäisches Wetterzentrum (ECMWF): KI-Modell «AIFS» schlägt traditionelle Modelle\n- 10-Tages-Vorhersage heute so gut wie 7-Tages-Vorhersage vor 10 Jahren\n- Google DeepMind «GraphCast»: Präzisere Extremwetterwarnungen (Hurrikane, Überschwemmungen)\n\n**Klimamodelle:**\n- KI analysiert Klimadaten der letzten 1.000 Jahre in Stunden\n- Identifiziert versteckte Rückkopplungsschleifen im Klimasystem\n\n**Emissionsüberwachung:**\n- Satelliten + KI überwachen Methanemissionen in Echtzeit weltweit\n- «Global Forest Watch»: KI erkennt illegale Abholzung innerhalb von Tagen`,
      },
      {
        title: "Die Stadt die mitdenkt",
        content: `**Was ist eine Smart City?**\nStadt, die Daten aus Sensoren, Kameras und Netzwerken mit KI auswertet.\n\n**5 konkrete Anwendungen:**\n\n🚦 **Verkehr:** KI-gesteuerte Ampeln reduzieren Stau und Abgase um 20–25%\n💡 **Beleuchtung:** Strassenlampen die heller werden wenn jemand vorbeikommt → -40% Energieverbrauch\n🗑️ **Abfall:** Sensoren in Mülltonnen → Leerung nur wenn nötig → -30% Fahrten\n💧 **Wasser:** Leckage-Erkennung in Rohren → bis zu 30% weniger Wasserverlust\n🌡️ **Gebäude:** KI-Heizungssteuerung → Räume nur heizen wenn genutzt\n\n**Beispiel nahe bei uns:** Stadt Vaduz testet Smart-Parking mit Sensoren + KI-App`,
      },
      {
        title: "KI als Naturschützer",
        content: `**Das Problem:**\n1 Million Tier- und Pflanzenarten sind vom Aussterben bedroht. Traditionelles Monitoring: viel zu langsam.\n\n**KI-Lösungen:**\n\n🐋 **Wale identifizieren:** KI erkennt individuelle Wale anhand von Atemspuren-Fotos\n→ «Happywhale» — 50.000 Freiwillige + KI → grösstes Wal-Tracking der Welt\n\n🦜 **Vögel zählen:** «Merlin» App (Cornell Lab): KI identifiziert Vögel am Gesang in Echtzeit\n→ 60 Millionen Downloads, 1 Milliarde Beobachtungen\n\n🌿 **Regenwald:** Akustische Sensoren + KI erkennen Kettensägen\n→ «Rainforest Connection» — verhindert aktiv illegale Abholzung\n\n🐘 **Wildtierschutz:** KI-Kameranetze verhindern Wilderei\n→ Kruger Nationalpark: Wilderei um **70%** reduziert`,
      },
      {
        title: "Das Stromnetz der Zukunft — flexibel und grün",
        content: `**Das Problem mit erneuerbarer Energie:**\n- Sonne scheint nicht immer, Wind weht nicht immer\n- Angebot und Nachfrage müssen sich in Echtzeit ausgleichen\n- Traditionelle Netze: starr, reaktiv, auf fossile Energie ausgelegt\n\n**KI als Dirigent:**\n- Vorhersage: Wann scheint die Sonne wie stark? Wann weht der Wind?\n- Demand-Response: Industriemaschinen laufen wenn Strom günstig ist (nachts, bei viel Wind)\n- Speichermanagement: Batteriespeicher optimal laden und entladen\n- Micro-Grids: Kleine, autonome Netze — Dorf produziert und verwaltet eigenen Strom\n\n**Beispiel:**\nGoogle DeepMind in britischen Windparks: KI verdoppelte Vorhersagegenauigkeit, Erlös für Windenergie stieg um **20%**.`,
      },
      {
        title: "Der Roboter der besser sortiert als wir",
        content: `**Das Recycling-Problem:**\n- Falsch sortierter Müll kontaminiert ganze Chargen → landet auf Deponie\n- Manuelle Sortierung: Teuer, langsam, ungenau\n- Recyclingquote in der Schweiz: 53% — trotz gutem Bewusstsein\n\n**KI-Sortierroboter:**\n- Kamera + KI erkennt Materialien auf Förderband (Plastik-Typen, Glas, Metall, Papier)\n- Roboterarm sortiert **70–80 Griffe pro Minute**\n- Erkennungsrate: **95%+** für 250+ Materialkategorien\n\n**Was das bringt:**\n- Recyclingquote steigt um 20–30% in Anlagen mit KI-Sortierung\n- Arbeitssicherheit: Menschen arbeiten nicht mehr in gefährlichen Sortierbereichen`,
      },
      {
        title: "Wie grün ist dein digitaler Alltag?",
        content: `**Tool-Vergleich (pro Stunde Nutzung):**\n\n| Tool | CO2-Äquivalent | Wasserverbrauch |\n|---|---|---|\n| E-Mail lesen | ~0.3g | minimal |\n| Google-Suche | ~0.2g | minimal |\n| Netflix HD | ~36g | ~100ml |\n| Video Call (Zoom) | ~150g | ~200ml |\n| ChatGPT-Session | ~50–200g | ~500ml |\n| Bild generieren (DALL-E) | ~2–5g pro Bild | ~50ml |\n\n**Kontext:** Flug Zürich–London = 100 kg CO2 pro Person\n→ ChatGPT ein Jahr täglich nutzen ≈ **10–50 kg CO2**\n\n**Fazit:** Bewusste Nutzung, nicht Verzicht. Effizienz lohnt sich.`,
      },
      {
        title: "Wie entwickeln wir nachhaltige KI?",
        content: `**Green AI Prinzipien:**\n\n1. **Effizienz first:** Kleines Modell das reicht ist besser als grosses das kann mehr\n2. **Grüner Strom:** Rechenzentren mit 100% erneuerbarer Energie\n3. **Standort:** Rechenzentren dort wo Strom sauber und Kühlung günstig (Skandinavien, Island)\n4. **Modell-Lebensdauer:** Trainiere einmal, nutze lange — kein ständiges Neu-Training\n5. **Reporting:** CO2-Verbrauch von KI-Produkten transparent machen\n\n**Gute Zeichen:**\n- Google, Microsoft, Amazon: 100% erneuerbar bis 2030 versprochen\n- EU AI Act verlangt Energie-Transparenz für grosse Modelle ab 2026`,
      },
      {
        title: "Nachhaltigkeit vor unserer Haustür",
        content: `**Liechtenstein:**\n- FL Energiestrategie 2030: 30% Reduktion Energieverbrauch, 100% erneuerbare Stromproduktion\n- LKW (Liechtensteinische Kraftwerke): Pilotprojekt KI-gestützte Laststeuerung\n- FL hat eine der höchsten **Photovoltaik-Dichten pro Kopf** in Europa\n\n**Vorarlberg:**\n- «Ländle» Energieautonomie-Programm: KI in Gemeinschaftsspeichern\n- illwerke vkw: KI-Prognosen für Pumpspeicherkraftwerke (Montafon)\n\n**Schweiz:**\n- EPFL Lausanne: Forschung zu KI für Klimamodellierung\n- Axpo: KI-gestützte Stromhandelssysteme`,
      },
      {
        title: "5 konkrete Schritte — morgen umsetzbar",
        content: `**Schritt 1 — Bewusster nutzen:**\n- Für einfache Fragen: Google statt ChatGPT\n- Längere Konversationen > viele kurze Sessions (Kontext-Effizienz)\n\n**Schritt 2 — Green Tools wählen:**\n- Bevorzuge Tools die Öko-Transparenz kommunizieren\n- Europäische Anbieter nutzen (oft grünerer Strom als US-Server)\n\n**Schritt 3 — KI für Klimahandeln:**\n- CO2-Footprint deines Lebensstils berechnen lassen (ChatGPT kann das!)\n- «Erstelle mir einen persönlichen Plan um meine CO2-Emissionen um 20% zu senken»\n\n**Schritt 4 — Teilen:** Erzähl 3 Menschen was du heute gelernt hast.\n\n**Schritt 5 — Dranbleiben:**\n- climatetrace.org — globales KI-Emissions-Tracking in Echtzeit\n\n**Jetzt:** Starte das Quiz und verdiene dein 🌍 **«Eco Warrior»-Badge** !`,
      },
    ],
    quiz: [
      {
        question: "Wie viel mehr Energie verbraucht eine ChatGPT-Anfrage im Vergleich zu einer Google-Suche (ungefähr)?",
        options: [
          { label: "A", text: "Gleich viel" },
          { label: "B", text: "2–3x mehr" },
          { label: "C", text: "10x mehr" },
          { label: "D", text: "100x mehr" },
        ],
        correct: "C",
        explanation: "Eine ChatGPT-Anfrage verbraucht rund 10x mehr Energie als eine klassische Google-Suche — weil das Generieren von Text mit grossen Sprachmodellen deutlich rechenintensiver ist als das Abrufen von indizierten Seiten.",
      },
      {
        question: "Google DeepMind hat KI eingesetzt um Rechenzentren effizienter zu kühlen. Was war das Ergebnis?",
        options: [
          { label: "A", text: "10% weniger Energieverbrauch" },
          { label: "B", text: "40% weniger Energieverbrauch für die Kühlung" },
          { label: "C", text: "5% mehr Effizienz" },
          { label: "D", text: "KI hat die Situation verschlechtert" },
        ],
        correct: "B",
        explanation: "DeepMind's KI-System reduzierte den Energieverbrauch der Rechenzentrum-Kühlung um 40% — ein eindrückliches Beispiel wie KI sich selbst nachhaltiger machen kann.",
      },
      {
        question: "Was macht die «Rainforest Connection» Initiative mit KI?",
        options: [
          { label: "A", text: "KI erstellt virtuelle Regenwald-Touren für Touristen" },
          { label: "B", text: "Akustische Sensoren + KI erkennen Kettensägen und warnen vor illegaler Abholzung" },
          { label: "C", text: "KI optimiert die Holzproduktion in nachhaltig bewirtschafteten Wäldern" },
          { label: "D", text: "KI analysiert Satellitenbilder um Regenwald zu kartieren" },
        ],
        correct: "B",
        explanation: "Rainforest Connection installiert solar-betriebene Geräte in Bäumen — die KI hört auf Kettensägen und alarmiert Ranger in Echtzeit, bevor Schaden entsteht.",
      },
      {
        question: "Du nutzt ChatGPT täglich für etwa 20 Anfragen. Was entspricht das ungefähr an CO2-Emissionen pro Jahr?",
        options: [
          { label: "A", text: "Weniger als 1 kg CO2 — vernachlässigbar" },
          { label: "B", text: "Etwa 5–15 kg CO2 — vergleichbar mit einer kurzen Autofahrt pro Monat" },
          { label: "C", text: "Über 1 Tonne CO2 — mehr als ein Transatlantikflug" },
          { label: "D", text: "Genau 100 kg CO2 — wie ein Flug Zürich–London" },
        ],
        correct: "B",
        explanation: "Die tägliche moderate ChatGPT-Nutzung erzeugt etwa 5–15 kg CO2 pro Jahr — real aber überschaubar im Vergleich zu Flugreisen oder Fleischkonsum. Bewusstsein hilft, Panikmache nicht.",
      },
      {
        question: "Warum sind Handwerksberufe weniger von KI-Automatisierung bedroht als Bürojobs?",
        options: [
          { label: "A", text: "Handwerker verdienen zu wenig — Automatisierung lohnt sich nicht" },
          { label: "B", text: "Es gibt keine KI-Tools für Handwerk" },
          { label: "C", text: "Physische, unstrukturierte Umgebungen und Kundennähe sind für Roboter noch schwer zu replizieren" },
          { label: "D", text: "Handwerksberufe sind gesetzlich vor Automatisierung geschützt" },
        ],
        correct: "C",
        explanation: "Roboter brauchen präzise, strukturierte Umgebungen. Das Badezimmer jedes Kunden ist anders, jede Baustelle einzigartig — das überfordert aktuelle Robotik. Zudem ist das Vertrauensverhältnis zum Handwerker persönlich und schwer ersetzbar.",
      },
    ],
  },
  {
    id: "05",
    number: 5,
    title: "KI & Berufe der Zukunft",
    subtitle: "Nimmt KI meinen Job? — Die ehrliche Antwort",
    author: "Phi Yen",
    emoji: "🚀",
    color: "bg-purple-500",
    colorHex: "#A855F7",
    badge: "future-ready",
    badgeEmoji: "🚀",
    badgeName: "Future Ready",
    duration: "~10 Min.",
    learningGoals: [
      "Den tatsächlichen Einfluss von KI auf den Arbeitsmarkt verstehen",
      "Neue KI-Berufsbilder kennen",
      "Den eigenen Karriereplan mit KI entwickeln",
    ],
    slides: [
      {
        title: "Nüchterne Antwort auf die Frage, die alle beschäftigt",
        content: `**Was Studien sagen:**\n- **McKinsey 2023:** 30% aller Arbeitsstunden könnten bis 2030 automatisiert werden\n- **Oxford-Studie:** 47% der US-Jobs «gefährdet» (von 2013 — die Realität ist komplexer)\n- **WEF Future of Jobs 2025:** 85 Mio. Jobs verdrängt, 97 Mio. neue geschaffen — **Netto +12 Mio.**\n\n**Die ehrliche Antwort:**\n- Bestimmte **AUFGABEN** werden automatisiert — nicht ganze **BERUFE**\n- Ein Buchhalter der Excel-Tabellen tippt → gefährdet\n- Ein Buchhalter der strategisch berät → nicht gefährdet\n- Wer KI nutzt, ersetzt den der sie nicht nutzt\n\n**Die wichtigste Erkenntnis:** «KI vs. Mensch» → **«Mensch mit KI vs. Mensch ohne KI»**`,
      },
      {
        title: "Was Routine ist, übernimmt die Maschine",
        content: `**Stark betroffene Bereiche:**\n\n📋 **Sachbearbeitung:** Dateneingabe, Standard-Formulare, Routineprüfungen\n→ Nicht weg, aber massiv effizienter: 1 Person macht was früher 5 machten\n\n📞 **Kundenservice Tier 1:** Standard-Anfragen, FAQ-Antworten, Terminbuchungen\n→ KI-Chatbots übernehmen 80% der Anfragen — komplexe gehen weiter zum Menschen\n\n🖊️ **Basis-Content:** Standard-Texte, Produktbeschreibungen, einfache Übersetzungen\n→ Texter die 100 Produktbeschreibungen täglich schreiben: direkt betroffen\n\n📊 **Datenanalyse Basis:** Standard-Reports, Excel-Dashboards\n→ Automatisiert durch KI — aber Interpretation und Empfehlungen bleiben beim Menschen`,
      },
      {
        title: "Berufe, die 2020 noch nicht existierten",
        content: `**Neue Berufsbilder:**\n\n🎯 **Prompt Engineer:** Spezialist für optimale KI-Kommunikation\n- Gehalt in den USA: **80.000–300.000 USD/Jahr** · Nachfrage +500% seit 2022\n\n🤖 **AI Trainer / RLHF Specialist:** Trainiert KI durch Feedback-Bewertung\n- Wächst massiv — viele Remote-Positionen\n\n⚖️ **AI Ethics Officer:** Bewertet KI-Systeme auf Fairness und Bias\n- Pflichtrolle in Firmen unter EU AI Act (Hochrisiko-Systeme)\n\n🔧 **AI Integration Specialist:** Implementiert KI in bestehende Unternehmensprozesse\n- Der «KI-Übersetzer» zwischen IT und Business\n\n📚 **AI Literacy Coach:** Bringt Teams KI-Nutzung bei — wie dieser Kurs!`,
      },
      {
        title: "Der Mensch als Dirigent — KI als Orchester",
        content: `**Das neue Arbeitsmodell:**\n\nNicht: Mensch **ODER** Maschine\nSondern: Mensch **DIRIGIERT** Maschine\n\n**5 Dinge die KI (noch) nicht kann:**\n1. **Echte Empathie:** Einen trauernden Kunden wirklich begleiten\n2. **Ethisches Urteil:** In komplexen Dilemmas die richtige Entscheidung treffen\n3. **Physische Präsenz:** Handwerk, Pflege, Sport\n4. **Kreative Originalität:** Echte Innovation aus dem Nichts (KI remixed immer)\n5. **Verantwortung übernehmen:** Für Fehler gerade stehen\n\n**Die neue Kernkompetenz:**\n- Wissen **wann** man KI nutzt — und wann nicht\n- Die Ausgabe von KI kritisch bewerten\n- KI so führen, dass sie das tut was man will`,
      },
      {
        title: "Warum der Schreiner und der Elektriker sicherer sind als du denkst",
        content: `**Warum Handwerk weniger gefährdet ist:**\n- Physische Präsenz ist nicht digitalisierbar\n- Unstrukturierte Umgebungen überfordern Roboter (noch)\n- Vertrauen und Beziehung zum Kunden sind persönlich\n\n**Wo KI dem Handwerk hilft:**\n\n🔨 **Schreinerei:** KI-Software optimiert Zuschnitte → 30% weniger Materialverschnitt\n⚡ **Elektriker:** AR-Brillen mit KI zeigen Leitungsverlauf in der Wand\n🏗️ **Bauwesen:** KI erkennt Baumängel auf Fotos bevor sie sichtbar werden\n🚿 **Sanitär:** KI-Diagnose von Leitungsproblemen über Drucksensoren\n🌱 **Garten:** KI-Bewässerungsplanung, Pflanzenkrankheits-Erkennung per App\n\n**Botschaft:** Handwerker die KI-Tools nutzen, bieten mehr Wert — nicht weniger Arbeit.`,
      },
      {
        title: "Bedrohung oder das mächtigste Werkzeug der Geschichte?",
        content: `**Was KI kann:**\n- Bilder: Midjourney, DALL-E, Stable Diffusion → Profi-Qualität in Sekunden\n- Musik: Suno, Udio → komplette Songs in 30 Sekunden\n- Video: Sora (OpenAI), Runway → realistische Videos aus Text\n- Code: GitHub Copilot → 30–40% schnelleres Entwickeln\n\n**Was KI nicht kann:**\n- Echte emotionale Tiefe aus eigener Erfahrung\n- Kulturellen Kontext wirklich verstehen\n- Verantwortung für eine kreative Vision übernehmen\n\n**Die Verschiebung:** Kreativer Wert liegt mehr im **Konzept, der Kuration und der Kommunikation** — weniger in der Produktion.\n\n**Praxis:** Graphic Designer die KI nutzen → **5x produktiver.** Die die es nicht tun → verlieren Aufträge.`,
      },
      {
        title: "KI rettet Leben — aber ersetzt keine Ärzte",
        content: `**Wo KI bereits eingesetzt wird:**\n\n🩺 **Diagnose:**\n- KI erkennt Hautkrebs aus Fotos mit Dermatologen-Niveau (Stanford-Studie)\n- KI liest Röntgenbilder — findet Tumore die Radiologen übersehen\n\n💊 **Medikamente:**\n- AlphaFold (DeepMind): Löste das 50-Jahre-Problem der Proteinfaltung\n- KI verkürzt Medikamenten-Entwicklung von 12 Jahren auf **4–5 Jahre**\n\n👩‍⚕️ **Pflege:**\n- KI-Assistenten erinnern Patienten an Medikamente\n- Sturzerkennung für ältere Menschen (Kamera-KI ohne Kamera-Bild = Datenschutz)\n- Mentale Gesundheit: KI-Chatbots als erste Anlaufstelle (Woebot)\n\n**Wichtig:** KI diagnostiziert, der Arzt entscheidet. **Immer.**`,
      },
      {
        title: "Personalisiertes Lernen — endlich für alle",
        content: `**Das Problem mit heutiger Bildung:**\n- 30 Schüler, 1 Lehrer, 1 Tempo — passt für die Mitte, nicht für die Enden\n- Begabte langweilen sich, Schwächere verlieren den Anschluss\n\n**Was KI möglich macht:**\n\n📚 **Adaptives Lernen:** KI passt Schwierigkeitsgrad in Echtzeit an\n→ Khan Academy «Khanmigo»: KI-Tutor für jeden Schüler\n\n✍️ **Sofortiges Feedback:** Aufsatz schreiben → sofortige stilistische Rückmeldung\n\n🗣️ **Sprachenlernen:** Duolingo mit KI → persönliche Konversationsübungen + Aussprachefeedback in Echtzeit\n\n🌍 **Barrierefreiheit:**\n- Echtzeit-Untertitel für Gehörlose\n- Text-to-Speech für Sehbehinderte\n- Übersetzung → Lerninhalte in jeder Sprache\n\n**Für Lehrer:** Mehr Zeit für Motivation, Beziehung, Inspiration.`,
      },
      {
        title: "Was die KI-Revolution für unsere Region bedeutet",
        content: `**Liechtenstein:**\n- Sehr hohe Beschäftigungsquote (2% Arbeitslosigkeit) — guter Ausgangspunkt\n- Stärken: Finanzsektor, Industrie, Maschinenbau — alle stark von KI beeinflusst\n- Chancen: FL als attraktiver KI-Hub durch günstige Steuern + EU-Regelkonformität (EWR)\n- **AI-Lab.li** baut KI-Kompetenzen in der Region auf (das hier ist Teil davon!)\n\n**Schweiz:**\n- UBS: KI spart tausende von Stellen in Back-Office\n- Pharma: Novartis, Roche investieren Milliarden in KI-Forschung\n- Uhren: «Swiss Made» trifft auf KI-Design-Tools — Chance zur Premiumisierung\n- CH Regierung: Nationaler KI-Aktionsplan 2025 verabschiedet\n\n**Gemeinsam:** Regionale Stärke ist Qualität und Vertrauen — KI verstärkt das.`,
      },
      {
        title: "Wo du KI-Skills lernst — jetzt, kostenlos",
        content: `**Kostenlose Zertifizierungen:**\n- Google AI Essentials (Coursera) — ~15 Stunden, kostenlos zum Audit\n- Microsoft AI Skills Initiative — kostenlose Lernpfade auf LinkedIn Learning\n- Anthropic (Claude) Prompt Engineering Guide — kostenlos online\n\n**Plattformen:**\n- fast.ai — Praktisches Deep Learning, kostenlos\n- Kaggle Learn — Datenanalyse mit KI, kostenlos\n- YouTube: «3Blue1Brown» — intuitive Erklärungen zu neuronalen Netzen\n\n**In 1 Woche lernst du:**\n- Tag 1–2: Prompting Basics (Modul 2 dieses Kurses + Promptingguide.ai)\n- Tag 3–4: Ein KI-Tool tief kennenlernen\n- Tag 5–7: Wende es in deiner echten Arbeit an\n\n**Wichtigste Ressource:** Einfach anfangen. Die beste Stunde Lernzeit ist die erste echte Nutzungsstunde.`,
      },
      {
        title: "Drei Fragen die deine Zukunft formen",
        content: `**Frage 1: Was ist in meinem Job Routine?**\n- Liste alle Aufgaben die du regelmässig und mechanisch erledigst\n- Das sind Kandidaten für KI-Unterstützung\n- Mehr Zeit für die Aufgaben die nur du kannst\n\n**Frage 2: Was macht mich einzigartig?**\n- Welche Kombinationen aus Wissen, Erfahrung, Beziehungen habe ich?\n- Das ist dein Wettbewerbsvorteil den KI nicht replizieren kann\n\n**Frage 3: Welche KI-Kompetenz brauche ich in 12 Monaten?**\n- 1 konkrete Fähigkeit wählen: Prompt Engineering, Datenanalyse mit KI...\n- 1 Stunde pro Woche investieren = 52 Stunden pro Jahr = Experten-Niveau\n\n**Dein Commitment heute:**\nSchreib 1 Satz: «In 12 Monaten kann ich [KI-Skill XY] und nutze ihn für [konkrete Anwendung].»\n\n🎓 **Alle 5 Module abgeschlossen → Zertifikat herunterladen!**`,
      },
    ],
    quiz: [
      {
        question: "Laut World Economic Forum (WEF 2025): Was ist der Nettoeffekt von KI auf Arbeitsplätze bis 2030?",
        options: [
          { label: "A", text: "Nettoverlust von 50 Millionen Jobs weltweit" },
          { label: "B", text: "Nettoverlust von 10 Millionen Jobs" },
          { label: "C", text: "Nettowachstum von ca. 12 Millionen Jobs (97 Mio. neu, 85 Mio. verdrängt)" },
          { label: "D", text: "Keine Veränderung — Technologie schafft immer gleich viele Jobs wie sie vernichtet" },
        ],
        correct: "C",
        explanation: "Der WEF erwartet 85 Millionen verdrängte und 97 Millionen neue Jobs — ein Nettowachstum von ~12 Millionen. Aber: Die neuen Jobs erfordern andere Kompetenzen als die verdrängten.",
      },
      {
        question: "Was ist ein «Prompt Engineer»?",
        options: [
          { label: "A", text: "Ein Softwareentwickler der KI-Modelle programmiert" },
          { label: "B", text: "Ein Spezialist der KI-Systeme durch präzise Anweisungen optimal steuert" },
          { label: "C", text: "Ein Techniker der KI-Hardware wartet" },
          { label: "D", text: "Ein Berater der Unternehmen bei KI-Regulierung berät" },
        ],
        correct: "B",
        explanation: "Prompt Engineers spezialisieren sich darauf, KI-Systeme durch die richtige Formulierung von Anweisungen optimal zu nutzen. In den USA werden dafür bis zu 300.000 USD/Jahr bezahlt.",
      },
      {
        question: "Welche Fähigkeit wird durch KI NICHT ersetzt — und wird deshalb wertvoller?",
        options: [
          { label: "A", text: "Dateneingabe und Routineformulare ausfüllen" },
          { label: "B", text: "Standard-Texte und Produktbeschreibungen schreiben" },
          { label: "C", text: "Echte Empathie, ethisches Urteil und Verantwortung übernehmen" },
          { label: "D", text: "Einfache Übersetzungen erstellen" },
        ],
        correct: "C",
        explanation: "KI kann Empathie simulieren, aber nicht fühlen. Ethische Entscheidungen in komplexen Dilemmas, echte Fürsorge und das Übernehmen von Verantwortung bleiben zutiefst menschliche Kompetenzen.",
      },
      {
        question: "Wie hat KI den Bereich der Medikamentenentwicklung verändert?",
        options: [
          { label: "A", text: "KI hat die Entwicklungskosten um 50% erhöht" },
          { label: "B", text: "KI macht Medikamente ohne klinische Tests möglich" },
          { label: "C", text: "AlphaFold (DeepMind) löste das Proteinfaltungsproblem und verkürzt Entwicklungszeiten von 12 auf 4–5 Jahre" },
          { label: "D", text: "KI wird in der Pharmaindustrie noch nicht eingesetzt" },
        ],
        correct: "C",
        explanation: "DeepMind's AlphaFold löste 2020 ein 50-Jahre-altes Problem der Biologie. Heute hilft es Forschern Wirkstoffe schneller zu entwickeln — ein konkretes Beispiel wo KI Menschenleben rettet.",
      },
      {
        question: "Was ist die wichtigste Kompetenz im KI-Zeitalter laut diesem Kurs?",
        options: [
          { label: "A", text: "Programmieren lernen — alle müssen coden können" },
          { label: "B", text: "KI komplett vermeiden um unabhängig zu bleiben" },
          { label: "C", text: "Wissen wann man KI einsetzt, wann nicht — und ihre Ausgaben kritisch bewerten" },
          { label: "D", text: "Möglichst viele verschiedene KI-Tools gleichzeitig nutzen" },
        ],
        correct: "C",
        explanation: "«KI-Kompetenz» bedeutet nicht, selbst zu programmieren. Es bedeutet: KI sinnvoll einsetzen, Grenzen kennen, Ergebnisse hinterfragen — der Mensch bleibt Dirigent, KI ist das Orchester.",
      },
    ],
  },
];

export const TOTAL_MAX_XP = 1425;

export const XP_REWARDS = {
  SLIDE_READ: 5,
  MODULE_COMPLETE: 50,
  QUIZ_PASS: 100,
  QUIZ_PERFECT: 150,
  QUIZ_RETRY_PASS: 50,
  ALL_MODULES_BONUS: 500,
} as const;

export const BADGES = [
  { id: "ai-act-expert", emoji: "🏛️", name: "AI Act Expert", moduleId: "01" },
  { id: "prompt-master", emoji: "💬", name: "Prompt Master", moduleId: "02" },
  { id: "nutribot", emoji: "🥗", name: "NutriBot", moduleId: "03" },
  { id: "eco-warrior", emoji: "🌍", name: "Eco Warrior", moduleId: "04" },
  { id: "future-ready", emoji: "🚀", name: "Future Ready", moduleId: "05" },
  { id: "ai-graduate", emoji: "🎓", name: "AI Graduate", moduleId: null },
] as const;
