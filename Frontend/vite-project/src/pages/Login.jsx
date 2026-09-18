import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getOnboarding, getResumeRoute, updateOnboarding } from "../api/onboarding";

import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/hanken-grotesk/400.css";
import "@fontsource/hanken-grotesk/700.css";

const COLORS = {
  background: "#0B0B0B",
  text: "#F0EDE8",
  muted: "#8A8480",
  purple: "#9080FF",
  border: "#1C1C1C",
};

function NuzioLogo() {
  return (
    <div className="flex items-center justify-center gap-[6px]">
      <svg
        width="19"
        height="16"
        viewBox="0 0 26 20"
        fill="none"
        aria-hidden="true"
      >
        <rect x="0" y="6" width="2.5" height="8" rx="1.25" fill="#9080FF" />
        <rect x="4" y="3" width="2.5" height="14" rx="1.25" fill="#9080FF" />
        <rect x="8" y="0" width="2.5" height="20" rx="1.25" fill="#9080FF" />
        <rect x="12" y="4" width="2.5" height="12" rx="1.25" fill="#9080FF" />
        <rect x="16" y="7" width="2.5" height="7" rx="1.25" fill="#9080FF" />
        <rect x="20" y="5" width="2.5" height="10" rx="1.25" fill="#9080FF" />
        <rect x="24" y="8" width="2.5" height="6" rx="1.25" fill="#9080FF" />
      </svg>

      <span
        className="leading-none"
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          fontWeight: 500,
          color: COLORS.text,
        }}
      >
        Nuzio{" "}
        <span
          style={{
            color: COLORS.purple,
            fontSize: "9px",
            verticalAlign: "2px",
          }}
        >
          AI
        </span>
      </span>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M21.35 12.27c0-.78-.07-1.53-.2-2.25H12v4.26h5.22a4.46 4.46 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.93-4.18 2.93-7.38Z"
      />
      <path
        fill="#34A853"
        d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.75 9.75 0 0 0 12 21.75Z"
      />
      <path
        fill="#FBBC05"
        d="M6.54 13.85A5.86 5.86 0 0 1 6.23 12c0-.64.11-1.27.31-1.85V7.63H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06 1.05 4.37l3.24-2.52Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.12c1.43 0 2.7.49 3.71 1.46l2.78-2.78C16.83 3.27 14.63 2.25 12 2.25A9.75 9.75 0 0 0 3.3 7.63l3.24 2.52C7.31 7.84 9.46 6.12 12 6.12Z"
      />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, loginWithGoogleCode } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Language selected on the pre-auth Language screen, carried via router state.
  // Undefined when the user navigates directly to /login.
  const pendingLanguage = location.state?.pendingLanguage ?? null;

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // If a pre-auth language selection arrived, persist it now that we have a session.
      const persist = pendingLanguage
        ? updateOnboarding({ language: pendingLanguage }).catch(() => {})
        : Promise.resolve();

      persist.then(() =>
        getOnboarding()
          .then(({ onboarding }) => {
            navigate(getResumeRoute(onboarding.currentStep), { replace: true });
          })
          .catch(() => {
            navigate("/profession", { replace: true });
          }),
      );
    }
    // pendingLanguage is intentionally excluded from deps — it is stable for the
    // lifetime of this page render and including it would cause a double-fire.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading, navigate]);

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async ({ code }) => {
      try {
        await loginWithGoogleCode(code);

        // Persist the pre-auth language selection immediately after login,
        // before fetching onboarding state so currentStep is computed correctly.
        if (pendingLanguage) {
          await updateOnboarding({ language: pendingLanguage }).catch(() => {});
        }

        const { onboarding } = await getOnboarding();
        navigate(getResumeRoute(onboarding.currentStep));
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsSubmitting(false);
      }
    },
    onError: () => {
      setIsSubmitting(false);
    },
  });

  const handleGoogleLogin = () => {
    setIsSubmitting(true);
    googleLogin();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080808]">
      {/* Exact Figma mobile frame */}
      <section
        className="relative h-[844px] w-[390px] overflow-hidden"
        style={{
          background: COLORS.background,
          border: `1px solid ${COLORS.border}`,
          borderRadius: "52px",
        }}
      >
        {/* Purple glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-[-95px] h-[330px] w-[330px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(circle at center, rgba(111,72,214,0.42) 0%, rgba(69,36,135,0.22) 38%, rgba(0,0,0,0) 72%)",
            filter: "blur(32px)",
          }}
        />

        {/* Logo */}
        <div className="absolute left-0 right-0 top-[108px] z-10">
          <NuzioLogo />
        </div>

        {/* Main copy */}
        <div className="absolute left-[28px] top-[280px] z-10">
          <h1
            className="m-0"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "34px",
              lineHeight: "34px",
              letterSpacing: "-0.7px",
              color: COLORS.text,
            }}
          >
            Good morning.
          </h1>

          <p
            className="m-0"
            style={{
              marginTop: "1px",
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "36px",
              lineHeight: "36px",
              color: COLORS.purple,
            }}
          >
            News on go.
          </p>

          <p
            className="m-0"
            style={{
              marginTop: "16px",
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 400,
              fontSize: "13px",
              lineHeight: "21.4px",
              color: COLORS.muted,
              maxWidth: "275px",
            }}
          >
            Personalised audio news for Indian
            <br />
            professionals — curated every morning.
          </p>
        </div>

        {/* Google Login */}
        <div className="absolute bottom-[47px] left-[28px] right-[28px] z-10">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="flex h-[57px] w-full items-center justify-center gap-[9px] rounded-[16px] transition-opacity hover:opacity-90"
            style={{
              background: "#242424",
              color: COLORS.text,
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>

          {/* Terms */}
          <p
            className="m-0 mt-[10px] text-center"
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: "7px",
              lineHeight: "10px",
              color: "rgba(138,132,128,0.42)",
            }}
          >
            By continuing you agree to our{" "}
            <button
              type="button"
              className="underline underline-offset-[1px]"
              style={{ color: COLORS.purple }}
            >
              Terms
            </button>{" "}
            &{" "}
            <button
              type="button"
              className="underline underline-offset-[1px]"
              style={{ color: COLORS.purple }}
            >
              Privacy Policy
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
