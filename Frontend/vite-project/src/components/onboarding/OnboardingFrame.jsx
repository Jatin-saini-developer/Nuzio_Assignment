import "@fontsource/hanken-grotesk/400.css";
import "@fontsource/hanken-grotesk/700.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/geist-mono/400.css";

const PURPLE = "#9080FF";

function NuzioMiniLogo() {
    return (
        <div className="flex items-center gap-[4px]">
            <svg
                width="12"
                height="10"
                viewBox="0 0 26 20"
                fill="none"
                aria-hidden="true"
            >
                <rect x="0" y="6" width="2.5" height="8" rx="1.25" fill={PURPLE} />
                <rect x="4" y="3" width="2.5" height="14" rx="1.25" fill={PURPLE} />
                <rect x="8" y="0" width="2.5" height="20" rx="1.25" fill={PURPLE} />
                <rect x="12" y="4" width="2.5" height="12" rx="1.25" fill={PURPLE} />
                <rect x="16" y="7" width="2.5" height="7" rx="1.25" fill={PURPLE} />
                <rect x="20" y="5" width="2.5" height="10" rx="1.25" fill={PURPLE} />
                <rect x="24" y="8" width="2.5" height="6" rx="1.25" fill={PURPLE} />
            </svg>

            <span
                style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "7px",
                    fontWeight: 500,
                    color: "#F0EDE8",
                    lineHeight: 1,
                }}
            >
                Nuzio{" "}
                <span
                    style={{
                        color: PURPLE,
                        fontSize: "5px",
                        verticalAlign: "1px",
                    }}
                >
                    AI
                </span>
            </span>
        </div>
    );
}

function ProgressBar({ step, totalSteps = 6 }) {
    return (
        <div className="absolute left-[24px] right-[24px] top-[83px] flex gap-[5px]">
            {Array.from({ length: totalSteps }).map((_, index) => {
                const active = index < step;

                return (
                    <div
                        key={index}
                        className="h-[3px] flex-1 rounded-full"
                        style={{
                            background:
                                index === step - 1
                                    ? "linear-gradient(90deg, #9080FF, #4FD5A2)"
                                    : active
                                        ? "#9080FF"
                                        : "#2B2B2B",
                        }}
                    />
                );
            })}
        </div>
    );
}

export default function OnboardingFrame({
    step,
    children,
    onSkip,
    onContinue,
    continueLabel = "Continue →",
}) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#080808]">
            <section
                className="relative h-[844px] w-[390px] overflow-hidden bg-[#0B0B0B]"
                style={{
                    border: "1px solid #1C1C1C",
                    borderRadius: "52px",
                }}
            >
                {/* Purple glow */}
                <div
                    className="pointer-events-none absolute left-1/2 top-[-100px] h-[300px] w-[300px] -translate-x-1/2"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(91,55,170,.28) 0%, rgba(55,27,110,.13) 42%, transparent 72%)",
                        filter: "blur(34px)",
                    }}
                />

                {/* Top bar */}
                <div className="absolute left-[24px] right-[24px] top-[52px] z-10 flex items-center justify-between">
                    <NuzioMiniLogo />

                    <button
                        type="button"
                        onClick={onSkip}
                        className="text-[7px] tracking-[1.5px]"
                        style={{
                            fontFamily: "'Geist Mono', monospace",
                            color: "rgba(138,132,128,.52)",
                        }}
                    >
                        SKIP →
                    </button>
                </div>

                <ProgressBar step={step} />

                {children}

                {/* Continue button */}
                <div className="absolute bottom-[24px] left-[24px] right-[24px] z-10">
                    <button
                        type="button"
                        onClick={onContinue}
                        className="h-[57px] w-full rounded-[15px] text-[13px] transition-opacity hover:opacity-90"
                        style={{
                            background:
                                "linear-gradient(135deg, #9080FF 0%, #6F5DDE 100%)",
                            color: "#090909",
                            fontFamily: "'Hanken Grotesk', sans-serif",
                            fontWeight: 700,
                        }}
                    >
                        {continueLabel}
                    </button>
                </div>
            </section>
        </main>
    );
}