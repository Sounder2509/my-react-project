import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css';

function EditTask() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (state) {
      setName(state.name);
      setDescription(state.description);
    }
  }, [state]);

  const handleEditTask = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.map((task) =>
      task.id === state.id ? { ...task, name, description } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    navigate('/list-page');
  };

  return (
    <div>
      <h2>Edit Task</h2>
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

      <div className='edit-task-button-container'>
        <button className='EditPage-btn' onClick={handleEditTask}> Save Changes </button>
      </div>
      
    </div>
  );
}

export default EditTask;