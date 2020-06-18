import { connect } from 'react-redux';

import Header, { HeaderContainerProps } from '../../Components/Layout/Header';
import { GlobalState } from '../../Reducers/Reducers';

const mapStateToProps = (state: GlobalState): HeaderContainerProps => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(Header);
