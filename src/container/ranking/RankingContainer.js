import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import * as firebase from '../../api/Firebase';
import RankingList from '../../components/ranking/RankingList'


import './RankingContainer.css';

class RankingContainer extends Component {
    constructor() {
        super()
        this.state = {
            data : [],
            challengers : [],
            hasMoreItems: true,
            nextHref: null
        }
    }

    componentDidMount() {
        const instance = this
        firebase.getRanking().then(function(data){
            instance.setState({ data : data })
        }, function(error) {
        })
    }

    loadItems(page) {
        var self = this;
        
        var start = 0
        const data = this.state.data
        const length = data.length
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
            console.log("end")
            self.setState({ hasMoreItems: false });
        }
      }

    render() {
        // var items = [];
        // this.state.challengers.map((challenger, i) => {
        //   items.push(
        //         <Ranking 
        //             challenger={challenger} 
        //             key={i}
        //         />
        //   );
        // });
    
        // const loader = <div className="loader">Loading ...</div>;

        return (
            <div>
                <div className = "titleLabel"><p>실시간 투표 순위</p></div>
                <div>
                    <RankingList
                        challengers={this.state.data}
                    />
                    {/* <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadItems.bind(this)}
                        hasMore={this.state.hasMoreItems}
                        loader={loader}>
                        <div className="challengers">
                            {items}
                        </div>
                    </InfiniteScroll> */}
                </div>
            </div>
        );
    }
}

export default RankingContainer;