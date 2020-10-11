import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LANGUAGE } from '../../constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from './duck/thunks.js';
import { cleanNewOrder, selectAllOrders } from './duck/slice.js';
import { Paper, Container } from '@material-ui/core';
import { selectOrderStatus } from './duck/selectors.js';
import Loader from '../shared/displays/Loader.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import OrdersTable from './OrdersTable.js';

const { newOrderButtonLabel } = LANGUAGE.order.ordersOverview;

export default function OrdersOverview() {
    const dispatch = useDispatch();
    const history = useHistory();
    const orders = useSelector(selectAllOrders);
    const status = useSelector(selectOrderStatus);

    useEffect(() => {
        if (status === 'IDLE') dispatch(fetchOrders());
    }, [dispatch, status]);

    const onNewOrderClick = () => {
        dispatch(cleanNewOrder())
        history.push('/home/orders/new/details')
    };

    return (
        <Container>
            <Paper>
                <ThemedButton onClick={onNewOrderClick}>
                    {newOrderButtonLabel}
                </ThemedButton>
                { status === 'PENDING' && <Loader/> }
                { orders && <OrdersTable orders={ orders }/> }
            </Paper>
        </Container>
    )
}