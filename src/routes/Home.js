import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import HomeContainer from '../container/home/HomeContainer'
import FaceLinkContainer from '../container/facelink/FaceLinkContainer'
import Term from '../container/term/Term'

import './Home.css'

class Home extends Component {

    render() {
        const location = this.props.location.search
        
        const ranking = new URLSearchParams(location).get('ranking')
        const challenge = new URLSearchParams(location).get('challenge')
        const mypage = new URLSearchParams(location).get('mypage')
        const feed = new URLSearchParams(location).get('feed')
        
        var path = null

        if(ranking) {
            path = 'ranking/' + ranking
            return <Redirect to={path}/>
        }

        if(challenge) {
            path = 'challenge/'
            return <Redirect to={path}/>
        }

        if(mypage) {
            path = 'mypage/' + mypage
            return <Redirect to={path}/>
        }

        if(feed) {
            path = 'feed/' + feed
            return <Redirect to={path}/>
        }


        const to = new URLSearchParams(location).get('to')
        if(to) {
            switch(to) {
                case 'facelink' : return <FaceLinkContainer location={location}/>
                case 'term' : return <Term/>
            }
        }


        return (
            <HomeContainer/>
        );
    }
}

export default Home;