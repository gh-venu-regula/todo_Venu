// This component renders a modal for updating an existing task.
'use client';

// Importing necessary modules and components.
import { useState } from 'react';
import classes from './UpdateTaskModal.module.css';
import { UpdateTask } from '@/services/TaskServices';
import { toast } from 'react-toastify';

// The main functional component for the Update Task Modal.
export default function UpdateTaskModal({ todo, closeModal, fetchTasks }) {
  // State to manage the form data for the task.
  const [formData, setFormData] = useState({
    id: todo.id, // ID of the task (read-only).
    title: todo.title || '', // Title of the task.
    description: todo.description || '', // Description of the task.
    dueDate: todo.dueDate?.slice(0,10) || '', // Due date of the task (formatted).
    isCompleted: todo.isCompleted || false, // Completion status of the task.
    isArchived: todo.isArchived || false, // Archival status of the task.
    priority: todo.priority || 1, // Priority level of the task.
    tags: todo.tags || '' // Tags associated with the task.
  });

  // Function to handle changes in the form fields.
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; // Extract properties from the event.
    setFormData(prev => ({
      ...prev, // Preserve existing form data.
      [name]: type === 'checkbox' ? checked : value // Update the specific field.
    }));
  };

  // Function to handle the submission of the task update form.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior.
    try {
      await UpdateTask(formData); // Call the service to update the task.
      toast.success('Task updated successfully!'); // Show success notification.
      closeModal(); // Close the modal.
      fetchTasks(); // Reload tasks.
    } catch (error) {
      console.error(error); // Log the error.
      toast.error('Failed to update task.'); // Show error notification.
    }
  };

  return (
    <div className={classes.modalOverlay}> {/* Overlay for the modal */}
      <div className={classes.modalContent}> {/* Container for modal content */}
        <h3 className={classes.modalTitle}>Update Task</h3> {/* Title of the modal */}
        <form onSubmit={handleSubmit} className={classes.form}> {/* Form for task update */}
          <div className={classes.formGroup}> {/* Group for ID field */}
            <label>ID</label>
            <input type="text" name="id" value={formData.id} readOnly /> {/* Read-only ID field */}
          </div>
          <div className={classes.formGroup}> {/* Group for title field */}
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} /> {/* Editable title field */}
          </div>
          <div className={classes.formGroup}> {/* Group for description field */}
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange}></textarea> {/* Editable description field */}
          </div>
          <div className={classes.formGroup}> {/* Group for due date field */}
            <label>Due Date</label>
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} /> {/* Editable due date field */}
          </div>
          <div className={classes.formGroup}> {/* Group for priority field */}
            <label>Priority</label>
            <select name="priority" value={formData.priority} onChange={handleChange}> {/* Dropdown for priority */}
              <option value={1}>Low</option> {/* Option for low priority */}
              <option value={2}>Medium</option> {/* Option for medium priority */}
              <option value={3}>High</option> {/* Option for high priority */}
            </select>
          </div>
          <div className={classes.formGroup}> {/* Group for tags field */}
            <label>Tags</label>
            <select name="tags" value={formData.tags} onChange={handleChange}> {/* Dropdown for tags */}
              <option value="">Select</option> {/* Default option for tags */}
              <option value="social">Social</option> {/* Option for social tag */}
              <option value="work">Work</option> {/* Option for work tag */}
              <option value="education">Education</option> {/* Option for education tag */}
              <option value="other">Other</option> {/* Option for other tags */}
            </select>
          </div>
          <div className={classes.formGroupCheckbox}> {/* Group for completed checkbox */}
            <label>Completed</label>
            <input type="checkbox" name="isCompleted" checked={formData.isCompleted} onChange={handleChange} /> {/* Checkbox for completion status */}
          </div>
          <div className={classes.formGroupCheckbox}> {/* Group for archived checkbox */}
            <label>Archived</label>
            <input type="checkbox" name="isArchived" checked={formData.isArchived} onChange={handleChange} /> {/* Checkbox for archival status */}
          </div>
          <div className={classes.buttonGroup}> {/* Group for action buttons */}
            <button type="submit">Update</button> {/* Button to submit the form */}
            <button type="button" onClick={closeModal}>Cancel</button> {/* Button to cancel and close the modal */}
          </div>
        </form>
      </div>
    </div>
  );
}
