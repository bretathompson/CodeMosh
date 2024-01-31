
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');

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
    Severity: String,
    Completed: Boolean
});

// task Model
const Task = mongoose.model('Task', taskSchema);

router.post('/', async (req, res) => {
    const schema = Joi.object({
        Title: Joi.string().required(),
        Task: Joi.string().max(25).required(),
        AdditionalInfo: Joi.string().max(250),
        Category: Joi.string().min(3).required(),
        Tags: Joi.array().required().items(Joi.string().min(1)),
        Severity: Joi.string().valid('normal', 'important', 'very important').required(),
        Completed: Joi.boolean().default(false).required()
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    } try {
        const task = await Task.create(value);
        const { _id, __v, ...responseTask } = task.toObject();

        res.send('Task added successfully...\n' + JSON.stringify(responseTask));
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
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