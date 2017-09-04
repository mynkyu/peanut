import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Response extends Component {

    componentDidMount() {
         const response = this.props.match.params.response
         document.getElementById('response').innerText = response
    }

    render() {
        if (this.props.match.params.response == 100) {
            return (
                <div>
                    <div><a id='response'></a></div>
                    <div><Link to="/challenge/result">로그인</Link></div>
                </div>
            );
        } 
        
        return (
            <div>
                <div><a id='response'></a></div>
                <div><Link to="/challenge">사진 선택으로 되돌아 가기</Link></div>
            </div>
        );
    }
}

export default Response;