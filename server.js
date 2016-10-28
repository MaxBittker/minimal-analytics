let express = require('express');
let Pool = require('pg').Pool

let app = express();
let pool = new Pool({
  user: 'postgres',
  password: '',
  host: 'localhost',
  database: 'analytics',
  max: 10, // max number of clients in pool
  idleTimeoutMillis: 1000, // close & remove clients which have been idle > 1 seco
})

app.get('/api/ping/*', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  console.log(req.query)
  pool.query('INSERT INTO pings (anonId, url, path, referrer, title) VALUES($1, $2, $3, $4, $5)',
   [req.query.anonId,
    req.query.url,
    req.query.path,
    req.query.referrer,
    req.query.title
  ], function(err, qResult) {
    if(err) throw err
    console.log(qResult)
    res.send("recieved"+qResult)
  })
});

app.listen(5000, function () {
  console.log('analytics server listening on port 5000!');
});
