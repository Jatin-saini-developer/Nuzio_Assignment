import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/geist-mono/400.css";
import "@fontsource/hanken-grotesk/800.css";

export default function Language() {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState("en");
  const [locationEnabled, setLocationEnabled] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f]">
      <div
        className="relative flex flex-col bg-[#0f0f0f] overflow-hidden"
        style={{
          width: "390px",
          height: "844px",
          borderRadius: "52px",
          border: "1px solid #1c1c1c",
        }}
      >
        {/* Purple glow — top center */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "300px",
            height: "300px",
            top: "-60px",
            left: "50%",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(ellipse at center, rgba(100, 50, 200, 0.4) 0%, rgba(70, 20, 150, 0.15) 50%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        {/* Top: Logo */}
        <div className="flex items-center justify-center gap-2 mt-16 z-10">
          <svg width="22" height="18" viewBox="0 0 26 20" fill="none">
            <rect x="0" y="6" width="2.5" height="8" rx="1.25" fill="#a78bfa" />
            <rect x="4" y="3" width="2.5" height="14" rx="1.25" fill="#a78bfa" />
            <rect x="8" y="0" width="2.5" height="20" rx="1.25" fill="#a78bfa" />
            <rect x="12" y="4" width="2.5" height="12" rx="1.25" fill="#a78bfa" />
            <rect x="16" y="7" width="2.5" height="7" rx="1.25" fill="#a78bfa" />
            <rect x="20" y="5" width="2.5" height="10" rx="1.25" fill="#a78bfa" />
            <rect x="24" y="8" width="2.5" height="6" rx="1.25" fill="#a78bfa" />
          </svg>
          <span style={{ fontFamily: "sans-serif", fontWeight: 500, fontSize: "16px", color: "#F0EDE8" }}>
            Nuzio <span style={{ color: "#a78bfa", fontSize: "10px" }}>AI</span>
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col px-8 mt-10 z-10 flex-1">

          {/* Heading */}
          <div className="mb-1">
            <p style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "26px",
              lineHeight: "28.6px",
              color: "#F0EDE8",
              margin: 0,
            }}>
              Choose your
            </p>
            <p style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "28px",
              lineHeight: "30.8px",
              color: "#9080FF",
              margin: 0,
            }}>
              language
            </p>
          </div>

          {/* Subtitle */}
          <p style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: "11px",
            color: "rgba(138, 132, 128, 0.7)",
            marginTop: "8px",
            marginBottom: "24px",
          }}>
            Select the language for your daily brief.
          </p>

          {/* Language cards */}
          <div className="flex flex-col gap-3">

            {/* English */}
            <button
              onClick={() => setSelectedLang("en")}
              className="flex items-center justify-between px-4 py-4 rounded-2xl transition-all"
              style={{
                background: selectedLang === "en" ? "rgba(144, 128, 255, 0.12)" : "rgba(255,255,255,0.04)",
                border: selectedLang === "en" ? "1px solid #9080FF" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#555570] font-mono">GB</span>
                <div className="text-left">
                  <p style={{ color: "#F0EDE8", fontWeight: 600, fontSize: "14px", margin: 0 }}>English</p>
                  <p style={{ color: "rgba(138,132,128,0.7)", fontSize: "11px", margin: 0 }}>Briefings delivered in English</p>
                </div>
              </div>
              {/* Radio */}
              <div style={{
                width: "18px", height: "18px", borderRadius: "50%",
                border: selectedLang === "en" ? "none" : "1.5px solid #444",
                background: selectedLang === "en" ? "#9080FF" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {selectedLang === "en" && (
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff" }} />
                )}
              </div>
            </button>

            {/* Hindi */}
            <button
              onClick={() => setSelectedLang("hi")}
              className="flex items-center justify-between px-4 py-4 rounded-2xl transition-all"
              style={{
                background: selectedLang === "hi" ? "rgba(144, 128, 255, 0.12)" : "rgba(255,255,255,0.04)",
                border: selectedLang === "hi" ? "1px solid #9080FF" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#555570] font-mono">IN</span>
                <div className="text-left">
                  <p style={{ color: "#F0EDE8", fontWeight: 600, fontSize: "15px", margin: 0 }}>हिन्दी</p>
                  <p style={{ color: "rgba(138,132,128,0.7)", fontSize: "11px", margin: 0 }}>हिंदी में समाचार सुनें</p>
                </div>
              </div>
              <div style={{
                width: "18px", height: "18px", borderRadius: "50%",
                border: selectedLang === "hi" ? "none" : "1.5px solid #444",
                background: selectedLang === "hi" ? "#9080FF" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {selectedLang === "hi" && (
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff" }} />
                )}
              </div>
            </button>

            {/* Enable Location */}
            <div
              className="flex items-center justify-between px-4 py-4 rounded-2xl mt-1"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center gap-3">
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "rgba(220, 60, 60, 0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  📍
                </div>
                <div>
                  <p style={{ color: "#F0EDE8", fontWeight: 600, fontSize: "14px", margin: 0 }}>Enable Location</p>
                  <p style={{ color: "rgba(138,132,128,0.7)", fontSize: "11px", margin: 0 }}>Get hyperlocal news tailored to your city.</p>
                  {!locationEnabled && (
                    <p style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "8px",
                      letterSpacing: "1.5px",
                      color: "rgba(138,132,128,0.4)",
                      marginTop: "4px",
                    }}>
                      ✕ NOT ALLOWED
                    </p>
                  )}
                </div>
              </div>
              {/* Toggle */}
              <button
                onClick={() => setLocationEnabled(!locationEnabled)}
                style={{
                  width: "44px", height: "24px", borderRadius: "12px",
                  background: locationEnabled ? "#9080FF" : "rgba(255,255,255,0.15)",
                  position: "relative", transition: "background 0.2s",
                  border: "none", cursor: "pointer",
                }}
              >
                <div style={{
                  width: "18px", height: "18px", borderRadius: "50%",
                  background: "#fff",
                  position: "absolute",
                  top: "3px",
                  left: locationEnabled ? "23px" : "3px",
                  transition: "left 0.2s",
                }} />
              </button>
            </div>
          </div>
        </div>

        {/* Continue button */}
        <div className="px-8 pb-12 z-10">
          <button
            onClick={() => navigate("/login")}
            className="w-full py-4 rounded-2xl font-semibold text-white transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #9080FF 0%, #7060DD 100%)",
              fontSize: "15px",
              letterSpacing: "0.01em",
            }}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}