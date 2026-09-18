import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingFrame from "../components/onboarding/OnboardingFrame";
import VoiceCard from "../components/onboarding/VoiceCard";
import OptionButton from "../components/onboarding/OptionButton";
import { getOnboarding, updateOnboarding } from "../api/onboarding";

const voices = [
  {
    id: "aria",
    name: "Aria",
    language: "EN",
    description: "Warm · Unhurried · British",
    gender: "♀",
    initial: "A",
    color: "#8775EC",
  },
  {
    id: "kai",
    name: "Kai",
    language: "EN",
    description: "Crisp · Focused · American",
    gender: "♂",
    initial: "K",
    color: "#5D83F2",
  },
  {
    id: "meera",
    name: "Meera",
    language: "HI",
    description: "Bright · Curious · Indian",
    gender: "♀",
    initial: "M",
    color: "#45BFEA",
  },
];

const briefLengths = ["5 min", "10 min", "15 min", "Custom"];

export default function Voice() {
  const navigate = useNavigate();
  const [selectedVoice, setSelectedVoice] = useState("aria");
  const [briefLength, setBriefLength] = useState("5 min");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Load persisted voice + briefLength on mount
  useEffect(() => {
    let isMounted = true;
    getOnboarding()
      .then(({ onboarding }) => {
        if (isMounted) {
          if (onboarding.voice) setSelectedVoice(onboarding.voice);
          if (onboarding.briefLength) setBriefLength(onboarding.briefLength);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const selectedVoiceData = voices.find((v) => v.id === selectedVoice);

  const handleContinue = async () => {
    setIsSaving(true);
    setError(null);
    try {
      // Save voice and briefLength together in one request
      await updateOnboarding({ voice: selectedVoice, briefLength });
      navigate("/time");
    } catch (err) {
      setError(err.message || "Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <OnboardingFrame
      step={3}
      onSkip={() => navigate("/time")}
      onContinue={handleContinue}
      continueLabel={`Continue with ${selectedVoiceData.name} · 5 stories →`}
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
          STEP 3 OF 6
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
          Pick a
        </h1>

        <p
          className="m-0 text-[27px] leading-[26px]"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            color: "#9080FF",
          }}
        >
          narrator voice.
        </p>

        <p
          className="m-0 mt-[8px] text-[10px] leading-[14px]"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            color: "#8A8480",
          }}
        >
          Tap ▶ to hear a 10-second sample.
        </p>
      </div>

      {/* Voice cards */}
      <div className="absolute left-[24px] right-[24px] top-[196px]">
        <div className="flex flex-col gap-[8px]">
          {voices.map((voice) => (
            <VoiceCard
              key={voice.id}
              {...voice}
              selected={selectedVoice === voice.id}
              onClick={() => setSelectedVoice(voice.id)}
            />
          ))}
        </div>
      </div>

      {/* Brief length */}
      <div className="absolute left-[24px] right-[24px] top-[438px]">
        <p
          className="m-0 text-[7px] leading-[10px] tracking-[1.2px]"
          style={{
            fontFamily: "'Geist Mono', monospace",
            color: "#9080FF",
          }}
        >
          BRIEF LENGTH
        </p>

        <h2
          className="m-0 mt-[7px] text-[18px] leading-[18px]"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontWeight: 700,
            color: "#F0EDE8",
          }}
        >
          How long is
        </h2>

        <p
          className="m-0 text-[20px] leading-[20px]"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            color: "#9080FF",
          }}
        >
          your morning?
        </p>

        <p
          className="m-0 mt-[5px] text-[9px] leading-[13px]"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            color: "#8A8480",
          }}
        >
          Set your ideal brief length.
        </p>

        <div className="mt-[10px] flex gap-[7px]">
          {briefLengths.map((length) => (
            <OptionButton
              key={length}
              selected={briefLength === length}
              onClick={() => setBriefLength(length)}
            >
              {length}
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="absolute left-[24px] right-[24px] bottom-[88px]">
          <p style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: "9px",
            color: "#FF6B6B",
            letterSpacing: "0.5px",
          }}>
            ✕ {error}
          </p>
        </div>
      )}

      {/* Dynamic CTA */}
      <div className="absolute bottom-[24px] left-[24px] right-[24px]">
        <button
          type="button"
          onClick={handleContinue}
          disabled={isSaving}
          className="h-[57px] w-full rounded-[15px] text-[13px] transition-opacity hover:opacity-90"
          style={{
            background: "linear-gradient(135deg, #9080FF 0%, #6F5DDE 100%)",
            color: "#090909",
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontWeight: 700,
            opacity: isSaving ? 0.7 : 1,
            cursor: isSaving ? "not-allowed" : "pointer",
          }}
        >
          {isSaving
            ? "Saving…"
            : `Continue with ${selectedVoiceData.name} · ${briefLength} →`}
        </button>
      </div>
    </OnboardingFrame>
  );
}