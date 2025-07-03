// This component renders the Todo List, including its header and body, and handles task fetching.
'use client';

// Importing necessary modules and components.
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TodoListHeader from '../todo-list/TodoListHeader';
import TodoListBody from '../todo-list/TodoListBody';

import { GetTasks } from '@/services/TaskServices';
import classes from './TodoList.module.css';

// The main functional component for Todo List.
export default function TodoList({ todoDemo, setTodoDemo }) {
  const [todos, setTodos] = useState([]); // State to store all tasks.
  const [filteredTodos, setFilteredTodos] = useState([]); // State to store filtered tasks.
  const [isTasksLoaded, setIsTasksLoaded] = useState(false); // State to track if tasks are loaded.

  // Function to fetch tasks from the server.
  async function fetchTasks() {
    const token = localStorage.getItem("token"); // Retrieve the authentication token.
    if (!token) {
      toast.error("You are not logged in. Please log in to view your tasks.", {
        position: "top-left", // Position of the toast notification.
        autoClose: 3000, // Auto-close duration in milliseconds.
      });
      setTimeout(() => {
        window.location.href = '/login'; // Redirect to login page after 3 seconds.
      }, 3000);
      return; // Exit the function if no token is found.
    }

    const res = await GetTasks(token); // Fetch tasks using the token.
    if (res.result) {
      setTodos(res.tasks || []); // Update the todos state with fetched tasks.
      setTodoDemo(res.tasks || []); // Update the demo tasks state.
      setFilteredTodos((res.tasks || []).filter(todo => !todo.isArchived)); // Filter out archived tasks.
      setIsTasksLoaded(true); // Mark tasks as loaded.
      toast.success("Tasks fetched successfully!", {
        position: "top-left", // Position of the toast notification.
        autoClose: 3000, // Auto-close duration in milliseconds.
      });
    } else {
      toast.error("Failed to fetch tasks. Please try again later.", {
        position: "top-left", // Position of the toast notification.
        autoClose: 3000, // Auto-close duration in milliseconds.
      });
    }
  }

  // Effect to fetch tasks when the component mounts.
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={classes.todoListContainer}> {/* Container for the Todo List */}
      <ToastContainer /> {/* Toast notifications container */}
      <TodoListHeader
        todos={todos} /* Pass all tasks to the header */
        setFilteredTodos={setFilteredTodos} /* Function to update filtered tasks */
        fetchTasks={fetchTasks} /* Function to fetch tasks */
      />
      <TodoListBody
        isTasksLoaded={isTasksLoaded} /* Pass the tasks loaded state to the body */
        filteredTodos={filteredTodos} /* Pass filtered tasks to the body */
        fetchTasks={fetchTasks} /* Function to fetch tasks */
      />
    </div>
  );
}
