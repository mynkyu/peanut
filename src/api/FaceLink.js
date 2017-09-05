import axios from 'axios';
import querystring from 'querystring'

export function getSimilarity(imageUri) {
    return axios.get('http://35.190.234.118:8080/similar?' + querystring.stringify({imageUri : imageUri}));
}