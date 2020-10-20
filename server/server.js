const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

// DB Config Options
const Pool = pg.Pool;
const pool = new Pool({
  database: 'my-music-library', // name of our database
  host: 'localhost', // where is your database
  port: 5432,
  max: 10, // how many connections
  idleTimeoutMillis: 30000, // 30 second timeout
});

// check connection
pool.on('connect', () => {
  console.log('Pool Connected');
});

pool.on('error', (err) => {
  console.log('Pool Error:', err);
});

const app = express();

// Setup body parser - to translating request body into JSON
app.use(bodyParser.urlencoded({ extended: true }));
// app.use( bodyParser.json() );
app.use(express.static('server/public'));

// Routes would go here
let musicLibrary = [
  {
    rank: 355,
    artist: 'Ke$ha',
    track: 'Tik-Toc',
    published: '1/1/2009',
  },
  {
    rank: 356,
    artist: 'Gene Autry',
    track: 'Rudolph, the Red-Nosed Reindeer',
    published: '1/1/1949',
  },
  {
    rank: 357,
    artist: 'Oasis',
    track: 'Wonderwall',
    published: '1/1/1996',
  },
];

app.get('/musicLibrary', (req, res) => {
  res.send(musicLibrary);
});

app.post('/musicLibrary', (req, res) => {
  musicLibrary.push(req.body);
  res.sendStatus(201);
});

// MODULARIZING ROUTES
// let musicRouter = require('./routes/music_router');
// app.use('/musicLibrary', musicRouter);

// Start express
const PORT = 5000;
app.listen(PORT, () => {
  console.log('up and running on port', PORT);
});
