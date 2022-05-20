const mongoose = require('mongoose')
const Joi = require('joi')

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty'}
})
const Departments = mongoose.model('Department', departmentSchema)

function validate({name, faculty}) {
    
    const schema = Joi.object({
        name: Joi.string().min(1).required(),
        faculty: Joi.string().required()
    })

    return schema.validate({name, faculty})
}

module.exports.validate = validate
module.exports.Departments = Departments