const mongoose = require('mongoose')

const connectDB=async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
        })
        console.log('mongodb connection successfully')
    } catch (error) {
        console.log(error,"mongodb connection lost")
    }
}

module.exports = connectDB;