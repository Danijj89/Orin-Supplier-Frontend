import React, { useCallback, useMemo, useState } from 'react';
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
import FulfillmentPlanTable from 'features/orders/FulfillmentPlanTable.js';
import StatusDropdown from 'features/shared/components/StatusDropdown.js';
import Table from 'features/shared/components/table/Table.js';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import Drawer from '@material-ui/core/Drawer';
import InfoCard from 'features/shared/wrappers/InfoCard.js';
import OrderProductTable from 'features/orders/OrderProductTable.js';

const { ordersTableHeadersMap } = LANGUAGE.order.ordersOverview;

export default function OrdersTable() {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const [drawerData, setDrawerData] = useState(null);
    const orders = useSelector(selectAllActiveOrders);
    const itemUnitsMap = useSelector(selectItemUnitsMap);
    const orderStatuses = useSelector(selectOrderStatuses);

    const onOpenDrawer = useCallback(
        newDrawerData => setDrawerData(newDrawerData),
        []);
    const onCloseDrawer = useCallback(e => setDrawerData(null), []);

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
                onClick={ () => history.push(`${ location.pathname }/${ row.id }?mode=view&tab=product`) }>
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
            format: row => formatItemsTotalQuantities(row.quantity, itemUnitsMap, LOCALE)
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
        currency: order.currency,
        custom1: order.custom1,
        custom2: order.custom2
    })), [orders]);

    const renderCollapse = useCallback(row =>
            <FulfillmentPlanTable
                orderId={ row.id }
                shippingSplits={ row.shippingSplits }
                currency={ row.currency }
                custom1={ row.custom1 }
                custom2={ row.custom2 }
                onRowClick={ onOpenDrawer }
            />
        , [onOpenDrawer]);
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
        <>
            <Table
                columns={ columns }
                rows={ rows }
                options={ options }
            />

            <Drawer
                anchor={ 'right' }
                open={ Boolean(drawerData) }
                onClose={ onCloseDrawer }
                transitionDuration={ 500 }
            >
                { drawerData && <InfoCard
                    title={ drawerData.ref }
                    content={
                        <OrderProductTable
                            items={ drawerData.items }
                            currency={ drawerData.currency }
                            quantity={ drawerData.quantity }
                            total={ drawerData.total }
                            custom1={ drawerData.custom1 }
                            custom2={ drawerData.custom2 }
                        />
                    }
                /> }
            </Drawer>
        </>
    )
}


