// user-signup/ user-login/ user -update/ user delete
// order - created/ order- cancelled
const express = require("express");
const router = express.Router();
const User = require("../models/signup");
const bcrypt=require("bcryptjs");
const authfile = require("../services/authentication");
const Food = require("../models/Food");
var salt = bcrypt.genSaltSync(10);

// routes
// for the home page
router.get("/", function(req,res){
return res.send("welcome to our homepage...");
});

//(signup) for user model so that we can do hashing
router.post("/signup", async(req,res) =>{
    
    var hash = bcrypt.hashSync(req.body.password, salt);
    await User.create({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        useremail: req.body.useremail,
        phonenumber:req.body.phonenumber,
        password: hash,
    });
    return res.send("User has been successfully created");
});

//login
router.post("/login", async(req,res) => {
    const user = await User.findOne({ useremail: req.body.useremail});
    if(!user)
    {
       console.log("user not found");
        return res.send("User not found");
    }
    const check = bcrypt.compareSync(req.body.password, user.password); 
    if(!check)
    {
        console.log("User password is not correct");
        return res.status(500).send("User password is not correct");
    }
    const token= authfile.gentoken(user._id);
    console.log("token generated");
    return res.send({token:token});
});


 
 //update user
 router.post("/userupdate" , async(req,res) => {
     const id = req.body.id;
     const updateUser = await User.findByIdAndUpdate(
         id,
         {
             password: req.body.password,
         },
         {
             new: true,
             runValidators: true,
         }
     );
 
     return res.send(updateUser);
  });
  //delete a user
router.post("/delete" , async(req,res) => {
    const id = req.body.id;
    await User.findByIdAndDelete(id);
    
    return res.send("User deleted successfully");
 });

 //*************************************************************************************
 //for food model
 router.post("./Food", async(req,res) =>{
 await Food.create({
    orderid:req.body.orderid,
    foodname:req.body.foodname,
    quantity:req.body.quantity,
    itemorderd:req.body.itemorderd,
    itemdelivery:req.body.itemdelivery,
    nearme: req.body.nearme
 });
 return res.send("your order has been booked");
 });

 // finding food by params
 router.get("/findById/:id", async(req,res )=>{
    const id= req.params.id; 
    const food=await food.findbyid(id);
    return res.send(food);
 });


 // book your order
 router.post("./placeorder/:id", async(req,res)=>{
 const userid= req.body.id;
 const Foodid= req.params.id;
 const updateUser= await User.findByIdAndUpdate(
    userid,
    {
        orderBooked: Foodid
    },
    {
        new: true,
        runValidators:true,
    }
 );
 return res.send({
    Message: "your order has been placed successfully",
    Upadte:updateUser
 });
 });
 // cancel order
 router.post("./cancel", async(req,res) =>{
    const id= req.body.id;
    await Food.findByIdAndDelete(id);
    return res.send("your order has been cancelled");
 });
 router.get("/allitems",authfile.authenticationChecker,async(req,res) =>{
    try {
        const data =await food.find({});
    return res.send(data);
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
 });


  module.exports = router;