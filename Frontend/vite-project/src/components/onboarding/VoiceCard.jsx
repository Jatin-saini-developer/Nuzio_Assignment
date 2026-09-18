export default function VoiceCard({
  name,
  language,
  description,
  gender,
  initial,
  color,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex h-[63px] w-full items-center rounded-[14px] px-[12px] text-left transition-all"
      style={{
        background: selected
          ? "rgba(144,128,255,0.10)"
          : "rgba(255,255,255,0.045)",
        border: selected
          ? "1px solid #9080FF"
          : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Avatar */}
      <div
        className="mr-[10px] flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full"
        style={{ background: color }}
      >
        <span
          className="text-[11px]"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontWeight: 700,
            color: "#F0EDE8",
          }}
        >
          {initial}
        </span>
      </div>

      {/* Voice information */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-[5px]">
          <span
            className="text-[10px]"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 700,
              color: "#F0EDE8",
            }}
          >
            {name}
          </span>

          <span
            className="rounded-[3px] px-[4px] py-[1px] text-[6px] leading-none"
            style={{
              fontFamily: "'Geist Mono', monospace",
              color: "#6FCBFF",
              background: "rgba(40,120,180,.15)",
            }}
          >
            {language}
          </span>
        </div>

        <p
          className="m-0 mt-[2px] truncate text-[8px] leading-[11px]"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            color: "#8A8480",
          }}
        >
          {description}, {gender} ◦
        </p>

        <p
          className="m-0 text-[7px] leading-[10px]"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            color: "#8A8480",
          }}
        >
          {name === "Aria" ? "English" : language === "HI" ? "Hindi" : "English"}
        </p>
      </div>

      {/* Selected check */}
      {selected && (
        <div
          className="mr-[7px] flex h-[14px] w-[14px] items-center justify-center rounded-full"
          style={{
            background: "#42D39D",
          }}
        >
          <span className="text-[9px] font-bold text-[#07130F]">✓</span>
        </div>
      )}

      {/* Play */}
      <div
        className="flex h-[23px] w-[23px] items-center justify-center rounded-[6px]"
        style={{
          background: selected ? "#694CF1" : "#333333",
        }}
      >
        <span
          className="ml-[1px] text-[9px]"
          style={{
            color: selected ? "#FFFFFF" : "#747474",
          }}
        >
          ▶
        </span>
      </div>
    </button>
  );
}