// NODE MODULES
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var mongoose = require('mongoose');

var db = mongoose.connection;

// MODELS
var Post = require('./app/models/post.js');

// MIDDLEWARE
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

/* open a connection to the database */
mongoose.connect('mongodb://localhost/myapp');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!');
});

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

app.get('/greetings/:name', function(req, res) {
  res.json("Greetings, " + req.params.name + "!");
});

var newPost = new Post ( { body: "This is a new post" });
newPost.save(function (err, newPost) {
  if (err) return console.error(err);
});

app.get('/posts', function(req, res) {
  Post.find(function (err, posts) {
    if (err) return console.error(err);
    console.log(posts);
    res.render('posts-index', posts);
  });
});

// SERVER
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Server listening on port: ' + port);
});