import React from 'react';
import { useHistory } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import {
    getStringFromTotalQuantityObject,
    yymmddToLocaleDate,
} from '../shared/utils.js';
import { useDispatch } from 'react-redux';
import { setCurrentPOId } from './duck/slice.js';
import StatusButtonMenu from './StatusButtonMenu.js';
import DeleteButton from '../shared/buttons/DeleteButton.js';
import { deleteOrder } from './duck/thunks.js';
import { LANGUAGE } from '../../constants.js';

const useStyles = makeStyles((theme) => ({
    deleteButtonCell: {
        padding: 0,
    },
    deleteIcon: {
        color: theme.palette.tertiary.A100,
    },
    wrapText: {
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        textAlign: 'center',
    },
}));

const { deleteOrderDialogMessage } = LANGUAGE.order.orderTableRow;

export default function OrderTableRow({ order }) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const { _id: orderId, procurementS, productionS, qaS, poRef, totalQ, crd, fromName, remarks } = order;
    const renderedTotalQuantity = getStringFromTotalQuantityObject(totalQ);

    const onRowClick = () => {
        dispatch(setCurrentPOId(orderId));
        history.push(`/home/orders/${ orderId }/0`);
    }

    const onDeleteClick = (e) => {
        e.stopPropagation();
        dispatch(deleteOrder(order._id));
    }

    return (
        <TableRow hover onClick={ onRowClick }>
            <TableCell className={ classes.deleteButtonCell } padding="checkbox">
                <DeleteButton
                    onDeleteClick={onDeleteClick}
                    deleteMessage={deleteOrderDialogMessage}
                />
            </TableCell>
            <TableCell align="center">{ poRef }</TableCell>
            <TableCell className={ classes.wrapText }>
                { renderedTotalQuantity }
            </TableCell>
            <TableCell align="center">{ yymmddToLocaleDate(crd) }</TableCell>
            <TableCell align="center">{ fromName }</TableCell>
            <TableCell align="center">
                <StatusButtonMenu disabled status={ procurementS.status }/>
            </TableCell>
            <TableCell align="center">
                <StatusButtonMenu disabled status={ productionS.status }/>
            </TableCell>
            <TableCell align="center">
                <StatusButtonMenu disabled status={ qaS.status }/>
            </TableCell>
            <TableCell className={ classes.wrapText }>{ remarks }</TableCell>
        </TableRow>
    );
}
