import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import LoginPage from './features/login/LoginPage.js';
import Route from './features/shared/AppRoute.js';
import OrdersOverview from './features/orders/OrdersOverview.js';
import CreatePO from './features/orders/CreatePO.js';
import Order from './features/orders/Order.js';
import {
    createMuiTheme,
    MuiThemeProvider,
    responsiveFontSizes,
} from '@material-ui/core';
import CreateCI from './features/commercial_invoice/CreateCI.js';
import CreatePL from './features/packing_list/CreatePL.js';
import { grey } from '@material-ui/core/colors';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import ShipmentOverview from './features/shipments/ShipmentOverview.js';
import CreateShipment from './features/shipments/CreateShipment.js';

let theme = createMuiTheme({
    typography: {
        fontFamily: 'Poppins, Helvetica, sans-serif',
    },
    palette: {
        primary: {
            main: '#109CF1',
            dark: '#098DE9',
        },
        secondary: {
            main: '#FFFFFF',
        },
        tertiary: grey,
        backgroundPrimary: {
            main: '#FFFFFF',
        },
        backgroundSecondary: {
            main: '#F1F1F1',
        },
    },
});
theme = responsiveFontSizes(theme);

function App() {
    return (
        <MuiThemeProvider theme={ theme }>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Router>
                <Switch>
                    <Route exact path={ ['/', 'login'] } component={ LoginPage }/>
                    <Route
                        exact
                        path={ ['/home', '/home/orders'] }
                        component={ OrdersOverview }
                        isPrivate
                    />
                    <Route
                        exact
                        path={ ['/home/orders/create'] }
                        component={ CreatePO }
                        isPrivate
                    />
                    <Route
                        exact
                        path={["/home/orders/:id", "/home/orders/:id/:page", "/home/orders/:id/:page"]}
                        component={ Order }
                        isPrivate
                    />
                    <Route
                        exact
                        path={ ['/home/ci/create', '/home/ci/create?order=:orderId'] }
                        component={ CreateCI }
                        isPrivate
                    />
                    <Route
                        exact
                        path={ ['/home/pl/create', '/home/pl/create?order=:orderId'] }
                        component={ CreatePL }
                        isPrivate
                    />
                    <Route
                        exact
                        path="/home/shipments"
                        component={ ShipmentOverview }
                        isPrivate
                    />
                    <Route
                        exact
                        path="/home/shipments/new"
                        component={ CreateShipment }
                        isPrivate
                    />
                    <Route component={ LoginPage }/>
                </Switch>
            </Router>
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    );
}

export default App;
