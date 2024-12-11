import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function AddTask() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleAddTask = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTask = { id: Date.now(), name, description };
    const updatedTasks = [...tasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    navigate('/list-page')
  };

  return (
    <div>
      <h2>Add Task</h2>
      <input
        type="text"
        placeholder="Task Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className='add-task-button-container'>
        <button className ='AddPage-btn' onClick={handleAddTask}> Add Task </button>
      </div>


    </div>
  );
}

export default AddTask;
