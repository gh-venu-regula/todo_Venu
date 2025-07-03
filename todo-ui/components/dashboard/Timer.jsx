// This component renders a focus timer with controls for start, pause, reset, and time adjustment.
'use client';

// Importing necessary modules and styles.
import { useState, useEffect } from 'react';
import classes from './Timer.module.css';

// The main functional component for Timer.
export default function Timer() {
  const [time, setTime] = useState(25 * 60); // State to manage the timer value (default: 25 minutes).
  const [isRunning, setIsRunning] = useState(false); // State to manage whether the timer is running.

  // Effect to handle the timer countdown when running.
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0)); // Decrease time by 1 second if greater than 0.
      }, 1000); // Run every second.
    }
    return () => clearInterval(interval); // Cleanup interval on unmount or state change.
  }, [isRunning]);

  // Function to format the time in MM:SS format.
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0'); // Calculate minutes.
    const s = String(seconds % 60).padStart(2, '0'); // Calculate seconds.
    return `${m}:${s}`; // Return formatted time.
  };

  // Function to toggle the timer between start and pause.
  const handleStartPause = () => {
    setIsRunning(!isRunning); // Toggle the running state.
  };

  // Function to reset the timer to the default value.
  const handleReset = () => {
    setTime(25 * 60); // Reset time to 25 minutes.
    setIsRunning(false); // Stop the timer.
  };

  // Function to add or subtract time from the timer.
  const handleAddTime = (amount) => {
    setTime((prev) => prev + amount); // Adjust the timer value by the specified amount.
  };

  return (
    <div className={classes.timerWrapper}> {/* Container for the timer */}
      <div className={classes.halfCircleTop}></div> {/* Decorative top half-circle */}
      <p className={classes.timerTitle}>Focus Timer</p> {/* Title for the timer */}
      <div className={classes.timerContent}> {/* Content area for the timer */}
        <h1 className={classes.time}>{formatTime(time)}</h1> {/* Display the formatted time */}

        <div className={classes.buttons}> {/* Buttons for adjusting the timer */}
          <button className={classes.button} onClick={() => handleAddTime(60)}>+1 </button> {/* Add 1 minute */}
          <button className={classes.button} onClick={() => handleAddTime(5 * 60)}>+5 </button> {/* Add 5 minutes */}
          <button className={classes.button} onClick={() => handleAddTime(-60)}>-1 </button> {/* Subtract 1 minute */}
          <button className={classes.button} onClick={() => handleAddTime(-5 * 60)}>-5 </button> {/* Subtract 5 minutes */}
        </div>

        <div className={classes.controls}> {/* Controls for start/pause and reset */}
          <button onClick={handleStartPause}>
            {isRunning ? 'Pause' : 'Start'} {/* Display 'Pause' or 'Start' based on state */}
          </button>
          <button onClick={handleReset}>Reset</button> {/* Reset the timer */}
        </div>
      </div>

      <div className={classes.halfCircleBottom}></div> {/* Decorative bottom half-circle */}
    </div>
  );
}
