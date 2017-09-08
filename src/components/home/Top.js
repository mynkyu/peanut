import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as firebase from 'firebase';

import TopItem from './TopItem'

import contestImg from '../../contestImg.png'
import userOnImg from '../../userOnImg.png'
import heartImg from '../../main_contest_heart_icon.png'
import imgContainer from '../../main_contest_ring.png'

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
                <p className = "rankNumberOneNow">컨테스트 컨테스트 순위
                        
                </p> 
                <Link to="/ranking" className = "rankCheck">순위확인>></Link>
            </div>
                {first}
                {second}
                {third}
{/*             
                
                <div className = "imgContainer firstContainer">
                    <img src = {imgContainer}/>

                    <div className = "firstPrize">
                        <img src = {sample1}/>
                    </div>

                    <p>3340231 표</p>
                </div>
                
                <div className = "imgContainer secondContainer">
                    <img src = {imgContainer}/>

                    <div className = "secondPrize">
                        <img src = {sample2}/>
                    </div>
                    <p>1265136 표</p>
                </div>

                <div className = "imgContainer thirdContainer">
                    <img src = {imgContainer}/>

                    <div className = "thirdPrize">
                        <img src = {sample3}/>
                    </div>
                    <p>552452 표</p>
                </div>

            


             */}
        </div>
    );
};

export default Top;