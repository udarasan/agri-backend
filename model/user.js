const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        min:6,
        max:255
    },
    email: {
        type:String,
        required:true,
        min:6,
        max:255
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1024
    },
    role:{
        type:String,
        required:true,
        min:6,
        max:1024
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("User ", usersSchema);