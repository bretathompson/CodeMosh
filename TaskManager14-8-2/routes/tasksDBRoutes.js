const express = require('express');
const router = express.Router();
const Task = require('./tasksDB'); 

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a task by ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send('The task with the given ID was not found.');
        }
        res.send(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new task
router.post('/', async (req, res) => {
    const newTask = new Task({
        Title: req.body.Title,
        Task: req.body.Task,
        AdditionalInfo: req.body.AdditionalInfo,
        Category: req.body.Category,
        Tags: req.body.Tags,
        Severity: req.body.Severity,
        Completed: req.body.Completed
    });

    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update/modify a task
router.put('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
            Title: req.body.Title,
            Task: req.body.Task,
            AdditionalInfo: req.body.AdditionalInfo,
            Category: req.body.Category,
            Tags: req.body.Tags,
            Severity: req.body.Severity,
            Completed: req.body.Completed
        }, { new: true });

        if (!updatedTask) {
            return res.status(404).send('The task with the given ID was not found.');
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Remove a Task
router.delete('/:id', async (req, res) => {
    try {
        const removedTask = await Task.findByIdAndRemove(req.params.id);
        if (!removedTask) {
            return res.status(404).send('The task with the given ID was not found.');
        }
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
