//keys
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var request = require('request');

//global variables to use
var second = process.argv[2];
var third = process.argv[3];

//spotify
// *****************************************************************************************************************
function spotifyMusic(song) {
    var spotify = new Spotify({
        id: '7ceaff1dc7254746bbcdda036c96e3b1',
        secret: '27185375e8f04931b988fc2b9180222a'
    });
    if (third === undefined) {
        third = 'Come & get it';
    }
    spotify.search({
        type: 'track',
        query: third,
        limit: '1'
    }, function (err, data) {
        if (err) {
            return console.log('Error Occurred: ' + err);
        } else if (!err) {
            console.log("\nArtist: " + data.tracks.items[0].album.artists[0].name + "\n ");
            console.log("Song Title: " + data.tracks.items[0].name + "\n ");
            console.log("Album: " + data.tracks.items[0].album.name + "\n ");
            console.log("Song Preview URL: " + data.tracks.items[0].album.external_urls.spotify);
        }
    });
}
if (second === "spotify-this-song") {
    spotifyMusic();
}
// *****************************************************************************************************************

// movie
// *****************************************************************************************************************
function movie() {
    if (third === undefined) {
        third = "Back to the future";
    }
    var queryURL = "http://www.omdbapi.com/?apikey=40e9cece&t=" + third + "&y=&plot=short&r=json";
    console.log(queryURL);
    request(queryURL, function (error, response, rbody) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(rbody);
            console.log("\nMovie Title: " + body.Title + "\n ");
            console.log("Year Released: " + body.Released + "\n ");
            console.log("IMDB Rating: " + body.Rated + "\n ");
            console.log("Rotten Tomatoes Rating: " + body.tomatoUserRating + "\n ");
            console.log("Production Country: " + body.Country + "\n ");
            console.log("Language: " + body.Language + "\n ");
            console.log("Plot: " + body.Plot + "\n ");
            console.log("Actors: " + body.Actors + "\n ");
            return;
        } else {
            console.log("Error: " + error);
            return;
        }
    });
}
if (second === "movie-this") {
    movie();
}
// *****************************************************************************************************************

// random
// *****************************************************************************************************************
function toDo() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log("Error #404");
        } else {
            var text = data.trim().split(",");
            second = text[0];
            third = text[1];
            switch (second) {
                case "my-tweets":
                    twitterTweets();
                    break;
                case "spotify-this-song":
                    spotifyMusic();
                    break;
                case "movie-this":
                    movie();
                    break;
            }
        }
    });
}
if (second === "do-what-it-says") {
    toDo();
}
// *****************************************************************************************************************