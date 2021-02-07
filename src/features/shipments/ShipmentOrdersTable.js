import React, { useCallback, useMemo } from 'react';
import Table from '../shared/components/table/Table.js';
import OrderStatusDisplay from '../orders/OrderStatusDisplay.js';
import { LANGUAGE, LOCALE } from 'app/utils/constants.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { selectItemUnitsMap } from 'app/duck/selectors.js';
import { CREATE_ANY, CREATE_OWN, READ_ANY, READ_OWN } from '../admin/utils/actions.js';
import OrderPermission from '../shared/permissions/OrderPermission.js';
import ShipmentPermission from '../shared/permissions/ShipmentPermission.js';
import { selectShipmentOrders, selectSplitsToShippedQuantityMap } from 'features/shipments/utils/selectors.js';
import { formatItemsTotalQuantities, getFulfilledPercentage } from 'features/shared/utils/format.js';
import { getOrderURL } from 'features/orders/utils/urls.js';
import { getQuantityTotalCount } from 'features/shared/utils/reducers.js';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(2),
    }
}));

const {
    tableHeaderLabels,
    buttons
} = LANGUAGE.shipment.shipment;

const ShipmentOrdersTable = React.memo(function ShipmentOrdersTable({ shipmentId }) {
    const classes = useStyles();
    const history = useHistory();
    const splitsShippedQuantityMap = useSelector(selectSplitsToShippedQuantityMap);
    const orders = useSelector(state => selectShipmentOrders(state, { shipmentId }));
    const itemUnitsMap = useSelector(selectItemUnitsMap);

    const onEditOrders = useCallback(
        () => history.push(`/home/shipments/shell?id=${ shipmentId }`),
        [history, shipmentId]);
    const onRowClick = useCallback(
        row => history.push(getOrderURL(row.orderId, { split: row.splitId })),
        [history]);

    const columns = useMemo(() => [
        { field: 'ref', headerName: tableHeaderLabels.ref },
        { field: 'clientRef', headerName: tableHeaderLabels.clientRef },
        {
            field: 'quantity',
            headerName: tableHeaderLabels.quantity,
            format: row => formatItemsTotalQuantities(row.quantity, itemUnitsMap, LOCALE)
        },
        { field: 'crd', headerName: tableHeaderLabels.crd, type: 'date' },
        {
            field: 'del',
            headerName: tableHeaderLabels.del,
            align: 'center',
            type: 'option'
        },
        {
            field: 'production',
            headerName: tableHeaderLabels.production,
            renderCell: (params) =>
                <OrderStatusDisplay status={ params.production }/>,
            align: 'center'
        },
        {
            field: 'qa',
            headerName: tableHeaderLabels.qa,
            renderCell: (params) =>
                <OrderStatusDisplay status={ params.qa }/>,
            align: 'center'
        },
        {
            field: 'fulfilled',
            headerName: tableHeaderLabels.fulfilled,
            align: 'center',
            format: row => getFulfilledPercentage(
                splitsShippedQuantityMap[row.splitId],
                getQuantityTotalCount(row.quantity)
            )
        },
    ], [itemUnitsMap, splitsShippedQuantityMap]);

    const rows = useMemo(() => {
        if (!orders) return [];
        return orders.map(({ _id: orderId, split, del }) => ({
                orderId,
                splitId: split._id,
                ref: split.ref,
                clientRef: split.clientRef,
                quantity: split.quantity,
                crd: split.crd,
                del,
                production: split.production.status,
                qa: split.qa.status
            })
        );
    }, [orders]);

    const options = useMemo(() => ({
        table: {
            dense: true
        },
        head: {
            sort: false
        },
        body: {
            onRowClick
        },
        foot: {
            pagination: 'hide'
        }
    }), [onRowClick]);

    return (
        <>
            <ShipmentPermission action={ [CREATE_ANY, CREATE_OWN] } shipmentId={ shipmentId }>
                <ThemedButton variant="outlined" onClick={ onEditOrders } className={ classes.button }>
                    { buttons.editShipmentOrders }
                </ThemedButton>
            </ShipmentPermission>
            <OrderPermission action={ [READ_ANY, READ_OWN] }>
                <Table columns={ columns } rows={ rows } options={ options }/>
            </OrderPermission>
        </>
    )
});

export default ShipmentOrdersTable;