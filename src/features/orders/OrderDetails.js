import React, { useCallback } from 'react';
import { Paper, Grid } from '@material-ui/core';
import DetailsInfoCard from './DetailsInfoCard.js';
import { LANGUAGE } from 'app/utils/constants.js';
import OrderProductTable from './OrderProductTable.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import EditOrderProductsButton from './EditOrderProductsButton.js';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import NavTabs from 'features/shared/components/NavTabs.js';
import OrderFulfillmentPlan from 'features/orders/OrderFulfillmentPlan.js';
import queryString from 'query-string';
import { getOrderURL } from 'features/orders/utils/urls.js';

const useStyles = makeStyles((theme) => ({
    navTabs: {
        marginBottom: theme.spacing(1)
    },
    fulfillmentTable: {
        marginTop: theme.spacing(3)
    }
}));

const {
    tabsLabelsMap,
    titles
} = LANGUAGE.order.order;

const OrderDetails = React.memo(function OrderDetails({ order }) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const { tab = 'details', mode = 'view', split, subTab } = queryString.parse(location.search);

    const setTabValue = useCallback(newValue =>
        history.push(getOrderURL(order._id, { mode, tab: newValue, split, subTab })),
        [history, mode, split, subTab, order._id]);

    return (
        <Grid container>
            <Grid item xs={12}>
            <NavTabs
                tabsLabelsMap={ tabsLabelsMap }
                tabValue={ tab }
                onChange={ setTabValue }
                className={ classes.navTabs }
                component={ Paper }
            />
            </Grid>
            <Grid item>
            { tab === 'details' && <DetailsInfoCard order={ order }/> }
            </Grid>
            <Grid item>
            { tab === 'products' &&
            <InfoCard
                title={ titles.productTable }
                tools={ <EditOrderProductsButton order={ order }/> }
                content={
                    <OrderProductTable
                        items={ order.items }
                        currency={ order.currency }
                        quantity={ order.quantity }
                        total={ order.total }
                        custom1={ order.custom1 }
                        custom2={ order.custom2 }
                    />
                }
            />
            }
            </Grid>
            <Grid item xs={12}>
            <OrderFulfillmentPlan className={ classes.fulfillmentTable } order={ order }/>
            </Grid>
        </Grid>
    );
});

export default OrderDetails;