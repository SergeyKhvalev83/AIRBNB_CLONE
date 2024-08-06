const express = require('express');
const jwt = require('jsonwebtoken')
const Router = express.Router();
const User = require('../models/user')

const jwtSecret = 'SergeyKatEv';


Router.get('/profile', (req, res) => {
  const { token } = req.cookies;
  console.log("CCC: ", token)

  if(token){
    jwt.verify(token, jwtSecret, {}, async (err, user)=>{
      if(err){
        throw err
      } else {
        console.log(user)
        const {name, email, _id} = await User.findById(user.id);
        res.json({name, email, _id})
      }
    })
  } else {
      res.json(null);

  }
});

module.exports = Router;
