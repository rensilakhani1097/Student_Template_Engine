const router = require("express").Router();
var Register = require("../models/Register");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "AA"
const cookiparser= require("cookie-parser")
const authTokens = {};
router.use(cookiparser()    )
router.get("/register",(req,res)=>{
    res.render("register");
});
router.post("/register",async(req,res)=>{
    const {username,email,password}= req.body;
    try{
        const exisitingUser=await Register.findOne({email:email})
        if(exisitingUser)
        {
            res.status(201).send("User Already Exists")
        }
        const hashpassword = await bcyrpt.hash(password,10);

        const result = await Register.create({
            username:username,
            email:email,
            password:hashpassword
        })
        const token = jwt.sign({email:result.email,id:result._id},SECRET_KEY);
       // res.status(400).json({user:result,token:token});
        res.redirect("/");
    }
    catch(Error){
        console.log(Error);
    }

})
router.get("/login",(req,res)=>{
    res.render("login");
})   
router.post("/login",async (req,res)=>{
    const {username,password}= req.body;
    try
    {
        const existUser= await Register.findOne({username:username})
        if(!existUser){
            return res.status(400).send("User Not Found");
        }
        const matchPassword = await bcyrpt.compare(password,existUser.password);
        if(!matchPassword){
            return res.status(404).json({msg:"Invalid Creditials"})
        }
        const token = jwt.sign({email:existUser.email,id:existUser._id},SECRET_KEY);
        authTokens[token]=token;
        res.cookie('AuthToken', authTokens,1);
       // res.json({user:existUser,token:token});
       res.redirect("/")

    }catch(err){
        console.log(err)
    }
})   


module.exports= router