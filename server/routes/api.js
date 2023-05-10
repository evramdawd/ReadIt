const express = require('express');

const fileController = require('../controllers/fileController') // fileController file/obj w relevant middleware

const router = express.Router();
console.log('IN THE API.JS')

// ADD INITIAL DATA REQUEST HANDLER HERE: 
router.get('/load', fileController.initialLoad, 
(req, res) => {
  console.log('IN THE /LOAD .GET ROUTER!');
  return res.status(200).send('HELLO123!');
});


// router.get('/load', fileController.initialLoad, 
// (req, res) => {
//   console.log('IN THE /LOAD .GET ROUTER!');
//   return res.status(200).send('HELLO!');
// });

// EXPORT HERE:
module.exports = router;