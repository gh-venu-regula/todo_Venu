'use client';

import classes from './ProgressBar.module.css';

export default function ProgressBar({ todos = [] }) {
  const totalTasks = todos.length;
  const completedTasks = todos.filter(
    (todo) => todo.isCompleted && !todo.isArchived
  ).length;

  const rawPercent = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  const percent = Math.max(0, Math.min(100, rawPercent));

  const r = 80;
  const x = 100;
  const y = 100;

  const startX = x + r; // right side of circle
  const startY = y;

  const angle = 2 * Math.PI * (percent / 100); // now full circle logic!
  const endX = x + r * Math.cos(-Math.PI / 2 + angle); // start at top, clockwise
  const endY = y + r * Math.sin(-Math.PI / 2 + angle);

  const largeArcFlag = percent > 50 ? 1 : 0;

  console.log({ startX, startY, endX, endY, percent });

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.heading}>Focus Progress</h3>
      <svg viewBox="0 0 200 200" className={classes.svg}>
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {/* FULL circle background */}
        <path
          className={classes.bgArc}
          d="M180,100 A80,80 0 1,1 20,100 A80,80 0 1,1 180,100"
        />

        {/* Foreground arc */}
        {percent > 0 && (
          <path
            className={classes.fgArc}
            d={`M${x},${y - r} A${r},${r} 0 ${largeArcFlag},1 ${endX},${endY}`}
          />
        )}

        <text x="50%" y="50%" className={classes.text}>
          {Math.round(percent)}%
        </text>
      </svg>
    </div>
  );
}
