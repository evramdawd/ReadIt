const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// REQUIRE ROUTERS:
const apiRouter = require('./routes/api');

// uncomment the below for proxy challenge
// const leaderList = [
//   {name: 'Anna da best', id: 'a0'},
//   {name: 'Ben', id: 'b0'},
//   {name: 'Clara', id: 'c0'},
//   {name: 'David', id: 'd0'},
// ];



// YOOO!!!
console.log('In the SERVER.JS');

// HANDLE PARSING REQUEST BODY??
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ??

// Define Route Handlers:
// app.use('/load', apiRouter);
  // Changing route from /load to root /
  // app.get('/load', apiRouter, (req, res) =>

  // ROUTING:
// app.get('/', apiRouter, (req, res) => {
//   return res.status(200).send('HELLO!!');
// });
app.use('/', apiRouter);

app.get('/api/leaders', (req, res) => {
  return res.status(200).send(leaderList);
});


// MOVING THESE THESE 2 ROUTES INTO API.JS!!!
// Wrap these two lines of code (app.use & app.get), used to serve the build folder and the index.html file up in a conditional since they are only needed in Production Mode and not in Dev mode:
if(process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}

// Catch-all route handler - 404:
// app.use( (req, res) => res.status(404).send('This aint Readit... in fact this aint even Reddit... better luck next time friend... (404)'));

// Global Error Handler:
app.use( (err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error', 
    status: 500,
    message: { err: 'An error occured!' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


// Start Server:
app.listen(port, () => {
  console.log(`App is running on port ${port}`)
}); //listens on port 3000 -> http://localhost:3000/

module.exports = app;