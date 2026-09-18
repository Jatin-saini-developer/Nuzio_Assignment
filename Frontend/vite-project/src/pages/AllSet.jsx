import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileSummary from "../components/onboarding/ProfileSummary";
import { useAuth } from "../hooks/useAuth";
import { getOnboarding, getResumeRoute } from "../api/onboarding";
import {
  buildProfileRows,
  getFirstName,
  formatDeliveryTime,
} from "../utils/onboardingFormatters";

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (visual only — no data logic here)
// ─────────────────────────────────────────────────────────────────────────────

function SuccessCheck() {
  return (
    <div
      className="flex h-[58px] w-[58px] items-center justify-center rounded-full"
      style={{
        background:
          "linear-gradient(#0B0B0B, #0B0B0B) padding-box, linear-gradient(135deg, #6D5DFF, #39D7A5) border-box",
        border: "2px solid transparent",
        boxShadow: "0 0 35px rgba(65,215,170,0.10)",
      }}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 13.5L10.5 19L21 7"
          stroke="#43D7A0"
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/** Skeleton pulse block — used while data is loading */
function SkeletonRow() {
  return (
    <div
      className="h-[51px] w-full rounded-[10px]"
      style={{
        background:
          "linear-gradient(90deg, #1A1A1A 25%, #222222 50%, #1A1A1A 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.4s infinite",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export default function AllSet() {
  const navigate = useNavigate();
  const { user, isLoading: isAuthLoading } = useAuth();

  const [onboarding, setOnboarding] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load real onboarding state from the backend on mount
  useEffect(() => {
    let isMounted = true;

    // Wait until auth state is resolved before fetching
    if (isAuthLoading) return;

    // Not authenticated — redirect to login
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    getOnboarding()
      .then(({ onboarding: data }) => {
        if (!isMounted) return;

        // If onboarding is not yet complete, resume from the right step
        if (!data?.onboarding?.completed) {
          navigate(getResumeRoute(data?.onboarding?.currentStep ?? 0), {
            replace: true,
          });
          return;
        }

        setOnboarding(data);
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load your profile. Please try again.");
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isAuthLoading, user, navigate]);

  const firstName = getFirstName(user?.name);
  const profileRows = onboarding ? buildProfileRows(onboarding) : null;

  // Delivery time for the subheading — e.g. "07:00 AM" → "7:00 AM"
  const deliveryDisplay = onboarding?.deliveryTime
    ? onboarding.deliveryTime.replace(/^0/, "")
    : "7:00 AM";

  const showSkeleton = isLoading || isAuthLoading;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080808]">
      {/* ── Shimmer keyframe ── */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* 390 × 844 application frame */}
      <section
        className="relative h-[844px] w-[390px] overflow-hidden bg-[#0B0B0B]"
        style={{
          border: "1px solid #1C1C1C",
          borderRadius: "52px",
        }}
      >
        {/* Ambient green/purple glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-[70px] h-[320px] w-[320px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(circle, rgba(60,155,130,.14) 0%, rgba(67,51,145,.10) 35%, transparent 72%)",
            filter: "blur(38px)",
          }}
        />

        {/* Status clock (decorative) */}
        <div
          className="absolute left-[28px] top-[39px] text-[12px]"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontWeight: 700,
            color: "#F0EDE8",
          }}
        >
          9:41
        </div>

        {/* ✓ ALL SET label */}
        <div
          className="absolute left-[28px] top-[89px]"
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: "7px",
            lineHeight: "10px",
            letterSpacing: "1.2px",
            color: "#46D3A0",
          }}
        >
          ✓ ALL SET
        </div>

        {/* Circular success check */}
        <div className="absolute left-0 right-0 top-[142px] flex justify-center">
          <SuccessCheck />
        </div>

        {/* Main heading */}
        <div className="absolute left-0 right-0 top-[202px] text-center">
          <h1
            className="m-0 text-[24px] leading-[26px]"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 700,
              color: "#F0EDE8",
              letterSpacing: "-0.4px",
            }}
          >
            You&apos;re ready,
          </h1>

          {/* Real first name from authenticated user */}
          <p
            className="m-0 text-[27px] leading-[26px]"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontWeight: 400,
              color: "#9080FF",
            }}
          >
            {firstName}.
          </p>

          <p
            className="m-0 mt-[10px] text-[9px] leading-[13px]"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              color: "#8A8480",
            }}
          >
            {showSkeleton ? (
              // Neutral placeholder while loading — no hardcoded time
              <>
                Your first brief will be ready tomorrow.
                <br />
                We&apos;re already curating.
              </>
            ) : (
              <>
                Your first brief will be ready tomorrow at {deliveryDisplay}.
                <br />
                We&apos;re already curating.
              </>
            )}
          </p>
        </div>

        {/* "YOUR BRIEF PROFILE" section header */}
        <div
          className="absolute left-[28px] top-[304px]"
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: "7px",
            lineHeight: "10px",
            letterSpacing: "1.2px",
            color: "#9080FF",
          }}
        >
          YOUR BRIEF PROFILE
        </div>

        {/* Profile cards */}
        <div className="absolute left-[28px] right-[28px] top-[325px]">
          <div className="flex flex-col gap-[6px]">
            {/* Error state */}
            {error && (
              <p
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: "9px",
                  color: "#FF6B6B",
                  letterSpacing: "0.5px",
                }}
              >
                ✕ {error}
              </p>
            )}

            {/* Loading skeletons */}
            {showSkeleton && !error && (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            )}

            {/* Real profile rows */}
            {!showSkeleton &&
              !error &&
              profileRows &&
              profileRows.map((item) => (
                <ProfileSummary
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  value={item.value}
                />
              ))}
          </div>
        </div>

        {/* Start listening CTA */}
        <div className="absolute bottom-[24px] left-[28px] right-[28px]">
          <button
            type="button"
            onClick={() => navigate("/home")}
            disabled={showSkeleton || Boolean(error)}
            className="h-[57px] w-full rounded-[15px] text-[13px] transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(110deg, #3FD0A0 0%, #438EEB 100%)",
              color: "#07100E",
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 700,
              boxShadow: "0 12px 30px rgba(64,146,220,.12)",
              opacity: showSkeleton || error ? 0.5 : 1,
              cursor: showSkeleton || error ? "not-allowed" : "pointer",
            }}
          >
            Start listening →
          </button>
        </div>
      </section>
    </main>
  );
}