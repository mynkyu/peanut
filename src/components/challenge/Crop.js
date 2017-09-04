import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { setCropImg } from '../../actions';
import Croppie from 'croppie'
import croppieStyle from 'croppie/croppie.css'

class Crop extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imageBlob : null
        }

        this.setCrop = this.setCrop.bind(this)
    }

    componentWillReceiveProps(props) {
        if (props.blob) {
            this.setCrop(props.blob)
        }
    }

    setCrop(image) {
        const instance = this
        
        function setCropImg(blob) {
            instance.setState({ imageBlob: blob });
            instance.props.onSetCropImg(blob)
        }

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

    render() {
        if (this.state.imageBlob) {
            return <Redirect to="/challenge/process"/>;
        }

        return (
            <div>
                <div>비슷한 표정을 지어보세요</div>
                <div>
                    <div id="cropImage" className="croppie-container"/>
                </div>
                <div> <button id="uploadBtn">이미지 업로드</button></div>
                <div>에드센스</div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        blob: state.crop.img
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        onSetCropImg: (blob) => dispatch(setCropImg(blob))
    }
}

Crop = connect(mapStateToProps, mapDispatchToProps)(Crop);

export default Crop;