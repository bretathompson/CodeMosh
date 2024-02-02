const mongoose = require('mongoose');

mongoose.connect('monbodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to Mongodb...', err));


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});


const Course = mongoose.model('Course', courseSchema);

async function createCourse() {    
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
});

const result = await course.save();
console.log(result);
}

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
    .find({author: 'Mosh', isPublished: true})
    // .find({price: {$gte: 10, $lte: 20} })
    // .find({price: {$in: [10, 15, 20] } })
    // .find()
    // .or([{author: 'Mosh'}, {isPublished: true} ])
    
    //find something that starts with
    // .find({author: /^Mosh/ })
    //ends with the i is to remove case sensitive
    // .find({ author: /Hamedani$/i})
    
    //contains
    // .find({author: /.*Mosh.*/i })
    
    // search for pages it uses the const above
    // .skip((pageNumber -1) * pageSize)
    // .limit(pageSize)

    .and([])
    .limit(10)
    .sort({name: 1})
    .select({name: 1, tags: 1})
    .count();
    console.log(courses);
}

// vid 17
// async function updateCourse(id) {
//     const course = await Course.findById(id);
//     if (!course) return;
    
//     course.isPublished = true;
//     course.author = 'Another Author';

//     const result = await course.save();
//     console.log(result);
// }

// updateCourse('course id from database');


//vid 18
// async function updateCourse(id) {
//     const course = await Course.findByIdAndUpdate(id, {
//         $set: {
//             author: 'Jason',
//             isPublished: false
//         }
//     }, {new: true});
//     console.log(course);
// }

// updateCourse('course id from database');


//vid 19
async function removeCourse(id) {
    // const result = await Course.deleteMany({_id: id});
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

removeCourse('course id from database');




