import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as firebase from 'firebase';

import contestImg from '../../contestImg.png'
import userOnImg from '../../userOnImg.png'
import heartImg from '../../main_contest_heart_icon.png'
import imgContainer from '../../main_contest_2rings.png'

import sample1 from '../../sample1.jpg'
import sample2 from '../../sample2.jpg'


import './Top.css';

class Top extends Component {
    constructor() {
        super()

        this.state = {
            dday : 0
        }
    }

    componentDidMount() {
        /*
        var date = new Date(Date.UTC(2017, 9, 30, 24, 0, 0));
        console.log(date)

        firebase.database().ref().child('Event').child('test').set({
            due : date.getTime(),
            imageUri : "imageUri"
        })
        */
    
        var dueDate = new Date("2017-09-30T24:00:00");
        var currDate = new Date();
        var timeDiff = Math.abs(dueDate.getTime() - currDate.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

        this.setState({
            dday : diffDays
        })
        const contestDDay = document.getElementById('contestDDay')

        /*
        const contestDDay = document.getElementById('contestDDay')
        const dbRefObject = firebase.database().ref().child('event/curr');
        dbRefObject.on('value', snap => {
            contestDDay.innerText = JSON.stringify(snap.val(), null, 3);
        });
        */
    }

    render() {
        return (
            <div className = "topContainer" >
                <img src = {heartImg} className = "heartImg"/>
                
                <div className = "topHeadLine" >
                    <p className = "rankNumberOneNow">컨테스트 실시간 1위
                        <span className = "rankNumberOneNowSpan"> D-{this.state.dday}</span>   
                    </p> 
                    <Link to="/ranking" className = "rankCheck">순위확인>></Link>
                </div>

                <div className = "contestContainer">
                    <div className = "imgContainer">
                        <img src = {imgContainer}/>

                        <div className = "myImg">
                            <img src = {sample1}/>
                        </div>
                        <div className = "contestImg">
                            <img src = {sample2}/>
                        </div>
                    
                    </div>
                    
                </div>
                
            </div>
        );
    }
}

export default Top;