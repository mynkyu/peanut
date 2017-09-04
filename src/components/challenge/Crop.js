import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { setCropImg } from '../../actions';
import Croppie from 'croppie'
import croppieStyle from 'croppie/croppie.css'

import contestImg from '../../contestImg.png'

class Crop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageBlob : null
        }

        this.setButton = this.setButton.bind(this)
    }

    componentDidMount() {
        this.setButton()
    }

    setButton() {
        const instance = this
        function setCropImg(blob) {
            instance.setState({ imageBlob: blob });
            instance.props.onSetCropImg(blob)
        }

        function crop(image) {
            var el = document.getElementById('cropImage');
            var crop = new Croppie(el, {
              viewport: { width: 100, height: 100 },
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

        const imageType = /^image\//;
        const imageBtn = document.getElementById('imageBtn')
        imageBtn.addEventListener('change', function(e) {
            const file = e.target.files.item(0);
            if (!file || !imageType.test(file.type)) {
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e2) => {
                crop(e2.target.result)
            }
            
            reader.readAsDataURL(file);
        })
    }

    render() {
        if (this.state.imageBlob) {
            return <Redirect push to="/challenge/process"/>;
        }

        return (
            <div>
                <div>과연 당신의 일치율은?</div>
                <img src={contestImg}/>
                <div>
                    <div id="cropImage" className="croppie-container"/>
                    <div> <input type="file" id="imageBtn"/> </div>
                    <div> <button id="uploadBtn">이미지 업로드</button></div>
                </div>
                <div>에드센스</div>
            </div>
        );
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onSetCropImg: (blob) => dispatch(setCropImg(blob))
    }
}

Crop = connect(undefined, mapDispatchToProps)(Crop);

export default Crop;