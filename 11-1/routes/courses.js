const express = require('express');
const router = express.Router();


const courses = [
    {id: 1, name: 'courses1'},
    {id: 2, name: 'courses2'},
    {id: 3, name: 'courses3'},

];

router.get('/', (req, res) => {
    res.send(courses);
});

router.post('/', (req, res) => {
    const course = {
        id: courses.length + 1, 
        name: req.body.name
    };
    
    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    courses.push(course);
    res.send(course);
});


router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');

    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});



router.delete('/:id', (req, res) => {
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


router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

module.exports = router;

