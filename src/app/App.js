import React from 'react';
import { Switch } from 'react-router-dom';
import LoginPage from '../features/login/LoginPage.js';
import Route from '../features/shared/AppRoute.js';
import OrdersOverview from '../features/orders/OrdersOverview.js';
import { MuiThemeProvider, } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import appTheme from './theme.js';
import HomeLayout from '../features/home/HomeLayout.js';

export default function App() {
    return (
        <MuiThemeProvider theme={ appTheme }>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Switch>
                    <Route exact path={ ['/', 'login'] } component={ LoginPage }/>
                    <HomeLayout>
                        <Route
                            exact
                            path={ ['/home', '/home/orders'] }
                            component={ OrdersOverview }
                            isPrivate
                        />
                        <Route
                            exact
                            path="/home/clients"
                            component={ OrdersOverview }
                            isPrivate
                        />
                    </HomeLayout>
                    <Route component={ LoginPage }/>
                </Switch>
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    );
}
