const mongoose = require('mongoose')
const Joi = require('joi')


const courseSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    courseCode: { type: String, required: true, trim: true, unique: true },
    semester: { type: String, enum: ['First', 'Second'], required: true },
    level: { type: Number, min: 100, max: 600, required: true, trim: true},
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    
})

const Courses = mongoose.model('Course', courseSchema)

function validate({name, courseCode, semester, level, teacher, faculty, department}) {
    
    const schema = Joi.object({
        name: Joi.string().required(),
        courseCode: Joi.string().required(),
        semester: Joi.string().required(),
        level: Joi.number().required(),
        teacher: Joi.string().required(),
        faculty: Joi.string().required(),
        department: Joi.string().required()
    })

    return schema.validate({name, courseCode, semester, level, teacher, faculty, department})
}

module.exports.validate = validate
module.exports.Courses = Courses