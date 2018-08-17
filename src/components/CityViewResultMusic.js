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
    const songs = fetch('/api/songs', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ weather: this.props.weather })
    })
      .then(data => {
        return data;
      })
      .then(resp => {
        return resp.json();
      })
      .catch(err => {
        console.log(err)
      });
    return songs;
  };

  handleSongClick = (uri) => {

    axios({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      url: 'https://api.spotify.com/v1/me/player/devices'
    })
      .then(resp => {
        let index = 0;
        while(resp.data.devices[index]) {
          if (resp.data.devices[index].is_active && !resp.data.devices[index].is_restricted) {
            return resp.data.devices[index].id;
          }
          index++;
        }
        if (typeof resp.data.devices[0] !== 'undefined') {
          return resp.data.devices[0].id
        }
        throw Error('Cannot find an available device to play on.')
      })
      .then((device) => {
        axios({
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
          url: 'https://api.spotify.com/v1/me/player/play',
          method: 'PUT',
          params: {
            device_id: device,
          },
          data: {
            uris: this.trackUris,
            offset: {"uri": uri},
          }
        })
          .catch(err => {
            console.log(err);
            if (!err.response.status) return;

            // Error 400 - Bad Request, malformed query probably
            // Error 401 - Unauthorized, access token not set
            // Error 403 - User is non premium
            // Error 404 - No active device found
            let errorStatus = err.response.status;
            if (errorStatus === 400) {
            }
          })
      })
      .catch(err => {
        console.log(err);
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