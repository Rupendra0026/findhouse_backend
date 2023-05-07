const express=require("express");
const app=express();
app.use(express.json());
const dotenv=require("dotenv");
dotenv.config();
const jwt=require("jsonwebtoken"); 
//model
const Register=require('../models/Register_user');
const HouseData=require('../models/HouseData');

const Maincheck=async(req,res,next)=>{
    const token=await req.cookies.checktok;
    if(token){
        const verify=await jwt.verify(token,process.env.secretkey);
        const clientdata=await Register.findOne({_id:verify._id}).select('Name Gmail Contact');
        req.clientdata=clientdata;
        const userposts=await HouseData.find({AuthorId:verify._id});
        req.userposts=userposts;
    next();
    }
    else{
        res.send({msg:"unauthorised access"});
    }
}

module.exports=Maincheck;