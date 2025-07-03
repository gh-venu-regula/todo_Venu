// This component renders a modal for creating a new task.
'use client';

// Importing necessary modules and components.
import { useState } from 'react';
import { toast } from 'react-toastify';
import { CreateTask } from '@/services/TaskServices';
import classes from './CreateTaskModal.module.css';

// The main functional component for the Create Task Modal.
export default function CreateTaskModal({ onClose, fetchTasks }) {
  // State to manage the title of the task.
  const [title, setTitle] = useState('');
  // State to manage the description of the task.
  const [description, setDescription] = useState('');
  // State to manage the due date of the task.
  const [dueDate, setDueDate] = useState('');
  // State to manage the priority of the task.
  const [priority, setPriority] = useState(1);
  // State to manage the tags associated with the task.
  const [tags, setTags] = useState('');

  // Function to handle the submission of the task creation form.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior.
    const newTask = {
      title, // Title of the task.
      description, // Description of the task.
      dueDate, // Due date of the task.
      priority: parseInt(priority), // Priority level of the task (converted to integer).
      tags, // Tags associated with the task.
    };

    const result = await CreateTask(newTask); // Call the service to create a new task.
    if (result.success) {
      toast.success('Task added successfully!'); // Show success notification.
      onClose(); // Close the modal.
      fetchTasks(); // Reload tasks.
    } else if(result.success === false) {
      toast.error(result.message); // Show error notification with specific message.
    }
  };

  return (
    <div className={classes.modalOverlay}> {/* Overlay for the modal */}
      <div className={classes.modalContent}> {/* Container for modal content */}
        <h3 className={classes.modalTitle}>Create New Task</h3> {/* Title of the modal */}
        <form className={classes.form} onSubmit={handleSubmit}> {/* Form for task creation */}
          <input
            type="text"
            placeholder="Title" /* Placeholder text for the title input */
            className={classes.input} /* Styling for the input field */
            value={title} /* Current value of the title state */
            onChange={(e) => setTitle(e.target.value)} /* Update title state on change */
            required /* Mark the field as required */
          />
          <textarea
            placeholder="Description" /* Placeholder text for the description textarea */
            className={classes.textarea} /* Styling for the textarea */
            value={description} /* Current value of the description state */
            onChange={(e) => setDescription(e.target.value)} /* Update description state on change */
            required /* Mark the field as required */
          />
          <input
            type="date" /* Input type for selecting a date */
            className={classes.input} /* Styling for the input field */
            value={dueDate} /* Current value of the dueDate state */
            onChange={(e) => setDueDate(e.target.value)} /* Update dueDate state on change */
            required /* Mark the field as required */
          />
          <select
            value={priority} /* Current value of the priority state */
            onChange={(e) => setPriority(e.target.value)} /* Update priority state on change */
            className={classes.select} /* Styling for the select dropdown */
          >
            <option value="1">Low</option> {/* Option for low priority */}
            <option value="2">Medium</option> {/* Option for medium priority */}
            <option value="3">High</option> {/* Option for high priority */}
          </select>
          <select
            value={tags} /* Current value of the tags state */
            onChange={(e) => setTags(e.target.value)} /* Update tags state on change */
            className={classes.select} /* Styling for the select dropdown */
          >
            <option value="">Select Tag</option> {/* Default option for tags */}
            <option value="social">Social</option> {/* Option for social tag */}
            <option value="work">Work</option> {/* Option for work tag */}
            <option value="education">Education</option> {/* Option for education tag */}
            <option value="other">Others</option> {/* Option for other tags */}
          </select>
          <div className={classes.buttons}> {/* Container for action buttons */}
            <button type="submit" className={classes.submitButton}>Add Task</button> {/* Button to submit the form */}
            <button type="button" onClick={onClose} className={classes.cancelButton}>Cancel</button> {/* Button to cancel and close the modal */}
          </div>
        </form>
      </div>
    </div>
  );
}
