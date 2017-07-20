var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');


var router = express.Router();

module.exports = router;

// Requiring our not and dogs models
var Note = require("../models/note.js");
var Dogs = require("../models/dogs.js");

router.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    request("https://www.petfinder.com/pet-search?location=orlando%2C+florida&animal=dog&breed=&filtersUpdated=true&distance=&name=", function(error, response, html) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(html);
        // Now, we grab every h2 within an article tag, and do the following:
        $("pet-name-container h2").each(function(i, element) {

            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");

            // Using our Article model, create a new entry
            // This effectively passes the result object to the entry (and the title and link)
            var entry = new Dogs(result);

            // Now, save that entry to the db
            entry.save(function(err, doc) {
                // Log any errors
                if (err) {
                    console.log(err);
                }
                // Or log the doc
                else {
                    console.log(doc);
                }
            });

        });
    });
    // Tell the browser that we finished scraping the text
    res.send("Scrape Complete");
});
