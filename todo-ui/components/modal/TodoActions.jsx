// This component provides actions for individual todo items, such as updating or deleting.
'use client';

// Importing necessary modules and components.
import { useState, useRef, useEffect } from 'react';
import classes from './TodoActions.module.css';
import UpdateTaskModal from './UpdateTaskModal'; // Modal for updating tasks.
import { DeleteTask } from '@/services/TaskServices';
import { toast } from 'react-toastify';

// The main functional component for Todo Actions.
export default function TodoActions({ todo, fetchTasks }) {
  // State to manage the visibility of the dropdown menu.
  const [menuOpen, setMenuOpen] = useState(false);
  // State to manage the visibility of the update modal.
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  // Reference to the dropdown menu for detecting clicks outside.
  const menuRef = useRef(null);

  // Effect to close the dropdown menu when clicked outside.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false); // Close the menu.
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Function to handle the deletion of a task.
  const handleDelete = async () => {
    try {
      await DeleteTask(todo.id); // Call the service to delete the task.
      toast.success("Task deleted successfully!"); // Show success notification.
      setMenuOpen(false); // Close the menu.
      fetchTasks(); // Reload tasks.
    } catch (error) {
      console.error(error); // Log the error.
      toast.error("Failed to delete task."); // Show error notification.
    }
  };

  return (
    <div className={classes.actionsContainer} ref={menuRef}> {/* Container for the actions */}
      <button
        className={classes.threeDotsButton} /* Button to toggle the dropdown menu */
        onClick={() => setMenuOpen(!menuOpen)} /* Toggle menu visibility */
      >
        ⋮
      </button>

      {menuOpen && (
        <div className={classes.dropdownMenu}> {/* Dropdown menu for actions */}
          <button
            className={classes.menuOption} /* Button to open the update modal */
            onClick={() => {
              setShowUpdateModal(true); // Show the update modal.
              setMenuOpen(false); // Close the menu.
            }}
          >
            Update
          </button>
          <button
            className={classes.menuOption} /* Button to delete the task */
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}

      {showUpdateModal && (
        <UpdateTaskModal
          todo={todo} /* Pass the todo item to the modal */
          closeModal={() => setShowUpdateModal(false)} /* Function to close the modal */
          fetchTasks={fetchTasks} /* Function to reload tasks */
        />
      )}
    </div>
  );
}
