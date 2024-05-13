const express = require('express');
const cors = require('cors');
const multer = require('multer');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.use(cors());
router.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './public/Docs');
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

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

router.post('/upload', verifytoken, upload.single('file'), (req, res) => {
  if (req.file) {
    console.log('File uploaded successfully');
    res.status(200).send('success');
  } else {
    console.log('Failed to upload file');
    res.status(500).send('error');
  }
});

module.exports = router;

