import React from 'react';
import { useHistory } from 'react-router-dom';
import Table from '../shared/components/table/Table.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { dateToLocaleDate } from '../shared/utils/format.js';
import PopoverNotes from '../shared/components/PopoverNotes.js';
import { useDispatch } from 'react-redux';
import { updateOrder } from './duck/thunks.js';

const { ordersTableHeadersMap } = LANGUAGE.order.ordersOverview;

export default function OrdersTable({ orders }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const onRowClick = (params) => history.push(`/home/orders/${ params.id }`);

    const onNotesSubmit = (orderId, data) =>
        dispatch(updateOrder({ id: orderId, update: data }));

    const columns = [
        { field: 'id', hide: true },
        { field: 'ref', headerName: ordersTableHeadersMap.ref },
        { field: 'totalQ', headerName: ordersTableHeadersMap.totalQ },
        { field: 'crd', headerName: ordersTableHeadersMap.crd },
        { field: 'toName', headerName: ordersTableHeadersMap.toName },
        { field: 'procurement', headerName: ordersTableHeadersMap.procurement },
        { field: 'production', headerName: ordersTableHeadersMap.production },
        { field: 'qa', headerName: ordersTableHeadersMap.qa },
        {
            field: 'notes',
            headerName: ordersTableHeadersMap.notes,
            renderCell: params =>
                <PopoverNotes
                    notes={ params.notes }
                    onSubmit={ (data) => onNotesSubmit(params.id, data) }
                />
        }
    ];

    const rows = orders.filter(order => order.active).map(order => ({
        id: order._id,
        ref: order.ref,
        totalQ: UnitCounter.stringRep(order.totalQ),
        crd: dateToLocaleDate(order.crd),
        toName: order.toAdd.name,
        procurement: order.procurement,
        production: order.production,
        qa: order.qa,
        notes: order.notes
    }));

    return (
        <Table columns={ columns } rows={ rows } onRowClick={ onRowClick }/>
    )
}