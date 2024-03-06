const express = require('express');
const router = express.Router();
const { getUsers, getNormalUsers, createUser, updateUser, checkUserIsExists, getUser, deleteUser } = require('../store/user')

router.get('/get', async (req, res) => {
  const { userId } = req.query
  try {
    const data = await getUsers(userId)
    res.json(data)
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/user', async (req, res) => {
  const { userId } = req.query
  try {
    const data = await getUser(userId)
    res.json(data)
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/normal', async (req, res) => {
  try {
    const data = await getNormalUsers()
    res.json(data)
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post('/delete', async (req, res) => {
  const { userId } = req.body
  try {
    await deleteUser(userId);
    res.json({
      status: 'success'
    })
  } catch (error) {
    res.status(401);
    res.json({
      status: 'failed',
    });
  }
})

router.post('/create', async (req, res) => {
  const user = req.body
  try {
    const isCreated = await createUser(user)
    if (isCreated) {
      res.status(200)
      res.json({
        status: 'success',
      });
    }
    else {
      res.status(401)
      res.json({
        status: 'failed',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});


router.post('/update', async (req, res) => {
  const user = req.body
  try {
    const isUpdeted = await updateUser(user)
    if (isUpdeted) {
      res.status(200)
      res.json({
        status: 'success',
      });
    }
    res.status(200)
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/is/exists', async (req, res) => {
  const { email } = req.query
  try {
    const isExists = await checkUserIsExists(email)
    res.send({ isExists })
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;