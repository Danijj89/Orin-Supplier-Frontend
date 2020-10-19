import React from 'react';
import { useHistory } from 'react-router-dom';
import { LANGUAGE } from '../../app/constants.js';
import Table from '../shared/components/Table.js';
import UnitCounter from '../shared/classes/UnitCounter.js';


const {
    ordersTableHeadersMap
} = LANGUAGE.client.clientDetails.clientOrdersTable;

export default function ClientOrdersTable({ orders }) {
    const history = useHistory();

    const onRowClick = (params) => history.push(`/home/orders/${ params.id }`);

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
        totalQ: UnitCounter.stringRep(order.totalQ),
        totalA: order.totalA
    }));

    return (
        <Table rows={ rows } columns={ columns } onRowClick={ onRowClick }/>
    )
}