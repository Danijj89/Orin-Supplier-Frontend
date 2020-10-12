import React from 'react';
import Table from '../shared/components/Table.js';
import { LANGUAGE } from '../../app/constants.js';
import UnitCounter from '../shared/classes/UnitCounter.js';

const { ordersTableHeadersMap } = LANGUAGE.order.ordersOverview;

export default function OrdersTable({ orders }) {

    const columns = [
        { field: 'id', hide: true },
        { field: 'ref', headerName: ordersTableHeadersMap.ref },
        { field: 'totalQ', headerName: ordersTableHeadersMap.totalQ },
        { field: 'crd', headerName: ordersTableHeadersMap.crd },
        { field: 'toName', headerName: ordersTableHeadersMap.toName },
        { field: 'procurement', headerName: ordersTableHeadersMap.procurement },
        { field: 'production', headerName: ordersTableHeadersMap.production },
        { field: 'qa', headerName: ordersTableHeadersMap.qa },
        { field: 'notes', headerName: ordersTableHeadersMap.notes }
    ];

    const rows = orders.map(order => ({
        id: order._id,
        ref: order.ref,
        totalQ: new UnitCounter([], order.totalQ).stringRep,
        crd: order.crd,
        toName: order.toAdd.name,
        procurement: order.procurement,
        production: order.production,
        qa: order.qa,
        notes: order.notes
    }));

    return (
        <Table columns={columns} rows={rows}/>
    )
}