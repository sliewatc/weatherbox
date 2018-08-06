import React, { Component } from 'react'

class CityViewMusic extends Component {
  constructor() {
    super();
    this.state = {
      valence: null,
      energy: null,
      tempo: null,
      instrumentalness: null,
      mode: null,
      danceability: null,
      acousticness: null
    };
  }
  componentDidMount() {
    this.setSpotifyParams();
  }
  setSpotifyParams = () => {
      console.log(this.props.weatherContext);
  };

  render() {
    return 'Music';
  }
}

export default CityViewMusic