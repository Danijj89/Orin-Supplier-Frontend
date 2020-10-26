import React, { useEffect, useRef, useState } from 'react';
import { Paper, Box, Tabs, Tab } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrderById } from './duck/slice.js';
import { LANGUAGE } from '../../app/constants.js';
import OrderDetails from './OrderDetails.js';
import { fetchOrderById } from './duck/thunks.js';
import { selectUserStatus } from '../users/duck/selectors.js';
import { selectOrderStatus } from './duck/selectors.js';
import { isLoading } from '../shared/utils/store.js';
import Loader from '../shared/components/Loader.js';
import { selectCurrentCompany, selectHomeStatus } from '../home/duck/selectors.js';
import { selectClientStatus } from '../clients/duck/selectors.js';
import { fetchClients } from '../clients/duck/thunks.js';
import { selectProductStatus } from '../products/duck/selectors.js';
import { fetchProducts } from '../products/duck/thunks.js';

const { tabsLabelsMap } = LANGUAGE.order.order;

export default function Order({ match }) {
    const dispatch = useDispatch();
    const { id } = match.params;
    const order = useSelector(state => selectOrderById(state, id));
    const company = useSelector(selectCurrentCompany);
    const userStatus = useSelector(selectUserStatus);
    const orderStatus = useSelector(selectOrderStatus);
    const homeStatus = useSelector(selectHomeStatus);
    const clientStatus = useSelector(selectClientStatus);
    const productStatus = useSelector(selectProductStatus);
    const loading = isLoading([userStatus, orderStatus, homeStatus, clientStatus, productStatus]);
    const [tabValue, setTabValue] = useState('details');

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current && !order) dispatch(fetchOrderById(id));
        if (!mounted.current) {
            if (clientStatus === 'IDLE' && company) dispatch(fetchClients(company._id));
            if (productStatus === 'IDLE' && company) dispatch(fetchProducts(company._id));
        }
        if (clientStatus === 'FULFILLED' && productStatus === 'FULFILLED') mounted.current = true;
    }, [dispatch, order, id, clientStatus, company, productStatus]);

    const onTabChange = (event, newValue) => setTabValue(newValue);

    return (
        <Box>
            { loading && <Loader/> }
            <Paper>
                <Tabs
                    value={ tabValue }
                    onChange={ onTabChange }
                    indicatorColor='primary'
                    textColor='primary'
                >
                    { Object.entries(tabsLabelsMap).map(([value, label]) =>
                        <Tab key={ value } label={ label } value={ value } component="span"/>
                    ) }
                </Tabs>
            </Paper>
            { order && company && clientStatus === 'FULFILLED' && productStatus === 'FULFILLED' && tabValue === 'details' &&
            <OrderDetails order={ order }/>
            }
            {/*<Grid item xs={12}>*/ }
            {/*    { order && tabValue === 0 && <OrderDetails order={order}/> }*/ }
            {/*    { order && tabValue === 1 && <OrderProductTable order={ order }/> }*/ }
            {/*</Grid>*/ }
        </Box>
    )
}

