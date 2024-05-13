const mongoose = require('mongoose');

mongoose.connect(process.env.mongodb_URL)
.then(()=>{
    console.log('adminDb connected successfully...');
})

.catch(()=>{
    console.log('adminDb connection failed!!!');
})