const Joi = require('joi');
const require = ('./logger');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(logger);

app.use(function (req, res, next) {
    console.log('Authenticating...');
    next();
});


const courses = [
    {id: 1, name: 'courses1'},
    {id: 2, name: 'courses2'},
    {id: 3, name: 'courses3'},

];

app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1, 
        name: req.body.name
    };
    
    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    courses.push(course);
    res.send(course);
});


app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');

    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});



app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1),

    res.send(course);
});









function validateCourse(course) {
    const schema = Joi.object({ 
        id: Joi.number( ), 
        name: Joi.string( ).min(3).required( ) 
    });
    
    return schema.validate(course); 
}

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

app.listen(3000, () => {
    console.log(`Listening on port 3000...`)
});







