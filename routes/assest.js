const express = require('express');
const router = express.Router();
const {getUsers} = require('../store/user');
const { assignUserAssest, updateAssignedUser, getAllUserAssests, getUserAssests, deleteAssetUser } = require('../store/assest');

router.get('/get', async (req, res) => {
    try {
      const data = await getAllUserAssests()
      res.json(data)
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
});

router.get('/get/user', async (req, res) => {
  const {userId} = req.query
  try {
    const data = await getUserAssests(userId)
    res.json(data)
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/users', async (req, res) => {
    try {
      const data = await getUsers()
      res.json(data)
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
});


router.post('/create', async (req, res) => {
  const asset = req.body
  try {
    const isCreated = await assignUserAssest(asset)
    if(isCreated){
      res.status(200)
      res.json({
        status:'success',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});


router.post('/update', async (req, res) => {
  const asset = req.body
  try {
    const isUpdated = await updateAssignedUser(asset)
    if(isUpdated){
      res.status(200)
      res.json({
        status: 'success',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post('/delete', async (req, res) => {
  const {assetUserId} = req.body
  try {
     await deleteAssetUser(assetUserId);
     res.json({
      status:'success'
     })
  } catch (error) {
    res.status(401);
    res.json({
      status: 'failed',
    });
  }
})
module.exports = router;