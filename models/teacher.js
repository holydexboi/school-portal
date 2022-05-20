const Joi = require('joi')
const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')

const teacherSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 2, maxlength: 255, trim: true },
    lastName: { type: String, required: true, minlength: 2, maxlength: 255, trim: true },
    email: { type: String, required: true, minlength: 2, maxlength: 255, trim: true, unique: true},
    password: { type: String, required: true, minlength: 8, maxlength: 255, trim: true },
    staffId: { type: String, required: true, minlength: 10, maxlength: 10, trim: true },
    phoneNo: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
    isAdmin: Boolean
})

teacherSchema.methods.generateToken = function () {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtSecretToken'))
    return token
}
const Teachers = mongoose.model('Teacher', teacherSchema)


function validate({firstName, lastName, email, password, phoneNo, department, faculty}) {
    
    const schema = Joi.object({
        firstName: Joi.string().min(1).required(),
        lastName: Joi.string().min(1).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        phoneNo: Joi.string().required(),
        department: Joi.string().required(),
        faculty: Joi.string().required()
        
    })

    return schema.validate({firstName, lastName, email, password, phoneNo, department, faculty})
}

module.exports.validate = validate
module.exports.Teachers = Teachers