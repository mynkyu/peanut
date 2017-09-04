export const SET_CROP_IMG = 'SET_CROP_IMG';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const SET_DIFF = 'SET_DIFF';

export function setCropImg(blob) {
    return {
        type: SET_CROP_IMG,
        blob: blob
    };
}