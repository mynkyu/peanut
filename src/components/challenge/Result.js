import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Result extends Component {
    componentDidMount() {
         const result = this.props.match.params.result
         document.getElementById('result').innerText = result
    }

    render() {
        if (this.props.match.params.result == 100) {
            return (
                <div>
                    <div><a id='result'></a></div>
                    <div>로그인</div>
                </div>
            );
        } 
        
        return (
            <div>
                <div><a id='result'></a></div>
                <div><Link to="/challenge">사진 선택으로 되돌아 가기</Link></div>
            </div>
        );
    }
}

export default Result;