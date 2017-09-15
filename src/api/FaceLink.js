import axios from 'axios';
import querystring from 'querystring'
import * as event from './Event'
import * as firebase from './Firebase'

const RESPONSE_SUCCESS = 200
const RESPONSE_NO_FACE = 211
const RESPONSE_MANY_FACE = 212
const RESPONSE_NO_SIMMILAR_FACE = 213
const RESPONSE_FAIL = 400

export function getResponse(response) {
    switch (response) {
        case RESPONSE_SUCCESS : return "결과를 보려면 로그인 해주세요!"
        case RESPONSE_NO_FACE : return "얼굴을 인식할 수 없습니다"
        case RESPONSE_MANY_FACE : return "얼굴이 여러개네요!&#13;&#10;그 중 어떤 얼굴인가요?"
        case RESPONSE_FAIL : return "오류 발생"
        default : return ""
    }
}

export function getSimilarity(imageUri) {
    return axios.get(
        'https://us-central1-peanut-5b51b.cloudfunctions.net/calSimilarity?' 
        + querystring.stringify({imageUri : imageUri, eventName : event.getEventName()}))
}

export function checkFaceLinkResponse(response) {
    return response.response0 == RESPONSE_SUCCESS && response.response1 == RESPONSE_SUCCESS
}

export function getFaceLinkResponse(response) {
    var string0 = ''
    if(response.response0 != RESPONSE_SUCCESS) {
        string0 = string0 + '첫 번째 사진 : ' + getResponse(response.response0)
    } else {
        string0 = string0 + '첫 번째 사진 : 인식 성공'
    }

    var string1 = ''
    if(response.response1 != RESPONSE_SUCCESS) {
        string1 = string1 + '두 번째 사진 : ' + getResponse(response.response1)
    } else {
        string1 = string1 + '두 번째 사진 : 인식 성공'
    }

    return [string0 ,string1]
}

export function getFaceLink(faces) {
    return Promise.all([firebase.updateFaceLinkImage(faces[0]), firebase.updateFaceLinkImage(faces[1])]).then((images) => {
        if(images.length == 2) {
            console.log('getFacelink : start')
            // return axios.get(
            //     'http://127.0.0.1:8080/peanut/facelink?' 
            //     + querystring.stringify({i0 : images[0], i1 : images[1]}))
            return axios.get(
                'https://us-central1-peanut-5b51b.cloudfunctions.net/calFaceLink?' 
                + querystring.stringify({i0 : images[0], i1 : images[1]}))
        } else {
            console.log('getFacelink : fail')
            return
        }
    })
}