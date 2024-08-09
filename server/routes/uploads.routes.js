const express = require('express');
const imgloader = require('image-downloader');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Router = express.Router();

const photosMiddleware = multer({
  dest: 'uploads',
});

Router.post('/upload-by-link', (req, res) => {
  const { link } = req.body;
  const newFileName = 'photo' + Date.now() + '.jpg';
  const roopPath = path.resolve(__dirname, '../');
  const fullPath = path.join(roopPath, 'uploads', newFileName);
  imgloader
    .image({
      url: link,
      dest: fullPath,
    })
    .then(({ filename }) => {
      console.log(`Image saved to: ${newFileName}`);
      res.status(201).json(newFileName);
    });
});

Router.post('/uploads', photosMiddleware.array('photos', 100), (req, res) => {
  try {
    const { files } = req;

    const arraOfRanemedPhotos = [];
    for (let each of files) {
      const { path } = each;
      let newPath = path + '.jpg';
      fs.renameSync(each.path, newPath);
      arraOfRanemedPhotos.push(newPath.replace('uploads\\', ""));
    }
    res.json(arraOfRanemedPhotos);
  } catch (err) {
    console.log('ERROR TO UPLOAD FILE FROM DEVICE: ', err);
  }
});

module.exports = Router;
