import { SET_CROP_IMG } from '../actions';
import { combineReducers } from 'redux';

const cropInitialState = {
    blob: null
};

const crop = (state = cropInitialState, action) => {
    switch(action.type) {
        case SET_CROP_IMG:
            return Object.assign({}, state, {
                blob: action.blob
            });
        default:
            return state;
    }
};

const reduxApp = combineReducers({
    crop
});

export default reduxApp;