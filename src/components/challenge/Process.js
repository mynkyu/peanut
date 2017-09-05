import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setSimilarity } from '../../actions';
import * as firebase from 'firebase';

import * as facelink from '../../api/FaceLink';

class Process extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile : null,
            response : null,
            similarity : null
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
            //instance.setState({ response: 100 })
            var downloadURL = task.snapshot.downloadURL;
            instance.fetchSimilarity(downloadURL);
        })
    }

    fetchSimilarity = async (imageUri) => {
        const result = await facelink.getSimilarity(imageUri);

        if (result.data && result.data.response) {
            const response = result.data.response
            this.setState({ response : response })
        } else {
            return
        }

        if (result.data.result && result.data.result.similarity) {
            const similarity = result.data.result.similarity
            this.setState({ similarity : similarity })
            this.props.onSetSimilarity(similarity)
        }
    }

    render() {
        if (this.state.response && this.state.similarity) {
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
        blob: state.challenge.cropImg
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        onSetSimilarity: (similarity) => dispatch(setSimilarity(similarity))
    }
}

Process = connect(mapStateToProps, mapDispatchToProps)(Process);

export default Process;