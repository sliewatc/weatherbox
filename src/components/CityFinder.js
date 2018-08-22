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
      searchShownClass: '',
      searchLockScroll: '',
      emptySearch: false,
      searchActive: false
    };

    // Handle token expiry
    const HOUR = 1000 * 60 * 60;
    const hourAgo = Date.now() - HOUR;
    if (localStorage.getItem('token_set_timestamp') < hourAgo) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('token_set_timestamp');
    }
  }

  componentDidMount() {
  }

  unlockPageHeight = () => {
    this.setState({
      searchLockScroll: 'city-results--shown-lock',
      searchActive: true
    });
    setTimeout(() => {
      this.setState({ searchLockScroll: '' }, () => {
        if (this.state.searchResult.length === 0) {
          this.setState({
            emptySearch: true,
          })
        }
      });
    }, 425);
  };

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
          searchResult: stateOfResults,
          emptySearch: false,
          searchActive: true,
          searchShownClass: 'city-results--shown'
        }, this.unlockPageHeight());
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.value) return;

    const resultLimit = 5;
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
    }, () => {
      if (this.state.value === '') {
        this.setState({
          searchResult: [],
          lastQuery: null,
          gid: null,
          searchShownClass: '',
          searchLockScroll: '',
          emptySearch: false,
          searchActive: false,
        })
      }
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

  renderFinderTitle = () => {
    let accessToken = localStorage.getItem('access_token');
    if (accessToken !== 'undefined' && accessToken !== undefined && accessToken !== null && typeof accessToken !== 'undefined') {
      return (
        <p className={'city-finder--title'}>Find a city's tune</p>
      )
    } else {
      return (
        <p className={'city-finder--title'}><a className={'city-finder--title-connect'} href={'http://localhost:5000/api/spotify/login'}>Connect to <span className={'city-finder--title-spotify'}>Spotify</span></a></p>
      )
    }
  };

  renderAboutWeatherBox = () => {
    if ((!this.state.searchActive)) {
      return (
        <div className={'about-weatherbox--wrapper'}>
          <div className={'about-weatherbox--center'}>
            <div className={'about-weatherbox--primary'}>City. Weather. Music</div>
          </div>
        </div>
      );
    }
  };

  renderRedirect =  () => {
    if (this.state.redirect) {
      this.props.history.push(`/city/${this.state.gid}`);
    }
  };

  render() {
    return (
      <div className={`city-finder-page--spacing-force-wrapper ${this.state.searchLockScroll}`}>
        <div className={`city-finder-page--wrapper ${this.state.searchShownClass}`}>
          <div className={'city-finder--page-title'}>Weatherbox</div>
          {this.renderFinderTitle()}
          <div className={'city-finder-form--wrapper'}>
            <form onSubmit={this.handleSubmit} className={'searched-city--form'}>
              <input type='text'
                     value={this.state.value}
                     placeholder={'places'}
                     onChange={this.handleChange}/>
              <input type='submit' value={'>'}/>
            </form>
          </div>
          {this.state.emptySearch ? <div className={'city-finder--no-results'}>There's nothing here!</div> : ''}
          <CityFinderResultList searchResult={this.state.searchResult}
                                citySelectHandler={this.citySelectHandler}/>
          {this.renderAboutWeatherBox()}
          <div className="credit-to-me">
            Made with	<span className="credit-to-me--heart">&#10084;</span> by <a href={'http://seanliew.me'} className="credit-to-me--name">Sean Liew</a>
          </div>
        </div>
      </div>
    )
  }
}

export default CityFinder