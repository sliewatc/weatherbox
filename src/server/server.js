const helpers = require('../actions/WeatherToAudioFeature');
const express = require('express');
const axios = require('axios');
const spotifyKeys = require('../actions/ApiKeys');
const bodyParser = require('body-parser');

const spotifyGenres = helpers.spotifyGenres;
const FeatureWeather = helpers.FeatureWeather;
const spotifyClientSecret = spotifyKeys.spotifyClientSecret;
const spotifyClientID = spotifyKeys.spotifyClientID;

const app = express();
const port = 5000;

var spotifyAccessTokenSet = false;
var spotifyAccessToken = null;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const setSpotifyAccessToken = () => {
  let tokenPromise = null;

  if (!spotifyAccessTokenSet) {
    tokenPromise = getSpotifyAccessToken()
      .then(resp => {
        spotifyAccessTokenSet = true;
        return resp.access_token;
      })
      .catch(err => {
        spotifyAccessTokenSet = false;
        console.log(err);
      });

    spotifyAccessToken = tokenPromise
      .then(accessToken => {
        return accessToken
      });
  }

  // Optional return value for calls requiring a token back
  return spotifyAccessToken;
};

const getSpotifyAccessToken = () => {
  return axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    params: {
      grant_type: 'client_credentials'
    },
    headers: {
      'Authorization': `Basic ${new Buffer(`${spotifyClientID}:${spotifyClientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
    .then((respond) => {
      console.log('got new token');
      return respond.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getRecommendations = (weather, token) => {
  let features = FeatureWeather(weather.cityTemp, weather.cityCond, weather.cityCondDescription, weather.cityWind);
  const shuffled = spotifyGenres.sort(() => .5 - Math.random());
  let genres = shuffled.slice(0,2).join(',') ;

  return axios({
    url: 'https://api.spotify.com/v1/recommendations',
    method: 'GET',
    // Merge features object with query options
    params: Object.assign(features, {seed_genres : genres, limit: 12, min_popularity: 15}),
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
    .then((resp) => {
      return resp.data.tracks;
    })
    .catch((err) => {
      console.log(err)
    });
};

const spotifyLoginImplicitGrant = async () => {
  let url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(spotifyClientID);
  url += '&scope=' + encodeURIComponent('user-read-currently-playing user-modify-playback-state user-read-playback-state user-library-modify user-library-read');
  url += '&redirect_uri=' + encodeURIComponent(`http://localhost:3000/user/login/settoken`);
  url += '&show_dialog=true';
  return url;
};

const tokenRefresher = () => {
  setSpotifyAccessToken();
  setTimeout(() => {
    spotifyAccessTokenSet = false;
    tokenRefresher()
  }, 3500000);
};
// Refresh token every 1 hour
tokenRefresher();

app.post('/api/songs', (req, res) => {
  setSpotifyAccessToken()
    .then(token => {
      return getRecommendations(req.body.weather, token)
    })
    .then(resp => {
      res.send(resp);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/api/spotify/login', (req, res) => {
  spotifyLoginImplicitGrant()
    .then(spotifyAuthorizeUrl => {
      res.redirect(spotifyAuthorizeUrl);
    })
    .catch(err => {
      console.log('catching error in post to api/spotify/login');
      console.log(err);
    });
});


app.listen(port, () => console.log(`Listening on port ${port}`));