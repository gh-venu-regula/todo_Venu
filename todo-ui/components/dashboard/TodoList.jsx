'use client';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TodoListHeader from '../todo-list/TodoListHeader';
import TodoListBody from '../todo-list/TodoListBody';

import { GetTasks } from '@/services/TaskServices';
import classes from './TodoList.module.css';

export default function TodoList({todoDemo, setTodoDemo}) {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [isTasksLoaded, setIsTasksLoaded] = useState(false);

  async function fetchTasks() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in. Please log in to view your tasks.", {
        position: "top-left",
        autoClose: 3000,
      });
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
      return;
    }

    const res = await GetTasks(token);
    if (res.result) {
      
    setTodos(res.tasks || []);
    setTodoDemo(res.tasks || []);
    setFilteredTodos((res.tasks || []).filter(todo => !todo.isArchived));
      setIsTasksLoaded(true);
      toast.success("Tasks fetched successfully!", {
        position: "top-left",
        autoClose: 3000,
      });
    } else {
      toast.error("Failed to fetch tasks. Please try again later.", {
        position: "top-left",
        autoClose: 3000,
      });
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={classes.todoListContainer}>
      <ToastContainer />
      <TodoListHeader
        todos={todos}
        setFilteredTodos={setFilteredTodos}
        fetchTasks={fetchTasks}   
      />
      <TodoListBody
        isTasksLoaded={isTasksLoaded}
        filteredTodos={filteredTodos}
        fetchTasks={fetchTasks} 
      />
    </div>
  );
}
