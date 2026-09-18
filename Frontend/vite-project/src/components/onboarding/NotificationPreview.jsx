export default function NotificationPreview() {
  return (
    <div
      className="h-[72px] w-full rounded-[13px] px-[10px] py-[9px]"
      style={{
        background: "#181818",
        border: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-[7px]">
          <div
            className="flex h-[18px] w-[18px] items-center justify-center rounded-[5px]"
            style={{
              background: "#755AFF",
            }}
          >
            <span className="text-[8px]">≋</span>
          </div>

          <span
            className="text-[8px]"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 700,
              color: "#F0EDE8",
            }}
          >
            Nuzio
          </span>
        </div>

        <span
          className="text-[6px]"
          style={{
            fontFamily: "'Geist Mono', monospace",
            color: "#686868",
          }}
        >
          NOW
        </span>
      </div>

      <p
        className="m-0 mt-[7px] text-[9px]"
        style={{
          fontFamily: "'Hanken Grotesk', sans-serif",
          fontWeight: 700,
          color: "#F0EDE8",
        }}
      >
        🌕 Your morning brief is ready
      </p>

      <p
        className="m-0 mt-[3px] truncate text-[7px]"
        style={{
          fontFamily: "'Hanken Grotesk', sans-serif",
          color: "#737373",
        }}
      >
        6 stories · AI & Tech, Markets, Startups · Voice: Aria · 18:30
      </p>
    </div>
  );
}