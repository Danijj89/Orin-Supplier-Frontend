import React from 'react';
import Table from '../shared/components/Table.js';
import StatusDisplay from '../orders/StatusDisplay.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { dateToLocaleDate } from '../shared/utils/format.js';
import { LANGUAGE } from '../../app/constants.js';

const {
    tableHeaderLabelsMap
} = LANGUAGE.shipment.shipment.shipmentOrdersTable;

export default function ShipmentOrdersTable({ orders }) {

    const columns = [
        { field: 'id', hide: true },
        { field: 'ref', headerName: tableHeaderLabelsMap.ref },
        { field: 'clientRef', headerName: tableHeaderLabelsMap.clientRef },
        { field: 'totalQ', headerName: tableHeaderLabelsMap.totalQ },
        { field: 'crd', headerName: tableHeaderLabelsMap.crd },
        { field: 'del', headerName: tableHeaderLabelsMap.del, align: 'center' },
        {
            field: 'production',
            headerName: tableHeaderLabelsMap.production,
            renderCell: (params) =>
                <StatusDisplay status={ params.production }/>,
            align: 'center'
        },
        {
            field: 'qa',
            headerName: tableHeaderLabelsMap.qa,
            renderCell: (params) =>
                <StatusDisplay status={ params.qa }/>,
            align: 'center'
        },
        { field: 'notes', headerName: tableHeaderLabelsMap.notes },
    ];

    const rows = orders.map(order => ({
        id: order._id,
        ref: order.ref,
        clientRef: order.clientRef,
        totalQ: UnitCounter.stringRep(order.totalQ),
        crd: dateToLocaleDate(order.crd),
        del: order.del,
        production: order.status.production.status,
        qa: order.status.qa.status,
        notes: order.notes
    }));

    return (
        <Table columns={ columns } rows={ rows }/>
    )
}