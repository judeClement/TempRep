const mongoose = require('mongoose');
const schema = mongoose.Schema({
    username : String,
    password : String
})
const adminlogSchema = mongoose.model('adminCredential',schema);
module.exports = adminlogSchema;