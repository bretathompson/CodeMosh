
const express = require('express');
const config = require('config');
const path = require('path');

const app = express();
const port = 3000;

const storyVariables = config.util.loadFileConfigs(path.join(__dirname, 'config'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', { title: 'Mad Libs Story', heading: 'My Mad Libs Story', storyVariables });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

