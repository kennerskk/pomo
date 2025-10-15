import React, { useState, useEffect, useRef } from 'react';
import ClockForm from '../components/ClockForm';
// import ClockDisplay from '../components/ClockDisplay';
// import ClockButtons from '../components/ClockButtons';
import CountdownCircle from "../components/CountdownCircle";

type Time = { minutes: number; seconds: number };

function Clock() {
  const [learningMinutes, setLearningMinutes] = useState(25);
  const [learningSeconds, setLearningSeconds] = useState(0);
  const [miniBreakMinutes, setMiniBreakMinutes] = useState(5);
  const [miniBreakSeconds, setMiniBreakSeconds] = useState(0);
  const [fullBreakMinutes, setFullBreakMinutes] = useState(15);
  const [fullBreakSeconds, setFullBreakSeconds] = useState(0);
  const [rounds, setRounds] = useState(4);

  const [learningTime, setLearningTime] = useState<Time>({ minutes: 25, seconds: 0 });
  const [miniBreak, setMiniBreak] = useState<Time>({ minutes: 5, seconds: 0 });
  const [fullBreak, setFullBreak] = useState<Time>({ minutes: 15, seconds: 0 });
  const [currentRound, setCurrentRound] = useState(1);
  const [phase, setPhase] = useState<'learning' | 'mini' | 'full'>('learning');
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const initialLearning = useRef<Time>({ minutes: 25, seconds: 0 });
  const initialMini = useRef<Time>({ minutes: 5, seconds: 0 });
  const initialFull = useRef<Time>({ minutes: 15, seconds: 0 });
  const initialRounds = useRef<number>(4);

  useEffect(() => {
    if (!isRunning) return;
    if (phase === 'learning') {
      setLearningMinutes(learningTime.minutes);
      setLearningSeconds(learningTime.seconds);
    }
    if (phase === 'mini') {
      setMiniBreakMinutes(miniBreak.minutes);
      setMiniBreakSeconds(miniBreak.seconds);
    }
    if (phase === 'full') {
      setFullBreakMinutes(fullBreak.minutes);
      setFullBreakSeconds(fullBreak.seconds);
    }
    // eslint-disable-next-line
  }, [
    isRunning,
    phase,
    ...(phase === 'learning' ? [learningTime] : []),
    ...(phase === 'mini' ? [miniBreak] : []),
    ...(phase === 'full' ? [fullBreak] : []),
  ]);

  function autoSetTimer(
    learningM = learningMinutes,
    learningS = learningSeconds,
    miniM = miniBreakMinutes,
    miniS = miniBreakSeconds,
    fullM = fullBreakMinutes,
    fullS = fullBreakSeconds,
    roundVal = rounds
  ) {
    const learning = { minutes: learningM, seconds: learningS };
    const mini = { minutes: miniM, seconds: miniS };
    const full = { minutes: fullM, seconds: fullS };

    setLearningTime(learning);
    setMiniBreak(mini);
    setFullBreak(full);
    setRounds(roundVal);
    setCurrentRound(1);
    setPhase('learning');
    setIsRunning(false);

    initialLearning.current = { ...learning };
    initialMini.current = { ...mini };
    initialFull.current = { ...full };
    initialRounds.current = roundVal;
  }

  function handleSkip() {
    if (phase !== 'full') {
      setCurrentRound(r => r + 1)
      setPhase('learning');
    }
    else {
      setCurrentRound(r => r + 1)
      setPhase('learning');
      handleReset();
      handleStart();
    }
    
  }

  function handleStart() {
    setIsRunning(true);
  }

  function handleStop() {
    setIsRunning(false);
  }

  function handleReset() {
    setLearningTime({ ...initialLearning.current });
    setMiniBreak({ ...initialMini.current });
    setFullBreak({ ...initialFull.current });
    setRounds(initialRounds.current);
    setCurrentRound(1);
    setPhase('learning');
    setIsRunning(false);
    setLearningMinutes(initialLearning.current.minutes);
    setLearningSeconds(initialLearning.current.seconds);
    setMiniBreakMinutes(initialMini.current.minutes);
    setMiniBreakSeconds(initialMini.current.seconds);
    setFullBreakMinutes(initialFull.current.minutes);
    setFullBreakSeconds(initialFull.current.seconds);
  }

  function decreaseTime(time: Time): Time {
    if (time.minutes === 0 && time.seconds === 0) return time;
    if (time.seconds === 0) {
      return { minutes: time.minutes - 1, seconds: 59 };
    }
    return { minutes: time.minutes, seconds: time.seconds - 1 };
  }

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      if (phase === 'learning') {
        if (learningTime.minutes === 0 && learningTime.seconds === 0) {
          if (currentRound >= rounds+1) {
            setPhase('full');
            setFullBreak({ ...initialFull.current });
          } else {
            setPhase('mini');
            setMiniBreak({ ...initialMini.current });
          }
        } else {
          setLearningTime(prev => decreaseTime(prev));
        }
      } else if (phase === 'mini') {
        if (miniBreak.minutes === 0 && miniBreak.seconds === 0) {
          setCurrentRound(r => r + 1);
          setPhase('learning');
          setLearningTime({ ...initialLearning.current });
        } else {
          setMiniBreak(prev => decreaseTime(prev));
        }
      } else if (phase === 'full') {
        if (fullBreak.minutes === 0 && fullBreak.seconds === 0) {
            setPhase('learning');
            handleReset();
            handleStart();
        } else {
          setFullBreak(prev => decreaseTime(prev));
        }
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, phase, learningTime, miniBreak, fullBreak, currentRound, rounds]);

  // เลือกสีพื้นหลัง
  function getBgColor() {
    if (isRunning) {
        if (phase === 'learning') return '#0a38bfff'; // ฟ้า
        if (phase === 'mini') return '#be0042ff';     // เหลืองอ่อน
        if (phase === 'full') return '#ed7e00ff';     // ส้มอ่อน
    }
    else if (!isRunning) return '#272727ff';
    return '#fff';
  }

  // คำนวณเวลาที่เหลือเป็นวินาทีสำหรับ countdown circle
  const totalSeconds =
    phase === 'learning'
      ? initialLearning.current.minutes * 60 + initialLearning.current.seconds
      : phase === 'mini'
      ? initialMini.current.minutes * 60 + initialMini.current.seconds
      : initialFull.current.minutes * 60 + initialFull.current.seconds;

  const timeLeft =
    phase === 'learning'
      ? learningTime.minutes * 60 + learningTime.seconds
      : phase === 'mini'
      ? miniBreak.minutes * 60 + miniBreak.seconds
      : fullBreak.minutes * 60 + fullBreak.seconds;

  return (
    <div className='clock-body' style={{ backgroundColor: getBgColor(), transition: 'background 0.5s' }}>
      <div className="clock-container">
        {/* ฝั่งซ้าย: วงนับเวลา */}
        <div className="clock-countdown">
          <CountdownCircle
            totalSeconds={totalSeconds}
            timeLeft={timeLeft}
            phase={phase}
            isRunning={isRunning}
            onStart={handleStart}
            onStop={handleStop}
            onReset={handleReset}
            onSkip={handleSkip}
            isBreak={phase !== 'learning'}
          />
        </div>

        {/* ฝั่งขวา: ฟอร์ม + แสดงผล + ปุ่ม */}
        <div className="clock-form">
          <ClockForm
            learningMinutes={learningMinutes}
            setLearningMinutes={setLearningMinutes}
            learningSeconds={learningSeconds}
            setLearningSeconds={setLearningSeconds}
            miniBreakMinutes={miniBreakMinutes}
            setMiniBreakMinutes={setMiniBreakMinutes}
            miniBreakSeconds={miniBreakSeconds}
            setMiniBreakSeconds={setMiniBreakSeconds}
            fullBreakMinutes={fullBreakMinutes}
            setFullBreakMinutes={setFullBreakMinutes}
            fullBreakSeconds={fullBreakSeconds}
            setFullBreakSeconds={setFullBreakSeconds}
            rounds={rounds}
            setRounds={setRounds}
            isRunning={isRunning}
            onChange={autoSetTimer}
          />
          {/* <ClockDisplay
            phase={phase}
            learningMinutes={learningMinutes}
            learningSeconds={learningSeconds}
            miniBreakMinutes={miniBreakMinutes}
            miniBreakSeconds={miniBreakSeconds}
            fullBreakMinutes={fullBreakMinutes}
            fullBreakSeconds={fullBreakSeconds}
            currentRound={currentRound}
            rounds={rounds}
          />
          <ClockButtons
            isRunning={isRunning}
            onStart={handleStart}
            onStop={handleStop}
            onReset={handleReset}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Clock;
