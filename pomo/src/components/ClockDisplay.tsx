import React from 'react';

type ClockDisplayProps = {
  phase: 'learning' | 'mini' | 'full';
  learningMinutes: number;
  learningSeconds: number;
  miniBreakMinutes: number;
  miniBreakSeconds: number;
  fullBreakMinutes: number;
  fullBreakSeconds: number;
  currentRound: number;
  rounds: number;
};

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

export default function ClockDisplay(props: ClockDisplayProps) {
  let timeStr = '';
  if (props.phase === 'learning') {
    timeStr = `${pad(props.learningMinutes)}:${pad(props.learningSeconds)}`;
  } else if (props.phase === 'mini') {
    timeStr = `${pad(props.miniBreakMinutes)}:${pad(props.miniBreakSeconds)}`;
  } else {
    timeStr = `${pad(props.fullBreakMinutes)}:${pad(props.fullBreakSeconds)}`;
  }
  return (
    <div style={{ fontSize: '2em', margin: '1em 0' }}>
      {timeStr}
      <span style={{ fontSize: '0.5em', marginLeft: 10 }}>
        {props.phase === 'learning'
          ? 'Learning'
          : props.phase === 'mini'
          ? `Mini Break (${props.currentRound}/${props.rounds})`
          : 'Full Break'}
      </span>
    </div>
  );
}