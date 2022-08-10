const mongoose = require("mongoose");

const Tache = new mongoose.Schema({
    titre:{type:String,required:true},
    description:{type:String},
    date_fin:{type:Date},
    prop:{type:String},
    priori:{type:String},
    etat:{type:String},
    piece_joint:String,
  
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true, ref:'User'
    },
    

        
})

module.exports=mongoose.model("Tache",Tache);