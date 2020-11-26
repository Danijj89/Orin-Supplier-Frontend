import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useDispatch } from 'react-redux';
import { cleanNewOrder } from './duck/slice.js';
import { Paper } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import OrdersTable from './OrdersTable.js';
import { makeStyles } from '@material-ui/core/styles';

const { newOrderButtonLabel } = LANGUAGE.order.ordersOverview;

const useStyles = makeStyles((theme) => ({
    orderOverviewRoot: {
        margin: theme.spacing(2),
    },
    newOrder: {
        margin: theme.spacing(2),
    },
}));

const OrderOverview = React.memo(function OrderOverview() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const onNewOrderClick = () => {
        dispatch(cleanNewOrder());
        history.push(`${location.pathname}/new?step=details`);
    };

    return (
        <Paper className={ classes.orderOverviewRoot }>
            <ThemedButton
                className={ classes.newOrder }
                onClick={ onNewOrderClick }
            >
                { newOrderButtonLabel }
            </ThemedButton>
            <OrdersTable />
        </Paper>
    );
});

export default OrderOverview;
