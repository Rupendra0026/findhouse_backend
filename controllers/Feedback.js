const express=require("express");
const app=express();

const Feed=require('../models/Feedback');
app.use(express.json());
const Getfeedback=async(req,res)=>{
    const data=await req.body.Feedback;
    const{gmail,phonenum,message}=data;
    const newfeed=await new Feed({gmail:gmail,phonenum:phonenum,message:message});
    newfeed.save().then((ress)=>{
        if(ress){
            // console.log(res);
            // console.log("data saved");
            res.send({msg:"Feedback sent"});
        }
        else {
            console.log("data not saved");
        }
    }).catch((err)=>{
        res.send({msg:"Unable to send Feedback"});
        console.log(err);
    })
    
}


module.exports={Getfeedback};