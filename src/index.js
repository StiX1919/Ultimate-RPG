import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import router from './routers/gamesRouter';

import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import store from './ducks/store'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store = { store }>
        <BrowserRouter>
            {router}
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
