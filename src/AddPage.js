import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { id: Date.now(), name: taskName, description: description };
    
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    navigate('/');
  };
  
  return (
    <div className="AddTask-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskName">Task Name</label>
        <input
          type="text"
          id="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></input>

        <button 
          onClick={() => navigate("list-page")}
          type="submit"
          className="AddTask-btn"
          >Add Task</button>

      </form>
    </div>
  );
};

export default AddTask;
