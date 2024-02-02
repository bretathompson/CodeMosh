const express = require('express');
const router = express.Router();
const Task = require('./task');

router.get('/', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get a task by ID
  router.get('/:id', getTask, (req, res) => {
    res.json(res.task);
  });
  
  // Create a new task
  router.post('/', async (req, res) => {
    const newTask = new Task({
      task: req.body.task
    });
  
    try {
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Update/modify a task
  router.put('/:id', getTask, async (req, res) => {
    if (req.body.task != null) {
      res.task.task = req.body.task;
    }
  
    try {
      const updatedTask = await res.task.save();
      res.json(updatedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Remove a Task
  router.delete('/:id', getTask, async (req, res) => {
    try {
      await res.task.remove();
      res.json({ message: 'Task deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Middleware function to get a task by ID
  async function getTask(req, res, next) {
    let task;
    try {
      task = await Task.findById(req.params.id);
      if (task == null) {
        return res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  
    res.task = task;
    next();
  }

module.exports = router;
