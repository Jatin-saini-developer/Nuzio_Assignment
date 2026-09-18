export default function OptionButton({
  children,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-[31px] rounded-[7px] px-[15px] text-[9px] transition-all"
      style={{
        fontFamily: "'Hanken Grotesk', sans-serif",
        fontWeight: 700,
        color: selected ? "#090909" : "#8A8480",
        background: selected
          ? "linear-gradient(135deg, #9080FF, #704FEF)"
          : "#242424",
        border: selected
          ? "1px solid #9080FF"
          : "1px solid rgba(255,255,255,.07)",
      }}
    >
      {children}
    </button>
  );
}