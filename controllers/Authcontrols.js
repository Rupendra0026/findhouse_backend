const express=require("express");
const bcrypt=require("bcrypt");
const app=express();
app.use(express.json());
const cookieparser=require("cookie-parser");
app.use(cookieparser());
const jwt=require("jsonwebtoken");



//calling models
const Register=require("../models/Register_user");
const housedata=require('../models/HouseData');






//controllers 
//registeruser
const Register_user=async(req,res)=>{
    const getdata=await req.body;
    const{name,email,contact,password,secretkey}=getdata;
    const check_gmail=await Register.findOne({Gmail:email});
        if(check_gmail){
            res.send({msg:"Gmail already exists"});
        }
        else{
            const hashpass=await bcrypt.hash(password,10);
            const hashsecurity=await bcrypt.hash(secretkey,10);
            const user_data=new Register({Name:name,Gmail:email,Contact:contact,Password:hashpass,Security_key:hashsecurity});
                user_data.save()
                .then((result)=>{
                    if(result){
                        res.send({status:200,msg:"Registered successfully"});
                    }
                    else{
                        res.send({msg:"Failed to register"});
                    }
                })
                .catch(err=>{
                    res.send({msg:"Enter valid details"});
                })
            
        }
}

//loginuser
const Login_user=async(req,res)=>{
    const logdata=await req.body;
    const {gmail,password}=logdata;
    const checklog=await Register.findOne({Gmail:gmail});
    if(checklog){
        const passcheck=await bcrypt.compare(password,checklog.Password);
        if(passcheck){
            const token=await checklog.generatelogtoken();
            if(token){
                res.cookie('checktok',token,{httpOnly:true,expire:360000+Date.now()});
                const clientdata=await Register.findOne({Gmail:gmail}).select('Name Gmail Contact');
                res.send({msg:"Logged in",status:200,user:true,userdata:clientdata});
            }
            else{
                res.send({msg:"unable to login"});
            }
        }
        else{
            res.send({msg:"Invalid credentials"});
        }
    }
    else{
        res.send({msg:"User doesnt exists"});
    }

}


const checkk=async(req,res)=>{
    const Allposts=await housedata.find();
    res.send({status:200,clientdata:req.clientdata,user:true,userposts:req.userposts,Allposts:Allposts});
}
const Logout=async(req,res)=>{
    const x=res.clearCookie("checktok");
    if(x){
        res.send({status:200,msg:"Logged out"});
    }
    else{
        res.send({msg:"Unable to logout"});
    }
}

const Updateprofile=async(req,res,id)=>{
    const authid=await req.params.id;
    const data=await req.body.data;
    const{Name,Gmail,Contact,OldPassword,Password,OldSecuritykey,Securitykey}=data;
    const Findid=await Register.find({_id:authid});
    const passlen=Password.length;
    const seclen=Securitykey.length;
    if(passlen==0 && seclen==0){
        const updatedata=await Register.findByIdAndUpdate({_id:authid},{
            $set:{
                Name:Name,
                Gmail:Gmail,
                Contact:Contact
            }
        }).then(async(result)=>{
            if(result){
                res.send({msg:"Data updated M",status:200});
            }
            else{
                res.send({msg:"Unable to update"});
            }
        }).catch((err)=>{
            res.send({msg:err.message});
            // console.log(res.message);
        })
    }
    else{
        const passcheck=await bcrypt.compare(OldPassword,Findid[0].Password);
        const securitycheck=await bcrypt.compare(OldSecuritykey,Findid[0].Security_key);
        if(Password.length>0 && Securitykey.length>0 && passcheck && securitycheck){
            const newpass=await bcrypt.hash(Password,10);
            const newkey=await bcrypt.hash(Securitykey,10);
            const updatedata=await Register.findByIdAndUpdate({_id:authid},{
                $set:{
                Name:Name,
                Gmail:Gmail,
                Contact:Contact,
                Password:newpass,
                Security_key:newkey
                }
            }).then(async(result)=>{
                if(result){
                    res.send({msg:"Data updated all",status:200});
                }
                else{
                    res.send({msg:"Unable to update"});
                }
            }).catch((err)=>{
                res.send({msg:err.message});
                // console.log(res.message);
            })
        }
        else if(Password.length>0 && passcheck && Securitykey.length==0 ){
            const newpass=await bcrypt.hash(Password,10);
            const updatedata=await Register.findByIdAndUpdate({_id:authid},{
                $set:{
                Name:Name,
                Gmail:Gmail,
                Contact:Contact,
                Password:newpass,
                }
            }).then(async(result)=>{
                if(result){
                    res.send({msg:"Data updated pass",status:200});
                }
                else{
                    res.send({msg:"Unable to update"});
                }
            }).catch((err)=>{
                res.send({msg:err.message});
                // console.log(res.message);
            })
        }
        else if(Securitykey.length>0 && securitycheck && Password.length==0){
            const newkey=await bcrypt.hash(Securitykey,10);
            const updatedata=await Register.findByIdAndUpdate({_id:authid},{
                $set:{
                Name:Name,
                Gmail:Gmail,
                Contact:Contact,
                Security_key:newkey
                }
            }).then(async(result)=>{
                if(result){
                    res.send({msg:"Data updated key",status:200});
                }
                else{
                    res.send({msg:"Unable to update"});
                }
            }).catch((err)=>{
                res.send({msg:err.message});
                // console.log(res.message);
            })
        }
        else{
            res.send({msg:"Inavlid Password or Security key",status:400});
        }
    }

}

module.exports={Register_user,Login_user,checkk,Logout,Updateprofile};
