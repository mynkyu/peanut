import * as firebase from 'firebase'
import * as app from './App'

export function init() {
    window.fbAsyncInit = function() {
        window.FB.init({
          appId      : '114048632608756',
          xfbml      : true,
          version    : 'v2.10'
        });
        window.FB.AppEvents.logPageView();
    };
  
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/ko_KR/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

export function signInWithPopup() {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    provider.addScope('public_profile');
    provider.addScope('user_friends');

    firebase.auth().signInWithPopup(provider);
}

export function signInWithRedirect() {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    provider.addScope('public_profile');
    provider.addScope('user_friends');

    firebase.auth().signInWithRedirect(provider);
}

export function sharePeanut() {
    window.FB.ui({
        method: 'share_open_graph',
        action_type: 'og.likes',
        action_properties: JSON.stringify({
            object: {
                'og:url': app.getURL(),
                'og:title': '심심풀이 얼굴놀이 피넛!',
                'og:description': '나는 과연 그 분과 얼마나 닮았을까...',
                'og:image': 'http://mud-kage.kakao.co.kr/dn/dxf8QZ/btqhdYS8PH1/l9Jk0h8Rb0QFC0UX9z7Z5k/kakaolink40_original.png'
            }
        })
    }, response => {});
}

export function shareChallenger(challenger) {
    const path = app.getURL() + "?feed=" + challenger.uid
    const description = challenger.name + '님이 그 분과의 닮은꼴 컨테스트에 참여하셨습니다!'
    console.log('facebook: ' + path)
    window.FB.ui({
        method: 'share_open_graph',
        action_type: 'og.likes',
        action_properties: JSON.stringify({
            object: {
                'og:url': path,
                'og:title': '얼마나 닮았는지 궁금하다면?',
                'og:description': description,
                'og:image': 'http://mud-kage.kakao.co.kr/dn/BLkfW/btqhdEA7iW5/SXpdB9Jxk0HGWNcbUtWtO0/kakaolink40_original.png'
            }
        })
    }, response => {});
}

export function shareFaceLink(imageURL, face) {
    const path = app.getURL() + '?to=facelink'

    window.FB.ui({
        method: 'share_open_graph',
        action_type: 'og.likes',
        action_properties: JSON.stringify({
          object: {
                      'og:url': path,
                      'og:title': '다른 사람과 얼마나 닮았는지 궁금하다면?',
                      'og:description': '심심풀이 얼굴놀이 피넛!',
                      'og:image:secure_url': imageURL,
                      'og:image:type' : 'image/png',
                      'og:image:width' : 1200,
                      'og:image:height' : 630
                  }
        })
    }, response => {});
}