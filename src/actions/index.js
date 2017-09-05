export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export const SET_IMG = 'SET_IMG';
export const SET_CROP_IMG = 'SET_CROP_IMG';
export const SET_CHALLENGE_RESULT = 'SET_CHALLENGE_RESULT';
export const SET_COMMENT = 'SET_COMMENT';
export const RESET_CHALLENGE = 'RESET_CHALLENGE';

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

export function setChallengeResult(imageURL, similarity) {
    return {
        type: SET_CHALLENGE_RESULT,
        imageURL: imageURL,
        similarity : similarity
    };
}

export function setComment(comment) {
    return {
        type: SET_COMMENT,
        comment : comment
    };
}

export function resetChallenge() {
    return {
        type: RESET_CHALLENGE
    };
}