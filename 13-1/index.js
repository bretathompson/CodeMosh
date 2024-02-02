
const mongoose = require('mongoose');
const Joi = require('joi');
const fs = require('fs');
mongoose.connect('mongodb://localhost/otech-assignments', {useNewUrlParser: true, useUnifiedTopology: true});

const studentSchema = mongoose.Schema({
    StudentID: {type: Number, required: true},
    FirstName: {type: String, required: true},
    LastName: {type: String, required: true},
    Phone: {type: String, required: true, minlength: 12, maxlength: 12},
    StudentStartDate: {type: Date, required: true},
    Certificates: {type: [String], required: true, enum: ['Information Technology', 'Graphics and Design', 'Web Development', 'Software Development']},
    ClassRoomNumber: {type: String, required: true},
    ClassTitle: {type: String, required: true},
    ClassTimes: {type: [Number], required: true, validate: {
        validator: function (array) {
            return array.length > 0;
        },
            message: 'ClassTimes array must have at least one number'
    }},
    ProgressScheduled: Number,
    ProgressCompleted: {type: Number, required: function () {
        return this.ProgressScheduled;
    }},
    ProgressPercent: {type: Number, required: function () {
        return this.ProgressScheduled;
    }}
});

const Student = mongoose.model('Student', studentSchema);

const schema = Joi.object({
    StudentID: Joi.number().required(),
    FirstName: Joi.string().required(),
    LastName: Joi.string().required(),
    Phone: Joi.string().required().min(12).max(12),
    StudentStartDate: Joi.date().required(),
    Certificates: Joi.array().required().items(Joi.string().valid('Information Technology', 'Graphics and Design', 'Web Development', 'Software Development')),
    ClassRoomNumber: Joi.string().required(),
    ClassTitle: Joi.string().required(),
    ClassTimes: Joi.array().required().items(Joi.number().min(1)),
    ProgressScheduled: Joi.number(),
    ProgressCompleted: Joi.number().when('ProgressScheduled', {
        is: true,
        then: Joi.required()
    }),
    ProgressPercent: Joi.number().when('ProgressScheduled', {
        is: true,
        then: Joi.required()
    })
});

const addNewStudent = async (studentData) => {
    const { error, value } = schema.validate(studentData);
    
    if (error) {
        console.log(error.message);
        return;
    }

    const newStudent = new Student(value);

    try {
        const result = await newStudent.save();
        console.log('Student successfully created:');
        console.log(result);
    } catch (ex) {
        console.log(ex.message);
    }
};

const importStudents = async () => {
    try {
        const students = JSON.parse(fs.readFileSync('student-data.json', 'utf-8'));

        for (const studentData of students) {
            delete studentData._id;
            await addNewStudent(studentData);
        }
    } catch (error) {
        console.log(error);
    }
};
importStudents();

const newStudentData = {
    StudentID: 123,
    FirstName: 'John',
    LastName: 'Doe',
    Phone: '123456789012',
    StudentStartDate: new Date(),
    Certificates: ['Information Technology'],
    ClassRoomNumber: 'A101',
    ClassTitle: 'Web Development',
    ClassTimes: [1, 2, 3],
    ProgressScheduled: 10,
    ProgressCompleted: 5,
    ProgressPercent: 50
};

addNewStudent(newStudentData);

