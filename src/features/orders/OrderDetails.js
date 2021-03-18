import React, { useCallback } from 'react';
import { Paper } from '@material-ui/core';
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
        <>
            <NavTabs
                tabsLabelsMap={ tabsLabelsMap }
                tabValue={ tab }
                onChange={ setTabValue }
                className={ classes.navTabs }
                component={ Paper }
            />
            { tab === 'details' && <DetailsInfoCard order={ order }/> }
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
            <OrderFulfillmentPlan className={ classes.fulfillmentTable } order={ order }/>
        </>
    );
});

export default OrderDetails;