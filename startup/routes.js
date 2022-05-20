const express = require('express')
const error = require('../middleware/error')
const teacher = require('../routes/teacher')
const student = require('../routes/student')
const course = require('../routes/course')
const department = require('../routes/department')
const faculty = require('../routes/faculty')
const register = require('../routes/registerCourse')
const session = require('../routes/session')
const studentAuth = require('../routes/studentAuth')
const teacherAuth = require('../routes/teacherAuth')

module.exports = function (app) {

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(error)
    app.use('/teacher', teacher)
    app.use('/student', student)
    app.use('/department', department)
    app.use('/faculty', faculty)
    app.use('/register', register)
    app.use('/course', course)
    app.use('/session', session)
    app.use('/auth/student', studentAuth)
    app.use('/auth/teacher', teacherAuth)

}