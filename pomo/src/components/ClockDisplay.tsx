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

export default function ClockDisplay(props: ClockDisplayProps) {
  let timeStr = '';
  if (props.phase === 'learning') {
    timeStr = `${props.learningMinutes}:${props.learningSeconds.toString().padStart(2, '0')}`;
  } else if (props.phase === 'mini') {
    timeStr = `${props.miniBreakMinutes}:${props.miniBreakSeconds.toString().padStart(2, '0')}`;
  } else {
    timeStr = `${props.fullBreakMinutes}:${props.fullBreakSeconds.toString().padStart(2, '0')}`;
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