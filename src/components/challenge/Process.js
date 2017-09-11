import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setChallengeResult } from '../../actions';
import * as firebase from 'firebase';

import * as firebaseApi from '../../api/Firebase';
import * as facelink from '../../api/FaceLink';

import './Process.css';

class Process extends Component {
    constructor(props) {
        super(props)
        this.state = {
            response : null,
            similarity : null
        }

        this.uploadImage = this.uploadImage.bind(this)
    }

    componentWillReceiveProps(props) {
        if (props.blob) {
            this.uploadImage(props.blob)
        }
    }

    uploadImage(blob) {
        if(!blob) {return}

        const instance = this
        var file = blob;
        var storageRef = firebase.storage().ref(firebaseApi.getStorageFileName())
        var task = storageRef.put(file)
        task.on('state_changed', function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log("업로드 : " + percentage)
        },
        function error(err) {},
        function complete() {    
            //instance.setState({ response: 100 })
            var downloadURL = task.snapshot.downloadURL;
            instance.fetchSimilarity(downloadURL);
        })
    }

    fetchSimilarity = async (imageURL) => {
        const result = await facelink.getSimilarity(imageURL);
        console.log(result)

        if (result.data && result.data.response) {
            const response = result.data.response
            this.setState({ response : response })
        } else {
            return
        }

        if (result.data.result && result.data.result.similarity) {
            const similarity = Math.floor(result.data.result.similarity * 100)/100
            this.setState({ similarity : similarity })
            this.props.onSetChallengeResult(imageURL, similarity)
        }
    }

    render() {
        if (this.state.response) {
            var path = "/challenge/response/" + this.state.response

            if(this.props.profile && this.state.similarity) {
                path = "/challenge/result"
            }

            return <Redirect to={path}/>;
        }

        return (
            <div className='processDiv'>
                <p id='processText'>
                    "얼굴 파이터는 얼굴로 말한다"<br/>
                    일치율 계산 중...
                </p>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profile.profile,
        blob: state.challenge.cropImg
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        onSetChallengeResult: (imageURL, similarity) => dispatch(setChallengeResult(imageURL, similarity))
    }
}

Process = connect(mapStateToProps, mapDispatchToProps)(Process);

export default Process;