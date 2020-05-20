import { combineReducers } from 'redux';

import AuthReducer, { AuthState } from './AuthReducer';

export interface GlobalState {
    auth: AuthState;
}

export default combineReducers({ auth: AuthReducer });
