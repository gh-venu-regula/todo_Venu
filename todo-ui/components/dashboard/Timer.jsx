'use client';
import { useState, useEffect } from 'react';
import classes from './Timer.module.css';

export default function Timer() {
  const [time, setTime] = useState(25 * 60); // default: 25 mins
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(25 * 60);
    setIsRunning(false);
  };

  const handleAddTime = (amount) => {
    setTime((prev) => prev + amount);
  };

  return (
    <div className={classes.timerWrapper}>
      <div className={classes.halfCircleTop}></div>
      <p className={classes.timerTitle}>Focus Timer</p>
      <div className={classes.timerContent}>
        <h1 className={classes.time}>{formatTime(time)}</h1>

        <div className={classes.buttons}>
          <button className={classes.button} onClick={() => handleAddTime(60)}>+1 </button>
          <button className={classes.button} onClick={() => handleAddTime(5 * 60)}>+5 </button>
          <button className={classes.button} onClick={() => handleAddTime(-60)}>-1 </button>
          <button className={classes.button} onClick={() => handleAddTime(-5 * 60)}>-5 </button>
        </div>

        <div className={classes.controls}>
          <button onClick={handleStartPause}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>

      <div className={classes.halfCircleBottom}></div>
    </div>
  );
}
