import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import qwest from 'qwest';
import InfiniteScroll from 'react-infinite-scroller';

import * as firebase from '../../api/Firebase';

class FeedContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
        tracks: [],
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
        var tracks = self.state.tracks;
        feed.map((challenger) => {
          tracks.push(challenger)
        })
        self.setState({
          tracks: tracks,
          nextHref: (feed[feed.length-1].time - 1)
        });
      } else {
        self.setState({
          hasMoreItems: false
        });
      }
    })

    /*
    var url = api.baseUrl + '/users/8665091/favorites';
    if(this.state.nextHref) {
        url = this.state.nextHref;
    }

    qwest.get(url, {
      client_id: api.client_id,
      linked_partitioning: 1,
      page_size: 10
    }, {
      cache: true
    }).then(function(xhr, resp) {
      if(resp) {
        var tracks = self.state.tracks;
        resp.collection.map((track) => {
          if(track.artwork_url == null) {
              track.artwork_url = track.user.avatar_url;
          }

          tracks.push(track);
        });

        if(resp.next_href) {
          self.setState({
              tracks: tracks,
              nextHref: resp.next_href
          });
        } else {
          self.setState({
              hasMoreItems: false
          });
        }
      }
    });
    */
  }

  render() {
    const loader = <div className="loader">Loading ...</div>;
    
    var items = [];
    this.state.tracks.map((track, i) => {
        items.push(
            <div className="track" key={i}>
              <img src={track.imageURL} width="150" height="150" />
              <p>올린 시각 {track.time}</p>
            </div>
        );
    });

    return (
      <div>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadItems.bind(this)}
          hasMore={this.state.hasMoreItems}
          loader={loader}>

          <div className="tracks">
              {items}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default FeedContainer;