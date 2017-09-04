import { SIGN_IN, SIGN_OUT, SET_IMG, SET_CROP_IMG } from '../actions';
import { combineReducers } from 'redux';

const profileInitialState = {
    profile: null
};

const cropInitialState = {
    img: null,
    cropImg: null
};

const profile = (state = profileInitialState, action) => {
    switch(action.type) {
        case SIGN_IN:
            return Object.assign({}, state, {
                profile: action.profile
            });
        case SIGN_OUT:
            return Object.assign({}, state, {
                profile: null
            });
        default:
            return state;
    }
};

const crop = (state = cropInitialState, action) => {
    switch(action.type) {
        case SET_IMG:
            return Object.assign({}, state, {
                img: action.img
            });
        case SET_CROP_IMG:
            return Object.assign({}, state, {
                cropImg: action.cropImg
            });
        default:
            return state;
    }
};

const reduxApp = combineReducers({
    profile,
    crop
});

export default reduxApp;