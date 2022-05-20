const express = require('express')

const {RegisterCourse, validate} = require('../models/registerCourse')

const router = express.Router()

router.get('/', async (req, res) => {

    const registers = await RegisterCourse.find().catch(err => console.log(err.message))

    res.send(registers)
})

router.get('/:id', async (req, res) => {

    const register = await RegisterCourse.findById(req.params.id).catch(err => console.log(err.message))

    if (!register) return res.status(400).send('No register with the given ID')
    
    res.send(register)
})

router.post('/', async (req, res) => {

    const { error } = validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)
    
    const register = new RegisterCourse({
        semester: req.body.semester,
        session: req.body.session,
        course: req.body.course,
        test: req.body.test,
        exam: req.body.exam,
        grade: req.body.grade
    })

    await register.save()

    res.send(register)
})

router.put('/:id', async (req, res) => {

    const { error } = validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const register =await RegisterCourse.findByIdAndUpdate(req.params.id, {
        semester: req.body.semester,
        session: req.body.session,
        course: req.body.course,
        test: req.body.test,
        exam: req.body.exam,
        grade: req.body.grade
    }, { new: true }).catch(err => console.log(err.message))
    
    if (!register) return res.status(404).send('No register with the given ID')
    
    res.send(register)
})

router.delete('/:id', async (req, res) => {

    const register = await RegisterCourse.findByIdAndRemove(req.params.id).catch(err => console.log(err.message))

    if (!register) return res.status(404).send('No register with the given ID')
    
    res.send(register)
})

module.exports = router