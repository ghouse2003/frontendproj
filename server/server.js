const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const authRoutes = require('./auth');
const app = express();

app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Cloudinary Configuration (replace with your own credentials)
cloudinary.config({
  cloud_name: 'YOUR_CLOUD_NAME',
  api_key: 'YOUR_API_KEY',
  api_secret: 'YOUR_API_SECRET'
});

// Multer storage setup
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize Multer
const upload = multer({
  storage: storage
}).single('file');

// File Upload Route
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Upload to Cloudinary
    cloudinary.uploader.upload(req.file.path, (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      // Remove the file from local storage after uploading to Cloudinary
      fs.unlinkSync(req.file.path);

      res.json({
        message: 'File uploaded successfully!',
        url: result.url, // Cloudinary image URL
        fileType: path.extname(req.file.originalname) // File type (extension)
      });
    });
  });
});

// Authentication Routes
app.use('/auth', authRoutes);

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
