import React, { Component } from 'react'
import axios from "axios/index";

class CityViewResultMusicItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songInLibrary: this.props.inLibrary,
    }
  }

  handleRemoveSong = (e, trackId) => {
    if (this.props.libraryChecked === false){
      return;
    }

    e.stopPropagation();
    axios({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      url: 'https://api.spotify.com/v1/me/tracks',
      method: 'DELETE',
      params: {
        ids: trackId
      },
    })
      .then(data => {
        if (data.status === 200) {
          this.setState({
            songInLibrary: false,
          })
        }
      })
  };

  handleSaveSong = (e, trackId) => {
    if (this.props.libraryChecked === false){
      return;
    }

    e.stopPropagation();
    axios({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      url: 'https://api.spotify.com/v1/me/tracks',
      method: 'PUT',
      params: {
        ids: trackId
      },
    })
      .then(data => {
        if (data.status === 200) {
          this.setState({
            songInLibrary: true,
            addButtonActive: false,
          })
        }
      })
  };

  renderSaveButton = () => {
    if (this.props.libraryChecked === false) {
      return;
    }
    if (this.state.songInLibrary) {
      return (
        <button className={'song-listing--save-song song-listing--song-in-library'}
                onClick={(event) => {this.handleRemoveSong(event, this.props.trackData.id)}}>
        </button>);
    } else  {
      return (
        <button className={'song-listing--save-song'}
                onClick={(event) => {this.handleSaveSong(event, this.props.trackData.id)}}>
        </button>);
    }
  };

  render() {
    return (
      <a className={'song-listing--item'}
         onClick={() => {this.props.handleSongClick(this.props.trackData.uri, this.props.trackData.external_urls.spotify)}}>
        <div className={'song-listing--item-album-img'}>
          <img src={this.props.trackData.album.images[1].url} alt={this.props.trackData.album.name}/>
        </div>
        <div className={'song-listing--info-wrapper'}>
          <div className={'song-listing--trackname'}>{this.props.trackData.name}</div>
          <div className={'song-listing--artist'}>{this.props.trackData.artists[0].name}</div>
          {this.renderSaveButton()}
        </div>
      </a>
    )
  }
}

export default CityViewResultMusicItem