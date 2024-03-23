const jwt=require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require("express-async-handler")

// const protect = asyncHandler(async(req,res,next)=>{
//     let token;
//     if(req.headers.authorization && 
//         req.headers.authorization.startsWith("Bearer")){
//         try {
//             token = req.headers.authorization.split(" ")[1];
//             const decoded = jwt.verify(token,process.env.SECRET_KEY);
//             console.log(decoded,"decoded")
//             console.log(User)
//             req.user = await User.findById(decoded.id).select("-password");
//             console.log(req.user)
//             next();
//             console.log("asd")
//         } catch (error) {
//             res.status(401);
//             throw new Error("not authorized, no token")
//         }
//     }
//     if(!token){
//         res.status(401);
//         throw new Error("not authorized, no token")
//     }
// })
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };