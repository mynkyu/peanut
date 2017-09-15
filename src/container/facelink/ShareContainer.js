import React, { Component } from 'react';

import * as firebase from '../../api/Firebase'
import * as facebook from '../../api/Facebook'
import * as kakao from '../../api/Kakao'

import backgroundImage from '../../peanut_share1.png'

class ShareContainer extends Component {
    constructor() {
        super()
        this.state = {
            isUploaded : false,
            shareImageBlob : null,
            shareImageURL : null
        }

        this.onImageDraw = this.onImageDraw.bind(this)
        this.facebookShare = this.facebookShare.bind(this)
    }

    componentDidMount() {
        this.drawResult(this.props.face, this.props.similarity)
    }

    drawResult(face, similarity) {
        const self = this
        const leftURL = URL.createObjectURL(face[0].image)
        const rightURL = URL.createObjectURL(face[1].image)
        const text = face[0].name + '님과 ' + face[1].name + '님이 ' + similarity + "% 닮았습니다"

        const img = new Image();
        img.onload = () => {
            const canvas = document.getElementById('tutorial');
            if (canvas.getContext) {
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, 400, 400);

                ctx.font = '48px serif';
                ctx.fillText(text, 50, 300);

                self.drawImage(ctx, leftURL, 130, 130, 50).then((ctx) => {
                    self.drawImage(ctx, rightURL, 250, 130, 50).then((ctx) => {
                        self.onImageDraw(canvas)
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

    onImageDraw(canvas) {
        const self = this
        
        kakao.sharePeanut()

        canvas.toBlob(function(blob){
            self.setState({shareImageBlob : blob})
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
        return (
            <div>
                <div>
                    <canvas id="tutorial" width="400" height="400"></canvas>
                </div>
                <div>
                    <button onClick={this.facebookShare} className="shareOnFacebook">
                        {/* <img src={facebookIcon}/> */}
                        <p>공유</p>
                    </button>

                    <a id="kakao-link-btn" href="javascript:sendLink()" className="shareOnKakao">
                        {/* <img src={kakaoIcon}/> */}
                        <p>공유</p>
                    </a>
                </div>
                <div>
                    <button onClick={this.refresh}>다시하기</button>
                </div>
            </div>
        );
    }
}

export default ShareContainer;
