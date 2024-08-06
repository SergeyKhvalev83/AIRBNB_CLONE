const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const jwtSecret = require('../../../');
const Router = express.Router();
const User = require('../../models/user');

const jwtSecret = 'SergeyKatEv';
const salt = bcrypt.genSaltSync(10);

Router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const passCompared = bcrypt.compareSync(password, user.password);
      if (passCompared) {
        console.log('HERE');
        const jwtToken =  jwt.sign(
          { email: user.email, id: user._id},
          jwtSecret,
        );
        res.status(200).cookie('token', jwtToken).json(user);
      } else {
        res.status(400).json('Incorrect pass');
      }
    } else {
      res.status(400).json('user NOT found');
    }
  } catch (err) {
    console.log('Error to post new user: ', err.message ? err.message : err);
    res.sendStatus(422);
  }
});

Router.post('/registry', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const bcrPass = bcrypt.hashSync(password, salt);
    const user = await User.create({
      name,
      email,
      password: bcrPass,
    });
    res.status(201).json(user);
  } catch (err) {
    console.log('Error to post new user: ', err.message ? err.message : err);
    res.status(422).json(err);
  }
});

module.exports = Router;
