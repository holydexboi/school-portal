const mongoose = require('mongoose')
const Joi = require('joi')

const facultySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true }
    
})

const Faculties = mongoose.model('Faculty', facultySchema)

function validate({name}) {
    
    const schema = Joi.object({
        name: Joi.string().min(1).required(),
    })

    return schema.validate({name})
}

module.exports.validate = validate
module.exports.Faculties = Faculties
