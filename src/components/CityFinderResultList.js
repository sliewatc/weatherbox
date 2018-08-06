import React, { Component } from 'react'
import CityFinderResultItem from './CityFinderResultItem'

class CityFinderResultList extends Component {
  render() {
    return (
      <div className={'searched-cities--wrapper'}>
        {this.props.searchResult.map((result, index) => {
          return (
            <CityFinderResultItem
              key={index}
              listing={result}
              citySelectHandler={this.props.citySelectHandler}/>
          )
        })}
      </div>
    )
  }
}

export default CityFinderResultList;