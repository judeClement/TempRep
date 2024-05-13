const mongoose = require('mongoose');

mongoose.connect(process.env.mongodb_URL)
.then(()=>{
    console.log('studentlogDb connected...');
})

.catch(()=>{
    console.log('studentlogDb connection failed!!!');
})