const Joi = require('joi')
const mongoose = require('mongoose')

const Sessions = mongoose.model('Session', new mongoose.Schema({
    year: { type: String, required: true, trim: true, unique: true }
}))

function validate({year}) {
    
    const schema = Joi.object({
        year: Joi.string().required()
    })

    return schema.validate({year})
}

module.exports.validate = validate
module.exports.Sessions = Sessions
