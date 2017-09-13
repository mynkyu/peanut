import axios from 'axios';
import querystring from 'querystring'
import * as event from './Event'

const RESPONSE_SUCCESS = 200
const RESPONSE_NO_FACE = 211
const RESPONSE_MANY_FACE = 212
const RESPONSE_NO_SIMMILAR_FACE = 213
const RESPONSE_FAIL = 400

export function getResponse(response) {
    switch (response) {
        case RESPONSE_SUCCESS : return "결과를 보려면 로그인 해주세요!"
        case RESPONSE_NO_FACE : return "얼굴을 인식할 수 없습니다"
        case RESPONSE_MANY_FACE : return "얼굴이 여러개네요!\n그 중 어떤 얼굴인가요?"
        case RESPONSE_FAIL : return "오류 발생"
        default : return ""
    }
}

export function getSimilarity(imageUri) {
    return axios.get(
        'https://us-central1-peanut-5b51b.cloudfunctions.net/calSimilarity?' 
        + querystring.stringify({imageUri : imageUri, eventName : event.getEventName()}))
}