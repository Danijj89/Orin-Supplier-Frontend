import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import LoginPage from './features/login/LoginPage.js';
import Route from './features/shared/AppRoute.js';
import OrderTableOverview from './features/orders/OrderTableOverview.js';
import CreateOrder from './features/orders/CreateOrder.js';
import Order from './features/orders/Order.js';

function App() {
  return (
      <Router>
        <Switch>
            <Route exact path={['/', 'login']} component={LoginPage}/>
            <Route exact path={['/home', '/home/orders']} component={OrderTableOverview} isPrivate />
            <Route exact path={['/home/orders/create']} component={CreateOrder} isPrivate />
            <Route exact path="/home/orders/:id" component={Order} isPrivate />
            <Route component={LoginPage}/>
        </Switch>
      </Router>
  );
}

export default App;
