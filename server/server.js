const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Setup body parser - to translating request body into JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('server/public'));

// Routes would go here
// let musicLibrary = [
//   {
//     rank: 355,
//     artist: 'Ke$ha',
//     track: 'Tik-Toc',
//     published: '1/1/2009',
//   },
//   {
//     rank: 356,
//     artist: 'Gene Autry',
//     track: 'Rudolph, the Red-Nosed Reindeer',
//     published: '1/1/1949',
//   },
//   {
//     rank: 357,
//     artist: 'Oasis',
//     track: 'Wonderwall',
//     published: '1/1/1996',
//   },
// ];

// MODULARIZING ROUTES
let musicRouter = require('./routes/musicLibrary.router');
app.use('/musicLibrary', musicRouter);

// Start express
const PORT = 5000;
app.listen(PORT, () => {
  console.log('up and running on port', PORT);
});
