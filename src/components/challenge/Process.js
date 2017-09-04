import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

class Process extends Component {

    componentWillReceiveProps(props) {
        if (props.blob) {
            this.uploadImage(props.blob)
        }
    }

    uploadImage(blob) {
        if(!blob) {return}

        var file = blob;
        var storageRef = firebase.storage().ref('test/' + file.name)
        var task = storageRef.put(file)
        task.on('state_changed', function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log("업로드 : " + percentage)
        },
        function error(err) {},
        function complete() {}
        )
    }

    render() {
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
        blob: state.crop.blob
    };
}

Process = connect(mapStateToProps)(Process);

export default Process;