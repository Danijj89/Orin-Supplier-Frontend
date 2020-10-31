import React from 'react';
import { Switch } from 'react-router-dom';
import LoginPage from './LoginPage.js';
import Route from '../features/shared/components/AppRoute.js';
import { MuiThemeProvider, } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import appTheme from './themes/theme.js';
import Home from '../features/home/Home.js';
import NotFound from '../features/shared/components/NotFound.js';

export default function App() {
    return (
        <MuiThemeProvider theme={ appTheme }>
            <MuiPickersUtilsProvider utils={ DateFnsUtils }>
                <Switch>
                    <Route exact path={ ['/', '/login'] } component={ LoginPage }/>
                    <Route path='/home' component={Home} />
                    <Route component={ NotFound }/>
                </Switch>
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    );
}


