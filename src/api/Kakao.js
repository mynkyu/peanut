import * as app from './App'

export function init() {
    window.Kakao.init('5e4a7d39b65f9a80825719fe59523f9e');
}

export function sharePeanut() {
  window.Kakao.Link.createCustomButton({
    container: '#kakao-link-btn',
    templateId: 5725,
    templateArgs: {}
  });
}

export function shareChallenger(challenger) {
  window.Kakao.Link.createCustomButton({
    container: '#kakao-share-challenger',
    templateId: 5726,
    templateArgs: {
      nickname : challenger.name,
      uid : challenger.uid
    }
  });
}