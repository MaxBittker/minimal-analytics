let express = require('express');
let Pool = require('pg').Pool
let bodyParser = require('body-parser')

let app = express();
app.use(bodyParser.json())

let pool = new Pool({
  user: 'postgres',
  password: '',
  host: 'localhost',
  database: 'analytics',
  max: 10, // max number of clients in pool
  idleTimeoutMillis: 1000, // close & remove clients which have been idle > 1 seco
})

app.post('/api/page', function (req, res, next) {
  const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
  console.log(req.body)

  pool.query('INSERT INTO pages (gsid, anonId, url, path, referrer, title, ip) VALUES($1, $2, $3, $4, $5, $6, $7)',
  [
    req.body.gsId,
    req.body.anonId,
    req.body.url,
    req.body.path,
    req.body.referrer,
    req.body.title,
    ip
  ], function(err, qResult) {
    if(err) throw err
    console.log('page: ' + qResult.command)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send("success")
  })
});

app.post('/api/identify', function (req, res, next) {
  const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
  console.log(req.body)
  pool.query('INSERT INTO identifies (gsid, anonId) VALUES($1, $2)',
  [
    req.body.gsId,
    req.body.anonId,
  ], function(err, qResult) {
    if(err) throw err
    console.log('identify: '+qResult.command)

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send("success")
  })
});

app.post('/api/group', function (req, res, next) {
  const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
  console.log(req.body)
  pool.query('INSERT INTO groups (gsid, anonId, orgId) VALUES($1, $2, $3)',
  [
    req.body.gsId,
    req.body.anonId,
    req.body.orgId,
  ], function(err, qResult) {
    if(err) throw err
    console.log('group: '+qResult.command)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send("success")
  })
});


app.all('*', function(req, res, next) {
     var origin = req.get('origin');
     res.header('Access-Control-Allow-Origin', origin);
     res.header("Access-Control-Allow-Headers", "X-Requested-With");
     res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
});

app.listen(5000, function () {
  console.log('analytics server listening on port 5000!');
});
