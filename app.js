var express = require('express');
var exphbs = require('express-handlebars');
var app = express();

// MIDDLEWARE
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// ROUTES
app.get('/', function(req, res) {
  res.render('home');
});

app.get('/api/blahs', function(req, res) {
  res.json(
    [
      { "name" : "blah" }, { "name" : "blah" }, { "name": "blah" }
    ]);
});

// SERVER
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});