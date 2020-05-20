import User from '../Models/User';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export interface Action {
    type: string;
    user?: User;
}

export const setCurrentUser = (user?: User): Action => ({
    type: SET_CURRENT_USER,
    user
});
