import React, { useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { LANGUAGE, LOCALE } from 'app/utils/constants.js';
import PopoverNotes from '../shared/components/PopoverNotes.js';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrder, updateSplitStatus } from './duck/thunks.js';
import { selectAllActiveOrders } from './duck/selectors.js';
import { selectItemUnitsMap, selectOrderStatuses } from 'app/duck/selectors.js';
import { getOptionId } from 'app/utils/options/getters.js';
import { SESSION_ORDER_TABLE_FILTERS } from 'app/sessionKeys.js';
import { formatItemsTotalQuantities } from 'features/shared/utils/format.js';
import ShippingPlanTable from 'features/orders/ShippingPlanTable.js';
import StatusDropdown from 'features/shared/components/StatusDropdown.js';
import Table from 'features/shared/components/table/Table.js';

const { ordersTableHeadersMap } = LANGUAGE.order.ordersOverview;

export default function OrdersTable() {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const orders = useSelector(selectAllActiveOrders);
    const itemUnitsMap = useSelector(selectItemUnitsMap);
    const orderStatuses = useSelector(selectOrderStatuses);

    const createStatusDropdownRenderer = useCallback((status) => (row) => {
        if (row.shippingSplits.length > 1) return '-';
        const splitId = row.shippingSplits[0]._id;
        return (
            <StatusDropdown
                status={ row[status] }
                statuses={ orderStatuses }
                colorMap="order"
                onStatusChange={ (newStatus) => dispatch(updateSplitStatus({
                    orderId: row.id,
                    splitId,
                    update: { [status]: { status: getOptionId(newStatus) } }
                })) }
            />
        );
    }, [dispatch, orderStatuses]);

    const createNotesPopoverRenderer = useCallback(row => {
        if (row.shippingSplits.length > 1) return null;
        const splitId = row.shippingSplits[0]._id;
        return (
            <PopoverNotes
                notes={ row.notes }
                onSubmit={ data => dispatch(updateOrder({ orderId: row.id, splitId, update: data })) }
            />
        );
    }, [dispatch]);

    const columns = useMemo(() => [
        { field: 'ref', headerName: ordersTableHeadersMap.ref },
        {
            field: 'quantity',
            headerName: ordersTableHeadersMap.quantity,
            format: val => formatItemsTotalQuantities(val, itemUnitsMap, LOCALE)
        },
        { field: 'crd', headerName: ordersTableHeadersMap.crd, type: 'date' },
        { field: 'toName', headerName: ordersTableHeadersMap.toName },
        {
            field: 'procurement',
            headerName: ordersTableHeadersMap.procurement,
            renderCell: createStatusDropdownRenderer('procurement'),
            align: 'center',
            width: 140
        },
        {
            field: 'production',
            headerName: ordersTableHeadersMap.production,
            renderCell: createStatusDropdownRenderer('production'),
            align: 'center',
            width: 140
        },
        {
            field: 'qa',
            headerName: ordersTableHeadersMap.qa,
            renderCell: createStatusDropdownRenderer('qa'),
            align: 'center',
            width: 140
        },
        {
            field: 'notes',
            headerName: ordersTableHeadersMap.notes,
            renderCell: createNotesPopoverRenderer
        }
    ], [createStatusDropdownRenderer, createNotesPopoverRenderer, itemUnitsMap]);

    const rows = useMemo(() => orders.map(order => ({
        id: order._id,
        ref: order.ref,
        quantity: order.quantity,
        crd: order.crd,
        toName: order.toAdd.name,
        notes: order.notes,
        procurement: order.shippingSplits[0].procurement.status,
        production: order.shippingSplits[0].production.status,
        qa: order.shippingSplits[0].qa.status,
        shippingSplits: order.shippingSplits,
    })), [orders]);

    const onRowClick = useCallback(row =>
            // history.push(`${ location.pathname }/${ row.id }?tab=details`),
        {},
        []);
    const renderCollapse = useCallback(row =>
            <ShippingPlanTable orderId={ row.id } shippingSplits={ row.shippingSplits }/>
        , []);
    const hasCollapse = useCallback(row => true, []);
    const tools = useMemo(() => [
        {
            id: 'orders-table-filters',
            type: 'filter',
            options: {
                sessionKey: SESSION_ORDER_TABLE_FILTERS,
                filters: [
                    { field: 'crd', type: 'date', label: ordersTableHeadersMap.crd },
                    { field: 'toName', type: 'text', label: ordersTableHeadersMap.toName },
                    {
                        field: 'procurement',
                        type: 'option',
                        options: orderStatuses,
                        label: ordersTableHeadersMap.procurement
                    },
                    {
                        field: 'production',
                        type: 'option',
                        options: orderStatuses,
                        label: ordersTableHeadersMap.production
                    },
                    { field: 'qa', type: 'option', options: orderStatuses, label: ordersTableHeadersMap.qa },
                ]
            }
        }
    ], [orderStatuses]);

    const options = useMemo(() => ({
        table: {
            dense: true,
            collapse: true
        },
        body: {
            onRowClick,
            hasCollapse,
            renderCollapse,
        },
        tools
    }), [onRowClick, renderCollapse, hasCollapse, tools]);

    return (
        <Table
            columns={ columns }
            rows={ rows }
            options={ options }
        />
    )
}


