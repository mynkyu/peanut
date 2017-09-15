import React, { Component } from 'react';
import Croppie from 'croppie'
import 'croppie/croppie.css'

import ShareContainer from './ShareContainer'
import Response from '../../components/facelink/Response'
import Process from '../../components/facelink/Process'

import * as facelink from '../../api/FaceLink'
import * as regex from '../../api/Regex'

// 첫번째 두번째
import userOffImage from '../../userOffImg.png'
import userOff2Image from '../../userOnImg.png'

class FaceLinkContainer extends Component {
    constructor() {
        super()
        this.state = {
            face : [],
            isImageExist : false,
            similarity : null,
            response : null,
        }

        this.setButtons = this.setButtons.bind(this)
    }

    componentDidMount() {
        this.setButtons()
    }

    getCroppie() {
        const cropper = document.getElementById('cropImage')
        const croppie = new Croppie(cropper, {
          viewport: { width: 175, height: 225 },
          boundary: { width: 210, height: 270 },
          showZoomer: false,
          enableOrientation: true
        });
        return croppie
    }
    setButtons() {
        const self = this

        var croppie = this.getCroppie()

        const nameInput = document.getElementById('nameInput')
        const uploadBtn = document.getElementById('uploadBtn')
        const rotateLeftBtn = document.getElementById('rotateLeftBtn')
        const rotateRightBtn = document.getElementById('rotateRightBtn')
        const resetBtn = document.getElementById('resetBtn')
        
        const isIE = /*@cc_on!@*/false || !!document.documentMode;
        const imageBtn = document.getElementById('imageBtn')
        const imageType = /^image\//;

        function crop(image) {
            if(image) {
                croppie.destroy()
                croppie = self.getCroppie()
                croppie.bind({url: image});
            }
        }

        function clearImageInput() {
            if(isIE) {
                imageBtn.parentNode.replaceChild(imageBtn.cloneNode(true), imageBtn)
            } else {
                imageBtn.value = ''
            }
        }

        function clearNameInput() {
            nameInput.value='왼쪽땅콩'
        }

        function reset() {
            crop(userOffImage)
            clearNameInput()
            clearImageInput()
            self.setState({
                face : [],
                isImageExist : false,
                response : null
            })
        }

        function select(image) {
            crop(image)
            self.setState({isImageExist:true})
            clearImageInput()
        }

        function upload(face) {
            crop(userOffImage)

            const faces = self.state.face
            if(faces.length >= 2) {
                reset()
            }

            faces.push(face)
            self.setState({
                isImageExist : false
            })

            if(faces.length == 1) {
                nameInput.value = '오른쪽땅콩'
            }

            if(faces.length >= 2) {
                facelink.getFaceLink(faces).then((response) => {
                    if (facelink.checkFaceLinkResponse(response.data)) {
                        console.log("getFaceLink : success")
                        
                        self.setState({
                            similarity: Math.floor(response.data.result.similarity * 100)/100
                        })
                    } else {
                        console.log("getFaceLink : face error")
                        self.setState({
                            response : facelink.getFaceLinkResponse(response.data)
                        })
                    }
                })
            }
        }

        uploadBtn.addEventListener('click', function(ev) {
            const name = nameInput.value
            // if (name.length > 0 && self.state.isImageExist) {
            if (self.state.isImageExist) {
                croppie.result({
                    type : 'blob',
                    format : 'png',
                    quality: '0.9',
                    size: 'original'
                }).then(function(blob) {
                    const face = {
                        image : blob,
                        name : name
                    }
                    upload(face)
                });
            }
        })

        rotateLeftBtn.addEventListener('click', function(ev) {
			croppie.rotate(-90);
        });
        
		rotateRightBtn.addEventListener('click', function(ev) {
			croppie.rotate(90);
        });
        
        resetBtn.addEventListener('click', function(ev) {
			reset()
		});

        imageBtn.addEventListener('change', function(e) {
            const file = e.target.files.item(0);
            if (!file || !imageType.test(file.type)) {
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e2) => {
                select(e2.target.result)
            }
            
            reader.readAsDataURL(file);
        })

        reset()
    }

    refresh() {
        window.location.reload()
    }

    render() {
        const isImageExist = this.state.isImageExist
        const face = this.state.face
        const similarity = this.state.similarity
        const response = this.state.response

        if (similarity) {
            return <ShareContainer
                face = {face}
                similarity = {similarity}
            />
        }

        if (response) {
            return <Response 
                face = {face}
                response = {response}
            />
        }

        var text = ''
        var inputText = ''
        if(face.length == 0){
            text = '먼저 첫번째 얼굴을 넣어주세요'
            inputText = '첫 번째 얼굴 불러오기'
        }else if (face.length == 1){
            text = '이제 두번째 얼굴을 넣어주세요'
            inputText = '두 번째 얼굴 불러오기'
        }else if (face.length >= 2) {
            return <Process/>
        }

        var uploadText = ''
        if (isImageExist) {
            if(face.length >= 2) {
                uploadText = '완료! 두 얼굴간 일치율 확인하기'
            } else {
                uploadText = '적용하기'
            }
        } else {
            uploadText = '사진과 이름을 넣어주세요'
        }

        return (
            <div>
                <div>
                    <p>{text}</p>
                </div>
                <div>
                    <div id="cropImage" className="croppie-container"/>
                </div>
                <div>
                    <p>이름 : <input id='nameInput'/> </p>
                </div>
                <div>
                    {inputText}
                    <input id='imageBtn' type="file"/>
                </div>
                <div> 
                    <button id='rotateLeftBtn'>왼쪽 회전</button>
                    <button id='rotateRightBtn'>오른쪽 회전</button>
                    {/* 적용하기 */}
                    <button id="uploadBtn"> {uploadText} </button>
                </div>
                <div> 
                    <button id="resetBtn">다시하기</button>
                </div>
            </div>
        );
    }
}

export default FaceLinkContainer;