import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingFrame from "../components/onboarding/OnboardingFrame";
import NotificationPreview from "../components/onboarding/NotificationPreview";
import NotificationItem from "../components/onboarding/NotificationItem";
import { updateOnboarding } from "../api/onboarding";

export default function Notifications() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const saveAndNavigate = async (enabled) => {
    setIsSaving(true);
    setError(null);
    try {
      await updateOnboarding({
        notifications: {
          push: enabled,
          email: enabled,
          dailyBrief: enabled,
        },
      });
      navigate("/all-set");
    } catch (err) {
      setError(err.message || "Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <OnboardingFrame
      step={5}
      onSkip={() => navigate("/all-set")}
      onContinue={() => saveAndNavigate(true)}
      footer={
        <div className="flex flex-col gap-[6px]">
          {/* Inline error */}
          {error && (
            <p style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: "9px",
              color: "#FF6B6B",
              marginBottom: "4px",
              letterSpacing: "0.5px",
            }}>
              ✕ {error}
            </p>
          )}

          {/* Allow notifications */}
          <button
            type="button"
            disabled={isSaving}
            onClick={() => saveAndNavigate(true)}
            className="h-[57px] w-full rounded-[15px] transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #9080FF 0%, #6F5DDE 100%)",
              color: "#090909",
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              opacity: isSaving ? 0.7 : 1,
              cursor: isSaving ? "not-allowed" : "pointer",
            }}
          >
            {isSaving ? "Saving…" : "Allow notifications"}
          </button>

          {/* Not now */}
          <button
            type="button"
            disabled={isSaving}
            onClick={() => saveAndNavigate(false)}
            className="h-[37px] w-full rounded-[12px]"
            style={{
              background: "#151515",
              border: "1px solid rgba(255,255,255,.08)",
              color: "#767676",
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 400,
              fontSize: "10px",
              opacity: isSaving ? 0.5 : 1,
              cursor: isSaving ? "not-allowed" : "pointer",
            }}
          >
            Not now
          </button>
        </div>
      }
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
          STEP 5 OF 6
        </p>
      </div>

      {/* Heading */}
      <div className="absolute left-[24px] right-[24px] top-[132px]">
        <h1
          className="m-0 text-[24px] leading-[24px]"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontWeight: 700,
            color: "#F0EDE8",
            letterSpacing: "-0.4px",
          }}
        >
          Stay in
        </h1>

        <p
          className="m-0 text-[27px] leading-[26px]"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            color: "#9080FF",
          }}
        >
          the loop.
        </p>

        <p
          className="m-0 mt-[8px] text-[9px] leading-[13px]"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            color: "#8A8480",
          }}
        >
          Turn on notifications so you never miss your brief.
        </p>
      </div>

      {/* Notification preview */}
      <div className="absolute left-[24px] right-[24px] top-[238px]">
        <NotificationPreview />
      </div>

      {/* Section title */}
      <div className="absolute left-[24px] top-[326px]">
        <p
          className="m-0 text-[7px] tracking-[1.2px]"
          style={{
            fontFamily: "'Geist Mono', monospace",
            color: "#9080FF",
          }}
        >
          WHAT YOU'LL RECEIVE
        </p>
      </div>

      {/* Notification items */}
      <div className="absolute left-[24px] right-[24px] top-[349px]">
        <div className="flex flex-col gap-[7px]">
          <NotificationItem
            icon="🌕"
            title="Morning brief ready"
            description="Your daily audio briefing is waiting"
            timing="Daily · 7:00 AM"
            timingColor="#4FD5A2"
          />

          <NotificationItem
            icon="⚡"
            title="Breaking story"
            description="A major story just broke in your niches"
            timing="When it happens"
            timingColor="#9080FF"
          />

          <NotificationItem
            icon="📌"
            title="Weekly digest"
            description="The most-saved stories from this week"
            timing="Sundays · 9:00 AM"
            timingColor="#72BFFF"
          />
        </div>
      </div>
    </OnboardingFrame>
  );
}