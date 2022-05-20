const express = require('express')

const {Courses, validate} = require('../models/course')

const router = express.Router()

router.get('/', async (req, res) => {

    const course = await Courses.find().catch(err => console.log(err.message))

    res.send(course)
})

router.get('/:id', async (req, res) => {

    const course = await Courses.findById(req.params.id).catch(err => console.log(err.message))

    if (!course) return res.status(400).send('No course with the given ID')
    
    res.send(course)
})

router.post('/', async (req, res) => {

    const { error } = validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)
    
    const course = new Courses({
        name: req.body.name,
        courseCode: req.body.courseCode,
        semester: req.body.semester,
        level: req.body.level,
        teacher: req.body.teacher,
        department: req.body.department,
        faculty: req.body.faculty,
    })

    await course.save()

    res.send(course)
})

router.put('/:id', async (req, res) => {

    const { error } = validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const course = await Courses.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        courseCode: req.body.courseCode,
        semester: req.body.semester,
        level: req.body.level,
        teacher: req.body.teacher,
        department: req.body.department,
        faculty: req.body.faculty,

    }, { new: true }).catch(err => console.log(err.message))
    
    if (!course) return res.status(404).send('No course with the given ID')
    
    res.send(course)
})

router.delete('/:id', async (req, res) => {

    const course = await Courses.findByIdAndRemove(req.params.id).catch(err => console.log(err.message))

    if (!course) return res.status(404).send('No course with the given ID')
    
    res.send(course)
})

module.exports = router