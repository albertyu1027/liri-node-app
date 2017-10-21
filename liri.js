var myKeys = require("./keys.js")

var operator= process.argv[2];
var myInput= process.argv[3];

switch(operator) {
  case "my-tweets":
  twitterFunc();
  break;

  case "spotify-this-song":
  spotifyFunc();
  break;

  case "movie-this":
  movieFunc();
  break;

  case "do-what-it-says":
  dothisFunc();
  break;

  default:
  console.log("I don't know this command.");
  break;
}

function twitterFunc() {
  var Twitter = require('twitter');
 
  var client = new Twitter(myKeys.twitterKeys);
 
  var params = {screen_name: 'Ay_Yooooou', count: 20, trim_user: true, exclude_replies: true}; 
  client.get('statuses/user_timeline.json', params, function(error, tweets, response) {
  if (!error) {
        for (i=0; i <tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
      }
    }
  });
};

function spotifyFunc() {
  var Spotify = require('node-spotify-api');
  var clientID = myKeys.spotifyKeys.client_id;
  var clientSecret = myKeys.spotifyKeys.client_secret;

  var songTitle= process.argv.slice(3).join("+")
  var songTitle2 = JSON.stringify(songTitle)
 
  var spotify = new Spotify({
  id: clientID,
  secret: clientSecret
  });

  spotify
  .search({ type: 'track', query: songTitle2})
  .then(function(response) {
    console.log("Artist: " + response.tracks.items[0].album.artists[0].name);
    console.log("Song Name: " + response.tracks.items[0].name);
    console.log("Preview Song: " + response.tracks.items[0].album.external_urls.spotify)
    console.log("Album: " + response.tracks.items[0].album.name);

  })
  .catch(function(err) {
    console.log("Artist: Ace of Base");
    console.log("Song Name: The Sign");
    console.log("Preview Song: https://open.spotify.com/album/5UwIyIyFzkM7wKeGtRJPgB")
    console.log("Album: The Sign (US Album) [Remastered]");
  });
};

function movieFunc() {
  var request = require("request");

  var movieTitle= process.argv.slice(3).join("+")
  var movieTitle2 = JSON.stringify(movieTitle)

  request("http://www.omdbapi.com/?t=" + movieTitle2 + "&y=&plot=short&apikey=40e9cece", 
      function(error, response, body) {
      if (!error && response.statusCode === 200 && myInput != null) {
        //console.log(body)
      console.log("Movie: " + JSON.parse(body).Title);
      console.log("This movie came out: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomato Rating: " + JSON.parse(body).tomatoRating);
      console.log("Country Produced: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Movie Plot: " + JSON.parse(body).Plot);
      console.log("Featured actors: " + JSON.parse(body).Actors);
      } 
      else { 
      console.log("Movie: Mr. Nobody");
      console.log("This movie came out: 2009");
      console.log("IMDB Rating: 7.9");
      console.log("Country Produced: Belgium, Germany, Canada, France, USA, UK");
      console.log("Language: English, Mohawk");
      console.log("Movie Plot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.");
      console.log("Featured actors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham");
      console.log("Rotten Tomato Rating: 66%");
      }
  });
}

function dothisFunc() {
    var fs = require("fs");

    fs.readFile("random.txt", "utf8", function(err, data) {
    
    if (err) {
    return console.log(err);
    }

    var output = data.split(",");
    var stringOutput = JSON.stringify(output[1])
   
    if (output[0]=== "spotify-this-song") {
      var Spotify = require("node-spotify-api");
      var clientID = myKeys.spotifyKeys.client_id;
      var clientSecret = myKeys.spotifyKeys.client_secret;
      var spotify = new Spotify({
      id: clientID,
      secret: clientSecret
      });

      spotify
      .search({ type: 'track', query: stringOutput})
      .then(function(response) {
        console.log("Artist: " + response.tracks.items[0].album.artists[0].name);
        console.log("Song Name: " + response.tracks.items[0].name);
        console.log("Preview Song: " + response.tracks.items[0].album.external_urls.spotify)
        console.log("Album: " + response.tracks.items[0].album.name);
      })
      .catch(function(err) {
        console.log("Artist: Ace of Base");
        console.log("Song Name: The Sign");
        console.log("Preview Song: https://open.spotify.com/album/5UwIyIyFzkM7wKeGtRJPgB")
        console.log("Album: The Sign (US Album) [Remastered]");
      });
    }
  })
};






