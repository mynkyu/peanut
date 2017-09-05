import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as firebase from 'firebase';

class Process extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile : null,
            response : null
        }

        this.uploadImage = this.uploadImage.bind(this)
    }

    componentWillReceiveProps(props) {
        if (props.profile) {
            this.setState({
                profile : props.profile 
            })
        }

        if (props.blob) {
            this.uploadImage(props.blob)
        }
    }

    uploadImage(blob) {
        if(!blob) {return}

        const instance = this
        var file = blob;
        var storageRef = firebase.storage().ref('test/' + file.name)
        var task = storageRef.put(file)
        task.on('state_changed', function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log("업로드 : " + percentage)
        },
        function error(err) {},
        function complete() {
            instance.setState({
                response: 100
            })
        })
    }

    render() {
        if (this.state.response) {
            var path = "/challenge/response/" + this.state.response

            if(this.state.profile) {
                path = "/challenge/result"
            }

            return <Redirect to={path}/>;
        }

        return (
            <div>
                <div>에드센스</div>
                <div>계산 중입니다</div>
                <div>에드센스</div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profile.profile,
        blob: state.crop.cropImg
    };
}

Process = connect(mapStateToProps)(Process);

export default Process;