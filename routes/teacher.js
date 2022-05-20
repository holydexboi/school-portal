const express = require('express')
const _ = require('lodash')
const bcrypt = require('bcrypt')

const { Teachers, validate } = require('../models/teacher')

const router = express.Router()


router.get('/', async (req, res) => {
    
    const teachers = await Teachers.find().catch(err => console.log(err.message))

    res.send(teachers)
})

router.get('/:id', async (req, res) => {

    const teacher = await Teachers.findById(req.params.id).catch((err) => console.log(err.message))

    if(!teacher) return res.status(404).send('Teacher with the given ID does not Exist')
    res.send(teacher)
})

router.post('/', async (req, res) => {    

    const { error } = validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const email = await Teachers.findOne({ email: req.body.email }).catch(err => console.log(err.message))
    if (email) return res.status(400).send('Student with the given email exist')
    
    const d = new Date()
    employedYear = d.getFullYear() 

    let teachersCount = await Teachers.find().count().catch(err => console.log(err.message))
    teachersCount+=1
    const str = "" + teachersCount
    const pad = "0000"
    const genNumber = pad.substring(0, pad.length - str.length) + str
    
    let teacher = new Teachers({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password, phoneNo: req.body.phoneNo, staffId: `${employedYear}${genNumber}LC`, department: req.body.department, faculty: req.body.faculty}) 
    
    const salt = await bcrypt.genSalt(10)
    teacher.password = await bcrypt.hash(teacher.password, salt)

    await teacher.save()
    res.send(_.pick(teacher, ['_id', 'firstName', 'lastName', 'email', 'staffId', 'phoneNo', 'department', 'faculty']))
    
})

router.put('/:id', async (req, res) => {

    const { error } = validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const teacher = await Teachers.findByIdAndUpdate(req.params.id, {

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phoneNo: req.params.phoneNo,
        department: req.body.department,
        faculty: req.body.faculty

    },
        {new: true}
    ).catch(err => console.log(err.message))

    if(!teacher) return res.status(404).send('Teacher with the given ID does not exist')
    

    res.send(_.pick(teacher, ['_id', 'firstName', 'lastName', 'email', 'staffId', 'phoneNo', 'department', 'faculty']))
})

router.delete('/:id', async (req, res) => {
    const teacher = await Teachers.findByIdAndRemove(req.params.id).catch(err => console.log(err.message))

    if (!teacher) return res.status(404).send('Teacher with given ID does not exist')

    res.send(teacher)
})


module.exports = router