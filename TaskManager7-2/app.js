
const Joi = require('joi');
const express = require('express');
const bodyParser = require ('body-parser');
const logger = require('./middleware/logger');
// const tasksRoutes = require('./routes/tasks');
const tasksRoutesDB = require('./routes/tasksDB');


const app = express();
const PORT = 3000;

app.use(bodyParser.json());
// app.use('/api/tasks', tasksRoutes);
app.use('/api/tasksDB', tasksRoutesDB);


app.use((req, res, next) => {
    logger.logApplication('Log message: ' + req.method + ' ' + req.originalUrl);
    next();
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

