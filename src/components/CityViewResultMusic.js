import React, { Component } from 'react'
import { FeatureWeather } from '../actions/WeatherToAudioFeature'
import axios from 'axios'

class CityViewMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songsSet: false,
      tracks: null,
      spotifyAccessToken: null,
      features: {
        valence: null,
        energy: null,
        tempo: null,
        instrumentalness: null,
        mode: null,
        danceability: null,
        acousticness: null
      }
    };
  }
  getRecommendations = () => {
    return axios({
      url: 'https://api.spotify.com/v1/recommendations',
      method: 'GET',
      params: Object.assign(this.state.features, {seed_genres : 'dance,classical,hip-hop,acoustic,trance', limit: 5, min_popularity: 30}),
      headers: {
        'Authorization': `Bearer ${this.state.spotifyAccessToken}`
      },
    })
      .then((respond) => {
        this.setState({
          tracks: respond.data.tracks,
          songsSet: true,
        });
        return true;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getClientCredentialsToken = async () => {
    const response = await fetch('/api/gat');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  componentDidMount() {
    this.getClientCredentialsToken()
      .then(res => {
        this.setState({
          spotifyAccessToken: res.access_token,
          features: FeatureWeather(this.props.weather.cityTemp, this.props.weather.cityCond, this.props.weather.cityCondDescription, this.props.weather.cityWind)
        }, () => {this.getRecommendations(); console.log(this.state.features)})
      })
      .catch(error => console.log(error));
  }

  renderSongs = () => {
    if (this.state.songsSet) {
      return (
        <div className={'recommended-songs--wrapper'}>
          <ul>
            {this.state.tracks.map((result, id) => {
              return (
                <li key={id}>
                  <a href={result.uri}>{result.name}</a>
                </li>
              )
            })}
          </ul>
        </div>
      );
    } else {
      return (
        <div>No songs right now</div>
      )
    }
  };

  render() {
    return (this.renderSongs());
  }
}

export default CityViewMusic