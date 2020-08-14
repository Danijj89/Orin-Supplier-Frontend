import React, { useEffect, useState } from 'react';
import OrderService from './services.js';

export default function Order({match}) {

    const [order, setOrder] = useState(null);
    const { id } = match.params;

    useEffect(() => {
        OrderService.fetchOrderById(id).then(order => setOrder(order));
    }, [id]);

    return (
        <div> {JSON.stringify(order)} </div>
    )
}