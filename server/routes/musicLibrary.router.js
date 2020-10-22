const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// GETTING
// client >>> server GET
// server >>> database SELECT
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

// CREATE
// client >>> server POST
// server >>> database INSERT
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

// DELETE
// client >>> server DELETE
// server >>> database DELETE
router.delete('/:id', (req, res) => {
  // req.params is {} { id: '' }
  const musicId = req.params.id;
  const queryText = `DELETE FROM "music_library" WHERE id=$1;`;
  const queryArrayData = [musicId];

  pool
    .query(queryText, queryArrayData)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// UPDATE
// client >>> server PUT
// server >>> database UPDATE
router.put('/rank/:kittykat', (req, res) => {
  const newMusicInfo = req.body;
  const queryText = `UPDATE "music_library" SET rank=$1 WHERE id=$2;`;
  const queryArray = [newMusicInfo.rank, req.params.kittykat];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.warning(err);
      res.sendStatus(500);
    });
});

// CRUD
// Create >>> POST
// Read >>> GET
// Update >>> PUT
// Delete >>> DELETE

module.exports = router;
