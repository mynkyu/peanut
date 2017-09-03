import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './Header';

import Home from './routes/Home';
import Ranking from './routes/Ranking';
import Challenge from './routes/Challenge';
import NotFound from './routes/NotFound'

class App extends Component {
  render() {
    return (  
      <Router>
        <div>
        <Header/>
          <div>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/home" component={Home}/>
              <Route path="/ranking" component={Ranking}/>
              <Route path="/challenge" component={Challenge}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;