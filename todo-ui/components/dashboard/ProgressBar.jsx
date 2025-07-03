'use client';
import classes from './ProgressBar.module.css';

export default function ProgressBar({ todos }) {
  const totalTasks = todos.length;
  const completedTasks = todos.filter(
    (todo) => todo.isCompleted && !todo.isArchived
  ).length;
  const percent = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  // Arc geometry
  const r = 80;    // radius
  const x = 100;   // center x
  const y = 100;   // center y

  const startX = x - r;
  const startY = y;

  const angle = Math.PI * (1 - percent / 100);
  const endX = x + r * Math.cos(angle);
  const endY = y - r * Math.sin(angle);

  const largeArcFlag = percent > 50 ? 1 : 0;

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.heading}>Focus Progress</h3>
      <svg viewBox="0 0 200 100" className={classes.svg}>
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" /> {/* green-500 */}
            <stop offset="100%" stopColor="#10b981" /> {/* emerald-500 */}
          </linearGradient>
        </defs>

        {/* Background Arc */}
        <path
          className={classes.bgArc}
          d="M20,100 A80,80 0 0,1 180,100"
        />

        {/* Foreground Arc */}
        <path
          className={classes.fgArc}
          d={`M${startX},${startY} A${r},${r} 0 ${largeArcFlag},1 ${endX},${endY}`}
        />

        <text x="50%" y="60%" className={classes.text}>
          {Math.round(percent)}%
        </text>
      </svg>
    </div>
  );
}
