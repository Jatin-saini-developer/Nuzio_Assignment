export default function NotificationItem({
  icon,
  title,
  description,
  timing,
  timingColor,
}) {
  return (
    <div
      className="flex min-h-[55px] w-full items-center rounded-[12px] px-[10px]"
      style={{
        background: "#181818",
        border: "1px solid rgba(255,255,255,.07)",
      }}
    >
      {/* Icon */}
      <div
        className="mr-[9px] flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px]"
        style={{
          background: "rgba(144,128,255,.10)",
          border: "1px solid rgba(144,128,255,.15)",
        }}
      >
        <span className="text-[11px]">{icon}</span>
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p
          className="m-0 text-[8px] leading-[11px]"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontWeight: 700,
            color: "#F0EDE8",
          }}
        >
          {title}
        </p>

        <p
          className="m-0 mt-[1px] pr-[4px] text-[7px] leading-[10px]"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            color: "#737373",
          }}
        >
          {description}
        </p>
      </div>

      {/* Timing */}
      <span
        className="ml-[5px] shrink-0 whitespace-nowrap text-[6px]"
        style={{
          fontFamily: "'Geist Mono', monospace",
          color: timingColor,
        }}
      >
        {timing}
      </span>
    </div>
  );
}
