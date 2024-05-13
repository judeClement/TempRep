const express = require('express');
const router = express.Router();
const users = require('../Model/studentDash');
const jwt = require('jsonwebtoken');

router.use(express.json());

function verifytoken(req,res,next){
    const token = req.headers.token;
    try {
        if(!token) throw 'unauthorized access';
        let payload = jwt.verify(token,'reactapp');
        if(!payload) throw 'unauthorized access';
        next()
    } catch (error) {
        res.status(404).send('Caught an error')
    }
   
} 

router.post('/add', verifytoken, async (req, res) => {
    try {
        // Extract fields from request body
        const { name, phone, email, dob, batch, gender } = req.body;
        const existingUser = await users.findOne({ $or: [{ name }, { email }] });
        // If a similar entry exists, prevent duplicates
        if (existingUser) {
            console.log('Duplicate entry: A user with this email already exists.');

            return res.status(400).json({ error: 'Duplicate entry: A user with this email already exists.' });
        }

        // Create a new document using Mongoose model
        const newStudent = new users({
            name,
            phone,
            email,
            dob,
            batch,
            gender
        });

        // Save the document to the database
        const savedStudent = await newStudent.save();
        console.log(savedStudent);
        res.status(200).send({ message: "Exit form submitted" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred while saving data" });
    }
});

module.exports = router;
