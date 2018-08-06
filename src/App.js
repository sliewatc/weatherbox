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
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Link to='/'>Home</Link>
            <hr/>
            <Route exact path="/" component={CityFinderRouted}/>
            <Route exact path="/city/:gid" component={CityViewRouted}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
