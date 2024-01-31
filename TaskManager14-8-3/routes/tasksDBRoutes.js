const express = require('express');
const router = express.Router();
const Task = require('./tasksDB'); 
const Joi = require('joi');

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

// Update a task
router.put('/:id', async (req, res) => {
    let requestedTask = {
        Title: req.body.Title,
        Task: req.body.Task,
        AdditionalInfo: req.body.AdditionalInfo,
        Category: req.body.Category,
        Tags: req.body.Tags,
        Severity: req.body.Severity,
        Completed: req.body.Completed
    };
    const schema = Joi.object({
        Title: Joi.string().required(),
        Task: Joi.string().max(25).required(),
        AdditionalInfo: Joi.string().max(250),
        Category: Joi.string().min(3).required(),
        Tags: Joi.array().required().items(Joi.string().min(1)),
        Severity: Joi.string().valid('Normal', 'Important', 'Very Important').required(),
        Completed: Joi.boolean().default(false).required()
    });

    const { error, value } = schema.validate(requestedTask);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        try {
            let updatedTask = await Task.findOneAndUpdate({ _id: req.params.id }, value, { new: true });
            res.send('Task updated successfully... \n' + updatedTask);
        } catch (err) {
            res.status(500).send(err.message);
        }
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
