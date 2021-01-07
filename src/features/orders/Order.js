import React from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { Paper, Box } from '@material-ui/core';
import { LANGUAGE } from 'app/utils/constants.js';
import OrderDetails from './OrderDetails.js';
import OrderDocuments from './OrderDocuments.js';
import { makeStyles } from '@material-ui/core/styles';
import NavTabs from '../shared/components/NavTabs.js';
import queryString from 'query-string';
import ShippingPlan from 'features/orders/ShippingPlan.js';
import InfoCard from 'features/shared/wrappers/InfoCard.js';
import EditOrderProductsButton from 'features/orders/EditOrderProductsButton.js';
import OrderProductTable from 'features/orders/OrderProductTable.js';
import { useSelector } from 'react-redux';
import { selectOrderById } from 'features/orders/duck/selectors.js';
import DetailsInfoCard from 'features/orders/DetailsInfoCard.js';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            paddingLeft: theme.spacing(10),
            paddingRight: theme.spacing(10),
        },
    },
    orderTabs: {
        marginBottom: theme.spacing(1)
    }
}));

const {
    tabsLabelsMap,
    labels
} = LANGUAGE.order.order;

const Order = React.memo(function Order() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const { id: orderId } = useParams();
    const { tab = 'product' } = queryString.parse(location.search);
    const order = useSelector(state => selectOrderById(state, { orderId }));

    const setTabValue = (newValue) =>
        history.push(`${ location.pathname }?tab=${ newValue }`);

    return (
        <Box className={ classes.root }>
            <DetailsInfoCard />
            <Paper>
                <NavTabs
                    tabsLabelsMap={ tabsLabelsMap }
                    tabValue={ tab }
                    onChange={ setTabValue }
                    className={ classes.orderTabs }
                />
            </Paper>
            { tab === 'product' &&
            <InfoCard
                title={ labels.productTableTitle }
                tools={ <EditOrderProductsButton order={ order }/> }
                content={ <OrderProductTable order={ order }/> }
            /> }
            { tab === 'fulfillment' &&
            <InfoCard
                title={ labels.fulfillmentPlanTitle }
                content={<></> }
            />
            }
        </Box>
    )
});

export default Order;

