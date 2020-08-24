import React, { useEffect, useState } from 'react';
import OrderService from './services.js';
import OrderInfoTile from './OrderInfoTile.js';
import { Container, Tabs, Tab } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import OrderDetails from './OrderDetails.js';
import OrderDocuments from './OrderDocuments.js';

const { orderDetailsTab, documentsTab } = LANGUAGE.order.order;

export default function Order({ match }) {
    const { id } = match.params;
    const [order, setOrder] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const order = await OrderService.fetchOrderById(id);
            setOrder(order);
            try {
                const file = await OrderService.getPdfFilePreview(order.fileName);
                setPreview(window.URL.createObjectURL(file));
            } catch (err) {
                document.querySelector('iframe').contentDocument.write('<h1>Content Not Found</h1>');
                document.close();
            }
        };
        fetchData().then();
    }, []);

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
            {tabValue === 0 && <OrderDetails order={ order } preview={ preview }/>}
            {tabValue === 1 && <OrderDocuments order={order} />}
        </Container>
    )
}