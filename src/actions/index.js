export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_IMG = 'SET_IMG';
export const SET_CROP_IMG = 'SET_CROP_IMG';

export function signIn(profile) {
    return {
        type: SIGN_IN,
        profile: profile
    };
}

export function signOut() {
    return {
        type: SIGN_OUT
    };
}

export function setImg(blob) {
    return {
        type: SET_IMG,
        img: blob
    };
}

export function setCropImg(blob) {
    return {
        type: SET_CROP_IMG,
        cropImg: blob
    };
}