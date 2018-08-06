import React, { Component } from 'react'
import CityFinderResultList from './CityFinderResultList'

// matching_full_name field returns a value in the form "{city}, {region}, {country} ({alternate name})"
function parseCityListing(listing) {
  let nameArray = listing.matching_full_name.split(',');
  let cityName = nameArray[0];
  let regionName = nameArray[1];
  let countryAndAlt = nameArray[2].split('(');
  let countryName = countryAndAlt[0];
  let altCityName = '';
  if (typeof countryAndAlt[1] !== 'undefined') {
     altCityName = countryAndAlt[1].replace(')', '');
  }
  let gid = listing._links['city:item'].href.replace(/\D/g,'');

  return {cityName, regionName, countryName, altCityName, gid}
}

class CityFinder extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      searchResult: [],
      lastQuery: null,
      gid: null,
      redirect: false,
    }
  }

  fetchCitiesFromAPI = (url) => {
    fetch(url)
      .then((raw) => {
        return raw.json();
      })
      .then((respJson) => {
        let citiesReturned = [];
        let cityList = respJson._embedded['city:search-results'];
        cityList.map((result) => {
          return citiesReturned.push(parseCityListing((result)));
        });
        return citiesReturned;
      })
      .then((stateOfResults) => {
        this.setState({
          searchResult: stateOfResults
        });
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const resultLimit = 10;
    const query = encodeURIComponent(this.state.value);
    const reqUrl = `https://api.teleport.org/api/cities/?search=${query}&limit=${resultLimit}`;
    if (query !== this.state.lastQuery) {
      this.setState({ lastQuery: query });
      this.fetchCitiesFromAPI(reqUrl);
      return true;
    }
    return false;
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  };

  citySelectHandler = (gid) => {
    this.setState({
      gid: gid,
      redirect: true,
    }, () => {
      this.renderRedirect();
    });
  };

  renderRedirect =  () => {
    if (this.state.redirect) {
      this.props.history.push(`/city/${this.state.gid}`);
    }
  };

  render() {
    return (
      <div className={'city-finder-page--wrapper'}>
        <label>Search a place</label>
        <form onSubmit={this.handleSubmit} className={'searched-city--form'}>
          <input type='text'
                 value={this.state.value}
                 onChange={this.handleChange}/>
          <input type='submit'/>
        </form>
        <CityFinderResultList searchResult={this.state.searchResult}
                              citySelectHandler={this.citySelectHandler}/>
      </div>
    )
  }
}

export default CityFinder