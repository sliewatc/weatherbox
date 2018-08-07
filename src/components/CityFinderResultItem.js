import React, { Component } from 'react'

class CityFinderResultItem extends Component {
  render() {
    return (
      <div key={this.props.id}
           className={'searched-city--item'}
           onClick={() => {this.props.citySelectHandler(this.props.listing.gid)}}>
        {this.props.listing.cityName} - {this.props.listing.countryName} - {this.props.listing.regionName} - {this.props.listing.altCityName}
      </div>
    );
  }
}

export default CityFinderResultItem;