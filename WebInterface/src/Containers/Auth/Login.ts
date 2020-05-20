import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { setCurrentUser } from '../../Actions/Auth';
import Login, { LoginProps } from '../../Components/Auth/Login';
import User from '../../Models/User';

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>): LoginProps => ({
    setCurrentUser: (user: User) => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(Login);
