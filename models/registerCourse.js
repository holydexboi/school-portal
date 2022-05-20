const mongoose = require('mongoose')
const Joi = require('joi')


const RegisterCourse = mongoose.model('RegisterCourse', new mongoose.Schema({

    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
    semester: { type: String, enum: ['First', 'Second'] },
    session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    test: { type: Number, max: 40},
    exam: { type: Number, max: 60 },
    grade: { type: String, enum: ['A', 'B', 'C', 'D', 'E', 'F'] }
    
}))

function validate(register) {
    
    const schema = Joi.object({
        
        student: Joi.string().required(),
        semester: Joi.string().required(),
        session: Joi.string().required(),
        course: Joi.string().required(),
        test: Joi.number(),
        exam: Joi.number(),
        grade: Joi.number()


    })

    schema.validate(register)
}

module.exports.validate = validate
module.exports.RegisterCourse = RegisterCourse