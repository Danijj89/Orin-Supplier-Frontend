import React from 'react';
import { useHistory } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {
  getStringFromTotalQuantityObject,
  yymmddToLocaleDate,
} from '../shared/utils.js';
import { useDispatch } from 'react-redux';
import { setCurrentPO } from './duck/slice.js';
import StatusTooltip from '../shared/displays/StatusTooltip.js';

const useStyles = makeStyles((theme) => ({
  deleteButtonCell: {
    padding: 0,
  },
  deleteIcon: {
    color: theme.palette.tertiary.main,
  },
  wrapText: {
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    textAlign: 'center',
  },
}));

export default function OrderTableRow({ order, onDialogOpen }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { _id: orderId, status, poRef, totalQ, crd, fromName, remarks } = order;
  const renderedTotalQuantity = getStringFromTotalQuantityObject(totalQ);


    const onRowClick = () => {
        dispatch(setCurrentPO(order));
        history.push(`/home/orders/${ orderId }/0`);
    }


  return (
    <TableRow hover onClick={onRowClick}>
      <TableCell className={classes.deleteButtonCell} padding="checkbox">
        <Button onClick={(e) => onDialogOpen(e, orderId)}>
          <DeleteIcon color="disabled" className={classes.deleteIcon} />
        </Button>
      </TableCell>
      <TableCell align="center">
          <StatusTooltip status={status.procurement} />
      </TableCell>
        <TableCell align="center">
            <StatusTooltip status={status.production} />
        </TableCell>
        <TableCell align="center">
            <StatusTooltip status={status.qa} />
        </TableCell>
      <TableCell align="center">{poRef}</TableCell>
      <TableCell className={classes.wrapText}>
        {renderedTotalQuantity}
      </TableCell>
      <TableCell align="center">{yymmddToLocaleDate(crd)}</TableCell>
      <TableCell align="center">{fromName}</TableCell>
      <TableCell className={classes.wrapText}>{remarks}</TableCell>
    </TableRow>
  );
}
