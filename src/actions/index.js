export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export const SET_IMG = 'SET_IMG';
export const SET_CROP_IMG = 'SET_CROP_IMG';
export const SET_SIMILARITY = 'SET_SIMILARITY';

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

export function setSimilarity(similarity) {
    return {
        type: SET_SIMILARITY,
        similarity : similarity
    };
}