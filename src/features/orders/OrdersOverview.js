import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from './duck/thunks.js';
import { cleanNewOrder, selectAllOrders } from './duck/slice.js';
import { Paper, Container } from '@material-ui/core';
import { selectOrderStatus } from './duck/selectors.js';
import Loader from '../shared/components/Loader.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import OrdersTable from './OrdersTable.js';
import { isLoading } from '../shared/utils/store.js';
import { selectCurrentCompany } from '../home/duck/selectors.js';

const { newOrderButtonLabel } = LANGUAGE.order.ordersOverview;

export default function OrdersOverview() {
    const dispatch = useDispatch();
    const history = useHistory();
    const company = useSelector(selectCurrentCompany);
    const orders = useSelector(selectAllOrders);
    const orderStatus = useSelector(selectOrderStatus);
    const loading = isLoading([orderStatus]);

    useEffect(() => {
        if (company) dispatch(fetchOrders(company._id));
    }, [dispatch, company]);

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
                { loading && <Loader/> }
                { orders && <OrdersTable orders={ orders }/> }
            </Paper>
        </Container>
    )
}