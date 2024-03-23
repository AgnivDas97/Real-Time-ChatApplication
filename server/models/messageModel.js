const mongoose = require("mongoose");

// const messageModel = mongoose.Schema({
//     send:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
//     contant:{type:String,trim:true},
//     chat:{type:mongoose.Schema.Types.ObjectId,ref:"Chat"},
// },
// {
//     timestamps:true,
// })
const messageSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message",messageSchema)
module.exports=Message