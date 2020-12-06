import React, { useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Table from '../shared/components/table/Table.js';
import { LANGUAGE, LOCALE } from '../../app/utils/constants.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import PopoverNotes from '../shared/components/PopoverNotes.js';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrder, updateOrderStatus } from './duck/thunks.js';
import { selectAllActiveOrders } from './duck/selectors.js';
import { selectItemUnitsMap, selectOrderStatuses } from '../../app/duck/selectors.js';
import StatusDropdown from '../shared/components/StatusDropdown.js';
import { getOptionId } from '../../app/utils/options/getters.js';

const { ordersTableHeadersMap } = LANGUAGE.order.ordersOverview;

export default function OrdersTable() {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const orders = useSelector(selectAllActiveOrders);
    const itemUnitsMap = useSelector(selectItemUnitsMap);
    const orderStatuses = useSelector(selectOrderStatuses);

    const onRowClick = (params) => history.push(`${ location.pathname }/${ params.id }?tab=details`);

    const onNotesSubmit = useCallback(
        (orderId, data) => dispatch(updateOrder({ orderId, update: data })),
        [dispatch]);

    const createStatusChangeHandler = useCallback(
        (orderId, statusStep) => (newStatus) =>
            dispatch(updateOrderStatus({ orderId, update: { [statusStep]: { status: getOptionId(newStatus)}}})),
        [dispatch]);

    const columns = useMemo(() => [
        { field: 'id', hide: true },
        { field: 'ref', headerName: ordersTableHeadersMap.ref },
        { field: 'totalQ', headerName: ordersTableHeadersMap.totalQ },
        {
            field: 'crd',
            headerName: ordersTableHeadersMap.crd,
            type: 'date',
            filter: 'date'
        },
        { field: 'toName', headerName: ordersTableHeadersMap.toName },
        {
            field: 'procurement',
            headerName: ordersTableHeadersMap.procurement,
            renderCell: params =>
                <StatusDropdown
                    status={ params.procurement }
                    statuses={ orderStatuses }
                    colorMap="order"
                    onStatusChange={ createStatusChangeHandler(params.id, 'procurement')}
                />,
            align: 'center',
            width: 140,
            filter: 'option',
            filterOptions: orderStatuses
        },
        {
            field: 'production',
            headerName: ordersTableHeadersMap.production,
            renderCell: params =>
                <StatusDropdown
                    status={ params.production }
                    statuses={ orderStatuses }
                    colorMap="order"
                    onStatusChange={ createStatusChangeHandler(params.id, 'production')}
                />,
            align: 'center',
            width: 140
        },
        {
            field: 'qa',
            headerName: ordersTableHeadersMap.qa,
            renderCell: params =>
                <StatusDropdown
                    status={ params.qa }
                    statuses={ orderStatuses }
                    colorMap="order"
                    onStatusChange={ createStatusChangeHandler(params.id, 'qa')}
                />,
            align: 'center',
            width: 140
        },
        {
            field: 'notes',
            headerName: ordersTableHeadersMap.notes,
            renderCell: params =>
                <PopoverNotes
                    notes={ params.notes }
                    onSubmit={ (data) => onNotesSubmit(params.id, data) }
                />
        }
    ], [createStatusChangeHandler, onNotesSubmit, orderStatuses]);

    const rows = useMemo(() => orders.map(order => ({
        id: order._id,
        ref: order.ref,
        totalQ: UnitCounter.stringRep(order.totalQ, itemUnitsMap, LOCALE),
        crd: order.crd,
        toName: order.toAdd.name,
        procurement: order.procurement.status,
        production: order.production.status,
        qa: order.qa.status,
        notes: order.notes
    })), [orders, itemUnitsMap]);

    return (
        <Table columns={ columns } rows={ rows } onRowClick={ onRowClick }/>
    )
}