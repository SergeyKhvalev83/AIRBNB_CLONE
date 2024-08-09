const express = require('express');
const jwt = require('jsonwebtoken');
const Router = express.Router();
const MyPlace = require('../models/place');

const jwtSecret = 'SergeyKatEv';

Router.post('/my-places', (req, res) => {
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
    } = req.body.placeData;
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
        });
        res.json(newPlace);
      } catch (err) {
        console.log('ERROR TO CREATE NEW PLACE IN DB: ', err);
      }
    });
});

module.exports = Router;
