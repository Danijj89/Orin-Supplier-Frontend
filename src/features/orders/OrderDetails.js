import React from 'react';
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

const useStyles = makeStyles((theme) => ({
    navTabs: {
        marginBottom: theme.spacing(1)
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
    const { tab = 'product' } = queryString.parse(location.search);

    const setTabValue = (newValue) =>
        history.push(`${ location.pathname }?mode=view&tab=${ newValue }`);

    return (
        <>
            <DetailsInfoCard order={ order }/>
            <Paper>
                <NavTabs
                    tabsLabelsMap={ tabsLabelsMap }
                    tabValue={ tab }
                    onChange={ setTabValue }
                    className={ classes.navTabs }
                />
                { tab === 'product' &&
                <InfoCard
                    title={ titles.productTable }
                    tools={ <EditOrderProductsButton order={ order }/> }
                    content={ <OrderProductTable order={ order }/> }
                />
                }
                { tab === 'fulfillment' &&
                <OrderFulfillmentPlan order={ order }/>
                }
            </Paper>
        </>
    )
});

export default OrderDetails;