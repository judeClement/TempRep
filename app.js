const express = require('express');
const morgan = require('morgan');
const cors=require('cors')
require('dotenv').config();

const studentlogRouter = require('./Routes/studentlogRoutes');
const studentlogDb = require('./Db/studentlogDb');
const adminlogRouter = require('./Routes/adminlogRoutes');
const adminlogDb = require('./Db/adminlogDb');
const sdashDb=require('./Db/sdashDb');
const sdashRouter=require('./Routes/sdashRoutes');
const adminRouter=require('./Routes/admindashRoutes');

const email=require('./Routes/email');
const upload=require('./Routes/upload');

const app = new express();
const PORT = process.env.PORT ;

app.use(morgan('dev'));
app.use(cors())
app.use('/api',studentlogRouter)
app.use('/api',adminlogRouter)
app.use('/api',adminRouter)
//for email
app.use('/api',email)
app.use('/api',sdashRouter)
app.use('/api',upload)

app.listen(PORT,()=>{
    console.log(`Server is up and running on port ${PORT}`);
})