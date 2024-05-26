import { v4 as uuidv4 } from 'uuid';
import fs from 'fs'
import {Task} from './task.js'
import express from 'express';

const todoRoutes = express.Router();

// Helper function to read tasks from JSON file
async function readTasks() {
    try
    {
      const data = await fs.promises.readFile('tasks.json', 'utf-8');
      if(data)
        return JSON.parse(data);
      else
        return [];
    }
    catch(err)
    {
      console.log(err);
    }
  }
// Helper function to write tasks to JSON file
async function writeTasks(tasks) {
    const jsonData = JSON.stringify(tasks, null, 2);  
    await fs.promises.writeFile('tasks.json', jsonData);
  }

  todoRoutes.get('/', async (req, res,next) => 
    {
        try 
        {
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
        } 
        catch (error) 
        {
        next(error);  
        //   console.error('Error reading or validating tasks:', error);
        //   res.status(500).json({ message: 'Internal Server Error,' + error });
        }
    });
  
    todoRoutes.delete('/:id', async (req,res)=>
      {
        try
        {
          const taskId = req.params.id;
          let tasks = await readTasks();
          const taskIndex = tasks.findIndex((task)=>task.id===taskId);
          if(taskIndex!=-1)
          {
            tasks.splice(taskIndex,1);
            await writeTasks(tasks);
            res.status(200).json({message:`task ${taskId} was deleted`});
          }
          else
          {
            res.status(404).json({message: 'task not found'});
          }
        }
        catch(err)
        {
          next(err);
          res.status(500).json({message: err.message});
        }
      }
    );
    // const error = new Error('Something went wrong');
    // error.status = 500; // Set custom status code
    // if(error)  
    //   next(error);
    // else 
    //res.json(['Buy milk', 'Walk the dog']);
  
  
  todoRoutes.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { done } = req.body;
  
    if (done === undefined) {
      res.status(400).json({ message: 'Invalid task data' });
      return;
    }
  
    try {
      const tasks = await readTasks();
      const taskIndex = tasks.findIndex(task => task.id === id);
  
      if (taskIndex === -1) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
  
      tasks[taskIndex].done = done;
      await writeTasks(tasks);
      res.json(tasks[taskIndex]);
    } catch (error) {
      next(error);
      //console.error('Error updating task:', error);
      //res.status(500).json({ message: 'Error updating task' });
    }
  });
  
  // API endpoint to create a new task
  todoRoutes.post('/', async (req, res, next) => {
    const taskDto = req.body;
    if (!taskDto || !taskDto.description || !taskDto.category) {
      res.status(400).json({ message: 'Invalid task data' });
      return;
    }
  
    const task = new Task(uuidv4(), taskDto.category , false,taskDto.description); // Added default 'done' status
    try {
      const tasks = await readTasks();
      tasks.push(task);    
      await writeTasks(tasks);
      res.json(task);
    } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({ message: 'Error adding task' });
    }
  });
  

  export default todoRoutes