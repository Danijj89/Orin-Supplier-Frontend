import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import LoginPage from './features/login/LoginPage.js';
import Route from './features/shared/AppRoute.js';
import OrderTableOverview from './features/orders/OrderTableOverview.js';
import CreateOrder from './features/orders/CreateOrder.js';
import Order from './features/orders/Order.js';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import CreateCI from './features/commercial_invoice/CreateCI.js';

const THEME = createMuiTheme({
    typography: {
        fontFamily: 'Poppins, Helvetica, sans-serif'
    }
})

function App() {
  return (
      <MuiThemeProvider theme={THEME}>
          <Router>
              <Switch>
                  <Route exact path={['/', 'login']} component={LoginPage}/>
                  <Route exact path={['/home', '/home/orders']} component={OrderTableOverview} isPrivate />
                  <Route exact path={['/home/orders/create']} component={CreateOrder} isPrivate />
                  <Route exact path="/home/orders/:id" component={Order} isPrivate />
                  <Route exact path={['/home/ci/create', '/home/ci/create?order=:orderId']} component={CreateCI} isPrivate />
                  <Route component={LoginPage}/>
              </Switch>
          </Router>
      </MuiThemeProvider>
  );
}

export default App;
