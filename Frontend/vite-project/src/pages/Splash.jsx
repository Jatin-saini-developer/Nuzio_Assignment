import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/geist-mono/400.css";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/language");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f]">
      {/* Mobile frame */}
      <div
        className="relative flex flex-col items-center justify-between bg-[#0f0f0f] overflow-hidden"
        style={{
          width: "390px",
          height: "844px",
          borderRadius: "52px",
          border: "1px solid #1c1c1c",
        }}
      >
        {/* Purple radial glow — centered */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "380px",
            height: "380px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -58%)",
            background:
              "radial-gradient(ellipse at center, rgba(100, 50, 200, 0.5) 0%, rgba(70, 20, 150, 0.25) 45%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        {/* Center content */}
        <div className="flex flex-col items-center justify-center flex-1 gap-3 z-10">
          {/* Logo: waveform + Nuzio AI */}
          <div className="flex items-center gap-2 mb-6">
            <svg
              width="26"
              height="20"
              viewBox="0 0 26 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0" y="6" width="2.5" height="8" rx="1.25" fill="#a78bfa" />
              <rect x="4" y="3" width="2.5" height="14" rx="1.25" fill="#a78bfa" />
              <rect x="8" y="0" width="2.5" height="20" rx="1.25" fill="#a78bfa" />
              <rect x="12" y="4" width="2.5" height="12" rx="1.25" fill="#a78bfa" />
              <rect x="16" y="7" width="2.5" height="7" rx="1.25" fill="#a78bfa" />
              <rect x="20" y="5" width="2.5" height="10" rx="1.25" fill="#a78bfa" />
              <rect x="24" y="8" width="2.5" height="6" rx="1.25" fill="#a78bfa" />
            </svg>
            <span
              style={{
                fontFamily: "sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                color: "#F0EDE8",
                letterSpacing: "0.01em",
              }}
            >
              Nuzio{" "}
              <span
                style={{
                  color: "#a78bfa",
                  fontSize: "11px",
                  fontWeight: 400,
                  verticalAlign: "middle",
                }}
              >
                AI
              </span>
            </span>
          </div>

          {/* News on go */}
          <p
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "30px",
              lineHeight: "36px",
              color: "#F0EDE8",
              letterSpacing: "0px",
              margin: 0,
            }}
          >
            News on go
          </p>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontWeight: 400,
              fontSize: "9px",
              letterSpacing: "1.98px",
              color: "rgba(138, 132, 128, 0.6)",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Your audio brief. Every morning
          </p>
        </div>

        {/* Bottom: curating status */}
        <div className="flex items-center gap-2 mb-12 z-10">
          {/* Pulsing green dot */}
          <span className="relative flex h-[6px] w-[6px]">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-green-500" />
          </span>
          <p
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontWeight: 400,
              fontSize: "9px",
              letterSpacing: "1.7px",
              color: "rgba(138, 132, 128, 0.55)",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Curating your brief...
          </p>
        </div>
      </div>
    </div>
  );
}