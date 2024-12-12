import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function AddTask() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleAddTask = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTask = { id: Date.now(), name, description };
    const updatedTasks = [...tasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    navigate('/list-page')
  };

  return (
    <div className='addPage-container'>
      <h2>Add Task</h2>
      <input
        type="text"
        placeholder="Task Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {errors.name && <small className="text-warning">{errors.firstName}</small>}

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {errors.description && <small className="text-warning">{errors.firstName}</small>}

      <div className='add-task-button-container'>
        <button className ='AddPage-btn' onClick={handleAddTask}> Add Task </button>
        <button className ='AddPage-Cancel-btn' onClick={handleAddTask}> Cancel </button>
      </div>

    </div>
  );
}

export default AddTask;
