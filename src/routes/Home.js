import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import HomeContainer from '../container/home/HomeContainer'

import './Home.css'

class Home extends Component {
    render() {
        const location = this.props.location.search
        const feed = new URLSearchParams(location).get('feed')
        console.log(feed)
        if(feed) {
            const path = 'feed/' + feed
            return <Redirect to={path}/>
        }
        return (
            <HomeContainer/>
        );
    }
}

export default Home;