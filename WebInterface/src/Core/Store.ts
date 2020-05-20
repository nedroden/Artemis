import { Store, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import Reducers from '../Reducers/Reducers';

const store: Store = createStore(Reducers, {}, applyMiddleware(thunk));

export default store;
