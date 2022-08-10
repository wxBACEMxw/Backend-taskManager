const User = require("../models/auth")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');


exports.SignUp=  async(req,res)=>{

    const {name,email,password,pic,role}=req.body
    try {

    const user = new User(req.body)
   
   // verify email if exist or no 
    const founduser= await User.findOne({email})
   
    if(founduser) {return res.status(400).send({errors:[{msg:'user already exists'}]})}
   // crypt password
    const salt=10
    const hashedpassword=bcrypt.hashSync(password,salt)
 
    user.password=hashedpassword
   // get token
    const payload={id:user._id}
    const token=jwt.sign(payload,process.env.SecretOrKey)
    
    // send new user
       await user.save()
       
        res.status(200).send({msg:"register with succes",user,token})
    } catch (error) {
         res.status(500).send({errors:[{msg:'could not register'}]})
     
    }
    } 

    exports.SignIn=async(req,res)=>{
const {email,password,role}=req.body
        try {
            
            const found=   await User.findOne({email})
            //verify email if true or no
            if (!found) {return res.status(400).send({errors:[{msg:'bad credentials'}]}) }
            // validation password
            const match=  await bcrypt.compare(password,found.password)
            if (!match) {return res.status(400).send({errors:[{msg:'bad credentials'}]}) }
            // generate token
           const payload={id:found._id}
           const token=jwt.sign(payload,process.env.SecretOrKey)
            //login 
            res.status(200).send({msg:'login with succes',found,token})

            

        } catch (error) {
            res.status(500).send({errors:[{msg:'could not login',error}]})
        }
    }
    exports.GetUser = async(req,res)=>{
        try {
            const listOfUsers = await User.find({role:"user"});
            res.status(200).send({msg:"list of users",listOfUsers});

        } catch (error) {
            res.status(500).send({msg:"could not get users",error});
        }
    }
    exports.deleteUser = async (req,res)=>{
        const {id}=req.params
        try {
            const userDeleted = await User.findByIdAndDelete(id);
            res.status(200).send({msg:"user deleted",userDeleted});
            
        } catch (error) {
            res.status(500).send({msg:"could not delete user",error});
        }
    }
    exports.AddUser = async(req,res)=>{
        const {name,email,password,pic,role}=req.body
    try {

    const user = new User(req.body)
   
   // verify email if exist or no 
    const founduser= await User.findOne({email})
   
    if(founduser) {return res.status(400).send({errors:[{msg:'user already exists'}]})}
   // crypt password
    const salt=10
    const hashedpassword=bcrypt.hashSync(password,salt)
 
    user.password=hashedpassword
   // get token
    const payload={id:user._id}
    const token=jwt.sign(payload,process.env.SecretOrKey)
    
    // send new user
       await user.save()
       
        res.status(200).send({msg:"register with succes",user,token})
    } catch (error) {
         res.status(500).send({errors:[{msg:'could not register'}]})
     
    }

    }