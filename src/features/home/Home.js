import React, { lazy } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar.js';
import Route from '../shared/components/AppRoute.js';
import { Switch, Redirect } from 'react-router-dom';
import Suspense from '../shared/components/Suspense.js';
import OrderOverviewContainer from 'features/orders/OrderOverviewContainer.js';

const CreateOrderContainer = lazy(() =>
    import('../orders/CreateOrderContainer.js')
);
const OrderContainer = lazy(() => import('../orders/OrderContainer.js'));
const SettingsContainer = lazy(() => import('./SettingsContainer.js'));
const ClientContainer = lazy(() => import('../clients/ClientContainer.js'));
const ClientOverviewContainer = lazy(() =>
    import('../clients/ClientOverviewContainer.js')
);
const ProductOverviewContainer = lazy(() =>
    import('../products/ProductOverviewContainer.js')
);
const ShipmentOverviewContainer = lazy(() =>
    import('../shipments/ShipmentOverviewContainer.js')
);
const EditShipmentContainer = lazy(() =>
    import('../shipments/EditShipmentContainer.js')
);
const CreateShipmentContainer = lazy(() =>
    import('../shipments/CreateShipmentContainer.js')
);
const ShipmentContainer = lazy(() =>
    import('../shipments/ShipmentContainer.js')
);
const CommercialInvoiceContainer = lazy(() =>
    import('../documents/CommercialInvoiceContainer.js')
);
const PackingListContainer = lazy(() =>
    import('../documents/PackingListContainer.js')
);
const SalesContractContainer = lazy(() =>
    import('../documents/SalesContractContainer.js')
);
const ChinaExportContainer = lazy(() =>
    import('../documents/ChinaExportContainer.js')
);
const LeadOverviewContainer = lazy(() =>
    import('../leads/LeadOverviewContainer.js')
);
const LeadContainer = lazy(() => import('../leads/LeadContainer.js'));
const AdminContainer = lazy(() => import('../admin/AdminContainer.js'));
const DashboardContainer = lazy(() =>
    import('../dashboard/DashboardContainer.js')
);

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
    const match = useRouteMatch();

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            className={ classes.root }
        >
            <Grid item>
                <NavBar/>
            </Grid>
            <Grid item className={ classes.content }>
                <Switch>
                    <Route
                        exact
                        path={ [`${ match.path }`, `${ match.path }/orders`] }
                        isPrivate
                    >
                        <OrderOverviewContainer/>
                    </Route>
                    <Route exact path={ `${ match.url }/orders/new` } isPrivate>
                        <Suspense>
                            <CreateOrderContainer/>
                        </Suspense>
                    </Route>
                    <Route
                        exact
                        path={ `${ match.url }/orders/:id` }
                        isPrivate
                    >
                        <Suspense>
                            <OrderContainer/>
                        </Suspense>
                    </Route>
                    <Route exact path={ `${ match.path }/settings` } isPrivate>
                        <Suspense>
                            <SettingsContainer/>
                        </Suspense>
                    </Route>
                    <Route exact path={ `${ match.url }/clients/:id` } isPrivate>
                        <Suspense>
                            <ClientContainer/>
                        </Suspense>
                    </Route>
                    <Route exact path={ `${ match.url }/clients` } isPrivate>
                        <Suspense>
                            <ClientOverviewContainer/>
                        </Suspense>
                    </Route>
                    <Route exact path={ `${ match.url }/products` } isPrivate>
                        <Suspense>
                            <ProductOverviewContainer/>
                        </Suspense>
                    </Route>
                    <Route exact path={ `${ match.url }/leads` } isPrivate>
                        <Suspense>
                            <LeadOverviewContainer/>
                        </Suspense>
                    </Route>
                    <Route exact path={ `${ match.url }/leads/:id` } isPrivate>
                        <Suspense>
                            <LeadContainer/>
                        </Suspense>
                    </Route>
                    <Route exact path={ `${ match.url }/shipments` } isPrivate>
                        <Suspense>
                            <ShipmentOverviewContainer/>
                        </Suspense>
                    </Route>
                    <Route
                        exact
                        path={ `${ match.url }/shipments/:id/edit` }
                        isPrivate
                    >
                        <Suspense>
                            <EditShipmentContainer/>
                        </Suspense>
                    </Route>
                    <Route
                        exact
                        path={ [`${ match.url }/shipments/shell`] }
                        isPrivate
                    >
                        <Suspense>
                            <CreateShipmentContainer/>
                        </Suspense>
                    </Route>
                    <Route exact path={ `${ match.url }/shipments/:id` } isPrivate>
                        <Suspense>
                            <ShipmentContainer/>
                        </Suspense>
                    </Route>
                    <Route
                        exact
                        path={ [`${ match.url }/documents/ci/new`, `${ match.url }/documents/ci/edit`] }
                        isPrivate
                    >
                        <Suspense>
                            <CommercialInvoiceContainer/>
                        </Suspense>
                    </Route>
                    <Route
                        exact
                        path={ [`${ match.url }/documents/pl/new`, `${ match.url }/documents/pl/edit`] }
                        isPrivate
                    >
                        <Suspense>
                            <PackingListContainer/>
                        </Suspense>
                    </Route>
                    <Route
                        exact
                        path={ [`${ match.url }/documents/sc/new`, `${ match.url }/documents/sc/edit`] }
                        isPrivate
                    >
                        <Suspense>
                            <SalesContractContainer/>
                        </Suspense>
                    </Route>
                    <Route
                        exact
                        path={ [`${ match.url }/documents/ce/new`, `${ match.url }/documents/ce/edit`] }
                        isPrivate
                    >
                        <Suspense>
                            <ChinaExportContainer/>
                        </Suspense>
                    </Route>
                    <Route exact path={ `${ match.url }/admin` } isPrivate>
                        <Suspense>
                            <AdminContainer/>
                        </Suspense>
                    </Route>
                    <Route exact path={ `${ match.url }/dashboard` } isPrivate>
                        <Suspense>
                            <DashboardContainer/>
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
