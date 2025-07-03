'use client';
import { useState } from 'react';
import classes from './UpdateTaskModal.module.css';
import { UpdateTask } from '@/services/TaskServices';
import { toast } from 'react-toastify';

export default function UpdateTaskModal({ todo, closeModal, fetchTasks }) {
  const [formData, setFormData] = useState({
    id: todo.id,
    title: todo.title || '',
    description: todo.description || '',
    dueDate: todo.dueDate?.slice(0,10) || '',
    isCompleted: todo.isCompleted || false,
    isArchived: todo.isArchived || false,
    priority: todo.priority || 1,
    tags: todo.tags || ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UpdateTask(formData);
      toast.success('Task updated successfully!');
      closeModal();
      fetchTasks();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update task.');
    }
  };

  return (
    <div className={classes.modalOverlay}>
      <div className={classes.modalContent}>
        <h3 className={classes.modalTitle}>Update Task</h3>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.formGroup}>
            <label>ID</label>
            <input type="text" name="id" value={formData.id} readOnly />
          </div>
          <div className={classes.formGroup}>
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div className={classes.formGroup}>
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
          </div>
          <div className={classes.formGroup}>
            <label>Due Date</label>
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
          </div>
          <div className={classes.formGroup}>
            <label>Priority</label>
            <select name="priority" value={formData.priority} onChange={handleChange}>
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
            </select>
          </div>
          <div className={classes.formGroup}>
            <label>Tags</label>
            <select name="tags" value={formData.tags} onChange={handleChange}>
              <option value="">Select</option>
              <option value="social">Social</option>
              <option value="work">Work</option>
              <option value="education">Education</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className={classes.formGroupCheckbox}>
            <label>Completed</label>
            <input type="checkbox" name="isCompleted" checked={formData.isCompleted} onChange={handleChange} />
          </div>
          <div className={classes.formGroupCheckbox}>
            <label>Archived</label>
            <input type="checkbox" name="isArchived" checked={formData.isArchived} onChange={handleChange} />
          </div>
          <div className={classes.buttonGroup}>
            <button type="submit">Update</button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
