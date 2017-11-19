var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var https = require('https');
var querystring = require('querystring');
var parseString = require('xml2js').parseString;

router.get('/book', function(req, res) {
  var search = req.query.search;
  var queryOption = {
    'query': search,
    'display': 10,
    'start': 1,
    'sort': 'sim'
  };
  var query = querystring.stringify(queryOption);
  var client_id = 'qIYzK9T2QbZbi9NDX4qt';
  var client_secret = 'wN8hWqSDa_';
  var host = 'openapi.naver.com';
  var port = 443;
  var uri = '/v1/search/book.json?';
  var options = {
    host: host,
    port: port,
    path: uri + query,
    method: 'GET',
    headers: {
      'X-Naver-Client-Id': client_id,
      'X-Naver-Client-Secret': client_secret
    }
  };
  req = https.request(options, function(response) {
    response.setEncoding('utf8');
    response.on('data', function (json) {
      res.send(json);
    });
  });
  req.end();
});

module.exports = router;
