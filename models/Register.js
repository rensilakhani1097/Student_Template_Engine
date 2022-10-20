require('../config/db');
const mongoose = require("mongoose");
const registerSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    password:{
        type:String,
        required:true
    }  
})
const Register = new mongoose.model("Register",registerSchema)
module.exports= Register;





