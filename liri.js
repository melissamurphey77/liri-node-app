
require("dotenv").config();

var keys = require('./keys.js');

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

var getArtistName = function(artist) {
    return artist.name;

}


var getmeSpotify = function(songName) {
    console.log(songName);
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log(data.tracks.items[0]);
        var songs = data.tracks.items;
        for (var i=0; i<songs.length; i++) {
        console.log(i);
        console.log('artist(s): ' + songs[i].artists.map(
            getArtistName));
        console.log('song name: ' + songs[i].name);
        console.log('preview song: ' + songs[i].preview_url);
        console.log('album: ' + songs[i].album.name);
        console.log('------------------------------------------');
    }
    
    }); //end spotify search function


}; //end getmeSpotify function

var pick = function (caseData, functionData) {
    switch (caseData) {
        case 'spotify-this-song':
            getmeSpotify(functionData);
            break;
        default:
            console.log('LIRI does not follow your request');
    }
}

var runThis = function (argOne, argTwo) {
    pick(argOne, argTwo);

};

runThis(process.argv[2], process.argv[3]);



