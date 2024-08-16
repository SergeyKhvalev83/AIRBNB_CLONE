const express = require('express');
const Router = express.Router();
const Place = require('../models/place');

Router.get('/certain-my-place/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const place = await Place.find({ _id: id });
    console.log(place);
    res.status(200).json(place[0]);
  } catch (err) {
    console.log(
      'SOMETHONG WENT WRONG DURING RETRIVE SPEC PLACE DATA FROM DB: ',
      err,
    );
  }
});

module.exports = Router;
