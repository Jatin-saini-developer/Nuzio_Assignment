import { useMemo } from "react";

const TIMES = [
  "5:30",
  "6:00",
  "6:30",
  "7:00",
  "7:30",
  "8:00",
  "8:30",
];

export default function TimePicker({ value, onChange, period }) {
  const selectedIndex = useMemo(
    () => TIMES.indexOf(value),
    [value]
  );

  const getTimeStyle = (index) => {
    const distance = Math.abs(index - selectedIndex);

    if (distance === 0) {
      return {
        fontSize: "27px",
        opacity: 1,
        fontWeight: 700,
        transform: "scale(1)",
      };
    }

    if (distance === 1) {
      return {
        fontSize: "17px",
        opacity: 0.48,
        fontWeight: 600,
        transform: "scale(1)",
      };
    }

    if (distance === 2) {
      return {
        fontSize: "13px",
        opacity: 0.20,
        fontWeight: 500,
        transform: "scale(1)",
      };
    }

    return {
      fontSize: "11px",
      opacity: 0.07,
      fontWeight: 500,
      transform: "scale(1)",
    };
  };

  return (
    <div
      className="relative mt-[23px] h-[250px] w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
      }}
    >
      {/* Center selection background */}
      <div
        className="absolute left-1/2 top-1/2 z-0 h-[37px] w-[198px] -translate-x-1/2 -translate-y-1/2 rounded-[8px]"
        style={{
          background: "rgba(72, 48, 133, 0.20)",
          border: "1px solid rgba(144,128,255,0.22)",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {TIMES.map((time, index) => {
          const styles = getTimeStyle(index);
          const selected = index === selectedIndex;

          return (
            <button
              key={time}
              type="button"
              onClick={() => onChange(time)}
              className="relative z-10 flex h-[34px] w-[198px] items-center justify-center transition-all duration-200"
              style={{
                color: "#F0EDE8",
                ...styles,
              }}
            >
              <span
                style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  lineHeight: 1,
                }}
              >
                {time}
              </span>

              {selected && (
                <span
                  className="ml-[5px] mt-[5px] text-[8px]"
                  style={{
                    color: "#9080FF",
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {period}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}