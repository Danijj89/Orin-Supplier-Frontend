import React from 'react';
import { getStringFromTotalQuantityObject, yymmddToLocaleDate } from './helpers.js';
import { useHistory } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    deleteButtonCell: {
        padding: 0
    }
})

export default function OrderTableRow({order, onDialogOpen}) {
    const classes = useStyles();
    const history = useHistory();
    const {status, poRef, totalQ, crd, from, remarks} = order;
    const renderedTotalQuantity = getStringFromTotalQuantityObject(totalQ);

    const onRowClick = () => {
        history.push(`/home/orders/${order._id}`);
    }

    return (
        <TableRow hover onClick={onRowClick}>
            <TableCell className={classes.deleteButtonCell}>
                <Button onClick={(e) => onDialogOpen(e, order._id)}><DeleteIcon/></Button>
            </TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{poRef}</TableCell>
            <TableCell>{renderedTotalQuantity}</TableCell>
            <TableCell>{yymmddToLocaleDate(crd)}</TableCell>
            <TableCell>{from.name}</TableCell>
            <TableCell>{remarks}</TableCell>
        </TableRow>
    )
}