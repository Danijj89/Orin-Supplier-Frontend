import React, { useEffect, useState } from 'react';
import POService from './services.js';
import OrderInfoTile from './OrderInfoTile.js';
import { Container, Tabs, Tab } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import OrderDetails from './OrderDetails.js';
import OrderDocuments from './OrderDocuments.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedOrder } from './duck/selectors.js';
import { setCurrentPO } from './duck/slice.js';

const { orderDetailsTab, documentsTab } = LANGUAGE.order.order;

export default function Order({ match }) {
    const dispatch = useDispatch();
    const { id } = match.params;
    const order = useSelector(selectSelectedOrder);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        const isDocumentsPopulated = (order) => {
            const docs = Object.entries(order.documents);
            return (docs.length === 0 || (docs.length > 0 && typeof docs[0][1] === 'object'));
        }
        const fetchOrder = async () => {
            const order = await POService.fetchOrderById(id);
            dispatch(setCurrentPO(order));
        };
        if (!order || !isDocumentsPopulated(order)) fetchOrder().then();
    }, [id, dispatch, order]);

    const onTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Container>
            { order && <OrderInfoTile order={ order }/> }
            <Tabs
                value={ tabValue }
                onChange={ onTabChange }
                indicatorColor='primary'
                textColor='primary'
            >
                <Tab label={ orderDetailsTab } component="span"/>
                <Tab label={ documentsTab } component="span"/>
            </Tabs>
            {tabValue === 0 && <OrderDetails order={ order } />}
            {tabValue === 1 && <OrderDocuments order={order} />}
        </Container>
    )
}