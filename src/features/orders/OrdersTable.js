import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LANGUAGE, LOCALE } from 'app/utils/constants.js';
import PopoverNotes from '../shared/components/PopoverNotes.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTableOrders, fetchTableOrders, updateSplit } from './duck/thunks.js';
import { selectAllActiveOrders } from './duck/selectors.js';
import { selectItemUnitsMap, selectOrderStatuses } from 'app/duck/selectors.js';
import { getOptionId } from 'app/utils/options/getters.js';
import { SESSION_ORDER_TABLE_ARCHIVE, SESSION_ORDER_TABLE_FILTERS } from 'app/sessionKeys.js';
import { formatItemsTotalQuantities } from 'features/shared/utils/format.js';
import StatusDropdown from 'features/shared/components/StatusDropdown.js';
import Table from 'features/shared/components/table/Table.js';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import Drawer from '@material-ui/core/Drawer';
import InfoCard from 'features/shared/wrappers/InfoCard.js';
import OrderProductTable from 'features/orders/OrderProductTable.js';
import { getOrderURL } from 'features/orders/utils/urls.js';

const { ordersTableHeadersMap } = LANGUAGE.order.ordersOverview;

export default function OrdersTable() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerData, setDrawerData] = useState(null);
    const orders = useSelector(selectAllActiveOrders);
    const itemUnitsMap = useSelector(selectItemUnitsMap);
    const orderStatuses = useSelector(selectOrderStatuses);

    const onRowClick = useCallback(
        row => {
            setDrawerData({
                ref: row.ref,
                items: row.items,
                currency: row.currency,
                quantity: row.quantity,
                total: row.total,
                custom1: row.custom1,
                custom2: row.custom2
            });
            setIsDrawerOpen(true);
        },
        []);

    const onCloseDrawer = useCallback(() => setIsDrawerOpen(false), []);

    const createStatusDropdownRenderer = useCallback((status) => (row) =>
        <StatusDropdown
            status={ row[status] }
            statuses={ orderStatuses }
            colorMap="order"
            onStatusChange={ (newStatus) => dispatch(updateSplit({
                orderId: row.id,
                splitId: row.splitId,
                update: { [status]: { status: getOptionId(newStatus) } }
            })) }
        />, [dispatch, orderStatuses]);

    const notesPopoverRenderer = useCallback(row => {
        return (
            <PopoverNotes
                notes={ row.notes }
                onSubmit={ data => dispatch(updateSplit({ orderId: row.id, splitId: row.splitId, update: data })) }
            />
        );
    }, [dispatch]);

    const refButtonRenderer = useCallback(row =>
            <ThemedButton
                variant="text"
                onClick={ () => history.push(getOrderURL(row.id, { split: row.splitId })) }
            >
                { row.ref }
            </ThemedButton>,
        [history]);

    const columns = useMemo(() => [
        {
            field: 'ref',
            headerName: ordersTableHeadersMap.ref,
            renderCell: refButtonRenderer
        },
        {
            field: 'quantity',
            headerName: ordersTableHeadersMap.quantity,
            format: row => formatItemsTotalQuantities(row.quantity, itemUnitsMap, LOCALE),
            align: 'center'
        },
        {
            field: 'crd',
            headerName: ordersTableHeadersMap.crd,
            type: 'date',
            align: 'center'
        },
        { field: 'toName', headerName: ordersTableHeadersMap.toName },
        {
            field: 'procurement',
            headerName: ordersTableHeadersMap.procurement,
            renderCell: createStatusDropdownRenderer('procurement'),
            align: 'center',
            width: 160
        },
        {
            field: 'production',
            headerName: ordersTableHeadersMap.production,
            renderCell: createStatusDropdownRenderer('production'),
            align: 'center',
            width: 160
        },
        {
            field: 'qa',
            headerName: ordersTableHeadersMap.qa,
            renderCell: createStatusDropdownRenderer('qa'),
            align: 'center',
            width: 160
        },
        {
            field: 'notes',
            headerName: ordersTableHeadersMap.notes,
            renderCell: notesPopoverRenderer,
            align: 'center',
            width: 50
        }
    ], [
        createStatusDropdownRenderer,
        notesPopoverRenderer,
        refButtonRenderer,
        itemUnitsMap
    ]);

    const rows = useMemo(() => {
        const result = [];
        orders.forEach(order => order.shippingSplits.forEach(split => result.push({
            id: order._id,
            splitId: split._id,
            ref: split.ref,
            crd: split.crd,
            toName: order.toAdd.name,
            notes: split.notes,
            procurement: split.procurement.status,
            production: split.production.status,
            qa: split.qa.status,
            items: split.items,
            currency: order.currency,
            quantity: split.quantity,
            total: split.total,
            custom1: order.custom1,
            custom2: order.custom2
        })));
        return result;
    }, [orders]);

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
        },
        {
            id: 'orders-table-archive',
            type: 'archive',
            options: {
                sessionKey: SESSION_ORDER_TABLE_ARCHIVE,
                fetchData: () => dispatch(fetchTableOrders()),
                fetchArchivedData: () => dispatch(fetchAllTableOrders())
            }
        }
    ], [orderStatuses, dispatch]);

    const options = useMemo(() => ({
        table: {
            dense: true,
        },
        body: {
            onRowClick
        }
    }), [onRowClick]);

    return (
        <>
            <Table
                columns={ columns }
                rows={ rows }
                tools={ tools }
                options={ options }
            />
            <Drawer
                anchor={ 'right' }
                open={ isDrawerOpen }
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


