import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as firebase from 'firebase';

import TopItem from './TopItem'

import contestImg from '../../contestImg.png'
import userOnImg from '../../userOnImg.png'
import heartImg from '../../main_contest_heart_icon.png'
import imgContainer from '../../main_contest_ring_thick.png'

import sample1 from '../../sample1.jpg'
import sample2 from '../../sample2.jpg'
import sample3 from '../../sample3.jpg'

import './Top.css';

const Top = ({challengers}) => {
    const first = <TopItem challenger={challengers[0]}/>
    const second = <TopItem challenger={challengers[1]}/>
    const third = <TopItem challenger={challengers[2]}/>

    return (
        <div className = "topContainer" >
            <img src = {heartImg} className = "heartImg"/>
            
            <div className = "topHeadLine" >
                <p className = "rankNumberOneNow">컨테스트 실시간 순위</p>
                <Link to="/ranking" className = "rankCheck">순위확인 >></Link>
            </div>
                {first}
                {second}
                {third}
        </div>
    );
};

export default Top;