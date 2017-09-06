import React, { Component } from 'react';

import * as firebase from '../../api/Firebase';
import RankingList from '../../components/ranking/RankingList'

class RankingContainer extends Component {
    constructor() {
        super()
        this.state = {
            challengers : []
        }
    }

    componentDidMount() {
        const instance = this
        firebase.getRanking().then(function(challengers){
            //console.log(challengers)
            
            instance.setState({
                challengers : challengers
            })
            
        }, function(error) {

        })
    }

    render() {
        const challengers = this.state.challengers

        return (
            <div>
                <div>실시간 투표 상황</div>
                <RankingList
                    challengers = {challengers}
                />        
            </div>
        );
    }
}

export default RankingContainer;