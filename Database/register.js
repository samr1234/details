const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({


    name:String,
    email:String,
    contact:String,
    degree:String,
    branch:String,
    passingYear:String,
    collegeName:String
})

const register = mongoose.model("register",registerSchema)
module.exports = register;