const express = require('express');
const axios = require('axios');
const { spotifyClientSecret, spotifyClientID } = require('../actions/ApiKeys');

const app = express();
const port = 5000;

const getToken = () => {
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
      return respond.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

app.get('/api/gat', (req, res) => {
  getToken()
    .then((resp) => {
      res.send(resp);
    })
    .catch(error => {
      console.log(error)
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));