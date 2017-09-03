import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom'

class Post extends Component {
    render() {
        return (
            <h2>
                {this.props.match.params.title}
            </h2>
        );
    }
}

class Posts extends Component {
    render() {
        return (
            <div>
                <h1>포스트</h1>
                <Link to="/posts/react">React</Link>
                <Link to="/posts/redux">Redux</Link>
                <Link to="/posts/relay">Relay</Link>
                <Route
                    path="/posts/:title"
                    component={Post}
                />
            </div>
        );
    }
}

export default Posts;