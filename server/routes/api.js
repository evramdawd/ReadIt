const express = require('express');

const fileController = require('../controllers/fileController') // fileController file/obj w relevant middleware

const router = express.Router();
console.log('IN THE API.JS')

// ADD INITIAL DATA REQUEST HANDLER HERE: 
// This will populate our DB which we'll then query in another route below. (Right now this call to /load is done via the ComponentDidMount() )
router.get('/load', fileController.initialLoad, 
(req, res) => {
  console.log('IN THE /LOAD .GET ROUTER!');
  return res.status(200).json(res.locals.posts);
});

// router.get('/')


// // Wrap these two lines of code (app.use & app.get), used to serve the build folder and the index.html file up in a conditional since they are only needed in Production Mode and not in Dev mode:
// if(process.env.NODE_ENV === 'production') {
//   // statically serve everything in the build folder on the route '/build'
//   app.use('/build', express.static(path.join(__dirname, '../build')));
//   // serve index.html on the route '/'
//   app.get('/', (req, res) => {
//     return res.status(200).sendFile(path.join(__dirname, '../index.html'));
//   });
// }


// router.get('/load', fileController.initialLoad, 
// (req, res) => {
//   console.log('IN THE /LOAD .GET ROUTER!');
//   return res.status(200).send('HELLO!');
// });

// EXPORT HERE:
module.exports = router;