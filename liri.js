require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var query = process.argv[3];

// Check Keys
// console.log(keys);
var choice = process.argv[2];




var spotify = new Spotify(keys.spotify);
switch (choice) {
    case "movie-this":
        movieThis(query);
        break;
    case "spotify-this-song":
        spotifyCall(query);
        break;
    case "concert-this":
        concertThis(query);
        break;
    default:
        // reads to file
        fs.readFile("random.txt", "utf8", function (error, data) {
            // gets from file
            var data = data.split(",");
            var thatWay = data[1];
            if (error) {
                return console.log(error);
            }
            //runs
            spotifyCall(thatWay);
        })

}

// spotify
function spotifyCall(songName) {
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("\n_Track Info_" + "\nArtist: " + data.tracks.items[0].artists[0].name + "\nSong: " + data.tracks.items[0].name + "\nLink: " + data.tracks.items[0].external_urls.spotify + "\nAlbum: " + data.tracks.items[0].album.name + "\n" + "\nGreat song! Search another :)")
    });
}

// movie
function movieThis(movieName) {
    if (!movieName) {
        movieName = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function (response) {
            if (!movieName) {
                movieName = "Mr. Nobody";
            }
            // movie data
            console.log("\n_Movie Info_" + "\nTitle: " + response.data.Title + "\nRelease Year: " + response.data.Year + "\nRating: " + response.data.Rated + "\nRelease Country: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n" + "\n Love this one!");


        }
    );
}


// checks concerts
function concertThis(artist) {
    var bandsQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(bandsQueryUrl).then(
        function (response) {
            console.log("_Upcoming Events_");
            console.log("Artist: " + artist + "\nVenue: " + response.data[0].venue.name + "\nLocation: " + response.data[0].venue.country + "\nDate: " + response.data[0].datatime + "\nRock on dude!");
        });
}