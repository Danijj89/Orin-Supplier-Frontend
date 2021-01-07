import React, { useCallback } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import { TableRow } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import { dateToLocaleDate, formatItemsTotalQuantities } from 'features/shared/utils/format.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectItemUnitsMap, selectOrderStatuses } from 'app/duck/selectors.js';
import { makeStyles } from '@material-ui/core/styles';
import StatusDropdown from 'features/shared/components/StatusDropdown.js';
import { updateOrder, updateSplit } from 'features/orders/duck/thunks.js';
import { getOptionId } from 'app/utils/options/getters.js';
import { LANGUAGE, LOCALE } from 'app/utils/constants.js';
import TableHead from '@material-ui/core/TableHead';
import PopoverNotes from 'features/shared/components/PopoverNotes.js';
import Table from '@material-ui/core/Table';

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1),
        backgroundColor: theme.palette.backgroundSecondary.main,
    },
    table: {
        backgroundColor: theme.palette.backgroundPrimary.main,
    },
    row: {
        '& > *': {
            borderBottom: 'unset'
        },
    }
}));

const {
    shippingPlanTableHeaders
} = LANGUAGE.order.ordersOverview;

const ShippingPlanTableRow = React.memo(function ShippingPlanTableRow({ orderId, split }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const itemUnitsMap = useSelector(selectItemUnitsMap);
    const orderStatuses = useSelector(selectOrderStatuses);

    const createNotesSubmitHandler = useCallback(
        (orderId, splitId) => data =>
            dispatch(updateOrder({ orderId, splitId, update: data })),
        [dispatch]);

    const createStatusChangeHandler = useCallback(
        (orderId, splitId, statusStep) => (newStatus) =>
            dispatch(updateSplit({
                orderId,
                splitId,
                update: { [statusStep]: { status: getOptionId(newStatus) } }
            })),
        [dispatch]);

    return (
        <TableRow className={ classes.row } hover>
            <TableCell>{ split.ref }</TableCell>
            <TableCell>{ formatItemsTotalQuantities(split.quantity, itemUnitsMap, LOCALE) }</TableCell>
            <TableCell>{ dateToLocaleDate(split.crd) || '-' }</TableCell>
            <TableCell>
                <StatusDropdown
                    status={ split.procurement.status }
                    statuses={ orderStatuses }
                    colorMap="order"
                    onStatusChange={ createStatusChangeHandler(orderId, split._id, 'procurement') }
                />
            </TableCell>
            <TableCell>
                <StatusDropdown
                    status={ split.production.status }
                    statuses={ orderStatuses }
                    colorMap="order"
                    onStatusChange={ createStatusChangeHandler(orderId, split._id, 'production') }
                />
            </TableCell>
            <TableCell>
                <StatusDropdown
                    status={ split.qa.status }
                    statuses={ orderStatuses }
                    colorMap="order"
                    onStatusChange={ createStatusChangeHandler(orderId, split._id, 'qa') }
                />
            </TableCell>
            <TableCell>
                <PopoverNotes
                    notes={ split.notes }
                    onSubmit={ createNotesSubmitHandler(orderId, split._id) }
                />
            </TableCell>
        </TableRow>
    );
});

const FulfillmentPlanTable = React.memo(function FulfillmentPlanTable(
    { orderId, shippingSplits }) {
    const classes = useStyles();

    return (
        <TableContainer className={ classes.container }>
            <Table size="small" className={ classes.table }>
                <TableHead>
                    <TableRow className={ classes.row }>
                        <TableCell>{ shippingPlanTableHeaders.ref }</TableCell>
                        <TableCell>{ shippingPlanTableHeaders.quantity }</TableCell>
                        <TableCell>{ shippingPlanTableHeaders.crd }</TableCell>
                        <TableCell>{ shippingPlanTableHeaders.procurement }</TableCell>
                        <TableCell>{ shippingPlanTableHeaders.production }</TableCell>
                        <TableCell>{ shippingPlanTableHeaders.qa }</TableCell>
                        <TableCell>{ shippingPlanTableHeaders.notes }</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { shippingSplits.map(split =>
                        <ShippingPlanTableRow key={ split.ref } orderId={ orderId } split={ split }/>
                    ) }
                </TableBody>
            </Table>
        </TableContainer>
    );
});

FulfillmentPlanTable.propTypes = {};

export default FulfillmentPlanTable;