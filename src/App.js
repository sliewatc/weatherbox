import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'
import CityFinder from './components/CityFinder'
import CityView from './components/CityView'

const CityViewRouted = withRouter(CityView);
const CityFinderRouted = withRouter(CityFinder);

class App extends Component {
  constructor() {
    super();
    this.state = {
      spotifyAccessToken: null,
    }
  }

  getClientCredentialsToken = async () => {
    const response = await fetch('/api/gat');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  componentDidMount() {
    this.getClientCredentialsToken()
      .then(res => {
        this.setState({
          spotifyAccessToken: res.access_token
        })
      })
      .catch(error => console.log(error));
  }

  CityViewRoutedPropped = (props) => {
    return (
      <CityViewRouted
        spotifyAccessToken={this.state.spotifyAccessToken}
        {...props}
      />
    );
  };

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Link to='/'>Home</Link>
            <hr/>
            <Route exact path="/" component={CityFinderRouted}/>
            <Route exact path="/city/:gid" render={this.CityViewRoutedPropped}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
