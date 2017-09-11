import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom'

import qwest from 'qwest';
import InfiniteScroll from 'react-infinite-scroller';

import * as event from '../../api/Event';
import * as firebase from '../../api/Firebase';

import ChallengerContainer from '../ranking/ChallengerContainer';
import Timer from '../../components/challenge/Timer';
import Feed from '../../components/feed/Feed';

import personImg from '../../person_img.png'

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
          <p>{event.getEventWeek()} 컨테스트</p>
          <Timer
            id='leftTimeLabel'
            text='결과 발표까지'/>
        </div>
        
        <div className = "titleDiv">
          <p>실시간 후보 현황</p>
          <img src = {personImg} ></img>
        </div>

        {/* <div className = "peopleNumberDiv">
          <p>지금까지 도전자 수</p>
          <p id = "peopleNumberLabel" >345,421명!</p>
        </div> */}
       
        <Route path="/feed/:uid" component={ChallengerContainer}/>
        
        <div>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadItems.bind(this)}
            hasMore={this.state.hasMoreItems}
            loader={loader}>

            <li className="challengersContainer">
                {/* <div className= "refreshButton">                     
                </div> */}
                {items}
            </li>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default FeedContainer;