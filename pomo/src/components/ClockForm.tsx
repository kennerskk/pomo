import '../index.css';

type ClockFormProps = {
  learningMinutes: number;
  setLearningMinutes: (v: number) => void;
  learningSeconds: number;
  setLearningSeconds: (v: number) => void;
  miniBreakMinutes: number;
  setMiniBreakMinutes: (v: number) => void;
  miniBreakSeconds: number;
  setMiniBreakSeconds: (v: number) => void;
  fullBreakMinutes: number;
  setFullBreakMinutes: (v: number) => void;
  fullBreakSeconds: number;
  setFullBreakSeconds: (v: number) => void;
  rounds: number;
  setRounds: (v: number) => void;
  isRunning: boolean;
  onChange: (
    learningM: number,
    learningS: number,
    miniM: number,
    miniS: number,
    fullM: number,
    fullS: number,
    rounds: number
  ) => void;
};

export default function ClockForm(props: ClockFormProps) {
  function handleSpinnerChange(setter: (v: number) => void, value: string, type: string) {
    let num = parseInt(value);
    if (isNaN(num)) num = 0;
    if (type === 'learningMinutes' || type === 'miniBreakMinutes' || type === 'fullBreakMinutes') {
      if (num < 0) num = 0;
      if (num > 59) num = 59;
    } else if (type === 'rounds') {
      if (num < 1) num = 1;
      if (num > 59) num = 59;
    } else {
      if (num < 0) num = 0;
      if (num > 59) num = 59;
    }
    // เงื่อนไข: ถ้า minute < 1, second ต้องมากกว่า 0
    if (type === 'learningMinutes' && num < 1 && props.learningSeconds < 1) {
      props.setLearningSeconds(1);
      props.onChange(
        num,
        1,
        props.miniBreakMinutes,
        props.miniBreakSeconds,
        props.fullBreakMinutes,
        props.fullBreakSeconds,
        props.rounds
      );
    }
    if (type === 'learningSeconds' && props.learningMinutes < 1 && num < 1) {
      num = 1;
    }
    if (type === 'miniBreakMinutes' && num < 1 && props.miniBreakSeconds < 1) {
      props.setMiniBreakSeconds(1);
      props.onChange(
        props.learningMinutes,
        props.learningSeconds,
        num,
        1,
        props.fullBreakMinutes,
        props.fullBreakSeconds,
        props.rounds
      );
    }
    if (type === 'miniBreakSeconds' && props.miniBreakMinutes < 1 && num < 1) {
      num = 1;
    }
    if (type === 'fullBreakMinutes' && num < 1 && props.fullBreakSeconds < 1) {
      props.setFullBreakSeconds(1);
      props.onChange(
        props.learningMinutes,
        props.learningSeconds,
        props.miniBreakMinutes,
        props.miniBreakSeconds,
        num,
        1,
        props.rounds
      );
    }
    if (type === 'fullBreakSeconds' && props.fullBreakMinutes < 1 && num < 1) {
      num = 1;
    }

    setter(num);

    props.onChange(
      type === 'learningMinutes' ? num : props.learningMinutes,
      type === 'learningSeconds' ? num : props.learningSeconds,
      type === 'miniBreakMinutes' ? num : props.miniBreakMinutes,
      type === 'miniBreakSeconds' ? num : props.miniBreakSeconds,
      type === 'fullBreakMinutes' ? num : props.fullBreakMinutes,
      type === 'fullBreakSeconds' ? num : props.fullBreakSeconds,
      type === 'rounds' ? num : props.rounds
    );
  }

  return (
    <fieldset disabled={props.isRunning} style={{ border: 'none', margin: 0, padding: 0 }}>
        <div className='time-label'>Working Time</div>
        <div className="time-group">
            <input
                type="number"
                min={0}
                max={59}
                value={props.learningMinutes.toString().padStart(2, '0')}
                onChange={e => handleSpinnerChange(props.setLearningMinutes, e.target.value, 'learningMinutes')}
                name="learningMinutes"
                className="time-input"
            />
            <div className='time-colon'>:</div>
            <input
                type="number"
                min={0}
                max={59}
                value={props.learningSeconds.toString().padStart(2, '0')}
                onChange={e => handleSpinnerChange(props.setLearningSeconds, e.target.value, 'learningSeconds')}
                name="learningSeconds"
                className="time-input"
            />
        </div>
        <div className='time-label'>Mini Break Time</div>
        <div className="time-group">
            <input
                type="number"
                min={0}
                max={59}
                value={props.miniBreakMinutes.toString().padStart(2, '0')}
                onChange={e => handleSpinnerChange(props.setMiniBreakMinutes, e.target.value, 'miniBreakMinutes')}
                name="miniBreakminutes"
                className="time-input"
            />
            <div className='time-colon'>:</div>
            <input
                type="number"
                min={0}
                max={59}
                value={props.miniBreakSeconds.toString().padStart(2, '0')}
                onChange={e => handleSpinnerChange(props.setMiniBreakSeconds, e.target.value, 'miniBreakSeconds')}
                name="miniBreakseconds"
                className="time-input"
            />
        </div>
        <div className='time-label'>Full Break Time</div>
        <div className="time-group">
            <input
                type="number"
                min={0}
                max={59}
                value={props.fullBreakMinutes.toString().padStart(2, '0')}
                onChange={e => handleSpinnerChange(props.setFullBreakMinutes, e.target.value, 'fullBreakMinutes')}
                name="fullBreakminutes"
                className="time-input"
            />
            <div className='time-colon'>:</div>
            <input
                type="number"
                min={0}
                max={59}
                value={props.fullBreakSeconds.toString().padStart(2, '0')}
                onChange={e => handleSpinnerChange(props.setFullBreakSeconds, e.target.value, 'fullBreakSeconds')}
                name="fullBreakseconds"
                className="time-input"
            />
        </div>
        <div className='time-label'>Round of mini breaks</div>
        <input
            type="number"
            min={1}
            max={59}
            value={props.rounds}
            onChange={e => handleSpinnerChange(props.setRounds, e.target.value, 'rounds')}
            name="rounds"
            className="time-input"
        />
    </fieldset>
  );
}