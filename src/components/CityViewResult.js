import React, { Component } from 'react'
import CityViewMusic from './CityViewResultMusic'
import { Link } from 'react-router-dom'

class CityViewResult extends Component {
  constructor() {
    super();
    this.state = {
    }
  }
  renderMusic = () => {
    if (this.props.weather.dataIsSet) {
      return (<CityViewMusic weather={this.props.weather}/>)
    }
  };

  render () {
    return(
      <div className={'city-view-page--wrapper'}>
        <Link to='/'>Home</Link>
        <div className={'city-view--city'}>{this.props.weather.cityName}</div>
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