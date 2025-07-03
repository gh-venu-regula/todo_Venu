'use client';
import { useState, useRef, useEffect } from 'react';
import classes from './TodoActions.module.css';
import UpdateTaskModal from './UpdateTaskModal'; // Reuse a modal
import { DeleteTask } from '@/services/TaskServices';
import { toast } from 'react-toastify';

export default function TodoActions({ todo, fetchTasks }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = async () => {
    try {
      await DeleteTask(todo.id);
      toast.success("Task deleted successfully!");
      setMenuOpen(false);
      fetchTasks();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task.");
    }
  };

  return (
    <div className={classes.actionsContainer} ref={menuRef}>
      <button
        className={classes.threeDotsButton}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ⋮
      </button>

      {menuOpen && (
        <div className={classes.dropdownMenu}>
          <button
            className={classes.menuOption}
            onClick={() => {
              setShowUpdateModal(true);
              setMenuOpen(false);
            }}
          >
            Update
          </button>
          <button
            className={classes.menuOption}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}

      {showUpdateModal && (
        <UpdateTaskModal
          todo={todo}
          closeModal={() => setShowUpdateModal(false)}
          fetchTasks={fetchTasks}
        />
      )}
    </div>
  );
}
