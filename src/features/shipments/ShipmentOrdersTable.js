import React, { useCallback, useMemo } from 'react';
import Table from '../shared/components/table/Table.js';
import OrderStatusDisplay from '../orders/OrderStatusDisplay.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { LANGUAGE, LOCALE } from '../../app/utils/constants.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { selectShipmentOrders, selectShipmentOwnerById } from './duck/selectors.js';
import { selectItemUnitsMap, selectSessionUserId } from '../../app/duck/selectors.js';
import { getOptionLabel } from '../../app/utils/options/getters.js';
import Permission from '../shared/components/Permission.js';
import { ORDER, SHIPMENT } from '../admin/utils/resources.js';
import { CREATE_ANY, CREATE_OWN, READ_ANY, READ_OWN } from '../admin/utils/actions.js';
import { isShipmentOwner } from '../admin/utils/resourceOwnerCheckers.js';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(2),
    }
}));

const {
    tableHeaderLabelsMap,
    editOrdersButtonLabel
} = LANGUAGE.shipment.shipment.shipmentOrdersTable;

const ShipmentOrdersTable = React.memo(function ShipmentOrdersTable() {
    const classes = useStyles();
    const history = useHistory();
    const { id: shipmentId } = useParams();
    const sessionUserId = useSelector(selectSessionUserId);
    const orders = useSelector(state => selectShipmentOrders(state, { shipmentId }));
    const shipmentOwner = useSelector(state => selectShipmentOwnerById(state, { shipmentId }));
    const itemUnitsMap = useSelector(selectItemUnitsMap);

    const onEditOrders = useCallback(
        () => history.push(`/home/shipments/shell?id=${ shipmentId }`),
        [history, shipmentId]);
    const onRowClick = useCallback(
        (params) => history.push(`/home/orders/${ params.id }`),
        [history]);

    const columns = useMemo(() => [
        { field: 'id', hide: true },
        { field: 'ref', headerName: tableHeaderLabelsMap.ref },
        { field: 'clientRef', headerName: tableHeaderLabelsMap.clientRef },
        { field: 'totalQ', headerName: tableHeaderLabelsMap.totalQ },
        { field: 'crd', headerName: tableHeaderLabelsMap.crd, type: 'date' },
        { field: 'del', headerName: tableHeaderLabelsMap.del, align: 'center' },
        {
            field: 'production',
            headerName: tableHeaderLabelsMap.production,
            renderCell: (params) =>
                <OrderStatusDisplay status={ params.production }/>,
            align: 'center'
        },
        {
            field: 'qa',
            headerName: tableHeaderLabelsMap.qa,
            renderCell: (params) =>
                <OrderStatusDisplay status={ params.qa }/>,
            align: 'center'
        },
        { field: 'notes', headerName: tableHeaderLabelsMap.notes },
    ], []);

    const rows = useMemo(() => {
        if (!orders) return [];
        return orders.map(order => {
            return ({
                id: order._id,
                ref: order.ref,
                clientRef: order.clientRef,
                totalQ: UnitCounter.stringRep(order.totalQ, itemUnitsMap, LOCALE),
                crd: order.crd,
                del: getOptionLabel(order.del, LOCALE),
                production: order.production.status,
                qa: order.qa.status,
                notes: order.notes
            })
        });
    }, [orders, itemUnitsMap]);

    return (
        <>
            <Permission
                resource={ SHIPMENT }
                action={ [CREATE_ANY, CREATE_OWN] }
                isOwner={ isShipmentOwner(sessionUserId, shipmentOwner) }
            >
                <ThemedButton variant="outlined" onClick={ onEditOrders } className={ classes.button }>
                    { editOrdersButtonLabel }
                </ThemedButton>
            </Permission>
            <Permission resource={ ORDER } action={ [READ_ANY, READ_OWN] }>
                <Table columns={ columns } rows={ rows } onRowClick={ onRowClick }/>
            </Permission>
        </>
    )
});

export default ShipmentOrdersTable;