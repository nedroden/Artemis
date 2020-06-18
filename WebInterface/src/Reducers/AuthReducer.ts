import { SET_CURRENT_USER } from '../Actions/Auth';
import User from '../Models/User';

export interface AuthState {
    user: User;
}

const InitialState: AuthState = {
    user: new User().deserialize({
        name: 'Guest',
        email: 'none',
        groupId: 4
    })
};

const AuthReducer = (state: AuthState = InitialState, action: any): AuthState => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                user: action.user || InitialState.user
            };
        default:
            return state;
    }
};

export default AuthReducer;
