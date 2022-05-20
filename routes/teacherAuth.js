const express = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const Joi = require('joi')
const { Teachers } = require('../models/teacher')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/me', auth, async (req, res) => {
    
    const teacher = await Teachers.findById(req.user._id).select('-password')

    res.send(teacher)
})

router.post('/', async (req, res) => {

    const { error } = validate(req.body)
    
    if (error) return res.status(400).send(error.details[0].message)

    let teacher = await Teachers.findOne({ email: req.body.email }).catch(err => console.log(err.message))
    if(!teacher) return res.status(400).send('Invalid login details')
    
    const validatePassword = await bcrypt.compare(req.body.password, teacher.password)
    if (!validatePassword) return res.status(400).send('Invalid login details')
    
    const token = teacher.generateToken()
    
    res.header('auth-token', token)
})

function validate({email, password}) {
    
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })

    return schema.validate({email, password})
}

module.exports = router