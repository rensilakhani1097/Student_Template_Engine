require('../config/db');
const mongoose = require("mongoose");
const studentschema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    image:String,
    m1:{
        type:Number,
        required:true
    },
    m2:{
        type:Number,
        required:true
    },
    m3:{
        type:Number,
        required:true
    },
    total:{
        type:Number
    },
    per:{
        type:Number
    }
})

const Student =new mongoose.model("Student",studentschema)
module.exports= Student
