import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingFrame from "../components/onboarding/OnboardingFrame";
import ChoiceChip from "../components/onboarding/ChoiceChip";
import { professions } from "../data/onboardingData";
import { getOnboarding, updateOnboarding } from "../api/onboarding";

export default function Profession() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Load persisted profession on mount
  useEffect(() => {
    let isMounted = true;
    getOnboarding()
      .then(({ onboarding }) => {
        if (isMounted && onboarding.profession) {
          setSelected(onboarding.profession);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const handleContinue = async () => {
    if (!selected) return;
    setIsSaving(true);
    setError(null);
    try {
      await updateOnboarding({ profession: selected });
      navigate("/niches");
    } catch (err) {
      setError(err.message || "Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <OnboardingFrame
      step={1}
      onSkip={() => navigate("/niches")}
      onContinue={handleContinue}
      continueLabel={isSaving ? "Saving…" : "Continue →"}
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