const dotenv=require('dotenv');
dotenv.config();

const express=require("express");
const app=express();
app.use(express.json());

const mongoose=require("mongoose");

const router=require('./serverroutes/server_routes.js');
app.use(router);

const cookieparser=require('cookie-parser');
app.use(cookieparser());

const cors=require("cors");
app.use(cors());


mongoose.connect(process.env.connectmongo,({ useNewUrlParser: true, useUnifiedTopology: true })).then(()=>{
    console.log("connected to the database");
})
app.get('/',(req,res)=>{
    res.send("home rent");
})

app.listen(process.env.PORT||5000,()=>{
    console.log("server running");
})
