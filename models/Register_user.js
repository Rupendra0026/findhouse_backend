const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");

const Myschema=new mongoose.Schema({
    Name:{
        type:"String",
        required:[true,"Name is required"],
    },
    Gmail:{
        type:"String",
        required:[true,"Gmail is required"],
        validate:[validator.isEmail,"gmail is invalid"],
        lowercase:true
    },
    Contact:{
        type:"String",
        minlength:[10,"Min length 10"],
        maxlength:[10,"Min length 10"],
        required:[true,"Contact number is required"]
    },
    Password:{
        type:"String",
        min:[6,"Min length has to be 6"],
        required:[true,"Password is required"],
    },
    Security_key:{
        type:"String",
        min:[4,"Min length has to be 4"],
        required:[true,"Security key is required"]
    },
    Date:{
        type:"Date",
        default:Date()
    },
    tokens:[
        {
            passkey:{
                type:"String"
            }
        }
    ]
});

Myschema.methods.generatelogtoken=async function(){
    try{
        let token=await jwt.sign({_id:this._id},process.env.secretkey);
        if(this.tokens){
            this.tokens.pop();
        }
        this.tokens=await this.tokens.concat({passkey:token});
        await this.save();
        return token;


    }catch(err){
        console.log(err);
    }
}

const Register_user= mongoose.model("Registered_users",Myschema);

module.exports=Register_user;
