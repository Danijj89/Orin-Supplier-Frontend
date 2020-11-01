import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from './duck/thunks.js';
import { cleanNewOrder, cleanOrderStore } from './duck/slice.js';
import { Paper } from '@material-ui/core';
import { selectAllOrders, selectOrderDataStatus } from './duck/selectors.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import OrdersTable from './OrdersTable.js';
import { isLoading } from '../shared/utils/state.js';
import { selectCurrentCompany } from '../home/duck/selectors.js';
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

export default function OrdersOverview() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const company = useSelector(selectCurrentCompany);
    const orders = useSelector(selectAllOrders);
    const orderDataStatus = useSelector(selectOrderDataStatus);
    const loading = isLoading([orderDataStatus]);

    useEffect(() => {
        if (company) dispatch(fetchOrders(company._id));
        return () => dispatch(cleanOrderStore());
    }, [dispatch, company]);

    const onNewOrderClick = () => {
        dispatch(cleanNewOrder());
        history.push('/home/orders/new/details');
    };

    return (
        <Paper className={ classes.orderOverviewRoot }>
            <ThemedButton
                className={ classes.newOrder }
                onClick={ onNewOrderClick }
            >
                { newOrderButtonLabel }
            </ThemedButton>
            { orderDataStatus === 'FULFILLED' && <OrdersTable orders={ orders } isLoading={ loading }/> }
        </Paper>
    );
}
