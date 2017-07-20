var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');

// Making my port 8080 or process.env.PORT for heroku deployment
var PORT = process.env.PORT || 8080;

// express npm package
var app = express();

// express-handlebars npm package
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// body-parser npm package
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// Use all of the static files in the public folder
app.use(express.static('app/public'));

// Listening to the port
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
})