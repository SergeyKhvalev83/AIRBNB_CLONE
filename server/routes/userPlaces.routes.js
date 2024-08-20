const express = require('express');
const jwt = require('jsonwebtoken');
const Router = express.Router();
const MyPlace = require('../models/place');

const jwtSecret = 'SergeyKatEv';

Router.get('/my-places', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;
    try {
      //find all my places
      const myPlaces = await MyPlace.find({
        owner: user.id,
      });
      res.status(200).json(myPlaces);
    } catch (err) {
      console.log('ERROR TO FIND ALL MY PLACES IN DB: ', err);
    }
  });
});

Router.post('/post-my-places', (req, res) => {
  // to get user id from token
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;
    try {
      const newPlace = await MyPlace.create({
        owner: user.id,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      res.json(newPlace);
    } catch (err) {
      console.log('ERROR TO CREATE NEW PLACE IN DB: ', err);
    }
  });
});

//to get place data and populate form with data to make updating info easier
Router.get('/my-place/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const place = await MyPlace.findById(id);
    res.status(200).json(place);
  } catch (err) {
    console.log(err);
  }
});

Router.put('/update-my-place/:id', async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  try {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      const place = await MyPlace.findById(id);

      if (place.owner.toString() === user.id) {
        const place = await MyPlace.findById(id);
        place
          .set({
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
          })
          .save();
        res.status(200).json({ message: 'OK' });
      }
    });
  } catch (err) {
    console.log('ERROR TO FIND MY CERTAIN PLACE: ', err);
  }
});

module.exports = Router;
