
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/auth");


exports.isAuth = async (req,res,next)=>{
const token = req.header('authorization')

    try {

        if (!token){return res.status(400).send({errors:[{msg:"you are not authorized"}]})}
        var decoded = jwt.verify(token,process.env.secretOrKey)
        
        const user = await User.findById(decoded.id)
        req.user = user;
        next()
        
    } catch (error) {
        res.status(500).send('error server')
    }
}