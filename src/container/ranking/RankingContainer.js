import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Route } from 'react-router-dom'

import * as firebase from '../../api/Firebase';
import Ranking from '../../components/ranking/Ranking'
import RankingList from '../../components/ranking/RankingList'
import ChallengerContainer from '../ranking/ChallengerContainer';


import './RankingContainer.css';

class RankingContainer extends Component {
    constructor() {
        super()
        this.state = {
            isDataLoad : false,
            data : [],
            challengers : [],
            hasMoreItems: true,
            nextHref: null
        }
    }

    componentDidMount() {
        const instance = this
        firebase.getRanking().then(function(data){
            instance.setState({ 
                isDataLoad : true,
                data : data 
            })
        }, function(error) {
        })
    }

    loadItems(page) {
        var self = this;
        
        var start = 3
        const data = this.state.data
        const length = data.length

        if(length < 3) {
            self.setState({ hasMoreItems: false });
            return
        }

        const range = 20
        if(this.state.nextHref) {
          start = this.state.nextHref;
        }

        const index = start + range
        const end = Math.min(index, length)

        var challengers = self.state.challengers;

        for(var i = start; i < end; i++) {
            challengers.push(data[i])
        }

        self.setState({
            challengers : challengers,
            nextHref : index
        });

        if (index >= length) {
            self.setState({ hasMoreItems: false });
        }
      }

    render() {
        var topList = []
        const data = this.state.data
        const length = Math.min(3, data.length)
        for(var i = 0; i < length; i++){
            topList.push(data[i])
        }

        var rankingList = <div></div>
        const self = this
        if(this.state.isDataLoad) {
            var items = [];
            this.state.challengers.map((challenger, i) => {
              items.push(
                    <Ranking 
                        challenger={challenger} 
                        key={i}
                    />
              );
            });
        
            const loader = <div className="loader">Loading ...</div>;
            rankingList = <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadItems.bind(this)}
                            hasMore={this.state.hasMoreItems}
                            loader={loader}>
                            <div className='challengersContainer'>
                                {items}
                            </div>
                        </InfiniteScroll>
        }

        return (
            <div>
                <div className = "titleLabel"><p>실시간 투표 순위</p></div>
                <RankingList challengers={topList} />
                <Route exact path="/ranking/:uid" component={ChallengerContainer}/>
                {rankingList}
            </div>
        );
    }
}

export default RankingContainer;