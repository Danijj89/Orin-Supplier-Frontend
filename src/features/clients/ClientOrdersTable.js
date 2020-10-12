import React from 'react';
import { LANGUAGE } from '../../app/constants.js';
import Table from '../shared/components/Table.js';


const {
    ordersTableHeadersMap
} = LANGUAGE.client.clientDetails.clientOrdersTable;

export default function ClientOrdersTable({ orders }) {

    const columns = [
        { field: 'id', hide: true },
        { field: 'ref', headerName: ordersTableHeadersMap.ref },
        { field: 'clientRef', headerName: ordersTableHeadersMap.clientRef },
        { field: 'crd', headerName: ordersTableHeadersMap.crd },
        { field: 'realCrd', headerName: ordersTableHeadersMap.realCrd },
        { field: 'totalQ', headerName: ordersTableHeadersMap.totalQ },
        { field: 'totalA', headerName: ordersTableHeadersMap.totalA },
        { field: 'del', headerName: ordersTableHeadersMap.del }
    ];

    const rows = orders.map(order => ({
        id: order._id,
        ref: order.ref,
        clientRef: order.clientRef,
        crd: order.crd,
        realCrd: order.realCrd,
        del: order.del,
        totalQ: order.totalQ,
        totalA: order.totalA
    }));

    return (
        <Table rows={ rows } columns={ columns }/>
    )
}