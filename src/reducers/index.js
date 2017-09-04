import { SET_IMG, SET_CROP_IMG } from '../actions';
import { combineReducers } from 'redux';

const cropInitialState = {
    img: null,
    cropImg: null
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
    crop
});

export default reduxApp;