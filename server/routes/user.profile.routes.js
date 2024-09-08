const express = require('express');
const jwt = require('jsonwebtoken');
const Router = express.Router();
const User = require('../models/user');

const jwtSecret = 'SergeyKatEv';

Router.get('/profile', (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) {
        throw err;
      } else {
        const { name, email, _id } = await User.findById(user.id);
        res.status(200).json({ name, email, _id });
      }
    });
  } else {
    res.status(401).json(null);
  }
});

module.exports = Router;
