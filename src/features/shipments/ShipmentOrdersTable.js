import React, { useCallback } from 'react';
import Table from '../shared/components/table/Table.js';
import StatusDisplay from '../orders/StatusDisplay.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { dateToLocaleDate } from '../shared/utils/format.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import { Box } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectOrdersByIds } from '../orders/duck/selectors.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(2),
    }
}));

const {
    tableHeaderLabelsMap,
    editOrdersButtonLabel
} = LANGUAGE.shipment.shipment.shipmentOrdersTable;

const ShipmentOrdersTable = React.memo(function ShipmentOrdersTable({ shipment }) {
    const classes = useStyles();
    const history = useHistory();
    const orderIds = shipment.items.reduce((acc, item) => {
        if (!acc.includes(item.order)) acc.push(item.order);
        return acc;
    }, []);
    const orders = useSelector(state => selectOrdersByIds(state, orderIds));
    const onEditOrders = () => history.push(`/home/shipments/edit/${ shipment._id }`);
    const onRowClick = useCallback((params) => history.push(`/home/orders/${ params.id }`), [history]);

    const columns = [
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
                <StatusDisplay status={ params.production }/>,
            align: 'center'
        },
        {
            field: 'qa',
            headerName: tableHeaderLabelsMap.qa,
            renderCell: (params) =>
                <StatusDisplay status={ params.qa }/>,
            align: 'center'
        },
        { field: 'notes', headerName: tableHeaderLabelsMap.notes },
    ];

    const rows = orders.map(order => ({
        id: order._id,
        ref: order.ref,
        clientRef: order.clientRef,
        totalQ: UnitCounter.stringRep(order.totalQ),
        crd: dateToLocaleDate(order.crd),
        del: order.del,
        production: order.status.production.status,
        qa: order.status.qa.status,
        notes: order.notes
    }));

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