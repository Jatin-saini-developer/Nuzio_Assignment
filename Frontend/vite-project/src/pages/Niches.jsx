import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingFrame from "../components/onboarding/OnboardingFrame";
import ChoiceChip from "../components/onboarding/ChoiceChip";
import { niches } from "../data/onboardingData";
import { getOnboarding, updateOnboarding } from "../api/onboarding";

const MAX_SELECTIONS = 7;

export default function Niches() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Load persisted niches on mount — no default selections
  useEffect(() => {
    let isMounted = true;
    getOnboarding()
      .then(({ onboarding }) => {
        if (isMounted && Array.isArray(onboarding.niches) && onboarding.niches.length > 0) {
          setSelected(onboarding.niches);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

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

  const handleContinue = async () => {
    if (selected.length === 0) return;
    setIsSaving(true);
    setError(null);
    try {
      await updateOnboarding({ niches: selected });
      navigate("/voice");
    } catch (err) {
      setError(err.message || "Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <OnboardingFrame
      step={2}
      onSkip={() => navigate("/voice")}
      onContinue={handleContinue}
      continueLabel={isSaving ? "Saving…" : "Continue →"}
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

        {/* Inline error */}
        {error && (
          <p style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: "9px",
            color: "#FF6B6B",
            marginTop: "8px",
            letterSpacing: "0.5px",
          }}>
            ✕ {error}
          </p>
        )}
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