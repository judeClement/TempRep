const express = require('express');
const adminlogRoutes = express.Router();
const adminlogSchema = require('../Model/Adminlog');
const jwt = require('jsonwebtoken');

adminlogRoutes.use(express.json());

// Route for login
adminlogRoutes.post('/adminlog', async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await adminlogSchema.findOne({ username });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found!" });
        }

        if (admin.password !== password) {
            return res.status(401).json({ message: "Login failed! Incorrect password." });
        }
        
        let payload = { username: username };
        let token = jwt.sign(payload, 'reactapp');

        // Send the token in the response
        return res.status(200).json({ message: "Login successful", token: token });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = adminlogRoutes;

