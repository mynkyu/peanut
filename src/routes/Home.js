import React, { Component } from 'react';

import Top from '../components/main/Top'
import Challenge from '../components/main/Challenge'

import './Home.css'

class Post extends Component {
    render() {
        return (
            <h2>
                {this.props.match.params.name}
            </h2>
        );
    }
}

class Home extends Component {
    render() {
        return (
            <div>
                <div className="announcement">그 분과 내 얼굴의 일치율을 확인해 보세요!</div>
                <Top/>
                <Challenge/>
                {/* <button onClick={()=>{this.props.history.push('/posts')}} > 포스트 </button> */}
            </div>
        );
    }
}

export default Home;