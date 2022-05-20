const express = require('express')
const { Students, validate } = require('../models/student')
const _ = require('lodash')
const bcrypt = require('bcrypt')


const router = express.Router()

router.get('/', async (req, res) => {

    const students = await Students.find().catch(err => console.log(err.message))
    res.send(students)
})

router.get('/:id', async (req, res) => {

    const student = await Students.findById(req.params.id).catch((err) => console.log(err.message))

    if (!student) return res.status(404).send('No Student with the Given Id')
    
    res.send(student)
})

router.post('/', async (req, res) => {

    const { error } = validate(req.body)
    
    if (error) return res.status(400).send(error.details[0].message)

    const email = await Students.findOne({ email: req.body.email }).catch(err => console.log(err.message))
    if(email) return res.status(400).send('Student with the given email exist')

    const d = new Date()
    admissionYear = d.getFullYear() 

    let studentsCount = await Students.find().count().catch(err => console.log(err.message))
    studentsCount+=1
    const str = "" + studentsCount
    const pad = "0000"
    const genNumber = pad.substring(0, pad.length - str.length) + str
    
    let student = new Students({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password, phoneNo: req.body.phoneNo, level: req.body.level, matricNo: `${admissionYear}${genNumber}ST`, department: req.body.department, faculty: req.body.faculty})
    
    const salt = await bcrypt.genSalt(10)
    student.password = await bcrypt.hash(student.password, salt)

    await student.save()

    res.send(_.pick(student, ['_id', 'firstName', 'lastName', 'email', 'matricNo', 'phoneNo', 'level', 'department', 'faculty']))
})

router.put('/:id', async (req, res) => {

    const { error } = validate(req.body)
    
    if (error) return res.status(400).send(error.details[0].message)
    
    const student = await Students.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phoneNo: req.body.phoneNo,
        department: req.body.department,
        faculty: req.body.faculty
    }, { new: true }).catch(err => console.log(err.message))

    
    if (!student) return req.status(404).send('No Student with the given Id')
    
    res.send(_.pick(student, ['_id', 'firstName', 'lastName', 'email', 'matricNo', 'phoneNo', 'level', 'department', 'faculty']))
})

router.delete('/:id', async (req, res) => {

    const student = await Students.findByIdAndRemove(req.params.id).catch(err => console.log(err.message))

    if (!student) return res.status(404).send('No Student with given Id')
    
    res.send(student)
})

module.exports = router