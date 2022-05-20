const express = require('express')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const { Students } = require('../models/student')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/me', auth, async (req, res) => {
    
    const student = await Students.findById(req.user._id).select('-password')

    res.send(student)
})

router.post('/', async (req, res) => {

    const { error } = validate(req.body)
    
    if (error) return res.status(400).send(error.details[0].message)

    let student = await Students.findOne({ email: req.body.email }).catch(err => console.log(err.message))
    if(!student) return res.status(400).send('Invalid login details')
    
    const validatePassword = await bcrypt.compare(req.body.password, student.password)
    if (!validatePassword) return res.status(400).send('Invalid login details')

    const token = student.generateToken()
    
    res.header('auth-token', token)
})

function validate(student) {
    
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })

    return schema.validate(student)
}

module.exports = router