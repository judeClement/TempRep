const express = require('express');
const router = express.Router();
const users = require('../Model/studentDash');
const jwt = require('jsonwebtoken');

router.use(express.json());

router.get('/students',async(req, res) => {
    try {
        const allStudents = await users.find(); // Fetch all students from the database
        res.status(200).json(allStudents); // Send the fetched students as a JSON response
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Internal server error' }); // Handle any errors that occur during the database query
    }
  });
  module.exports = router;