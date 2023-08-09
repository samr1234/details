const express = require('express');

const StudentDataRoute= express.Router();

const {studentRegister,getStudentData} = require('../Controllers/register')

StudentDataRoute.post('/register',studentRegister)
StudentDataRoute.get('/data',getStudentData)



module.exports = StudentDataRoute;