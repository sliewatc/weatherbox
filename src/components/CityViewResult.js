import React, {Component} from 'react'
import CityViewMusic from './CityViewResultMusic'
import {Link} from 'react-router-dom'

import weatherIconResolver from './../actions/WeatherIconResolver';

class CityViewResult extends Component {
  constructor() {
    super();
    this.state = {
      showMusic: true
    }
  }

  componentDidMount() {
    this.setState({
      weatherIcon : this.renderWeatherIcon(),
    })
  }

  renderWeatherIcon = () => {
    const wid = this.props.weather.cityCondID;
    const { result: iconClass } = weatherIconResolver.find(c => c.condition(wid));

    return(<i className={`wi ${iconClass} city-view--weather-icon`}></i>)
  };

  renderMusic = () => {
    if (this.props.weather.dataIsSet && this.state.showMusic) {
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
        <div className={'city-view--weather-wrapper'}>
          <div className={'city-view--condition-left'}>
            <span className={'city-view--wind'}>{this.props.weather.cityWind} m/s</span>
            <span className={'city-view--desc'}>
              {this.state.weatherIcon}{this.props.weather.cityCondDescription}
            </span>
          </div>
          <div className={'city-view--condition-right'}>
            <span className={'city-view--temperature'}>{this.props.weather.cityTemp}°C</span>
          </div>
        </div>
        {this.renderMusic()}
      </div>
    )
  }
}

export default CityViewResult