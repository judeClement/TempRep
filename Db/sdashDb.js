const mongoose=require('mongoose');
mongoose.connect(process.env.mongodb_url)
.then(()=>{
    console.log("Sdash-Db connected")
    
})
.catch((err)=>{
    console.log(err);
})