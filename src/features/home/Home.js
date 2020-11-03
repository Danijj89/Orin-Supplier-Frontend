import React, { useEffect } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import { selectUserById } from '../users/duck/selectors.js';
import { fetchSessionInfo } from './duck/thunks.js';
import Route from '../shared/components/AppRoute.js';
import OrdersOverview from '../orders/OrdersOverview.js';
import CreateOrderContainer from '../orders/CreateOrderContainer.js';
import Settings from './Settings.js';
import ClientDetails from '../clients/ClientDetails.js';
import ClientOverview from '../clients/ClientOverview.js';
import { Switch, Redirect } from 'react-router-dom';
import ProductOverview from '../products/ProductOverview.js';
import Order from '../orders/Order.js';
import ShipmentOverview from '../shipments/ShipmentOverview.js';
import CreateShipmentContainer from '../shipments/CreateShipmentContainer.js';
import ShipmentContainer from '../shipments/ShipmentContainer.js';
import EditShipmentContainer from '../shipments/EditShipmentContainer.js';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'auto',
        minHeight: '100%',
        minWidth: '100%',
        backgroundColor: theme.palette.backgroundSecondary.main,
        flexWrap: 'nowrap',
    },
    content: {
        height: 'auto',
        minHeight: '100%',
        flex: '1 0 auto',
    },
}));

const Home = React.memo(function Home() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const location = useLocation();
    const currentTab = location.pathname.split('/')[2];
    const userId = useSelector(selectCurrentUserId);
    const user = useSelector(state => selectUserById(state, userId));


    useEffect(() => {
        dispatch(fetchSessionInfo());
    }, [dispatch]);

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            className={ classes.root }
        >
            <Grid item>
                { user && <NavBar user={ user } currentTab={ currentTab }/> }
            </Grid>
            <Grid item className={ classes.content }>
                <Switch>
                    <Route
                        exact
                        path={ [`${ match.path }`, `${ match.path }/orders`] }
                        isPrivate
                    >
                        <OrdersOverview/>
                    </Route>
                    <Route
                        exact
                        path={ `${ match.url }/orders/new/:step` }
                        isPrivate
                    >
                        <CreateOrderContainer/>
                    </Route>
                    <Route
                        exact
                        path={ [`${ match.url }/orders/:id`, `${ match.url }/orders/:id/details`] }
                        isPrivate
                    >
                        <Order/>
                    </Route>
                    <Route
                        exact
                        path={ `${ match.path }/settings/:tab` }
                        isPrivate
                    >
                        <Settings/>
                    </Route>
                    <Route
                        exact
                        path={ `${ match.url }/clients/:id` }
                        isPrivate
                    >
                        <ClientDetails/>
                    </Route>
                    <Route
                        exact
                        path={ `${ match.url }/clients` }
                        isPrivate
                    >
                        <ClientOverview/>
                    </Route>
                    <Route
                        exact
                        path={ `${ match.url }/products` }
                        isPrivate
                    >
                        <ProductOverview/>
                    </Route>
                    <Route
                        exact
                        path={ `${ match.url }/shipments` }
                        isPrivate
                    >
                        <ShipmentOverview/>
                    </Route>
                    <Route
                        exact
                        path={ `${ match.url }/shipments/edit/:id/details` }
                        isPrivate
                    >
                        <EditShipmentContainer/>
                    </Route>
                    <Route
                        exact
                        path={ [`${ match.url }/shipments/new`, `${ match.url }/shipments/edit/:id`] }
                        isPrivate
                    >
                        <CreateShipmentContainer/>
                    </Route>
                    <Route
                        exact
                        path={ `${ match.url }/shipments/:id` }
                        isPrivate
                    >
                        <ShipmentContainer/>
                    </Route>
                    <Route>
                        <Redirect to={ '/not_found' }/>
                    </Route>
                </Switch>
            </Grid>
        </Grid>
    );
});

export default Home;
