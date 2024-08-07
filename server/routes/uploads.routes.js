const express = require('express');
const path = require('path');
const Router = express.Router();
const imgloader = require('image-downloader');
const Upload = require('../models/upload');

Router.post('/upload-by-link', (req, res) => {
  const { link } = req.body;
  const newFileName = 'photo'+Date.now() + '.jpg';
  const roopPath = path.resolve(__dirname,'../')
  const fullPath = path.join(roopPath, 'uploads', newFileName);
  imgloader
    .image({
      url: link,
      dest: fullPath,
    })
    .then(({ filename }) => {
      console.log(`Image saved to: ${newFileName}`);
    });

  res.status(201).json(newFileName);
});

module.exports = Router;
