import * as firebase from 'firebase'
import * as app from './App'
import querystring from 'querystring'

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

// export function getShareFaceLinkOGTag(imageURL) {
//     const path = app.getURL() + '?' + querystring.stringify({to : 'facelink', img : imageURL})
//     return <div>
//         <meta charset="utf-8" />
//         {/* <meta name="description" content='심심풀이 얼굴놀이 피넛!' /> */}
//         {/* <meta property="article:publisher" content="https://www.facebook.com/kr.vonvon.me" /> */}
//         {/* <meta property="article:tag" content="quiz" /> */}
//         {/* <meta property="article:published_time" content="2017-08-31T05:00:00+00:00" /> */}
//         {/* <meta property="article:author" content="https://www.facebook.com/kr.vonvon.me" /> */}
//         <meta property="fb:app_id" content="114048632608756" />
//         {/* <meta property="fb:pages" content="301348366728265" /> */}
//         {/* <meta property="og:site_name" content="vonvon" /> */}
//         <meta property="og:description" content="다른 사람과 얼마나 닮았는지 궁금하다면?" />
//         <meta property="og:title" content="심심풀이 얼굴놀이 피넛!" />
//         <meta property="og:url" content= {path} />
//         <meta property="og:image" content= {imageURL} />
//         <meta property="og:image:height" content="630" />
//         <meta property="og:type" content="article" />
//         <meta property="og:image:width" content="1200" />
//         <meta property="og:image:type" content="image/png" />
//     </div>
// }

export function shareFaceLink(imageURL, face) {
    const herf = 'https://peanut-5b51b.firebaseapp.com/shareFacelink' + '?' + querystring.stringify({img : imageURL})
    const redirect_uri = app.getURL() + '?to=facelink'

    window.FB.ui({
        app_id: '114048632608756',
        method: 'share',
        href: herf
    }, response => {});

    // window.FB.ui({
    //     app_id: '114048632608756',
    //     method: 'share_open_graph',
    //     action_type: 'og.likes',
    //     action_properties: JSON.stringify({
    //       object: {
    //                   'og:url': path,
    //                   'og:title': '다른 사람과 얼마나 닮았는지 궁금하다면?',
    //                   'og:description': '심심풀이 얼굴놀이 피넛!',
    //                   'og:image:url': imageURL,
    //                   'og:image:secure_url': imageURL,
    //                   'og:image:type' : 'image/png',
    //                   'og:image:width' : 1200,
    //                   'og:image:height' : 630
    //               }
    //     })
    // }, response => {});
}