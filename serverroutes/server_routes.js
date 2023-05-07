const express=require("express");
const router=express.Router();
router.use(express.json());
const cookieparser=require("cookie-parser");
router.use(cookieparser());

const Maincheck=require("../middlewares/Maincheck");

const {Getfeedback}=require('../controllers/Feedback');
const {Addhouse,Deletepost,searchhouse}=require('../controllers/Houseevents');
const {Register_user,Login_user,checkk,Logout,Updateprofile}=require('../controllers/Authcontrols');


router.get('/logout',Logout);
router.get('/checkstatus',Maincheck,checkk)
router.post('/register_user',Register_user);
router.post('/loginuser',Login_user);
router.post('/feedback',Getfeedback);
router.post('/addhouse',Maincheck,Addhouse);
router.post('/updateprofile/:id',Maincheck,Updateprofile);
router.get('/deletepost/:id',Deletepost);
router.get('/searchhouse/:search',searchhouse);



module.exports=router;