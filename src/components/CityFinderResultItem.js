import React, { Component } from 'react'

class CityFinderResultItem extends Component {
  altCityNamePrint = () => {
    if (this.props.listing.altCityName) {
      return (` (${this.props.listing.altCityName})`)
    } else {
      return ''
    }
  };

  handleEnterPressed = (e) => {
    let code = e.keyCode || e.which;
    if (code === 13) {
      this.props.citySelectHandler(this.props.listing.gid);
    }
  };

  render() {
    return (
      <a key={this.props.id}
         tabIndex={0}
         className={'searched-city--item'}
         onKeyPress={(e) => this.handleEnterPressed(e)}
         onClick={() => {this.props.citySelectHandler(this.props.listing.gid)}}>
        <div className={'searched-city-item--city'}>{this.props.listing.cityName}
          <span className={'searched-city-item--altcity'}>{this.altCityNamePrint()}</span>
        </div>
        <div className={'searched-city-item--region'}>{this.props.listing.regionName},</div>
        <div className={'searched-city-item--country'}>{this.props.listing.countryName}</div>
      </a>
    );
  }
}

export default CityFinderResultItem;