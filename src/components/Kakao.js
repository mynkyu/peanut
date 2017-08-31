import React from 'react';

class Kakao extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    window.Kakao.init('5e4a7d39b65f9a80825719fe59523f9e');
    // 카카오 로그인 버튼을 생성합니다.
    window.Kakao.Auth.createLoginButton({
      container: '#kakao-login-btn',
      success: function(authObj) {
        alert(JSON.stringify(authObj));
      },
      fail: function(err) {
         alert(JSON.stringify(err));
      }
    });

    window.Kakao.Link.createDefaultButton({
      container: '#kakao-link-btn',
      objectType: 'feed',
      content: {
        title: '피넛',
        description: '공유 테스트 입니당',
        imageUrl: 'http://img.ezmember.co.kr/cache/board/2013/03/18/85c137cf1df080c680d70e457e38f3ba.jpg',
        link: {
          mobileWebUrl: 'https://peanut-5b51b.firebaseapp.com/',
          webUrl: 'https://peanut-5b51b.firebaseapp.com/'
        }
      },
      social: {
        likeCount: 286,
        commentCount: 45,
        sharedCount: 845
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: 'https://peanut-5b51b.firebaseapp.com/',
            webUrl: 'https://peanut-5b51b.firebaseapp.com/'
          }
        },
        {
          title: '앱으로 보기',
          link: {
            mobileWebUrl: 'https://peanut-5b51b.firebaseapp.com/',
            webUrl: 'https://peanut-5b51b.firebaseapp.com/'
          }
        }
      ]
    });
  }

  render(){
    return (
      <div>
        <a id="kakao-login-btn"></a>
        <a href="http://developers.kakao.com/logout"></a>
        <a id="kakao-link-btn" href="javascript:sendLink()">
        <img src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"/></a>
      </div>
    );
  }
}

export default Kakao;
