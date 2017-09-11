import React, { Component } from 'react';

import Top from '../../components/home/Top'
import Challenge from '../../components/home/Challenge'
import Vote from '../../components/home/Vote'
import Legend from '../../components/home/Legend'


import * as firebase from '../../api/Firebase';

class HomeContainer extends Component {
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
                <div className="announcement">그 분과 내 얼굴의 일치율을 확인해 보세요!</div>
                <Top
                    challengers = {challengers}
                />
                <Challenge/>
                <Vote/>
                <Legend/>
            </div>
        );
    }
}

export default HomeContainer;