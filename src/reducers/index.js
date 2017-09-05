import { SIGN_IN, SIGN_OUT } from '../actions';
import { SET_IMG, SET_CROP_IMG, SET_SIMILARITY } from '../actions';
import { combineReducers } from 'redux';

const profileInitialState = {
    profile: null
};

const challengeInitialState = {
    img: null,
    cropImg: null,
    similarity: null
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

const challenge = (state = challengeInitialState, action) => {
    switch(action.type) {
        case SET_IMG:
            return Object.assign({}, state, {
                img: action.img
            });
        case SET_CROP_IMG:
            return Object.assign({}, state, {
                cropImg: action.cropImg
            });
        case SET_SIMILARITY:
            return Object.assign({}, state, {
                similarity: action.similarity
            });
        default:
            return state;
    }
};

const reduxApp = combineReducers({
    profile,
    challenge
});

export default reduxApp;