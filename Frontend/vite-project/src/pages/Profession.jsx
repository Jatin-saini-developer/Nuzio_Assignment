import { useState } from "react";

import OnboardingFrame from "../components/onboarding/OnboardingFrame";
import ChoiceChip from "../components/onboarding/ChoiceChip";
import { professions } from "../data/onboardingData";

export default function Profession() {
  const [selected, setSelected] = useState("Technology");

  return (
    <OnboardingFrame
      step={1}
      onSkip={() => console.log("skip profession")}
      onContinue={() => console.log("continue profession")}
    >
      {/* Heading */}
      <div className="absolute left-[24px] top-[108px]">
        <p
          className="m-0 text-[7px] leading-[10px] tracking-[1.2px]"
          style={{
            fontFamily: "'Geist Mono', monospace",
            color: "#9080FF",
          }}
        >
          STEP 1 OF 6
        </p>
      </div>

      <div className="absolute left-[24px] top-[132px]">
        <h1
          className="m-0 text-[24px] leading-[24px]"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontWeight: 700,
            color: "#F0EDE8",
            letterSpacing: "-0.4px",
          }}
        >
          What's your
        </h1>

        <p
          className="m-0 text-[27px] leading-[26px]"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            color: "#9080FF",
          }}
        >
          profession?
        </p>

        <p
          className="m-0 mt-[8px] text-[10px] leading-[14px]"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            color: "#8A8480",
          }}
        >
          We'll tune every brief to what actually moves your day.
        </p>
      </div>

      {/* Choices */}
      <div className="absolute left-[24px] right-[24px] top-[196px]">
        <div className="flex flex-wrap gap-[7px]">
          {professions.map((profession) => (
            <ChoiceChip
              key={profession.label}
              icon={profession.icon}
              label={profession.label}
              selected={selected === profession.label}
              onClick={() => setSelected(profession.label)}
            />
          ))}
        </div>
      </div>
    </OnboardingFrame>
  );
}