import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App.js';
import store from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <React.Fragment>
        <BrowserRouter>
            <Provider store={ store }>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.Fragment>,
    document.getElementById('root')
);
