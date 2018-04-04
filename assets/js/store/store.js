// Starter code attribution: Professor Tuck
import { createStore, combineReducers } from 'redux';

function token(state = null, action) {
    switch (action.type) {
        case 'SET_TOKEN':
            return action.token;
        default:
            return state;
    }
}

function login(state = {}, action) {
    switch (action.type) {
        case 'UPDATE_LOGIN_FORM':
            return Object.assign({}, state, action.data);
        case 'RESET_LOGIN_FORM':
            console.log(action);
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}

function register(state = {}, action)   {
    switch (action.type) {
        case 'UPDATE_REGISTER_FORM':
            return Object.assign({}, state, action.data);
        case 'RESET_REGISTER_FORM':
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}

function root_reducer(state0, action) {
    let reducer = combineReducers({token, login, register});
    let state1 = reducer(state0, action);
    return state1;
}

let store = createStore(root_reducer);
export default store;