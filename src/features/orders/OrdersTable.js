import React, { useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { LANGUAGE, LOCALE } from 'app/utils/constants.js';
import PopoverNotes from '../shared/components/PopoverNotes.js';
import { useDispatch, useSelector } from 'react-redux';
import { updateSplit } from './duck/thunks.js';
import { selectAllActiveOrders } from './duck/selectors.js';
import { selectItemUnitsMap, selectOrderStatuses } from 'app/duck/selectors.js';
import { getOptionId } from 'app/utils/options/getters.js';
import { SESSION_ORDER_TABLE_FILTERS } from 'app/sessionKeys.js';
import { formatItemsTotalQuantities } from 'features/shared/utils/format.js';
import ShippingPlanTable from 'features/orders/ShippingPlanTable.js';
import StatusDropdown from 'features/shared/components/StatusDropdown.js';
import Table from 'features/shared/components/table/Table.js';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';

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
                onStatusChange={ (newStatus) => dispatch(updateSplit({
                    orderId: row.id,
                    splitId,
                    update: { [status]: { status: getOptionId(newStatus) } }
                })) }
            />
        );
    }, [dispatch, orderStatuses]);

    const notesPopoverRenderer = useCallback(row => {
        if (row.shippingSplits.length > 1) return null;
        const split = row.shippingSplits[0];
        return (
            <PopoverNotes
                notes={ split.notes }
                onSubmit={ data => dispatch(updateSplit({ orderId: row.id, splitId: split._id, update: data })) }
            />
        );
    }, [dispatch]);

    const refButtonRenderer = useCallback(row =>
        <ThemedButton
            variant="text"
            onClick={ () => history.push(`${ location.pathname }/${ row.id }?tab=details`) }>
            { row.ref }
        </ThemedButton>,
    [history, location.pathname]);

    const columns = useMemo(() => [
        {
            field: 'ref',
            headerName: ordersTableHeadersMap.ref,
            renderCell: refButtonRenderer
        },
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
            renderCell: notesPopoverRenderer
        }
    ], [
        createStatusDropdownRenderer,
        notesPopoverRenderer,
        refButtonRenderer,
        itemUnitsMap
    ]);

    const rows = useMemo(() => orders.map(order => ({
        id: order._id,
        ref: order.ref,
        quantity: order.quantity,
        crd: order.crd,
        toName: order.toAdd.name,
        notes: order.shippingSplits[0].notes,
        procurement: order.shippingSplits[0].procurement.status,
        production: order.shippingSplits[0].production.status,
        qa: order.shippingSplits[0].qa.status,
        shippingSplits: order.shippingSplits,
    })), [orders]);

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
            hasCollapse,
            renderCollapse,
        },
        tools
    }), [renderCollapse, hasCollapse, tools]);

    return (
        <Table
            columns={ columns }
            rows={ rows }
            options={ options }
        />
    )
}


