import React from 'react';
import Register from './Register';
import Login from './Login';
import TaskList from './ListPage';
import AddTask from './AddPage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />  
        <Route path="/list-page" element={<TaskList />} />
        <Route path="add-page" element={<AddTask />} />
      </Routes>
    </Router>
  );
}

export default App;
