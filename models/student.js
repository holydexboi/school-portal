const Joi = require('joi')
const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')

const studentSchema = new mongoose.Schema({

    firstName: { type: String, required: true, minlength: 2, maxlength: 255, trim: true },
    lastName: { type: String, required: true, minlength: 2, maxlength: 255, trim: true },
    email: { type: String, required: true, minlength: 2, maxlength: 255, trim: true, unique: true },
    password: { type: String, required: true, minlength: 8, maxlength: 255, trim: true },
    matricNo: { type: String, required: true, minlength: 10, maxlength: 10, trim: true },
    phoneNo: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now },
    level: {type: Number, required: true, min: 100, max: 600},
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
    
})

studentSchema.methods.generateToken = function () {
    const token = jwt.sign({_id: this._id}, config.get('jwtSecretToken'))
    return token
}
const Students = mongoose.model('Student', studentSchema)

function validate({firstName, lastName, email, password, phoneNo, level, department, faculty}) {
    
    const schema = Joi.object({
        firstName: Joi.string().min(1).required(),
        lastName: Joi.string().min(1).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        phoneNo: Joi.string().required(),
        level: Joi.number().required(),
        department: Joi.string().required(),
        faculty: Joi.string().required()
    })

    return schema.validate({firstName, lastName, email, password, phoneNo, level, department, faculty})
}

module.exports.Students = Students
module.exports.validate = validate