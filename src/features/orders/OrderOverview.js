import React from 'react';
import { useHistory } from 'react-router-dom';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { cleanNewOrder } from './duck/slice.js';
import { Paper } from '@material-ui/core';
import { selectAllOrders } from './duck/selectors.js';
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

export default function OrderOverview() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const orders = useSelector(selectAllOrders);

    const onNewOrderClick = () => {
        dispatch(cleanNewOrder());
        history.push('/home/orders/new?step=details');
    };

    return (
        <Paper className={ classes.orderOverviewRoot }>
            <ThemedButton
                className={ classes.newOrder }
                onClick={ onNewOrderClick }
            >
                { newOrderButtonLabel }
            </ThemedButton>
            <OrdersTable orders={ orders }/>
        </Paper>
    );
}
