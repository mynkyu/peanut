import React, { Component } from 'react';

import * as firebase from '../../api/Firebase'
import * as facebook from '../../api/Facebook'
import * as kakao from '../../api/Kakao'

import './ShareContainer.css'

import contestImage from '../../image/contestImage.jpeg'
import backgroundImage from '../../image/facebookShare.png'

import kakaoIcon from '../../kakao_icon.png'
import facebookIcon from '../../facebook_icon.png'

class ShareContainer extends Component {
    constructor() {
        super()
        this.state = {
            isUploaded : false,
            showImageBlob : null,
            shareImageBlob : null,
            shareImageURL : null
        }

        this.onImageDraw = this.onImageDraw.bind(this)
        this.facebookShare = this.facebookShare.bind(this)
    }

    componentDidMount() {
        // this.drawResult(this.props.face, 47.12)
        this.drawResult(this.props.face, this.props.similarity)
    }

    drawResult(face, similarity) {
        const self = this
        // const leftURL = contestImage
        // const rightURL = contestImage
        const leftName = face[0].name //'보검보검'
        const rightName = face[1].name //'고마해라마이무따아이가'
        const leftNim = '님과'
        const rightNim = '님은'
        const match = '일치!'
        var resultText = ''
        if(similarity < 50) {
            resultText = '괜찮아요... 토닥토닥'
        } else if (similarity < 60){
            resultText = '살짝? 비슷한..것도 같아요.'
        } else if (similarity < 70) {
            resultText = '느낌이 비슷해요'
        } else if (similarity < 80) {
            resultText = '평소에도 닮았다는 소리 듣죠?'
        } else if (similarity < 90) {
            resultText = '거의 판박이네요.'
        } else {
            resultText = '본인이군요.'
        }

        const leftURL = URL.createObjectURL(face[0].image)
        const rightURL = URL.createObjectURL(face[1].image)

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width  = 1200
            canvas.height = 630
            // const canvas = document.getElementById('tutorial');
            if (canvas.getContext) {
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, 600, 315);
                
                
                ctx.font = '500 32px Noto Sans KR';
                ctx.fillStyle = '#f38048';
                ctx.textAlign = "center"
                ctx.fillText(leftNim, 173, 225);
                ctx.fillText(rightNim, 292, 225);

                ctx.textAlign = "left"
                ctx.fillText(match, 435, 510);

                ctx.font = '500 45px Noto Sans KR';
                ctx.textAlign = "right"
                ctx.fillText(similarity + '%', 427, 510);

                const leftNameSize = Math.min(38, 180 / leftName.length)
                ctx.font = '500 ' + leftNameSize +'px Noto Sans KR';
                ctx.fillStyle = '#7d7d7d';
                ctx.textAlign = "center"
                ctx.fillText(leftName, 235, 450, 180);

                const rightNameSize = Math.min(38, 180 / rightName.length)
                ctx.font = '500 ' + rightNameSize +'px Noto Sans KR';
                ctx.fillText(rightName, 475, 450, 180);

                ctx.font = '500 32px Noto Sans KR';
                ctx.fillText(resultText, 391, 565);

                self.drawImage(ctx, leftURL, 268, 278, 102).then((ctx) => {
                    self.drawImage(ctx, rightURL, 515, 278, 102).then((ctx) => {
                        self.onImageDraw(canvas, ctx)
                    })
                })
                // var ctx = canvas.getContext('2d');
                // ctx.drawImage(img, 0, 0, 1200, 630);
                
                
                // ctx.font = '500 32px Noto Sans KR';
                // ctx.fillStyle = '#f38048';
                // ctx.textAlign = "center"
                // ctx.fillText(leftNim, 346, 450);
                // ctx.fillText(rightNim, 583, 450);

                // ctx.textAlign = "left"
                // ctx.fillText(match, 435, 510);

                // ctx.font = '500 45px Noto Sans KR';
                // ctx.textAlign = "right"
                // ctx.fillText(similarity + '%', 427, 510);

                // const leftNameSize = Math.min(38, 180 / leftName.length)
                // ctx.font = '500 ' + leftNameSize +'px Noto Sans KR';
                // ctx.fillStyle = '#7d7d7d';
                // ctx.textAlign = "center"
                // ctx.fillText(leftName, 235, 450, 180);

                // const rightNameSize = Math.min(38, 180 / rightName.length)
                // ctx.font = '500 ' + rightNameSize +'px Noto Sans KR';
                // ctx.fillText(rightName, 475, 450, 180);

                // ctx.font = '500 32px Noto Sans KR';
                // ctx.fillText(resultText, 391, 565);

                // self.drawImage(ctx, leftURL, 268, 278, 102).then((ctx) => {
                //     self.drawImage(ctx, rightURL, 515, 278, 102).then((ctx) => {
                //         self.onImageDraw(canvas, ctx)
                //     })
                // })
            } else {
                // canvas-unsupported code here
            }
        }
        img.src = backgroundImage
    }

    
    drawImage(ctx, image, x, y, r) {
        return new Promise(function (resolve, reject) {
            const img = new Image();
            img.onload = () => {
                ctx.save()
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2, true);
                ctx.clip();
    
                ctx.drawImage(img, x-r, y - (1.2 * r), r * 2, r * 2.571);
                ctx.closePath()
                ctx.restore()
                
                resolve(ctx)
            }
            img.src = image
        })
    }

    onImageDraw(canvas, ctx) {
        const self = this
        
        kakao.sharePeanut()

        canvas.toBlob(function(blob){
            self.setState({shareImageBlob : blob})
        });

        const showCanvas = document.createElement('canvas')
        showCanvas.width  = 785
        showCanvas.height = 630
        const showCtx = showCanvas.getContext('2d');
        showCtx.putImageData(ctx.getImageData(0,0,1200,630), 0, 0) 
        
        showCanvas.toBlob(function(blob){
            self.setState({showImageBlob : blob})
        });
    }

    facebookShare() {
        const self = this
        const shareImageBlob = this.state.shareImageBlob
        const shareImageURL = this.state.shareImageURL

        if (shareImageBlob && !this.state.isUploaded) {
            self.setState({isUploaded : true})
            firebase.updateFaceLinkShare(shareImageBlob).then((shareImageURL) => {
                self.setState({shareImageURL : shareImageURL})
                facebook.shareFaceLink(shareImageURL)
            })
        } else if (shareImageURL){
            facebook.shareFaceLink(shareImageURL)
        }
    }

    refresh() {
        window.location.reload()
    }

    render() {
        const blob = this.state.showImageBlob
        var shareImg = <div></div>
        if (blob) {
            const url = URL.createObjectURL(blob)
            shareImg = <img src={url}/>
        }
        return (
            <div className="shareContainerDiv">
                <div  className="ImageForShare" >
                    {/* <span className='shareText'>&nbsp;</span> */}
                    {/* <canvas id="tutorial" width="1200" height="630"></canvas> */}
                    {shareImg}
                </div>
                <div>
                    <button onClick={this.facebookShare} className="shareWithFacebook">
                        <img src={facebookIcon}/>
                        <p>페이스북에 공유</p>
                    </button>

                    <a id="kakao-link-btn" href="javascript:sendLink()" className="shareWithKakao">
                        <img src={kakaoIcon}/>
                        <p>카카오톡에 공유</p>
                    </a>
                </div>
                <div className="againButton">
                    <button onClick={this.refresh}>다시하기</button>
                </div>
            </div>
        );
    }
}

export default ShareContainer;
