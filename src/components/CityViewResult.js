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
        <div className={'city-view--city'}>
          <Link className={'city-view--home-link'} to='/'>{'<'}</Link>
          <span className={'city-view--cityname'}>{this.props.weather.cityName}</span>
        </div>
        <div className={'city-view--temp-wind'}>
          <span className={'city-view--temperature'}>{this.props.weather.cityTemp}°C</span>
          <span>Wind: {this.props.weather.cityWind}m/s</span>
        </div>
        <div className={'city-view--condition'}>
          {this.props.weather.cityCond.toUpperCase()}: {this.props.weather.cityCondDescription}
        </div>
        {this.renderMusic()}
      </div>
    )
  }
}

export default CityViewResult