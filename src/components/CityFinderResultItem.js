import React, { Component } from 'react'

class CityFinderResultItem extends Component {
  altCityNamePrint = () => {
    if (this.props.listing.altCityName) {
       return (` (${this.props.listing.altCityName})`)
    } else {
      return ''
    }
  };

  render() {
    return (
      <div key={this.props.id}
           tabIndex={0}
           className={'searched-city--item'}
           onClick={() => {this.props.citySelectHandler(this.props.listing.gid)}}>
        <div className={'searched-city-item--city'}>{this.props.listing.cityName}<span className={'searched-city-item--altcity'}>{this.altCityNamePrint()}</span></div>
        <div className={'searched-city-item--region'}>{this.props.listing.regionName},</div>
        <div className={'searched-city-item--country'}>{this.props.listing.countryName}</div>
      </div>
    );
  }
}

export default CityFinderResultItem;