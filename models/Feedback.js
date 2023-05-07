const mongoose=require("mongoose");

const FeedSchema=new mongoose.Schema({
    gmail:{
        type:"string",
    },
    phonenum:{
        type:"string",
    },
    message:{
        type:"String"
    }
});

const Myfeed=mongoose.model("Feedback",FeedSchema);

module.exports=Myfeed;