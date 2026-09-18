import ProfileSummary from "../components/onboarding/ProfileSummary";

const profile = [
  {
    icon: "💻",
    label: "PROFESSION",
    value: "Technology",
  },
  {
    icon: "♟",
    label: "NICHES",
    value: "AI, Markets, Startups +1",
  },
  {
    icon: "🎙",
    label: "VOICE",
    value: "Aria — British, warm",
  },
  {
    icon: "◷",
    label: "LENGTH",
    value: "5 stories · ~ 18 min",
  },
  {
    icon: "🌞",
    label: "DELIVERY",
    value: "Daily at 7:00 AM",
  },
];

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

export default function AllSet() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080808]">
      {/* 390 × 844 application frame */}
      <section
        className="relative h-[844px] w-[390px] overflow-hidden bg-[#0B0B0B]"
        style={{
          border: "1px solid #1C1C1C",
          borderRadius: "52px",
        }}
      >
        {/* -------------------------------- */}
        {/* Ambient green/purple glow         */}
        {/* -------------------------------- */}
        <div
          className="pointer-events-none absolute left-1/2 top-[70px] h-[320px] w-[320px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(circle, rgba(60,155,130,.14) 0%, rgba(67,51,145,.10) 35%, transparent 72%)",
            filter: "blur(38px)",
          }}
        />

        {/* -------------------------------- */}
        {/* Status area                      */}
        {/* -------------------------------- */}
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

        {/* -------------------------------- */}
        {/* All set label                    */}
        {/* -------------------------------- */}
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

        {/* -------------------------------- */}
        {/* Success mark                     */}
        {/* -------------------------------- */}
        <div className="absolute left-0 right-0 top-[142px] flex justify-center">
          <SuccessCheck />
        </div>

        {/* -------------------------------- */}
        {/* Main title                       */}
        {/* -------------------------------- */}
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
            You're ready,
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
            Aarya.
          </p>

          <p
            className="m-0 mt-[10px] text-[9px] leading-[13px]"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              color: "#8A8480",
            }}
          >
            Your first brief will be ready tomorrow at 7:00 AM.
            <br />
            We're already curating.
          </p>
        </div>

        {/* -------------------------------- */}
        {/* Profile heading                  */}
        {/* -------------------------------- */}
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

        {/* -------------------------------- */}
        {/* Profile cards                    */}
        {/* -------------------------------- */}
        <div className="absolute left-[28px] right-[28px] top-[325px]">
          <div className="flex flex-col gap-[6px]">
            {profile.map((item) => (
              <ProfileSummary
                key={item.label}
                icon={item.icon}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </div>

        {/* -------------------------------- */}
        {/* CTA                              */}
        {/* -------------------------------- */}
        <div className="absolute bottom-[24px] left-[28px] right-[28px]">
          <button
            type="button"
            onClick={() => {
              console.log("Start listening");
            }}
            className="h-[57px] w-full rounded-[15px] text-[13px] transition-opacity hover:opacity-90"
            style={{
              background:
                "linear-gradient(110deg, #3FD0A0 0%, #438EEB 100%)",
              color: "#07100E",
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 700,
              boxShadow: "0 12px 30px rgba(64,146,220,.12)",
            }}
          >
            Start listening →
          </button>
        </div>
      </section>
    </main>
  );
}