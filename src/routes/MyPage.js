import React, { Component } from 'react';

import MyPageContainer from '../container/mypage/MyPageContainer'

class MyPage extends Component {
    render() {
        return (
            <MyPageContainer uid = {this.props.match.params.uid}/>
        );
    }
}

export default MyPage;