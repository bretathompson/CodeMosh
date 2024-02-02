
// const express = require("express");
// const fs = require('fs');
// const idPicker = require('../middleware/idPicker.js');
// const saveTasks = require('../middleware/saveTasks.js');
// const router = express.Router();

// let delay = 500;

// class Task {
//     constructor(task) {
//         this.id = idPicker(tasks, task);
//         this.task = task;
//     }
// };

// let tasks = [];
// let savedData = fs.readFileSync('taskLog.json');
// tasks = JSON.parse(savedData);
    
// router.get('/', (req, res) => {
//     setTimeout(() => {
//         res.send(tasks);
//         console.log(tasks);
//     }, delay);
// });

// router.get('/:id', (req, res) => {
//     const task = tasks.find(task => task.id === parseInt(req.params.id));
//     setTimeout(() => {
//         if (!task) {
//             res.status(404).send('The task with the given ID was not found.');
//         } else {
//             res.send(task);
//         }
//     }, delay);
// });

// router.post('/', (req, res) => {
//     setTimeout(() => {
//         if (!req.body.task || req.body.task.length <= 3) {
//             res.status(400).send('Task is required and should be at least 3 characters long.');
//             return;
//         }
//         const newTask = new Task(req.body.task);
//         tasks.push(newTask);
//         res.send(newTask);
//         saveTasks('taskLog.json', tasks);
//     }, delay);
// });

// router.put('/:id', (req, res) => {
//     setTimeout(() => {
//         if (!req.body.task || req.body.task.length < 3) {
//             res.status(400).send('Task is required and should be at least 3 characters long.');
//             return;
//         }
//         const task = tasks.find(task => task.id === parseInt(req.params.id));
//         if (!task) {
//             res.status(404).send('The task with the given ID was not found.');
//         } else {
//             task.task = req.body.task;
//             res.send(task);
//         }
//         saveTasks('taskLog.json', tasks);
//     }, delay);
// });

// router.delete('/:id', (req, res) => {
//     setTimeout(() => {
//         const task = tasks.find(task => task.id === parseInt(req.params.id));
//         if (!task) {
//             res.status(404).send('The task with the given ID was not found.');
//         } else {
//             const index = tasks.indexOf(task);
//             tasks.splice(index, 1);
//             res.send(task);
//         }
//         saveTasks('taskLog.json', tasks);
//     }, delay);
// });

// module.exports = router;
