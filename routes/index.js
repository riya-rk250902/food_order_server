// user-signup/ user-login/ user -update/ user delete
// order - created/ order- cancelled
const express = require("express");
const router = express.Router();
const User = require("../models/signup");
const bcrypt = require("bcryptjs");
const authfile = require("../services/authentication");
const Food = require("../models/Food");
var salt = bcrypt.genSaltSync(10);

// routes
// for the home page
router.get("/", function (req, res) {
  return res.send("welcome to our homepage...");
});

//(signup) for user model so that we can do hashing
router.post("/signup", async (req, res) => {
try
{
  var hash = bcrypt.hashSync(req.body.password, salt);
  await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    useremail: req.body.useremail,
    phonenumber: req.body.phonenumber,
    password: hash,
  });
  return res.send("User has been successfully created");
}
catch(error)
{
  console.log(error);
}
});

//login
router.post("/login", async (req, res) => {
  try{
  const user = await User.findOne({ useremail: req.body.useremail });
  if (!user) {
    console.log("user not found");
    return res.send("User not found");
  }
  const check = bcrypt.compareSync(req.body.password, user.password);
  if (!check) {
    console.log("User password is not correct");
    return res.status(500).send("User password is not correct");
  }
  const token = authfile.gentoken(user._id);
  console.log("token generated");
  return res.send({Message:"you have successfully logged in",
     token:token,
    userid:user._id});
}
catch(error)
{
  console.log(error);
}
  //return res.send({ token: token });
});

//update user
router.post("/userupdate", async (req, res) => {
  try{
  const id = req.body.id;
  const updateUser = await User.findByIdAndUpdate(
    id,
    {
      password: req.body.password,
    },
    {
      new: true,
      runValidators: true,
    });
  //return res.send(updateUser);
  return res.send({Message:"user info has been updated",
 updatedInfo:updateUser
});
}
catch(error)
{
  console.log(error);
}
});

//delete a user
router.post("/delete", async (req, res) => {
  try{
  const id = req.body.id;
  await User.findByIdAndDelete(id);
  return res.send("User deleted successfully");
  }
  catch(errot)
  {
    console.log(error);
  }
});

//*************************************************************************************
//for food model
// create food information
router.post("/Food", async (req, res) => {
  try
  {
  await Food.create({
    orderid: req.body.orderid,
    foodname: req.body.foodname,
    quantity: req.body.quantity,
    itemorderd: req.body.itemorderd,
    itemdelivery: req.body.itemdelivery,
    nearme: req.body.nearme,
  });
  return res.send("your order has been generated");
}
catch(error)
{
  console.log(error);
}
});
 // find a food by id
router.get("/findById", async (req, res) => {
  try{
    const id = req.body.id;
    const food = await Food.findbyid(id);
    return res.send(food);
  }
  catch(error)
  {
    console.log(error);
  }
  });
// finding food by params
router.get("/findById/:id", async (req, res) => {
  try{
  const id = req.params.id; // to assess params
  const food = await Food.findbyid(id);
  return res.send(food);
  }
  catch(error)
  {
    console.log(error);
  }
});

// book your order
router.post("./placeorder/:id", async (req, res) => {
  try{
  const userid = req.body.id;
  const Foodid = req.params.id;
  const updateUser = await User.findByIdAndUpdate(
    userid,
    {
      //orderBooked: Foodid,
       $push: {orderBooked:Foodid}
      //$pull: {orderBooked:Foodid}
  },
    {
      new: true,
      runValidators: true,
    }
  );
  return res.send({Message: "your order has been placed successfully",
    Upadte: updateUser,
  });
}
 catch(error)
 {
  console.log(error);
 }
});
// cancel order
router.post("./cancel", async (req, res) => {
  try{
  const id = req.body.id;
  await Food.findByIdAndDelete(id);
  return res.send("your order has been cancelled");
  }
  catch(error)
  {
    console.log(error);
  }
});
router.get("/allitems", authfile.authenticationChecker, async (req, res) => {
  try {
    const data = await Food.find({});
    return res.send(data);
  } 
  catch (error) 
  {
    console.log(error);
    return res.send(error);
  }
});
module.exports = router;
