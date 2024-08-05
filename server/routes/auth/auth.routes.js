const express = require("express")
const Router = express.Router();
const bcrypt = require('bcryptjs')
const User = require("../../models/user")

const salt = bcrypt.genSaltSync(10)

Router.post('/registry', async (req, res)=>{
  try{
    const{name, email, password} = req.body;
    console.log(name, email, password)
    const bcrPass = bcrypt.hashSync(password, salt)
    const user = await User.create({
      name, email, password: bcrPass
    })

    res.status(201).json(user)

  }catch(err){
    console.log("ERROR WITH REGISTRATION: ", err)
  }


})


module.exports = Router;