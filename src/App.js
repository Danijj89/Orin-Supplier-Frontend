import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import LoginPage from './features/login/LoginPage.js';
import Route from './features/shared/AppRoute.js';
import OrderTableOverview from './features/orders/OrderTableOverview.js';
import CreatePO from './features/orders/CreatePO.js';
import Order from './features/orders/Order.js';
import { createMuiTheme, MuiThemeProvider, responsiveFontSizes } from '@material-ui/core';
import CreateCI from './features/commercial_invoice/CreateCI.js';
import CreatePL from './features/packing_list/CreatePL.js';
import { grey } from '@material-ui/core/colors'

let theme = createMuiTheme({
    typography: {
        fontFamily: 'Poppins, Helvetica, sans-serif'
    },
    palette: {
        primary: grey,
        secondary: {
            main: '#109CF1',
            dark: '#098DE9'
        },
        backgroundPrimary: {
            main: '#FFFFFF'
        },
        backgroundSecondary: {
            main: '#F5F5F5'
        }
    }
});
theme = responsiveFontSizes(theme);

function App() {
  return (
      <MuiThemeProvider theme={theme}>
          <Router>
              <Switch>
                  <Route exact path={['/', 'login']} component={LoginPage}/>
                  <Route exact path={['/home', '/home/orders']} component={OrderTableOverview} isPrivate />
                  <Route exact path={['/home/orders/create']} component={CreatePO} isPrivate />
                  <Route exact path="/home/orders/:id" component={Order} isPrivate />
                  <Route exact path={["/home/ci/create", "/home/ci/create?order=:orderId"]} component={CreateCI} isPrivate />
                  <Route exact path={["/home/pl/create", "/home/pl/create?order=:orderId"]} component={CreatePL} isPrivate />
                  <Route component={LoginPage}/>
              </Switch>
          </Router>
      </MuiThemeProvider>
  );
}

export default App;
