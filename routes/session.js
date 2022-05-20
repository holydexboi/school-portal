const express = require('express')

const {Sessions, validate} = require('../models/session')

const router = express.Router()

router.get('/', async (req, res) => {

    const sessions = await Sessions.find().catch(err => console.log(err.message))

    res.send(sessions)
})

router.get('/:id', async (req, res) => {

    const session = await Sessions.findById(req.params.id).catch(err => console.log(err.message))

    if (!session) return res.status(400).send('No sessions with the given ID')
    
    res.send(session)
})

router.post('/', async (req, res) => {

    const { error } = validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)
    
    const session = new Sessions({
        year: req.body.year,
        
    })

    await session.save()

    res.send(session)
})

router.put('/:id', async (req, res) => {

    const { error } = validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const session =await Sessions.findByIdAndUpdate(req.params.id, {
        year: req.body.year,
        
    }, { new: true }).catch(err => console.log(err.message))
    
    if (!session) return res.status(404).send('No sessions with the given ID')
    
    res.send(session)
})

router.delete('/:id', async (req, res) => {

    const session = await Sessions.findByIdAndRemove(req.params.id).catch(err => console.log(err.message))

    if (!session) return res.status(404).send('No sessions with the given ID')
    
    res.send(session)
})

module.exports = router