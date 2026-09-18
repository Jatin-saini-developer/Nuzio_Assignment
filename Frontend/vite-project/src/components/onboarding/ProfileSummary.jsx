export default function ProfileSummary({
  icon,
  label,
  value,
}) {
  return (
    <div
      className="flex h-[51px] w-full items-center rounded-[10px] px-[11px]"
      style={{
        background: "#191919",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Icon */}
      <div
        className="mr-[9px] flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-[7px]"
        style={{
          background: "rgba(255,255,255,0.035)",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <span className="text-[10px]">{icon}</span>
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p
          className="m-0 text-[6px] leading-[8px] tracking-[1px]"
          style={{
            fontFamily: "'Geist Mono', monospace",
            color: "#66615E",
          }}
        >
          {label}
        </p>

        <p
          className="m-0 mt-[2px] truncate text-[10px] leading-[12px]"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontWeight: 700,
            color: "#E8E5E1",
          }}
        >
          {value}
        </p>
      </div>

      {/* Check */}
      <span
        className="ml-[8px] text-[13px]"
        style={{
          color: "#48D5A1",
        }}
      >
        ✓
      </span>
    </div>
  );
}