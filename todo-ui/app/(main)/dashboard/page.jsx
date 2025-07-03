'use client';
import classes from './page.module.css';
import DashboardInfo from '@/components/dashboard/DashboardInfo';
import TodoList from '@/components/dashboard/TodoList';
import Timer from '@/components/dashboard/Timer';
import ProgressBar from '@/components/dashboard/ProgressBar';
import { useState } from 'react';

export default function DashboardPage() {
  const [todoDemo, setTodoDemo] = useState([]);
  return (
    <main className={classes.dashboardContainer}>

      <div className={classes.contentContainer}>
        <div className={classes.todoListContainer}>
          <TodoList todoDemo={todoDemo} setTodoDemo={setTodoDemo} />
        </div>

        <div className={classes.rightContainer}>
          <Timer />
          <ProgressBar todos={todoDemo} />
        </div>
      </div>
    </main>
  );
}
