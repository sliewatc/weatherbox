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
    console.log(sessionStorage.getItem('access_token'));
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
