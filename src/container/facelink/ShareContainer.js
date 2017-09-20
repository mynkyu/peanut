import React, { Component } from 'react';
import querystring from 'querystring'

import * as app from '../../api/App'
import * as firebase from '../../api/Firebase'
import * as facebook from '../../api/Facebook'
import * as kakao from '../../api/Kakao'

import './ShareContainer.css'

import contestImage from '../../image/contestImage.jpeg'
import backgroundImage from '../../image/facebookShare.png'
// import backgroundImage from '../../peanut_share1.png'

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
        if (this.props.img) { return }
        this.drawResult(this.props.face, this.props.similarity)
    }

    drawResult(face, similarity) {
        const self = this
        // const leftURL = contestImage
        // const rightURL = contestImage
        const leftName = face[0].name //'보검보검'
        const rightName = face[1].name //'고마해라마이무따아이가'
        const theseGuys = '위'
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

                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, 1200, 630);
                
                ctx.font = 'Bold 45px Noto Sans KR';
                ctx.fillStyle = '#f38048';
                ctx.textAlign = "center"
                
                
                ctx.fillText(leftNim, 396, 495);
                ctx.fillText(rightNim, 613, 495);

                ctx.textAlign = "left"
                ctx.fillText(match, 350, 575);

                ctx.font = 'Bold 60px Noto Sans KR';
                ctx.textAlign = "right"
                ctx.fillText(similarity + '%', 342, 575);

                const leftNameSize = Math.min(45, 150 / leftName.length)
                ctx.font = 'Bold ' + leftNameSize +'px Noto Sans KR';
                ctx.fillStyle = '#7d7d7d';
                ctx.fillText(leftName, 355, 495, 150);

                const rightNameSize = Math.min(45, 150 / rightName.length)
                ctx.font = 'Bold ' + rightNameSize +'px Noto Sans KR';
                ctx.fillText(rightName, 575, 495, 150);
                
                ctx.font = 'Bold 28px Noto Sans KR';
                ctx.textAlign = "left"
                ctx.fillText(resultText, 456, 575);

                self.drawImage(ctx, leftURL, 300, 289, 123).then((ctx) => {
                    self.drawImage(ctx, rightURL, 601, 289, 123).then((ctx) => {
                        self.onImageDraw(canvas, ctx)
                    })
                })
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


        //자르는 코드
        //ctx : 공유용
        // showctx : 보여주기용
        const showCanvas = document.createElement('canvas')
        showCanvas.width  = 913
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
        const face = this.state.face

        if (shareImageURL){
            facebook.shareFaceLink(shareImageURL, face)
            return
        }

        if (shareImageBlob && !this.state.isUploaded) {
            self.setState({isUploaded : true})
            firebase.updateFaceLinkShare(shareImageBlob).then((shareImageURL) => {
                self.setState({shareImageURL : shareImageURL})
                facebook.shareFaceLink(shareImageURL, face)
                self.setState({isUploaded : false})
            })
        }
    }

    refresh() {
        window.location.reload()
    }

    render() {
        // const blob = this.state.shareImageBlob
        const img = this.props.img
        const blob = this.state.showImageBlob
        const isUploaded = this.state.isUploaded

        var facebookOGTag = <div></div>
        var shareImg = <div></div>

        if (img) {
            const path = app.getURL() + '?' + querystring.stringify({to : 'facelink', img : img})
            facebookOGTag = <div>
                <meta charset="utf-8" />
                {/* <meta name="description" content='심심풀이 얼굴놀이 피넛!' /> */}
                {/* <meta property="article:publisher" content="https://www.facebook.com/kr.vonvon.me" /> */}
                {/* <meta property="article:tag" content="quiz" /> */}
                {/* <meta property="article:published_time" content="2017-08-31T05:00:00+00:00" /> */}
                {/* <meta property="article:author" content="https://www.facebook.com/kr.vonvon.me" /> */}
                <meta property="fb:app_id" content="114048632608756" />
                {/* <meta property="fb:pages" content="301348366728265" /> */}
                {/* <meta property="og:site_name" content="vonvon" /> */}
                <meta property="og:description" content="다른 사람과 얼마나 닮았는지 궁금하다면?" />
                <meta property="og:title" content="심심풀이 얼굴놀이 피넛!" />
                <meta property="og:url" content= {path} />
                <meta property="og:image" content= {img} />
                <meta property="og:image:height" content="630" />
                <meta property="og:type" content="article" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:type" content="image/png" />
            </div>
            shareImg = <img src={img}/>
        }

        if (blob) {
            const url = URL.createObjectURL(blob)
            shareImg = <img src={url}/>
        }

        var facebookShareText = '페이스북에 공유'
        if (isUploaded) {
            facebookShareText = '불러오는 중'
        }

        return (
            <div className="shareContainerDiv">
                {facebookOGTag}
                <div  className="ImageForShare" >
                    {/* <span className='shareText'>&nbsp;</span> */}
                    {/* <canvas id="tutorial" width="1200" height="630"></canvas> */}
                    {shareImg}
                </div>
                <div>
                    <button onClick={this.facebookShare} className="shareWithFacebook">
                        <img src={facebookIcon}/>
                        <p>{facebookShareText}</p>
                    </button>

                    <a id="kakao-link-btn" href="javascript:sendLink()" className="shareWithKakao">
                        <img src={kakaoIcon}/>
                        <p>카카오톡에 공유</p>
                    </a>
                </div>
                <div className="againButton">
                    <button onClick={this.refresh}>다른 사진으로 해보기</button>
                </div>
            </div>
        );
    }
}

export default ShareContainer;
