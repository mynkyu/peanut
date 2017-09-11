import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom'

import qwest from 'qwest';
import InfiniteScroll from 'react-infinite-scroller';

import ChallengerContainer from '../ranking/ChallengerContainer';
import Feed from '../../components/feed/Feed';
import * as firebase from '../../api/Firebase';

import './FeedContainer.css'

class FeedContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
        challengers: [],
        hasMoreItems: true,
        nextHref: null
    };
  }
  
  loadItems(page) {
    var self = this;
    
    var time = null
    if(this.state.nextHref) {
      time = this.state.nextHref;
    }

    firebase.getChallengerFeed(time).then((feed) => {
      if(feed) {
        var challengers = self.state.challengers;
        feed.map((challenger) => {
          challengers.push(challenger)
        })
        self.setState({
          challengers: challengers,
          nextHref: (feed[feed.length-1].time - 1)
        });
      } else {
        self.setState({
          hasMoreItems: false
        });
      }
    })
  }

  render() {
    const instance = this

    var items = [];
    this.state.challengers.map((challenger, i) => {
      items.push(
            <Feed challenger={challenger} key={i}/>
      );
    });

    const loader = <div className="loader">Loading ...</div>;

    return (
      <div>
        <div className = "leftTimeDiv">
              <p>8월 4주차 컨테스트</p>
              <p id = "leftTimeLabel" >결과 발표까지 00: 00 : 00 : 00!</p>
            </div>
                
            <div className = "peopleNumberDiv">
              <p>지금까지 지원자 수</p>
              <p id = "peopleNumberLabel" >345,421명!</p>
            </div>
       
        <Route path="/feed/:uid" component={ChallengerContainer}/>
        <div>
          


          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadItems.bind(this)}
            hasMore={this.state.hasMoreItems}
            loader={loader}>


            
            
            <div className="challengers">
                {items}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default FeedContainer;