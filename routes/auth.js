const express = require('express');
const router = express.Router();
const { getUsers } = require('../store/user')
const jwt = require('jsonwebtoken');
const { checkUserIsCorrect, createNewUser } = require('../store/auth');
require('dotenv').config();

router.post('/login', async (req, res) => {
  try {
    const data = req.body
    const currentUser = await checkUserIsCorrect(data);
    if(currentUser.length > 0){
      const userName = data.email
      const user = { email: userName };
      const accesToken = jwt.sign(user, process.env.ACCESS_TOKEN);
      res.json({
        status:'success',
        accesToken,
        currentUser
      });
    }
    else {
      res.status(401).send({message: 'Email Or Password is Incorrect'})
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post('/register', async (req, res) => {
  try {
    const data = req.body
    const currentUser = await createNewUser(data);
    if(currentUser.length > 0){
      const accesToken = jwt.sign(currentUser[0], process.env.ACCESS_TOKEN);
      res.json({
        status:'success',
        accesToken,
        currentUser
      });
    }
    else {
      res.status(401).send({message: 'Email Or Password is Incorrect'})
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;