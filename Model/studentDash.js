const mongoose=require('mongoose');
const schema=mongoose.Schema({
    name:String,
    phone:Number,
    email:String,
    dob:Date,
    batch:String,
    gender:String
  
});

const sdashModel=mongoose.model('sdash',schema); 
module.exports=sdashModel;