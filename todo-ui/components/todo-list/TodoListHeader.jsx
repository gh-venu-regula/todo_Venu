'use client';
import { useState } from 'react';
import classes from './TodoListHeader.module.css';
import CreateTaskModal from '@/components/modal/CreateTaskModal';
export default function TodoListHeader({ todos, setFilteredTodos, fetchTasks }) {
  const [filterOption, setFilterOption] = useState('');
  const [sortOption, setSortOption] = useState('');
const [showModal, setShowModal] = useState(false);

const handleFilter = (e) => {
  const option = e.target.value;
  setFilterOption(option);

  let filtered = [...(todos || [])];

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
    // Special case: show only hidden
    filtered = filtered.filter(todo => todo.isArchived);
  } else {
    // Default: show all non-archived
    filtered = todos.filter(todo => !todo.isArchived);
  }

  setFilteredTodos(filtered);
};



  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);

    let sorted = [...(todos || [])];

    if (option === 'priority') {
      sorted.sort((a, b) => a.priority - b.priority);
    } else if (option === 'createdAt') {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (option === 'dueDate') {
      sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }else if (option === 'hidden') {
  filtered = (todos || []).filter(todo => todo.isArchived);
}


    setFilteredTodos(sorted);
  };
const handleCreateClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
 return (
    <div className={classes.todoListHeader}>
      <div className={classes.controlsContainer}>
        <div className={classes.filterContainer}>
          <label className={classes.label}>Filter by</label>
          <select value={filterOption} onChange={handleFilter} className={classes.select}>
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

        <div className={classes.sortContainer}>
          <label className={classes.label}>Sort by</label>
          <select value={sortOption} onChange={handleSort} className={classes.select}>
            <option value="">None</option>
            <option value="priority">Priority</option>
            <option value="createdAt">Created (Newest)</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>
      </div>

      <button className={classes.createButton} onClick={handleCreateClick}>+ Create Task</button>

      {showModal && (
        <CreateTaskModal onClose={handleModalClose} fetchTasks={fetchTasks} />
      )}
    </div>
  );
}
