'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { CreateTask } from '@/services/TaskServices';
import classes from './CreateTaskModal.module.css';

export default function CreateTaskModal({ onClose, fetchTasks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(1);
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      dueDate,
      priority: parseInt(priority),
      tags,
    };

    const result = await CreateTask(newTask);
    if (result.success) {
      toast.success('Task added successfully!');
      onClose();
      fetchTasks(); // Reload tasks
    } else {
      toast.error('Failed to create task');
    }
  };

  return (
    <div className={classes.modalOverlay} >
      <div className={classes.modalContent}>
        <h3 className={classes.modalTitle}>Create New Task</h3>
        <form className={classes.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className={classes.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className={classes.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="date"
            className={classes.input}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={classes.select}
          >
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
          <select
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className={classes.select}
          >
            <option value="">Select Tag</option>
            <option value="social">Social</option>
            <option value="work">Work</option>
            <option value="education">Education</option>
            <option value="other">Others</option>
          </select>
          <div className={classes.buttons}>
            <button type="submit" className={classes.submitButton}>Add Task</button>
            <button type="button" onClick={onClose} className={classes.cancelButton}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
