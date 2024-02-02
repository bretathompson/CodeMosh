
const Joi = require('joi');
const genres = require('./routes/geners');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/genres', genres);

app.listen(3000, () => {
    console.log(`Listening on port 3000...`)
});




