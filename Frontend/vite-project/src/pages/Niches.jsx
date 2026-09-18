import { useState } from "react";

import OnboardingFrame from "../components/onboarding/OnboardingFrame";
import ChoiceChip from "../components/onboarding/ChoiceChip";
import { niches } from "../data/onboardingData";

const MAX_SELECTIONS = 7;

export default function Niches() {
  const [selected, setSelected] = useState([
    "AI & Technology",
    "Indian Business",
    "Startups",
  ]);

  const toggleNiche = (label) => {
    setSelected((current) => {
      const alreadySelected = current.includes(label);

      if (alreadySelected) {
        return current.filter((item) => item !== label);
      }

      if (current.length >= MAX_SELECTIONS) {
        return current;
      }

      return [...current, label];
    });
  };

  return (
    <OnboardingFrame
      step={2}
      onSkip={() => console.log("skip niches")}
      onContinue={() => console.log("continue niches", selected)}
    >
      {/* Step */}
      <div className="absolute left-[24px] top-[108px]">
        <p
          className="m-0 text-[7px] leading-[10px] tracking-[1.2px]"
          style={{
            fontFamily: "'Geist Mono', monospace",
            color: "#9080FF",
          }}
        >
          STEP 2 OF 6
        </p>
      </div>

      {/* Heading */}
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
          What moves
        </h1>

        <p
          className="m-0 text-[27px] leading-[26px]"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            color: "#9080FF",
          }}
        >
          your world?
        </p>

        <div className="mt-[8px] flex items-center gap-[8px]">
          <p
            className="m-0 text-[10px] leading-[14px]"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              color: "#8A8480",
            }}
          >
            Pick up to 7 niches.
          </p>

          {/* Counter */}
          <span
            className="rounded-full px-[7px] py-[2px] text-[8px] leading-[10px]"
            style={{
              fontFamily: "'Geist Mono', monospace",
              color: "#53D7A0",
              border: "1px solid #53D7A0",
              background: "rgba(83,215,160,.08)",
            }}
          >
            {selected.length}/7
          </span>
        </div>
      </div>

      {/* Niches */}
      <div className="absolute left-[24px] right-[24px] top-[224px]">
        <div className="flex flex-wrap gap-[7px]">
          {niches.map((niche) => (
            <ChoiceChip
              key={niche.label}
              icon={niche.icon}
              label={niche.label}
              selected={selected.includes(niche.label)}
              onClick={() => toggleNiche(niche.label)}
            />
          ))}
        </div>
      </div>
    </OnboardingFrame>
  );
}