import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ListPage.css";

function TaskList() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem('tasks')) || [
      { id: 1, name: 'Tamil', description: '90 Marks' },
      { id: 2, name: 'English', description: '85 Marks' },
    ];
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const navigate = useNavigate();

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    navigate('/edit-page', { state: taskToEdit });
  };

  return (
    <div className="TaskList-container">
      <h2 className="TaskList-title">Task List</h2>
      <table border="1" className="TaskList-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>
                <button
                  className="Action-btn Edit-btn"
                  onClick={() => handleEditTask(task.id)}
                >
                  Edit
                </button>
                <button
                  className="Action-btn Delete-btn"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="AddTask-btn"
        onClick={() => navigate('/add-page')}
      >
        Add Task
      </button>
    </div>
  );
}

export default TaskList;
