"use client";

import type { RichSlide } from "@/data/modules-01";

type Props = {
  slide: RichSlide;
  index: number;
  colorHex: string;
  moduleEmoji: string;
};

export function SlideCard({ slide, index, colorHex, moduleEmoji }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Hero Banner */}
      <div
        className="relative px-6 pt-8 pb-6 flex flex-col items-start"
        style={{ background: `linear-gradient(135deg, ${colorHex}18 0%, ${colorHex}08 100%)` }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ background: colorHex }}
          >
            {index + 1}
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: colorHex }}>
            {slide.label ?? `Slide ${index + 1}`}
          </span>
        </div>
        <h2 className="font-bold text-gray-900 text-xl leading-tight mb-0">{slide.title}</h2>
      </div>

      {/* Visual blocks */}
      <div className="px-5 pb-6 pt-4 space-y-4">
        {slide.blocks.map((block, bi) => {
          switch (block.type) {
            case "image":
              return (
                <div key={bi} className="rounded-2xl overflow-hidden -mx-1">
                  <img
                    src={block.src}
                    alt={block.alt}
                    className="w-full object-cover"
                    style={{ maxHeight: "220px" }}
                  />
                  {block.caption && (
                    <div className="text-center text-xs text-gray-400 mt-1 pb-1">{block.caption}</div>
                  )}
                </div>
              );

            case "intro":
              return (
                <div key={bi} className="flex gap-3 items-start">
                  <span className="text-3xl shrink-0 mt-0.5">{block.emoji}</span>
                  <p className="text-gray-700 leading-relaxed text-base">{block.text}</p>
                </div>
              );

            case "stat-grid":
              return (
                <div key={bi} className="grid grid-cols-2 gap-3">
                  {block.stats.map((s, si) => (
                    <div
                      key={si}
                      className="rounded-2xl p-4 flex flex-col"
                      style={{ background: `${colorHex}10`, border: `1px solid ${colorHex}25` }}
                    >
                      <div className="text-2xl mb-1">{s.emoji}</div>
                      <div
                        className="text-2xl font-bold leading-none mb-1"
                        style={{ color: colorHex }}
                      >
                        {s.value}
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">{s.label}</div>
                    </div>
                  ))}
                </div>
              );

            case "highlight":
              return (
                <div
                  key={bi}
                  className="rounded-2xl p-4 flex gap-3 items-start"
                  style={{ background: `${colorHex}12`, border: `1.5px solid ${colorHex}30` }}
                >
                  <span className="text-xl shrink-0 mt-0.5">{block.emoji}</span>
                  <div>
                    {block.label && (
                      <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: colorHex }}>
                        {block.label}
                      </div>
                    )}
                    <p className="text-gray-800 text-sm leading-relaxed font-medium">{block.text}</p>
                  </div>
                </div>
              );

            case "risk-pyramid":
              return (
                <div key={bi} className="space-y-2">
                  {block.levels.map((l, li) => (
                    <div
                      key={li}
                      className="rounded-xl px-4 py-3 flex items-center gap-3"
                      style={{ background: l.bg }}
                    >
                      <span className="text-xl shrink-0">{l.emoji}</span>
                      <div className="flex-1">
                        <div className="font-bold text-sm" style={{ color: l.color }}>
                          {l.title}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: l.color, opacity: 0.8 }}>
                          {l.desc}
                        </div>
                      </div>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full text-white shrink-0"
                        style={{ background: l.color }}
                      >
                        {l.badge}
                      </span>
                    </div>
                  ))}
                </div>
              );

            case "forbidden-list":
              return (
                <div key={bi} className="space-y-2">
                  {block.items.map((item, ii) => (
                    <div key={ii} className="flex gap-3 items-start bg-red-50 rounded-xl px-4 py-3">
                      <span className="text-lg shrink-0 mt-0.5">{item.emoji}</span>
                      <div>
                        <div className="font-semibold text-red-800 text-sm">{item.title}</div>
                        <div className="text-red-600 text-xs mt-0.5 leading-snug">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                  {block.exception && (
                    <div className="flex gap-3 items-start bg-amber-50 rounded-xl px-4 py-3">
                      <span className="text-lg shrink-0 mt-0.5">⚖️</span>
                      <div className="text-amber-800 text-sm leading-snug">{block.exception}</div>
                    </div>
                  )}
                </div>
              );

            case "duties-list":
              return (
                <div key={bi} className="space-y-2">
                  {block.items.map((item, ii) => (
                    <div key={ii} className="flex gap-3 items-center bg-gray-50 rounded-xl px-4 py-3">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ background: colorHex }}
                      >
                        {ii + 1}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 text-sm">{item.title}: </span>
                        <span className="text-gray-600 text-sm">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              );

            case "timeline":
              return (
                <div key={bi} className="relative pl-6">
                  <div
                    className="absolute left-2.5 top-2 bottom-2 w-0.5 rounded-full"
                    style={{ background: `${colorHex}40` }}
                  />
                  <div className="space-y-3">
                    {block.events.map((ev, ei) => (
                      <div key={ei} className="relative flex gap-4 items-start">
                        <div
                          className="absolute -left-6 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: ev.active ? colorHex : `${colorHex}40` }}
                        />
                        <div
                          className={`flex-1 rounded-xl px-4 py-3 ${ev.active ? "" : "opacity-70"}`}
                          style={{
                            background: ev.active ? `${colorHex}14` : "#F3F4F6",
                            border: ev.active ? `1.5px solid ${colorHex}35` : "1px solid #E5E7EB",
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="font-bold text-sm text-gray-900">{ev.date}</div>
                            {ev.active && (
                              <span
                                className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                                style={{ background: colorHex }}
                              >
                                JETZT
                              </span>
                            )}
                          </div>
                          <div className="text-gray-600 text-xs mt-0.5 leading-snug">{ev.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );

            case "two-col":
              return (
                <div key={bi} className="grid grid-cols-2 gap-3">
                  {block.cols.map((col, ci) => (
                    <div
                      key={ci}
                      className="rounded-2xl p-4"
                      style={{ background: col.bg, border: `1.5px solid ${col.border}` }}
                    >
                      <div className="text-2xl mb-2">{col.emoji}</div>
                      <div className="font-bold text-sm mb-2" style={{ color: col.titleColor }}>
                        {col.title}
                      </div>
                      <div className="space-y-1">
                        {col.items.map((item, ii) => (
                          <div key={ii} className="text-xs leading-snug" style={{ color: col.textColor }}>
                            • {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );

            case "checklist":
              return (
                <div key={bi} className="space-y-2">
                  {block.title && (
                    <div className="font-semibold text-gray-700 text-sm mb-1">{block.title}</div>
                  )}
                  {block.items.map((item, ii) => (
                    <div key={ii} className="flex gap-3 items-start">
                      <div
                        className="w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5"
                        style={{ borderColor: `${colorHex}60`, background: `${colorHex}10` }}
                      >
                        <div className="w-2 h-2 rounded-sm" style={{ background: `${colorHex}60` }} />
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              );

            case "scenario":
              return (
                <div
                  key={bi}
                  className="rounded-2xl overflow-hidden"
                  style={{ border: `1.5px solid ${colorHex}30` }}
                >
                  <div
                    className="px-4 py-2 flex items-center gap-2"
                    style={{ background: colorHex }}
                  >
                    <span className="text-white text-sm font-bold">💬 Beispiel-Szenario</span>
                  </div>
                  <div className="bg-white px-4 py-4">
                    <p className="text-gray-700 text-sm leading-relaxed mb-3 italic">„{block.question}"</p>
                    <div
                      className="flex gap-2 items-start bg-gray-50 rounded-xl px-3 py-2.5"
                    >
                      <span className="text-base shrink-0">
                        {block.verdict === "forbidden" ? "❌" : "✅"}
                      </span>
                      <p className="text-gray-700 text-sm leading-snug">{block.answer}</p>
                    </div>
                  </div>
                </div>
              );

            case "action-steps":
              return (
                <div key={bi} className="space-y-2">
                  {block.steps.map((s, si) => (
                    <div
                      key={si}
                      className="flex gap-3 items-start rounded-xl px-4 py-3"
                      style={{ background: si % 2 === 0 ? `${colorHex}08` : "#F9FAFB" }}
                    >
                      <span className="text-xl shrink-0">{s.emoji}</span>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{s.when}</div>
                        <div className="text-gray-600 text-sm mt-0.5 leading-snug">{s.action}</div>
                      </div>
                    </div>
                  ))}
                </div>
              );

            case "quote":
              return (
                <div
                  key={bi}
                  className="rounded-2xl px-5 py-4"
                  style={{ background: `${colorHex}10`, borderLeft: `4px solid ${colorHex}` }}
                >
                  <p className="text-gray-800 font-semibold text-base leading-relaxed italic">
                    „{block.text}"
                  </p>
                  {block.author && (
                    <div className="text-gray-500 text-xs mt-2">— {block.author}</div>
                  )}
                </div>
              );

            case "penalty-box":
              return (
                <div key={bi} className="rounded-2xl overflow-hidden">
                  <div className="bg-red-500 px-4 py-2">
                    <span className="text-white text-sm font-bold">⚠️ Strafen bei Verstoss</span>
                  </div>
                  <div className="bg-red-50 px-4 py-4 grid grid-cols-2 gap-3">
                    {block.penalties.map((p, pi) => (
                      <div key={pi} className="text-center">
                        <div className="text-xl font-bold text-red-700">{p.value}</div>
                        <div className="text-xs text-red-500 mt-0.5">{p.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
