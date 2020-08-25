import React from 'react';
import { useHistory } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { getStringFromTotalQuantityObject, yymmddToLocaleDate } from '../shared/utils.js';
import { useDispatch } from 'react-redux';
import { selectOrder } from './duck/slice.js';

const useStyles = makeStyles({
    deleteButtonCell: {
        padding: 0
    }
})

export default function OrderTableRow({order, onDialogOpen}) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const {_id: orderId , status, poRef, totalQ, crd, fromName, remarks} = order;
    const renderedTotalQuantity = getStringFromTotalQuantityObject(totalQ);

    const onRowClick = () => {
        dispatch(selectOrder(order));
        history.push(`/home/orders/${orderId}`);
    }

    return (
        <TableRow hover onClick={onRowClick}>
            <TableCell className={classes.deleteButtonCell}>
                <Button onClick={(e) => onDialogOpen(e, orderId)}><DeleteIcon/></Button>
            </TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{poRef}</TableCell>
            <TableCell>{renderedTotalQuantity}</TableCell>
            <TableCell>{yymmddToLocaleDate(crd)}</TableCell>
            <TableCell>{fromName}</TableCell>
            <TableCell>{remarks}</TableCell>
        </TableRow>
    )
}