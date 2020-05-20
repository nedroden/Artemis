import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { setCurrentUser } from '../../Actions/Auth';
import Logout, { LogoutProps } from '../../Components/Auth/Logout';
import User from '../../Models/User';

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>): LogoutProps => ({
    setCurrentUser: (user: User) => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(Logout);
