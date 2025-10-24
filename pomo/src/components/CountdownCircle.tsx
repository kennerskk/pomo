import React, { useState, useEffect } from "react";

type Props = {
  totalSeconds: number;
  timeLeft: number;
  phase: "learning" | "mini" | "full";
  hasStarted: boolean;
  isRunning: boolean;
  isBreak: boolean;
  onSkip: () => void;
  onStart: () => void;
  onContinue: () => void;
  onStop: () => void;
  onReset: () => void;
};

const CountdownCircle: React.FC<Props> = ({
  totalSeconds,
  timeLeft,
  phase,
  hasStarted,
  isRunning,
  isBreak,
  onSkip,
  onStart,
  onContinue,
  onStop,
  onReset,
}) => {
  const [svgSize, setSvgSize] = useState(500);
  const [strokeWidth, setStrokeWidth] = useState(24);

  // Update SVG size and stroke based on window width
  useEffect(() => {
    function handleResize() {
      const width = Math.min(window.innerWidth * 0.8, 500); // max 500px, 80% of screen
      setSvgSize(width);
      setStrokeWidth(width * 0.048); // stroke proportional to size
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const radius = (svgSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = totalSeconds > 0 ? timeLeft / totalSeconds : 0;
  const strokeDashoffset = circumference * (1 - progress);

  function getPhaseText() {
    if (phase === "learning") return "Learning";
    if (phase === "mini") return "Mini Break";
    if (phase === "full") return "Full Break";
    return "";
  }

  return (
    <div style={{ width: "100%", maxWidth: svgSize, margin: "0 auto" }}>
      <svg width={svgSize} height={svgSize}>
        {/* Background circle */}
        <circle
          stroke="rgba(255,255,255,0.1)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={svgSize / 2}
          cy={svgSize / 2}
        />
        {/* Countdown circle */}
        <circle
          stroke="#fff"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={radius}
          cx={svgSize / 2}
          cy={svgSize / 2}
          style={{
            transition: "stroke-dashoffset 1s linear",
            transform: `rotate(-90deg)`,
            transformOrigin: "50% 50%",
          }}
        />
        {/* Inner content */}
        <foreignObject x="0" y="0" width={svgSize} height={svgSize}>
          <div
            className="inclock-foreign-container"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              height: "100%",
              padding: svgSize * 0.1,
              boxSizing: "border-box",
            }}
          >
            {/* Top: Time + Phase */}
            <div className="inclock-top" style={{ textAlign: "center" }}>
              <p
                className="inclock-time"
                style={{ fontSize: svgSize * 0.15, margin: 0, lineHeight: 1 }}
              >
                {Math.floor(timeLeft / 60)
                  .toString()
                  .padStart(2, "0")}
                :
                {(timeLeft % 60).toString().padStart(2, "0")}
              </p>
              <p
                className="inclock-current-phase"
                style={{ fontSize: svgSize * 0.035, margin: 0 }}
              >
                {getPhaseText()}
              </p>
            </div>

            {/* Bottom: Buttons */}
            <div
              className="inclock-bottom"
              style={{
                display: "flex",
                gap: svgSize * 0.05,
                justifyContent: "center",
              }}
            >
              {/* Button 1 */}
              {!hasStarted ? (
                <button
                  className="inclock-btn"
                  onClick={onStart}
                  style={{ width: svgSize * 0.1, height: svgSize * 0.1 }}
                >
                  <img
                    src="/play.svg"
                    alt="Start"
                    width={svgSize * 0.05}
                    height={svgSize * 0.05}
                  />
                </button>
              ) : !isRunning ? (
                <button
                  className="inclock-btn"
                  onClick={onContinue}
                  style={{ width: svgSize * 0.1, height: svgSize * 0.1 }}
                >
                  <img
                    src="/play.svg"
                    alt="Continue"
                    width={svgSize * 0.05}
                    height={svgSize * 0.05}
                  />
                </button>
              ) : isBreak ? (
                <button
                  className="inclock-btn"
                  onClick={onSkip}
                  style={{ width: svgSize * 0.1, height: svgSize * 0.1 }}
                >
                  <img
                    src="/skip.svg"
                    alt="Skip"
                    width={svgSize * 0.05}
                    height={svgSize * 0.05}
                  />
                </button>
              ) : (
                <button
                  className="inclock-btn"
                  onClick={onStop}
                  style={{ width: svgSize * 0.1, height: svgSize * 0.1 }}
                >
                  <img
                    src="/pause.svg"
                    alt="Pause"
                    width={svgSize * 0.05}
                    height={svgSize * 0.05}
                  />
                </button>
              )}

              {/* Button 2: Reset */}
              <button
                className="inclock-btn"
                onClick={onReset}
                disabled={!hasStarted}
                style={{ width: svgSize * 0.1, height: svgSize * 0.1 }}
              >
                <img
                  src="/reset.svg"
                  alt="Reset"
                  width={svgSize * 0.05}
                  height={svgSize * 0.05}
                />
              </button>
            </div>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default CountdownCircle;
