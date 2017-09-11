import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Timer from './Timer'
import * as event from '../../api/Event';

import { setImg } from '../../actions';
import contestImg from '../../contestImg.png'

import contest8Ring from '../../contest_2rings.png'
import cameraButton from '../../contest_cameraicon.png'
import facebookButton from '../../contest_facebook.png'
import sample2 from '../../sample2.jpg'

import './Photo.css';

class Photo extends Component {
    constructor(props) {
        super(props)

        this.setButton = this.setButton.bind(this)
    }

    componentDidMount() {
        this.setButton()
    }

    setButton() {
        const instance = this
        function setImg(blob) {
            instance.setState({ imageBlob: blob });
            instance.props.onSetImg(blob)
        }

        const imageType = /^image\//;
        const imageBtn = document.getElementById('imageBtn')
        imageBtn.addEventListener('change', function(e) {
            const file = e.target.files.item(0);
            if (!file || !imageType.test(file.type)) {
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e2) => {
                setImg(e2.target.result)
            }
            
            reader.readAsDataURL(file);
        })
    }

    render() {
        if (this.props.blob) {
            return <Redirect to="/challenge/crop"/>;
        }

        return (
            <div>
                <div className = "leftTimeDiv">
                    <p>{event.getEventWeek()} 컨테스트</p>
                    <Timer 
                        id='leftTimeLabel'
                        text='결과 발표까지'/>
                </div>
                <div className = "peopleNumberDiv">
                    <p>지금까지 지원자 수</p>
                    <p id = "peopleNumberLabel" >345,421명!</p>
                </div>
                <div className="faceLinkDiv">
                    <p>과연 당신의 일치율은?</p>
                    <div className = "ringImage" ><img  src={contest8Ring}/>
                        <div className = "personForChallenge"><img src={sample2}/></div>
                        <div className = "buttonDiv">
                            <div className="photoSelectButton">
                                <input type="file" id="imageBtn" className="imageSelectInput"></input>
                                <img src = {cameraButton}/>
                                <p>카메라<br/>&amp;앨범</p>
                            </div>
                            <div className="facebookPhotoButton">
                                <img src = {facebookButton}/>
                                <p>프로필<br/>&amp;사진</p>

                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        blob: state.challenge.img
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        onSetImg: (blob) => dispatch(setImg(blob))
    }
}

Photo = connect(mapStateToProps, mapDispatchToProps)(Photo);

export default Photo;