const asyncHandler = require('express-async-handler');
const  User = require('../../models/userModel');
const generateToken = require('../config/generateToken');


//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async(req,res)=>{
    console.log("registerUser1")
    const {name,email,password,pic}=req.body
    if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
    }
    console.log("registerUser2")
    const userExists = await User.findOne({ email });
     console.log("registerUser3")
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
 console.log(name,email,password,pic,"registerUser4")
    const user = await User.create({
        name,
        email,
        password,
        pic,
    });
 console.log("registerUser5")
    if (user) {
        res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
        });
         console.log(user,"registerUser6")
    } else {
        res.status(400);
        console.log(user,"registerUser7")
        throw new Error("User not found")
    }
})


const authUser = asyncHandler(async(req,res)=>{
    console.log("test 35")
    const{email,password}=req.body
    const user = await User.findOne({email})
    console.log(user,"test 38")
    if(user && (await user.matchPassword(password))){
        console.log("line 40")
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id),
        })
    }else{
        res.status(400);
        throw new Error('Invaild credential')
    }
})

const allUsers = asyncHandler(async (req, res) => {
    console.log(req,res,"allUsers1")
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
    console.log(keyword,"allUsers2")
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
   console.log(users,"allUsers3")
  res.send(users);
});

module.exports = {registerUser,authUser,allUsers}