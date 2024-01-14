const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
         name:{
            type:String,
         },
         email:{
            type:String,
         },
         phone:{
            type:Number,
         },
         country:{
            type:String
         }
})
module.exports=mongoose.model("student",UserSchema)