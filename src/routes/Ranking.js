import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import RankingContainer from '../container/ranking/RankingContainer'
import ChallengerContainer from '../container/ranking/ChallengerContainer'

class Ranking extends Component {
    render() {
        return (
            <div>
                <Route exact path="/ranking" component={RankingContainer}/>
                <Route exact path="/ranking/challenger/:uid" component={ChallengerContainer}/>
            </div>
        );
    }
}

export default Ranking;