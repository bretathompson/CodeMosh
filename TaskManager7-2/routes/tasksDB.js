const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/taskDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...\n'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// task Schema
const taskSchema = new mongoose.Schema({
    Title: String,
    Task: String,
    AdditionalInfo: String,
    Category: String,
    Tags: [String],
    Severity: Number,
    Completed: Boolean
});

// task Model
const Task = mongoose.model('Task', taskSchema);

// Create a task
router.post('/', async (req, res) => {
    let task = new Task({
        Title: req.body.Title,
        Task: req.body.Task,
        AdditionalInfo: req.body.AdditionalInfo,
        Category: req.body.Category,
        Tags: req.body.Tags,
        Severity: req.body.Severity,
        Completed: req.body.Completed
    });
    console.log(task);
    task = await task.save();
    res.send(task);
});

// Read all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});

// Read a single task
router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        return res.status(404).send('The task with the given ID was not found.');
    }
    res.send(task);
});

// Update a task
router.put('/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, {
        Title: req.body.Title,
        Task: req.body.Task,
        AdditionalInfo: req.body.AdditionalInfo,
        Category: req.body.Category,
        Tags: req.body.Tags,
        Severity: req.body.Severity,
        Completed: req.body.Completed
    }, {
        new: true
    });
    if (!task) {
        return res.status(404).send('The task with the given ID was not found.');
    }
    res.send(task);
});

// Delete a task
router.delete('/:id', async (req, res) => {
    const task = await Task.findByIdAndRemove(req.params.id);
    if (!task) {
        return res.status(404).send('The task with the given ID was not found.');
    }
    res.send(task);
});

module.exports = router;