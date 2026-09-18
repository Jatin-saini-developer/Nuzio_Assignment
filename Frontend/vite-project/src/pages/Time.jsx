import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingFrame from "../components/onboarding/OnboardingFrame";
import TimePicker from "../components/onboarding/TimePicker";
import { getOnboarding, updateOnboarding } from "../api/onboarding";

/**
 * Normalise a raw time string + period into the canonical "HH:MM AM/PM" format.
 * e.g. ("7:00", "AM") → "07:00 AM"
 *      ("12:30", "PM") → "12:30 PM"
 */
const normaliseDeliveryTime = (time, period) => {
  const [hourStr, minute] = time.split(":");
  const hour = parseInt(hourStr, 10);
  const paddedHour = String(hour).padStart(2, "0");
  return `${paddedHour}:${minute} ${period}`;
};

/**
 * Parse a canonical delivery time string back to { time, period }.
 * e.g. "07:00 AM" → { time: "7:00", period: "AM" }
 */
const parseDeliveryTime = (value) => {
  if (!value) return { time: "7:00", period: "AM" };
  const [timePart, period] = value.split(" ");
  const [hour, minute] = timePart.split(":");
  return {
    time: `${parseInt(hour, 10)}:${minute}`,
    period: period || "AM",
  };
};

export default function Time() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState("AM");
  const [time, setTime] = useState("7:00");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Load persisted delivery time on mount
  useEffect(() => {
    let isMounted = true;
    getOnboarding()
      .then(({ onboarding }) => {
        if (isMounted && onboarding.deliveryTime) {
          const parsed = parseDeliveryTime(onboarding.deliveryTime);
          setTime(parsed.time);
          setPeriod(parsed.period);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const handleContinue = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const deliveryTime = normaliseDeliveryTime(time, period);
      await updateOnboarding({ deliveryTime });
      navigate("/notifications");
    } catch (err) {
      setError(err.message || "Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <OnboardingFrame
      step={4}
      onSkip={() => navigate("/notifications")}
      onContinue={handleContinue}
      continueLabel={isSaving ? "Saving…" : "Continue →"}
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