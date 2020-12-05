import React, { useCallback, useMemo } from 'react';
import Table from '../shared/components/table/Table.js';
import OrderStatusDisplay from '../orders/OrderStatusDisplay.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { dateToLocaleDate } from '../shared/utils/format.js';
import { LANGUAGE, LOCALE } from '../../app/utils/constants.js';
import { Box } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { selectShipmentOrders } from './duck/selectors.js';
import { selectItemUnitsMap } from '../../app/duck/selectors.js';
import { getOptionLabel } from '../../app/utils/options/getters.js';

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
    const orders = useSelector(state => selectShipmentOrders(state, { shipmentId }));
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
        { field: 'crd', headerName: tableHeaderLabelsMap.crd },
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
                crd: dateToLocaleDate(order.crd),
                del: getOptionLabel(order.del, LOCALE),
                production: order.production.status,
                qa: order.qa.status,
                notes: order.notes
            })
        });
    }, [orders, itemUnitsMap]);

    return (
        <Box>
            <ThemedButton variant="outlined" onClick={ onEditOrders } className={ classes.button }>
                { editOrdersButtonLabel }
            </ThemedButton>
            <Table columns={ columns } rows={ rows } onRowClick={ onRowClick }/>
        </Box>
    )
});

export default ShipmentOrdersTable;