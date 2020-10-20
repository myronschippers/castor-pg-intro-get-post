const express = require('express');
const router = express.Router();

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

router.get('/', (req, res) => {
  res.send(musicLibrary);
});

router.post('/', (req, res) => {
  musicLibrary.push(req.body);
  res.sendStatus(200);
});

module.exports = router;
