import React, { useState, useEffect } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState([]);

  const handleTaskInput = (event) => {
    const newTask = event.target.value;
    setTasks([...tasks, newTask]);
    event.target.value = ''; // Clear input field after adding task
  };

  useEffect(() => {
    // Simulate fetching tasks from an API on component mount
    fetch('http://localhost:3000/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  return (
    <div>
      <h2>ToDo List</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      )}
      <input type="text" placeholder="Add a new task" onChange={handleTaskInput} />
      <button onClick={handleTaskInput}>Add Task</button>
    </div>
    
  );
}

export default ToDoList;
