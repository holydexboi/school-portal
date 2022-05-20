const express = require('express')

const {Faculties, validate} = require('../models/faculty')

const router = express.Router()

router.get('/', async (req, res) => {

    const faculty = await Faculties.find().catch(err => console.log(err.message))

    res.send(faculty)
})

router.get('/:id', async (req, res) => {

    const faculty = await Faculties.findById(req.params.id).catch(err => console.log(err.message))

    if (!faculty) return res.status(400).send('No faculty with the given ID')
    
    res.send(faculty)
})

router.post('/', async (req, res) => {

    const { error } = validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)
    
    const faculty = new Faculties({
        name: req.body.name
    })

    await faculty.save()

    res.send(faculty)
})

router.put('/:id', async (req, res) => {

    const { error } = validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const faculty =await Faculties.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true }).catch(err => console.log(err.message))
    
    if (!faculty) return res.status(404).send('No faculty with the given ID')
    
    res.send(faculty)
})

router.delete('/:id', async (req, res) => {

    const faculty = await Faculties.findByIdAndRemove(req.params.id).catch(err => console.log(err.message))

    if (!faculty) return res.status(404).send('No faculty with the given ID')
    
    res.send(faculty)
})

module.exports = router