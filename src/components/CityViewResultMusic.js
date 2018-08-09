import React, { Component } from 'react'
import { FeatureWeather, spotifyGenres } from '../actions/WeatherToAudioFeature'
import axios from 'axios'

class CityViewMusic extends Component {
  constructor(props) {
    super(props);
    this.audio = new Audio();
    this.state = {
      musicPlaying: false,
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
    const shuffled = spotifyGenres.sort(() => .5 - Math.random());
    let selected = shuffled.slice(0,4).join(',') ;

    return axios({
      url: 'https://api.spotify.com/v1/recommendations',
      method: 'GET',
      params: Object.assign(this.state.features, {seed_genres : selected+',pop', limit: 10, min_popularity: 20}),
      headers: {
        'Authorization': `Bearer ${this.state.spotifyAccessToken}`
      },
    })
      .then((respond) => {
        this.setState({
          tracks: respond.data.tracks,
          songsSet: true,
        });
        console.log(respond.data.tracks);
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

  handleAudio = (preview_url) => {
    if (!this.state.musicPlaying) {
      this.audio.src = preview_url;
      this.audio.load();
      this.audio.play();
      this.setState({
        musicPlaying: true,
      });
    } else {
      this.audio.pause();
      this.audio.src = preview_url;
      this.audio.load();
      this.audio.play();
      this.setState({
        musicPlaying: true,
      });
    }

  };

  componentDidMount() {
    this.getClientCredentialsToken()
      .then(res => {
        this.setState({
          spotifyAccessToken: res.access_token,
          features: FeatureWeather(this.props.weather.cityTemp, this.props.weather.cityCond, this.props.weather.cityCondDescription, this.props.weather.cityWind)
        }, () => {this.getRecommendations()})
      })
      .catch(error => console.log(error));
  }
  renderSongs = () => {
    if (this.state.songsSet) {
      return (

        <div className={'recommended-songs--wrapper'}>
          {this.state.tracks.map((result, id) => {
            return (
              <a key={id} className={'song-listing--item'} target='_blank' href={result.uri}>
                <img src={result.album.images[1].url}/>
                <div className={'song-listing--info-wrapper'}>
                  <div className={'song-listing--trackname'}>{result.name}</div>
                  <div className={'song-listing--artist'}>{result.artists[0].name}</div>
                </div>
              </a>
            )
          })}
        </div>
      );
    } else {
      return (
        <div className={'loading-wrapper'}>
          <div className={'hollow-loader'}>
            <div className={'large-box'}></div>
            <div className={'small-box'}></div>
          </div>
        </div>
      )
    }
  };

  render() {
    return (this.renderSongs());
  }
}

export default CityViewMusic