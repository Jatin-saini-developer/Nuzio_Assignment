/**
 * Home / Dashboard placeholder.
 *
 * This is the post-onboarding landing screen.
 * Full news-fetching and AI brief generation will be implemented in a future task.
 * For now, it provides intentional navigation so "Start listening →" works correctly.
 */
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "@fontsource/hanken-grotesk/700.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/geist-mono/400.css";

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080808]">
      {/* 390 × 844 mobile frame — matches the rest of the onboarding flow */}
      <section
        className="relative flex h-[844px] w-[390px] flex-col overflow-hidden bg-[#0B0B0B]"
        style={{
          border: "1px solid #1C1C1C",
          borderRadius: "52px",
        }}
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-[-80px] h-[300px] w-[300px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(circle, rgba(60,155,130,.12) 0%, rgba(67,51,145,.08) 40%, transparent 72%)",
            filter: "blur(40px)",
          }}
        />

        {/* Nuzio logo */}
        <div className="absolute left-0 right-0 top-[52px] flex items-center justify-center gap-[6px]">
          <svg width="19" height="16" viewBox="0 0 26 20" fill="none" aria-hidden="true">
            <rect x="0" y="6" width="2.5" height="8" rx="1.25" fill="#9080FF" />
            <rect x="4" y="3" width="2.5" height="14" rx="1.25" fill="#9080FF" />
            <rect x="8" y="0" width="2.5" height="20" rx="1.25" fill="#9080FF" />
            <rect x="12" y="4" width="2.5" height="12" rx="1.25" fill="#9080FF" />
            <rect x="16" y="7" width="2.5" height="7" rx="1.25" fill="#9080FF" />
            <rect x="20" y="5" width="2.5" height="10" rx="1.25" fill="#9080FF" />
            <rect x="24" y="8" width="2.5" height="6" rx="1.25" fill="#9080FF" />
          </svg>
          <span
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              color: "#F0EDE8",
            }}
          >
            Nuzio{" "}
            <span style={{ color: "#9080FF", fontSize: "9px", verticalAlign: "2px" }}>
              AI
            </span>
          </span>
        </div>

        {/* Centre content */}
        <div className="absolute left-0 right-0 top-[260px] flex flex-col items-center px-[28px] text-center">
          {/* Waveform icon */}
          <div
            className="mb-[24px] flex h-[64px] w-[64px] items-center justify-center rounded-full"
            style={{
              background:
                "linear-gradient(#0B0B0B, #0B0B0B) padding-box, linear-gradient(135deg, #6D5DFF, #39D7A5) border-box",
              border: "2px solid transparent",
              boxShadow: "0 0 40px rgba(65,215,170,0.12)",
            }}
          >
            <svg width="28" height="22" viewBox="0 0 28 22" fill="none" aria-hidden="true">
              <rect x="0" y="7" width="2.5" height="8" rx="1.25" fill="#43D7A0" />
              <rect x="4.5" y="3" width="2.5" height="16" rx="1.25" fill="#43D7A0" />
              <rect x="9" y="0" width="2.5" height="22" rx="1.25" fill="#43D7A0" />
              <rect x="13.5" y="4" width="2.5" height="14" rx="1.25" fill="#43D7A0" />
              <rect x="18" y="7" width="2.5" height="8" rx="1.25" fill="#43D7A0" />
              <rect x="22.5" y="9" width="2.5" height="5" rx="1.25" fill="#43D7A0" />
            </svg>
          </div>

          <p
            className="m-0 text-[7px] tracking-[1.5px]"
            style={{ fontFamily: "'Geist Mono', monospace", color: "#46D3A0" }}
          >
            COMING SOON
          </p>

          <h1
            className="m-0 mt-[10px] text-[24px] leading-[26px]"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 700,
              color: "#F0EDE8",
              letterSpacing: "-0.4px",
            }}
          >
            Your brief is
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
            being curated.
          </p>

          <p
            className="m-0 mt-[12px] text-[11px] leading-[17px]"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              color: "#8A8480",
              maxWidth: "240px",
            }}
          >
            AI-generated audio news delivery will be available in the next release.
            Your preferences are saved and ready.
          </p>

          {user && (
            <p
              className="m-0 mt-[16px] text-[9px]"
              style={{
                fontFamily: "'Geist Mono', monospace",
                color: "#46D3A0",
                letterSpacing: "0.5px",
              }}
            >
              ✓ Signed in as {user.email}
            </p>
          )}
        </div>

        {/* Logout button */}
        <div className="absolute bottom-[24px] left-[28px] right-[28px]">
          <button
            type="button"
            onClick={handleLogout}
            className="h-[45px] w-full rounded-[12px] text-[11px] transition-opacity hover:opacity-80"
            style={{
              background: "#151515",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#767676",
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 400,
            }}
          >
            Sign out
          </button>
        </div>
      </section>
    </main>
  );
}
