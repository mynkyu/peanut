import React, { Component } from 'react';

import * as firebase from '../../api/Firebase';
import RankingList from '../../components/ranking/RankingList'


import './RankingContainer.css';

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

                

                <div className = "titleLabel"><p>실시간 투표 순위</p></div>
                <RankingList
                    challengers = {challengers}
                />        
            </div>
        );
    }
}

export default RankingContainer;