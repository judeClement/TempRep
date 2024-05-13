
const express = require('express');
const studentlogRouter = express.Router();
const studentlogSchema = require('../Model/studentSchema');
const jwt = require('jsonwebtoken');

studentlogRouter.use(express.json());

// Route for login
studentlogRouter.post('/studentlog', async (req, res) => {
    try {
        const { email, password, mark } = req.body;
        const student = await studentlogSchema.findOne({ email });

        if (!student) {
           
            return res.status(404).json({ message: "Student not found!" });
        }

        if (student.password !== password) {
            return res.status(401).json({ message: "Login failed! Incorrect password." });
        }

        if (student.mark < 50) {
            return res.status(401).json({ message: "Login failed! Student mark is less than 50." });
        }
        let payload = { email: email };
        let token = jwt.sign(payload, 'reactapp'); // Replace 'yourSecretKey' with a secret key of your choice
        return res.status(200).json({ message: "Login successful", token: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = studentlogRouter;
