
type ClockButtonsProps = {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
};

export default function ClockButtons(props: ClockButtonsProps) {
  return (
    <div style={{ marginTop: 16 }}>
      <button onClick={props.onStart} disabled={props.isRunning}>Start</button>
      <button onClick={props.onStop} disabled={!props.isRunning}>Stop</button>
      <button onClick={props.onReset}>Reset</button>
    </div>
  );
}