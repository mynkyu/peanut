import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { setImg, setCropImg } from '../../actions';
import Croppie from 'croppie'
import croppieStyle from 'croppie/croppie.css'

import './Crop.css'

class Crop extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imageBlob : null
        }

        this.setCrop = this.setCrop.bind(this)
    }

    componentDidMount() {
        this.setCrop(this.props.blob)
    }

    setCrop(image) {
        if(!image) {return}

        const instance = this
        
        function setCropImg(blob) {
            instance.setState({ imageBlob: blob });
            instance.props.onSetCropImg(blob)
            instance.props.removeImg()
        }

        var el = document.getElementById('cropImage');
        var crop = new Croppie(el, {
          viewport: { width: 200, height: 200 },
          boundary: { width: 300, height: 300 },
          showZoomer: true,
          enableOrientation: true,
          enableExif: true
        });
        crop.bind({
          url: image
        });

        document.getElementById('uploadBtn').addEventListener('click', function(ev) {
            crop.result('blob').then(function(blob) {
                setCropImg(blob)
            });
        })
    }

    render() {
        if (this.state.imageBlob) {
            return <Redirect to="/challenge/process"/>;
        }

        return (
            <div>
                <div className='guideDiv'>
                    <p id='guideText'>얼굴에 맞게 줌을 확 땡겨주세요</p>
                </div>
                <div>
                    <div id="cropImage" className="croppie-container cropDiv"/>
                </div>
                <div className='uploadButton'> 
                    <button className='uploadButtonLabel' id="uploadBtn">일치율 확인</button>
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
        removeImg : () => dispatch(setImg(null)),
        onSetCropImg: (blob) => dispatch(setCropImg(blob))
    }
}

Crop = connect(mapStateToProps, mapDispatchToProps)(Crop);

export default Crop;