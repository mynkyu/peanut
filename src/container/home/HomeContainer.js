import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Top from '../../components/home/Top'
import Challenge from '../../components/home/Challenge'
import Vote from '../../components/home/Vote'
import Legend from '../../components/home/Legend'
import FaceLink from '../../components/home/FaceLink'

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
            <div className="mainContainer">
                <div className="announcement">그 분과 당신의 일치율을 확인해 보세요!</div>
                <Top
                    challengers = {challengers}
                />
                <Challenge/>
                <Vote/>
                <Legend/>
                <FaceLink/>
                {/* <div> <Link to='?to=facelink'>facelink</Link> </div> */}
            </div>
        );
    }
}

export default HomeContainer;