import { useState } from "react";

import OnboardingFrame from "../components/onboarding/OnboardingFrame";
import TimePicker from "../components/onboarding/TimePicker";

export default function Time() {
  const [period, setPeriod] = useState("AM");
  const [time, setTime] = useState("7:00");

  return (
    <OnboardingFrame
      step={4}
      onSkip={() => console.log("skip time")}
      onContinue={() => {
        console.log("Selected time:", {
          time,
          period,
        });
      }}
      continueLabel="Continue →"
    >
      {/* STEP */}
      <div className="absolute left-[24px] top-[108px]">
        <p
          className="m-0 text-[7px] leading-[10px] tracking-[1.2px]"
          style={{
            fontFamily: "'Geist Mono', monospace",
            color: "#9080FF",
          }}
        >
          STEP 4 OF 6
        </p>
      </div>

      {/* TITLE */}
      <div className="absolute left-[24px] top-[132px] right-[24px]">
        <h1
          className="m-0 text-[23px] leading-[24px]"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontWeight: 700,
            letterSpacing: "-0.35px",
            color: "#F0EDE8",
          }}
        >
          When do you
        </h1>

        <p
          className="m-0 text-[27px] leading-[26px]"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            fontWeight: 400,
            color: "#9080FF",
          }}
        >
          want your brief?
        </p>

        <p
          className="m-0 mt-[8px] text-[9px] leading-[13px]"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            color: "#8A8480",
          }}
        >
          Nuzio will have your brief ready and waiting each morning.
        </p>
      </div>

      {/* AM / PM */}
      <div className="absolute left-[24px] right-[24px] top-[201px]">
        <div className="flex h-[32px] w-full gap-[6px]">
          <button
            type="button"
            onClick={() => setPeriod("AM")}
            className="flex h-full flex-1 items-center justify-center rounded-[7px]"
            style={{
              background:
                period === "AM"
                  ? "linear-gradient(135deg, #9080FF 0%, #704FEF 100%)"
                  : "#1F1F1F",
              color: period === "AM" ? "#080808" : "#7C7C7C",
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "9px",
              border:
                period === "AM"
                  ? "1px solid rgba(144,128,255,.7)"
                  : "1px solid rgba(255,255,255,.06)",
            }}
          >
            AM
          </button>

          <button
            type="button"
            onClick={() => setPeriod("PM")}
            className="flex h-full flex-1 items-center justify-center rounded-[7px]"
            style={{
              background:
                period === "PM"
                  ? "linear-gradient(135deg, #9080FF 0%, #704FEF 100%)"
                  : "#1F1F1F",
              color: period === "PM" ? "#080808" : "#7C7C7C",
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "9px",
              border:
                period === "PM"
                  ? "1px solid rgba(144,128,255,.7)"
                  : "1px solid rgba(255,255,255,.06)",
            }}
          >
            PM
          </button>
        </div>
      </div>

      {/* TIME PICKER */}
      <div className="absolute left-[24px] right-[24px] top-[253px]">
        <TimePicker
          value={time}
          onChange={setTime}
          period={period}
        />
      </div>
    </OnboardingFrame>
  );
}