import React, { Component } from 'react';
import Croppie from 'croppie'
import 'croppie/croppie.css'

import ShareContainer from './ShareContainer'

import * as facelink from '../../api/FaceLink'

import userOffImage from '../../userOffImg.png'

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

    setButtons() {
        const self = this

        const croppie = new Croppie(document.getElementById('cropImage'), {
          viewport: { width: 150, height: 150 },
          boundary: { width: 250, height: 250 },
          showZoomer: true,
          enableOrientation: true,
          enableExif: true
        });

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
            nameInput.value = ''
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
            clearNameInput()

            const faces = self.state.face
            if(faces.length >= 2) {
                self.setState({
                    face : []
                })
            }

            faces.push(face)
            self.setState({
                isImageExist : false
            })

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
            if (name.length > 0 && self.state.isImageExist) {
            //if (self.state.isImageExist) {
                croppie.result('blob').then(function(blob) {
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
            return <div> 
                <div>
                    <p>
                        {response[0]} 
                        <bar/>
                        {response[1]} 
                    </p>
                </div>
                <div>
                    <button onClick={this.refresh}>다시하기</button>
                </div>
            </div>
        }

        var text = ''
        if(face.length == 0){
            text = '첫번째 얼굴을 넣어주세요'
        }else if (face.length == 1){
            text = '두번째 얼굴을 넣어주세요'
        }else if (face.length >= 2) {
            return <div>'일치율을 계산 중입니다'</div>
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
                    <input id='imageBtn' type="file"/>
                </div>
                <div> 
                    <button id='rotateLeftBtn'>왼쪽 회전</button>
                    <button id='rotateRightBtn'>오른쪽 회전</button>
                    <button id="uploadBtn">완료</button>
                </div>
                <div> 
                    <button id="resetBtn">다시하기</button>
                </div>
            </div>
        );
    }
}

export default FaceLinkContainer;