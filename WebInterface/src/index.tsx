import 'typeface-roboto';
import 'font-awesome/css/font-awesome.css';

import './assets/styles/Style.scss';

import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
