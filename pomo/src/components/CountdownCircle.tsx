import React from "react";

type Props = {
  totalSeconds: number;
  timeLeft: number;
  phase: "learning" | "mini" | "full";
  isRunning: boolean;
  isBreak: boolean;
  onSkip: () => void;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  size?: number;
  strokeWidth?: number;
};

const CountdownCircle: React.FC<Props> = ({
  totalSeconds,
  timeLeft,
  phase,
  isRunning,
  isBreak,
  onSkip,
  onStart,
  onStop,
  onReset,
  size = 500,
  strokeWidth = 24,
}) => {
  const radius = (size - strokeWidth) / 2;
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
    <div className="flex flex-col items-center">
      <svg width={size} height={size}>
        {/* วงพื้นหลังโปร่งแสง */}
        <circle
          stroke="rgba(255,255,255,0.3)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* วงเวลาที่นับถอยหลัง */}
        <circle
          stroke="#fff"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transition: "stroke-dashoffset 1s linear",
            transform: `rotate(-90deg)`,
            transformOrigin: "50% 50%",
          }}
        />

        {/* ใส่เนื้อหาข้างในวงกลม */}
        <foreignObject x="0" y="0" width={size} height={size}>
        <div
            xmlns="http://www.w3.org/1999/xhtml"
            className="inclock-foreign-container"
        >
            {/* ครึ่งบน */}
            <div className="inclock-top">
            <p className="inclock-time">
                {Math.floor(timeLeft / 60).toString().padStart(2, "0")}:
                {(timeLeft % 60).toString().padStart(2, "0")}
            </p>
            <p className="inclock-current-phase">{getPhaseText()}</p>
            </div>

            {/* ครึ่งล่าง */}
            <div className="inclock-bottom">
            {!isRunning ? (
                <button className="btn-start" onClick={onStart}>
                    <img
                    src="./src/assets/play.svg"
                    alt="Start"
                    height="24"
                    width="24" />
                </button>
            ) : isBreak ? (
                <button className="btn-start" onClick={onSkip}>
                    <img
                    src="./src/assets/Skip.svg"
                    alt="Skip"
                    height="24"
                    width="24" />
                </button>
            ) : (
                <button className="btn-start" onClick={onStop}>
                    <img
                    src="./src/assets/pause.svg"
                    alt="Pause"
                    height="24"
                    width="24" />
                </button>
            )}
            <button className="btn-start" onClick={onReset}>Reset</button>
            </div>
        </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default CountdownCircle;
