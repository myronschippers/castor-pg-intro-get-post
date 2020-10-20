const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM "music_library";';

  pool
    .query(queryText)
    .then((dbResponse) => {
      console.log(dbResponse);
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  // musicLibrary.push(req.body);
  const musicData = req.body;
  const queryText = `INSERT INTO "music_library" ("rank", "artist", "track", "published")
    VALUES ($1, $2, $3, $4);`;

  const queryArray = [
    musicData.rank,
    musicData.artist,
    musicData.track,
    musicData.published,
  ];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
