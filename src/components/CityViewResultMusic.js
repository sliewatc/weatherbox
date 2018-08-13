import React, { Component } from 'react'
import axios from 'axios'

class CityViewMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songsSet: false,
      tracks: null,
    };
  }

  getSpotifySongs = async () => {
    const response = await fetch('/api/songs', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        weather: this.props.weather,
      })
    });
    const songs = await response.json();
    if (response.status !== 200) throw Error(songs.message);
    return songs;
  };

  handleSongClick = (uri) => {
    let accessToken = sessionStorage.getItem('access_token');
    axios({
      url: 'https://api.spotify.com/v1/me/player/play',
      method: 'PUT',
      data: {
        uris: this.trackUris,
        offset: {"uri": uri},
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    })
      .catch((error) => {
        console.log(error);
      });
  };

  refreshMusic = () => {
    this.setState({
      songsSet: false,
    });
    this.getSpotifySongs()
      .then((tracks) => {
        this.setState({
          songsSet: true,
          tracks: tracks,
        })
      })
      .catch((err) => {
        console.log(err);
      })
  };

  componentDidMount() {
    this.trackUris = [];
    this.getSpotifySongs()
      .then((tracks) => {
        this.setState({
          songsSet: true,
          tracks: tracks,
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }
  renderSongs = () => {
    if (this.state.songsSet) {
      return (
        <React.Fragment>
          <div className={'recommended-songs--wrapper'}>
            {this.state.tracks.map((result, id) => {
              this.trackUris.push(result.uri);
              return (
                <a key={id} className={'song-listing--item'} onClick={() => {this.handleSongClick(result.uri)}}>
                  <div className={'song-listing--item-album-img'}>
                    <img src={result.album.images[1].url} alt={result.album.name}/>
                  </div>
                  <div className={'song-listing--info-wrapper'}>
                    <div className={'song-listing--trackname'}>{result.name}</div>
                    <div className={'song-listing--artist'}>{result.artists[0].name}</div>
                  </div>
                </a>
              )
            })}
          </div>
          <div className={'song-listing--refresh-music'}>
            <button onClick={() => {this.refreshMusic()}}>Reload</button>
          </div>
        </React.Fragment>
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