export default function ChoiceChip({
  icon,
  label,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[31px] items-center rounded-full px-[12px] transition-all"
      style={{
        background: selected
          ? "rgba(144,128,255,.12)"
          : "rgba(255,255,255,.045)",
        border: selected
          ? "1px solid #9080FF"
          : "1px solid rgba(255,255,255,.08)",
      }}
    >
      <span
        className="mr-[5px] text-[9px] leading-none"
        aria-hidden="true"
      >
        {icon}
      </span>

      <span
        className="whitespace-nowrap text-[9px] leading-none"
        style={{
          fontFamily: "'Hanken Grotesk', sans-serif",
          fontWeight: 700,
          color: selected
            ? "#EDE8FF"
            : "rgba(240,237,232,.75)",
        }}
      >
        {label}
      </span>

      {selected && (
        <span
          className="ml-[5px] text-[10px] leading-none"
          style={{ color: "#58D7A2" }}
        >
          ✓
        </span>
      )}
    </button>
  );
}