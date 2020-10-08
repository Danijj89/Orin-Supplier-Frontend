import React from 'react';
import { Switch } from 'react-router-dom';
import LoginPage from '../features/login/LoginPage.js';
import Route from '../features/shared/components/AppRoute.js';
import OrdersOverview from '../features/orders/OrdersOverview.js';
import { MuiThemeProvider, } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import appTheme from './themes/theme.js';
import Home from '../features/home/Home.js';
import Settings from '../features/home/Settings.js';
import ClientOverview from '../features/clients/ClientOverview.js';
import ClientDetails from '../features/clients/ClientDetails.js';

export default function App() {
    return (
        <MuiThemeProvider theme={ appTheme }>
            <MuiPickersUtilsProvider utils={ DateFnsUtils }>
                <Switch>
                    <Route exact path={ ['/', '/login'] } component={ LoginPage }/>
                    <Home>
                        <Route
                            exact
                            path={ ['/home', '/home/orders'] }
                            component={ OrdersOverview }
                            isPrivate
                        />
                        <Route
                            exact
                            path={ ['/home/settings', '/home/settings/:tab'] }
                            component={ Settings }
                            isPrivate
                        />
                        <Route
                            exact
                            path="/home/clients/:id"
                            component={ ClientDetails }
                            isPrivate
                        />
                        <Route
                            exact
                            path="/home/clients"
                            component={ ClientOverview }
                            isPrivate
                        />
                    </Home>
                    <Route component={ LoginPage }/>
                </Switch>
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    );
}
