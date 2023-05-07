const express=require("express");
const app=express();
app.use(express.json());
const SetHouse=require('../models/HouseData');


const Addhouse=async(req,res)=>{
    const data=await req.body;
    const housedata=data.housedata;
    const{Type,Address,City,Phonenum,Price}=housedata;
    const AuthorId=data.AuthorID;
    const addmore=data.addmore;

    const newhouse=await new SetHouse({Type:Type,Address:Address,City:City,Phonenum:Phonenum,Price:Price,AuthorId:AuthorId._id,AuthorName:AuthorId.Name,MoreDetails:addmore});
    newhouse.save().then(async(result)=>{
        if(result){
            const housedata=await SetHouse.find({AuthorId:AuthorId._id});
            res.send({msg:"Added successfully",status:200,userposts:housedata});
        }else{
            console.log(res.err);
        }
    }).catch((err)=>{
        res.send({msg:err.message});
        console.log(err.message);
    })
}

const Deletepost=async(req,res,id)=>{
    const postid=await req.params.id;
    // console.log(postid);
    const postdel=await SetHouse.findByIdAndDelete({_id:postid})
    .then(async(result)=>{
        if(result){
            const userposts=await SetHouse.find({AuthorId:result.AuthorId});
            res.send({msg:"Deleted",status:200,userposts:userposts});
        }
        else{
            res.send({msg:"Unable to delete"});
        }
    })
    .catch((err)=>{
        console.log(err.message);
        res.send({msg:"Failed to delete"});
    })
    
}

const searchhouse=async(req,res,search)=>{
     const mysearch=await req.params.search;
     const filterdata=await SetHouse.find({City:mysearch})
     .then((result)=>{
        res.send({filterdata:result,status:200});
     })
     .catch((err)=>console.log(err));
}

module.exports={Addhouse,Deletepost,searchhouse};