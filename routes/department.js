const express = require('express')

const {Departments, validate} = require('../models/department')

const router = express.Router()

router.get('/', async (req, res) => {

    const department = await Departments
        .find()
        .populate('faculty', 'name')
        .catch(err => console.log(err.message))

    res.send(department)
})

router.get('/:id', async (req, res) => {

    const department = await Departments.findById(req.params.id).catch(err => console.log(err.message))

    if (!department) return res.status(400).send('No department with the given ID')
    
    res.send(department)
})

router.post('/', async (req, res) => {

    const { error } = validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)
    
    const department = new Departments({
        name: req.body.name,
        faculty: req.body.faculty
    })

    await department.save()

    res.send(department)
})

router.put('/:id', async (req, res) => {

    const { error } = validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const department =await Departments.findByIdAndUpdate(req.params.id, { name: req.body.name, faculty: req.body.faculty }, { new: true }).catch(err => console.log(err.message))
    
    if (!department) return res.status(404).send('No department with the given ID')
    
    res.send(department)
})

router.delete('/:id', async (req, res) => {

    const department = await Departments.findByIdAndRemove(req.params.id).catch(err => console.log(err.message))

    if (!department) return res.status(404).send('No department with the given ID')
    
    res.send(department)
})

module.exports = router