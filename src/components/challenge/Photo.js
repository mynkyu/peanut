import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setImg } from '../../actions';
import contestImg from '../../contestImg.png'

class Photo extends Component {
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
        if (this.state.imageBlob) {
            return <Redirect push to="/challenge/crop"/>;
        }

        return (
            <div>
                <div>과연 당신의 일치율은?</div>
                <img src={contestImg}/>
                <div>
                    <div> <input type="file" id="imageBtn"/> </div>
                </div>
                <div>에드센스</div>
            </div>
        );
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onSetImg: (blob) => dispatch(setImg(blob))
    }
}

Photo = connect(undefined, mapDispatchToProps)(Photo);

export default Photo;