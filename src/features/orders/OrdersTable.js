import React, { useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Table from '../shared/components/table/Table.js';
import { LANGUAGE, LOCALE } from '../../app/utils/constants.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { dateToLocaleDate } from '../shared/utils/format.js';
import PopoverNotes from '../shared/components/PopoverNotes.js';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrder } from './duck/thunks.js';
import { selectAllActiveOrders } from './duck/selectors.js';
import StatusDisplay from './StatusDisplay.js';
import { selectItemUnitsMap } from '../../app/duck/selectors.js';

const { ordersTableHeadersMap } = LANGUAGE.order.ordersOverview;

export default function OrdersTable() {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const orders = useSelector(selectAllActiveOrders);
    const itemUnitsMap = useSelector(selectItemUnitsMap);

    const onRowClick = (params) => history.push(`${ location.pathname }/${ params.id }?tab=details`);

    const onNotesSubmit = useCallback(
        (orderId, data) => dispatch(updateOrder({ orderId, update: data })),
        [dispatch]);

    const renderPopoverNotes = useCallback(
        (params) => <PopoverNotes
            notes={ params.notes }
            onSubmit={ (data) => onNotesSubmit(params.id, data) }
        />,
        [onNotesSubmit]);

    const columns = useMemo(() => [
        { field: 'id', hide: true },
        { field: 'ref', headerName: ordersTableHeadersMap.ref },
        { field: 'totalQ', headerName: ordersTableHeadersMap.totalQ },
        { field: 'crd', headerName: ordersTableHeadersMap.crd },
        { field: 'toName', headerName: ordersTableHeadersMap.toName },
        {
            field: 'procurement',
            headerName: ordersTableHeadersMap.procurement,
            renderCell: params => <StatusDisplay status={ params.procurement }/>,
            align: 'center'
        },
        {
            field: 'production',
            headerName: ordersTableHeadersMap.production,
            renderCell: params => <StatusDisplay status={ params.procurement }/>,
            align: 'center'
        },
        {
            field: 'qa',
            headerName: ordersTableHeadersMap.qa,
            renderCell: params => <StatusDisplay status={ params.procurement }/>,
            align: 'center'
        },
        {
            field: 'notes',
            headerName: ordersTableHeadersMap.notes,
            renderCell: renderPopoverNotes
        }
    ], [renderPopoverNotes]);

    const rows = useMemo(() => orders.map(order => ({
        id: order._id,
        ref: order.ref,
        totalQ: UnitCounter.stringRep(order.totalQ, itemUnitsMap, LOCALE),
        crd: dateToLocaleDate(order.crd),
        toName: order.toAdd.name,
        procurement: order.status.procurement.status,
        production: order.status.production.status,
        qa: order.status.qa.status,
        notes: order.notes
    })), [orders, itemUnitsMap]);

    return (
        <Table columns={ columns } rows={ rows } onRowClick={ onRowClick }/>
    )
}