import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import Header from './Header';

import Home from './routes/Home';
import Ranking from './routes/Ranking';
import Challenge from './routes/Challenge';
import Feed from './routes/Feed';
import MyPage from './routes/MyPage';
import NotFound from './routes/NotFound'

import './App.css'

const history = createBrowserHistory()
class App extends Component {
  render() {
    
    return (  
      <Router history={history}>
        <div>
        <Header/>
          <div className='bodyContainer'>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/home" component={Home}/>
              <Route path="/ranking" component={Ranking}/>
              <Route path="/challenge" component={Challenge}/>
              <Route path="/mypage/:uid" component={MyPage}/>
              <Route path="/feed" component={Feed}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;