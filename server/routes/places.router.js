const express = require('express');
const Router = express.Router();
const MyPlace = require('../models/place');

Router.get('/places', async (req, res) => {
  try {
    const places = await MyPlace.find();
    res.status(200).json(places);
  } catch (err) {
    console.log('ERROR TO RETRIEVE ALL PLACES FROM DB: ', err);
  }
});

module.exports = Router;
