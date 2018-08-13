import React, {Component} from 'react'
import CityViewMusic from './CityViewResultMusic'
import {Link} from 'react-router-dom'

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
    let iconClass = '';

    if (wid === 800) iconClass = 'wi-day-sunny';
    if (wid === 801 || wid === 802) iconClass = 'wi-day-cloudy';
    if (wid === 803 || wid === 804) iconClass = 'wi-cloudy';
    if (wid >= 200 && wid <= 232) iconClass = 'wi-storm-showers';
    if (wid >= 300 && wid <= 321) iconClass = 'wi-showers';
    if (wid >= 500 && wid <= 504) iconClass = 'wi-day-rain';
    if (wid >= 511 && wid <= 531) iconClass = 'wi-rain';
    if (wid >= 600 && wid <= 622) iconClass = 'wi-snow';
    if (wid >= 700 && wid <= 781) iconClass = 'wi-dust';

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