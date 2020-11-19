import React, { useEffect, lazy } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import { selectUserById } from '../users/duck/selectors.js';
import { fetchSessionInfo } from './duck/thunks.js';
import Route from '../shared/components/AppRoute.js';
import { Switch, Redirect } from 'react-router-dom';
import Suspense from '../shared/components/Suspense.js';

const OrderOverviewContainer = lazy(() => import('../orders/OrderOverviewContainer.js'));
const CreateOrderContainer = lazy(() => import('../orders/CreateOrderContainer.js'));
const OrderContainer = lazy(() => import('../orders/OrderContainer.js'));
const Settings = lazy(() => import('./Settings.js'));
const ClientContainer = lazy(() => import('../clients/ClientContainer.js'));
const ClientOverviewContainer = lazy(() => import('../clients/ClientOverviewContainer.js'));
const ProductOverviewContainer = lazy(() => import( '../products/ProductOverviewContainer.js'));
const ShipmentOverviewContainer = lazy(() => import('../shipments/ShipmentOverviewContainer.js'));
const EditShipmentContainer = lazy(() => import('../shipments/EditShipmentContainer.js'));
const CreateShipmentContainer = lazy(() => import('../shipments/CreateShipmentContainer.js'));
const ShipmentContainer = lazy(() => import('../shipments/ShipmentContainer.js'));
const CommercialInvoiceContainer = lazy(() => import('../documents/CommercialInvoiceContainer.js'));

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
                        path={ [`${ match.path }`, `${ match.path }/orders`] }
                        isPrivate
                    >
                        <Suspense>
                            <OrderOverviewContainer/>
                        </Suspense>
                    </Route>
                    <Route
                        exact
                        path={ `${ match.url }/orders/new` }
                        isPrivate
                    >
                        <Suspense>
                            <CreateOrderContainer/>
                        </Suspense>
                    </Route>
                    <Route
                        exact
                        path={ [`${ match.url }/orders/:id`, `${ match.url }/orders/:id/details`] }
                        isPrivate
                    >
                        <Suspense>
                            <OrderContainer/>
                        </Suspense>
                    </Route>
                    <Route
                        exact
                        path={ `${ match.path }/settings/:tab` }
                        isPrivate
                    >
                        <Suspense>
                            <Settings/>
                        </Suspense>
                    </Route>
                    <Route
                        exact
                        path={ `${ match.url }/clients/:id` }
                        isPrivate
                    >
                        <Suspense>
                            <ClientContainer/>
                        </Suspense>
                    </Route>
                    <Route
                        exact
                        path={ `${ match.url }/clients` }
                        isPrivate
                    >
                        <Suspense>
                            <ClientOverviewContainer/>
                        </Suspense>
                    </Route>
                    <Route
                        exact
                        path={ `${ match.url }/products` }
                        isPrivate
                    >
                        <Suspense>
                            <ProductOverviewContainer/>
                        </Suspense>
                    </Route>
                    <Route
                        exact
                        path={ `${ match.url }/shipments` }
                        isPrivate
                    >
                        <Suspense>
                            <ShipmentOverviewContainer/>
                        </Suspense>
                    </Route>
                    <Route
                        exact
                        path={ `${ match.url }/shipments/edit/:id/details` }
                        isPrivate
                    >
                        <Suspense>
                            <EditShipmentContainer/>
                        </Suspense>
                    </Route>
                    <Route
                        exact
                        path={ [`${ match.url }/shipments/new`, `${ match.url }/shipments/edit/:id`] }
                        isPrivate
                    >
                        <Suspense>
                            <CreateShipmentContainer/>
                        </Suspense>
                    </Route>
                    <Route
                        exact
                        path={ `${ match.url }/shipments/:id` }
                        isPrivate
                    >
                        <Suspense>
                            <ShipmentContainer/>
                        </Suspense>
                    </Route>
                    <Route
                        exact
                        path={ `${ match.url }/documents/ci/new` }
                        isPrivate
                    >
                        <Suspense>
                            <CommercialInvoiceContainer/>
                        </Suspense>
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
