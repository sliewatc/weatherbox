import React, { Component } from 'react'
import LoadHold from '../actions/LoadHold'
import CityViewResult from './CityViewResult'
import { openWeatherMapAPPID } from '../actions/ApiKeys'

const ViewResultWithLoad = LoadHold(CityViewResult);

class CityView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gid: props.match.params.gid,
      dataIsSet: false,
      cityName: null,
      cityTemp: null,
      cityCond: null,
      cityCondDescription: null,
      cityWind: null,
    }
  }
  componentDidMount() {
    let reqUrl = `https://api.openweathermap.org/data/2.5/weather?id=${this.state.gid}&APPID=${openWeatherMapAPPID}`;
    fetch(reqUrl)
      .then((raw) => {
        if (!raw.ok) throw raw.statusText;
        return raw.json();
      })
      .then((respJson) => {
        console.log(respJson);
        this.setState({
          cityName: respJson.name,
          cityTemp: (respJson.main.temp - 273.15).toFixed(1),
          cityCondID: respJson.weather[0].id,
          cityCond: respJson.weather[0].main,
          cityCondDescription: respJson.weather[0].description,
          cityWind: respJson.wind.speed,
        })
      }, (error) => {
        if (error) throw error;
      })
      .then(() => {
        this.setState({
          dataIsSet: true,
        })
      })
      .catch((error) => {
        console.log(error);
        this.props.history.push('/');
      })
  }

  render() {
    return (
      <ViewResultWithLoad isSet={this.state.dataIsSet} weather={this.state}/>
    )
  };
}
export default CityView