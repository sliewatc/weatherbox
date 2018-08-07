import React, { Component } from 'react'
import CityViewMusic from './CityViewResultMusic'

class CityViewResult extends Component {
  constructor() {
    super();
    this.state = {
    }
  }
  renderMusic = () => {
    if (this.props.weather.dataIsSet) {
      return (<CityViewMusic spotifyAccessToken={this.props.spotifyAccessToken} weather={this.props.weather}/>)
    }
  };
  render () {
    return(
      <div>
        <h2>
          {this.props.weather.cityName}
        </h2>
        <p>
          Weather: {this.props.weather.cityCond} - {this.props.weather.cityCondDescription} -
          Wind: {this.props.weather.cityWind}m/s -
          Temperature: {this.props.weather.cityTemp}°C
        </p>
        {this.renderMusic()}
      </div>
    )
  }
}

export default CityViewResult