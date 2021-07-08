import {SET_USER} from './actiontypes';
import { combineReducers } from 'redux';

const userReducer = (state = {currentUser:null}, action) => {
    switch(action.type){
        case SET_USER:
            state = {...action.payload};
            return state;

        default:
            return state;
    }
}

export const combinedReducer = combineReducers({
    user: userReducer
})