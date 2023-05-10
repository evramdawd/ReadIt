const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// uncomment the below for proxy challenge
const leaderList = [
  {name: 'Anna da best', id: 'a0'},
  {name: 'Ben', id: 'b0'},
  {name: 'Clara', id: 'c0'},
  {name: 'David', id: 'd0'},
];

// REQUIRE ROUTERS:
const apiRouter = require('./routes/api');

// HANDLE PARSING REQUEST BODY??
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ??


// Define Route Handlers:
// app.use('/load', apiRouter);
app.get('/load', apiRouter, (req, res) => {
  return res.status(200).send('HELLO!!');
});

app.get('/api/leaders', (req, res) => {
  return res.status(200).send(leaderList);
});



// Wrap these two lines of code (app.use & app.get), used to serve the build folder and the index.html file up in a conditional since they are only needed in Production Mode and not in Dev mode:
if(process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}


app.listen(port, () => {
  console.log(`App is running on port ${port}`)
}); //listens on port 3000 -> http://localhost:3000/

