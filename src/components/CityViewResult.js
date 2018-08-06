import React, { Component } from 'react'
import CityViewMusic from './CityViewResultMusic'

class CityViewResult extends Component {
  constructor() {
    super();
    this.state = {
    }
  }
  renderMusic = () => {
    if (this.props.parentState.dataIsSet) {
      return (<CityViewMusic weatherContext={this.props.parentState}/>)
    }
  };
  render () {
    return(
      <div>
        <h2>
          {this.props.parentState.cityName} - {this.props.parentState.gid}
        </h2>
        <p>
          Weather: {this.props.parentState.cityCond} - {this.props.parentState.cityCondDescription} -
          Wind: {this.props.parentState.cityWind}m/s -
          Temperature: {this.props.parentState.cityTemp}°C
        </p>
        {this.renderMusic()}
      </div>
    )
  }
}

export default CityViewResult