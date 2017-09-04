export const SET_IMG = 'SET_IMG';
export const SET_CROP_IMG = 'SET_CROP_IMG';

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