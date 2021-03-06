// Starter code attribution: Professor Tuck
import { createStore, combineReducers } from 'redux';

function token(state = null, action) {
    switch (action.type) {
        case 'SET_TOKEN':
            return action.token;
        case 'DELETE_TOKEN':
            return null;
        default:
            return state;
    }
}

function login(state = {}, action) {
    switch (action.type) {
        case 'UPDATE_LOGIN_FORM':
            return Object.assign({}, state, action.data);
        case 'RESET_LOGIN_FORM':
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

function users(state= [], action)   {
    switch (action.type) {
        case 'USERS_LIST':
            return [...action.data];
        default:
            return state;
    }
}


function tasks(state = [], action) {
    switch (action.type)    {
        case 'TASKS_LIST':
            return [...action.data];
        default:
            return state;
    }
}

function root_reducer(state0, action) {
    let reducer = combineReducers({token, login, register, tasks, users});
    let state1 = reducer(state0, action);
    return state1;
}

let store = createStore(root_reducer);
export default store;