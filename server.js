import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import cors from 'cors'
import errorHandlingMW from './mw.js';
import fs from 'fs'
import {Task} from './task.js'
import path from 'path'



const app = express();
const port = process.env.PORT || 3001;

// Serve static files from the 'public' directory
//app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('api/tasks/category/{category}/{status}')
{
  const data = await fs.promises.readFile("tasks.json","utf-8");
  const tasks = JSON.parse(data);
}
// API endpoint to return sample tasks (replace with actual logic)
app.get('/api/tasks', async (req, res,next) => {
  try {
    // Read tasks from JSON file
    const data = await fs.promises.readFile("tasks.json","utf-8");
    const tasks = JSON.parse(data);
    // Validate tasks
    // Validate each task against the schema
    // for(let i=0;i<tasks.length;i++)
    // Array.forEach((task) => {
    //   if (!(task instanceof Task)) {
    //     throw new Error('Invalid task structure in JSON file');
    //   }
    // },tasks);

    // Return tasks
    res.json(tasks);
  } catch (error) {
    console.error('Error reading or validating tasks:', error);
    res.status(500).json({ message: 'Internal Server Error,' + error });
  }
  // const error = new Error('Something went wrong');
  // error.status = 500; // Set custom status code
  // if(error)  
  //   next(error);
  // else 
  //res.json(['Buy milk', 'Walk the dog']);
});

async function writeTask(task) {
  try {
    const data = await fs.promises.readFile('tasks.json', 'utf-8');
    const tasks = JSON.parse(data);
    tasks.push(task); // Add the new task

    const jsonData = JSON.stringify(tasks, null, 2); // Stringify with indentation
    await fs.promises.writeFile('tasks.json', jsonData);
  } catch (error) {
    console.error(error);
    return false; // Indicate failure
  }
  return true; // Indicate success
}

app.use(express.json());

app.put('/api/tasks',async(req,res,next)=>
  {
    const done = req.params[0];
      
  });

app.post('/api/tasks',async(req,res,next)=>
{
  const taskDto = req.body;
  if (!taskDto || !taskDto.taskDescription) 
  {
    res.status(400).json({ message: 'Invalid task data' }); // Return an object with a message
  }

  const task = new Task(uuidv4(),taskDto.taskDescription); // Create Task object from DTO
  const success = await writeTask(task);

  if (success) {
    res.json(task);
  } else {
    res.status(500).json({ message: 'Error adding task'});
  }  
  });

// Route for the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  'index.html'));
});

)

app.use(errorHandlingMW);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
