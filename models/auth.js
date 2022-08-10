const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name:String,
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    pic:String,
    role:{type:String,enum:["admin","user"] ,default:"user"},
    desc:String

})

module.exports=mongoose.model("User",User);