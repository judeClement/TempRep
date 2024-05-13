const mongoose = require('mongoose');

const schema = mongoose.Schema({
    email : String,
    password : String,
    mark : Number
})

const studentlogSchema = mongoose.model('studentCredential',schema);

module.exports = studentlogSchema;