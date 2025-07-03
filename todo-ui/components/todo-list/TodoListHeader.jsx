// This component serves as the header for the Todo List, providing filtering, sorting, and task creation functionalities.
'use client';

// Importing necessary modules and components.
import { useState } from 'react';
import classes from './TodoListHeader.module.css';
import CreateTaskModal from '@/components/modal/CreateTaskModal';

// The main functional component for the Todo List Header.
export default function TodoListHeader({ todos, setFilteredTodos, fetchTasks }) {
  // State to manage the selected filter option.
  const [filterOption, setFilterOption] = useState('');
  // State to manage the selected sort option.
  const [sortOption, setSortOption] = useState('');
  // State to manage the visibility of the task creation modal.
  const [showModal, setShowModal] = useState(false);

  // Function to handle filtering of tasks based on various criteria.
  const handleFilter = (e) => {
    const option = e.target.value;
    setFilterOption(option);

    let filtered = [...(todos || [])];

    // Filtering logic based on the selected option.
    if (option === 'completed') {
      filtered = filtered.filter(todo => todo.isCompleted && !todo.isArchived);
    } else if (option === 'pending') {
      filtered = filtered.filter(todo => !todo.isCompleted && !todo.isArchived);
    } else if (option === 'priority1') {
      filtered = filtered.filter(todo => todo.priority === 1 && !todo.isArchived);
    } else if (option === 'priority2') {
      filtered = filtered.filter(todo => todo.priority === 2 && !todo.isArchived);
    } else if (option === 'priority3') {
      filtered = filtered.filter(todo => todo.priority === 3 && !todo.isArchived);
    } else if (option === 'dueToday') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      filtered = filtered.filter(todo => {
        const due = new Date(todo.dueDate || todo.due);
        due.setHours(0, 0, 0, 0);
        return due.getTime() === today.getTime();
      }).filter(todo => !todo.isArchived);
    } else if (option === 'dueTomorrow') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      filtered = filtered.filter(todo => {
        const due = new Date(todo.dueDate || todo.due);
        due.setHours(0, 0, 0, 0);
        return due.getTime() === tomorrow.getTime();
      }).filter(todo => !todo.isArchived);
    } else if (option === 'dueNext7Days') {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      filtered = filtered.filter(todo => {
        const due = new Date(todo.dueDate || todo.due);
        return due >= today && due <= nextWeek;
      }).filter(todo => !todo.isArchived);
    } else if (option === 'tagSocial') {
      filtered = filtered.filter(todo => todo.tags?.toLowerCase() === 'social' && !todo.isArchived);
    } else if (option === 'tagWork') {
      filtered = filtered.filter(todo => todo.tags?.toLowerCase() === 'work' && !todo.isArchived);
    } else if (option === 'tagEducation') {
      filtered = filtered.filter(todo => todo.tags?.toLowerCase() === 'education' && !todo.isArchived);
    } else if (option === 'tagOther') {
      filtered = filtered.filter(todo => todo.tags?.toLowerCase() === 'other' && !todo.isArchived);
    } else if (option === 'hidden') {
      // Special case: show only hidden tasks.
      filtered = filtered.filter(todo => todo.isArchived);
    } else {
      // Default case: show all non-archived tasks.
      filtered = todos.filter(todo => !todo.isArchived);
    }

    // Update the filtered tasks in the parent component.
    setFilteredTodos(filtered);
  };

  // Function to handle sorting of tasks based on various criteria.
  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);

    let sorted = [...(todos || [])];

    // Sorting logic based on the selected option.
    if (option === 'priority') {
      sorted.sort((a, b) => a.priority - b.priority);
    } else if (option === 'createdAt') {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (option === 'dueDate') {
      sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (option === 'hidden') {
      sorted = (todos || []).filter(todo => todo.isArchived);
    }

    // Update the sorted tasks in the parent component.
    setFilteredTodos(sorted);
  };

  // Function to handle the click event for creating a new task.
  const handleCreateClick = () => {
    setShowModal(true);
  };

  // Function to handle the closing of the task creation modal.
  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className={classes.todoListHeader}> {/* Container for the header section */}
      <div className={classes.controlsContainer}> {/* Container for filter and sort controls */}
        <div className={classes.filterContainer}> {/* Filter dropdown section */}
          <label className={classes.label}>Filter by</label>
          <select value={filterOption} onChange={handleFilter} className={classes.select}> {/* Dropdown for filter options */}
            <option value="">All</option>
            <option value="completed">Completed Tasks</option>
            <option value="pending">Pending Tasks</option>
            <option value="priority1">Low Priority</option>
            <option value="priority2">Medium Priority</option>
            <option value="priority3">High Priority</option>
            <option value="dueToday">Due Today</option>
            <option value="dueTomorrow">Due Tomorrow</option>
            <option value="dueNext7Days">Due Next 7 Days</option>
            <option value="tagSocial">Social</option>
            <option value="tagWork">Work</option>
            <option value="tagEducation">Education</option>
            <option value="tagOther">Other</option>
            <option value="hidden">Hidden Tasks</option>
          </select>
        </div>

        <div className={classes.sortContainer}> {/* Sort dropdown section */}
          <label className={classes.label}>Sort by</label>
          <select value={sortOption} onChange={handleSort} className={classes.select}> {/* Dropdown for sort options */}
            <option value="">None</option>
            <option value="priority">Priority</option>
            <option value="createdAt">Created (Newest)</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>
      </div>

      <button className={classes.createButton} onClick={handleCreateClick}> {/* Button to open task creation modal */}
        + Create Task
      </button>

      {showModal && (
        <CreateTaskModal onClose={handleModalClose} fetchTasks={fetchTasks} />
      )}
    </div>
  );
}
