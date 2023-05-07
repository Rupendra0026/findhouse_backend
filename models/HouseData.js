const mongoose=require("mongoose");

const HouseSchema=new mongoose.Schema({
    Type:{
        type:"String",
        require:true
    },
    Address:{
        type:"String",
        require:true,
    },
    City:{
        type:"String",
        required:true,
        lowercase:true
    },
    Phonenum:{
        type:"String",
        required:true,
        minlength:[10,"Min length 10"],
        maxlength:[10,"Max length 10"],
    },
    Price:{
        type:"Number",
        required:true,
    },
    AuthorId:{
        type:"String",
        required:true
    },
    AuthorName:{
        type:"String",
        required:true
    },
    MoreDetails:[],

});
const SetHouse=mongoose.model("HouseDatas",HouseSchema);
module.exports=SetHouse;