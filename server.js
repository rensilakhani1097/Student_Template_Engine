const express = require("express");
const multer = require("multer");
var app = express()
const body_parser = require("body-parser");
const path = require("path");
const hbs = require("hbs");
const auth = require("./routers/auth");
const student_router = require("./routers/router")
app.set("view engine", "hbs");
app.set('views', "./views");
app.use(body_parser.json())

app.use(express.static('uploads'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use("/",auth);
app.use("/",student_router);
app.use(body_parser.urlencoded({
    extended: true
}));

var Student = require("./models/studentmodel");
require("./config/db");


app.listen(8000, () => {
    console.log(`server listening on 8000`);
})