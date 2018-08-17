import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import CityFinder from './components/CityFinder'
import CityView from './components/CityView'
import SetImplicitToken from './components/SetImplicitToken'

const CityViewRouted = withRouter(CityView);
const CityFinderRouted = withRouter(CityFinder);

class App extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount() {
    console.log('token set: ' + localStorage.getItem('access_token'));

    const HOUR = 1000 * 60 * 60;
    const hourAgo = Date.now() - HOUR;
    if (localStorage.getItem('token_set_timestamp') < hourAgo) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('token_set_timestamp');
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div className={'weatherbox-page--wrapper'}>
            <Route expact path="/user/login/settoken" component={SetImplicitToken}/>
            <Route exact path="/" component={CityFinderRouted}/>
            <Route exact path="/city/:gid" component={CityViewRouted}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
