const express = require('express');
const Router = express.Router();
const Booking = require('../models/booking');
const jwt = require('jsonwebtoken');

const jwtSecret = 'SergeyKatEv';

Router.get('/all-bookings', async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) {
          throw err;
        } else {
          const bookings = await Booking.find({ booker: user.id }).populate(
            'placeId',
          );
          res.status(200).json(bookings);
        }
      });
    }
  } catch (err) {
    console.log('ERROR TO RETRIEVE ALL MY BOOKINGS FROM DB: ', err);
  }
});

Router.post('/booking', async (req, res) => {
  try {
    const {
      placeId,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      booker,
    } = req.body;
    const booking = await Booking.create({
      placeId,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      booker,
    });
    res.status(201).json(booking);
  } catch (err) {
    console.log('ERROR TO SAVE IN DB CURRENT BOOKING: ', err);
  }
});

module.exports = Router;
