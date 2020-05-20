import { connect } from 'react-redux';

import Menu, { MenuProps } from '../../Components/Layout/Menu';
import { GlobalState } from '../../Reducers/Reducers';

const mapStateToProps = (state: GlobalState): MenuProps => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(Menu);
