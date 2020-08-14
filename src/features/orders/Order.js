import React, { useEffect, useState } from 'react';
import OrderService from './services.js';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import OrderInfoTile from './OrderInfoTile.js';

const useStyles = makeStyles({
    container: {

    }
})

export default function Order({match}) {

    const [order, setOrder] = useState(null);
    const { id } = match.params;

    useEffect(() => {
        const fetchData = async () => {
            const order = await OrderService.fetchOrderById(id);
            setOrder(order);
        };
        fetchData().then();
    }, [id, order]);

    return (
        <Container>
            {order && <OrderInfoTile order={order} />}
            <div> Order </div>
        </Container>
    )
}