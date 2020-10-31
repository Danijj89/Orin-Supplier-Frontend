import React, { useEffect } from 'react';
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
import Shipment from '../shipments/Shipment.js';

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

export default function Home({ match }) {
    const classes = useStyles();
    const dispatch = useDispatch();
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
                { user && <NavBar user={ user }/> }
            </Grid>
            <Grid item className={ classes.content }>
                <Switch>
                    <Route
                        exact
                        path={ [`${ match.url }`, `${ match.url }/orders`] }
                        component={ OrdersOverview }
                        isPrivate
                    />
                    <Route
                        exact
                        path={ `${ match.url }/orders/new/:step` }
                        component={ CreateOrderContainer }
                        isPrivate
                    />
                    <Route
                        exact
                        path={ [`${ match.url }/orders/:id`, `${ match.url }/orders/:id/details`] }
                        component={ Order }
                        isPrivate
                    />
                    <Route
                        exact
                        path={ `${ match.url }/settings/:tab` }
                        component={ Settings }
                        isPrivate
                    />
                    <Route
                        exact
                        path={ `${ match.url }/clients/:id` }
                        component={ ClientDetails }
                        isPrivate
                    />
                    <Route
                        exact
                        path={ `${ match.url }/clients` }
                        component={ ClientOverview }
                        isPrivate
                    />
                    <Route
                        exact
                        path={ `${ match.url }/products` }
                        component={ ProductOverview }
                        isPrivate
                    />
                    <Route
                        exact
                        path={ `${ match.url }/shipments` }
                        component={ ShipmentOverview }
                        isPrivate
                    />
                    <Route
                        exact
                        path={ `${ match.url }/shipments/new` }
                        component={ CreateShipmentContainer }
                        isPrivate
                    />
                    <Route
                        exact
                        path={ `${ match.url }/shipments/:id` }
                        component={ Shipment }
                        isPrivate
                    />
                    <Route
                        component={ () => <Redirect to={ '/not_found' }/> }
                    />
                </Switch>
            </Grid>
        </Grid>
    );
}
