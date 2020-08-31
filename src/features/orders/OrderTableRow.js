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
    },
    wrapText: {
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        textAlign: 'center'
    }
})

export default function OrderTableRow({ order, onDialogOpen }) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const { _id: orderId, status, poRef, totalQ, crd, fromName, remarks } = order;
    const renderedTotalQuantity = getStringFromTotalQuantityObject(totalQ);

    const onRowClick = () => {
        dispatch(selectOrder(order));
        history.push(`/home/orders/${ orderId }`);
    }

    return (
        <TableRow hover onClick={ onRowClick }>
            <TableCell className={ classes.deleteButtonCell } padding="checkbox">
                <Button onClick={ (e) => onDialogOpen(e, orderId) }><DeleteIcon/></Button>
            </TableCell>
            <TableCell align="center">{ status }</TableCell>
            <TableCell align="center">{ poRef }</TableCell>
            <TableCell className={ classes.wrapText }>{ renderedTotalQuantity }</TableCell>
            <TableCell align="center">{ yymmddToLocaleDate(crd) }</TableCell>
            <TableCell align="center">{ fromName }</TableCell>
            <TableCell className={ classes.wrapText }>{ remarks }</TableCell>
        </TableRow>
    )
}