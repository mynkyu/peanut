import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './FaceLink.css'



class FaceLink extends Component{
    render() {
        return (
            <div className="FaceLinkMainContainer">
                <Link to="?to=facelink" className="linkToFaceLink"></Link>
                <p className="FaceLinkMainContainerTitle">페이스 링크</p>
                    <div className = "FaceLinkMainContainerSeparator"></div>
                    <p className="FaceLinkMainContainerContent">
                        너와 나 얼마나 닮았을까<br/>일치율 확인해보기
                    </p>
            </div>

            
        );
    }
}

export default FaceLink;