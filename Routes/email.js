const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const fs = require('fs');
const jwt = require('jsonwebtoken');

// Define the Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'amalajames1995@gmail.com',
    pass: 'tgow osei qypj ryaq',
  },
});

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

// Define the route to handle sending emails
router.post('/email',verifytoken, async (req, res) => {
  try {
    const { email } = req.body;

    // Read the PDF file
    const pdfAttachment = fs.readFileSync('./public/Docs/Mark.pdf');

    // Define email options
    const mailOptions = {
      from: 'amalajames1995@gmail.com',
      to: email,
      subject: 'Test email for nodemailer with PDF attachment',
      html: '<h1>Exit Test Results</h1>',
      attachments: [
        {
          filename: 'Mark.pdf',
          content: pdfAttachment,
          contentType: 'application/pdf'
        }
      ]
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent:', info.messageId);

    // Send response
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'An error occurred while sending the email' });
  }
});

module.exports = router;



















// const express = require('express');
// const router = express.Router();
// const nodemailer = require('nodemailer');

// // Define the Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: 'amalajames1995@gmail.com',
//     pass: 'tgow osei qypj ryaq',
//   },
// });

// // Define the route to handle sending emails
// router.post('/email', async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Read the PDF file
//     const pdfAttachment = fs.readFileSync('');

//     // Define email options
//     const mailOptions = {
//       from: 'amalajames1995@gmail.com',
//       to: email,
//       subject: 'Test email for nodemailer',
//       html: '<h1>Hello Nodemailer</h1>',
//     };

//     // Send email
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Message sent:', info.messageId);

//     // Send response
//     res.status(200).json({ message: 'Email sent successfully' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ error: 'An error occurred while sending the email' });
//   }
// });

// module.exports = router;
