import 'typeface-roboto';
import 'font-awesome/css/font-awesome.css';

import './Assets/styles/Style.scss';

import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './Core/Store';
import Service from './Services/Service';
import * as serviceWorker from './serviceWorker';

Service.registerStore(store);

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
