const pg = require('pg');
const url = require('url');

let dbConfig = {
  database: 'my-music-library', // name of our database
  host: 'localhost', // where is your database
  port: 5432,
  max: 10, // how many connections
  idleTimeoutMillis: 30000, // 30 second timeout
};

// is heroku config available
if (process.env.DATABASE_URL) {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.split(':');

  dbConfig = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true,
    max: 10,
    idleTimeoutMillis: 30000,
  };
}

// DB Config Options
const Pool = pg.Pool;
const pool = new Pool(dbConfig);

// check connection
pool.on('connect', () => {
  console.log('Pool Connected');
});

pool.on('error', (err) => {
  console.log('Pool Error:', err);
});

module.exports = pool;
