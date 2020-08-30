import React, { useEffect } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import CreateOrderProductInfoTableRow from './CreateOrderProductInfoTableRow.js';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
    addRow,
    changeCellValue,
    deleteColumn,
    deleteRow
} from './duck/slice.js';
import { Clear } from '@material-ui/icons';
import { getCurrencySymbol, getStringFromTotalQuantityObject } from '../shared/utils.js';
import { LANGUAGE } from '../../constants.js';

const { total } = LANGUAGE.order.productTable;

export default function CreateOrderProductInfoTable() {
    const dispatch = useDispatch();


    const { columns, rows, currency, totalAmount, totalPieces } = useSelector(selectNewOrderProductInfo);
    const numColumns = columns.length;
    const onButtonDeleteColumnClick = idx => dispatch(deleteColumn(idx));
    const renderColumns = columns.map((column, index) => {
        if ((numColumns >= 7 && index === 2) || (numColumns === 8 && index === 3)) {
            return <TableCell key={index} align="left">
                {column}
                <Button
                    onClick={() => onButtonDeleteColumnClick(index)}
                    size="small"
                >
                    <Clear />
                </Button>
            </TableCell>
        } else {
            return <TableCell key={index} align="left">{column}</TableCell>
        }
    })

    const renderedTotalPieces = getStringFromTotalQuantityObject(totalPieces);

    const onCellChange = (rowIdx, colIdx, val) => dispatch(changeCellValue({rowIdx, colIdx, val}));
    const onRowDeleteButtonClick = idx => dispatch(deleteRow(idx));
    const onRowAddButtonClick = () => dispatch(addRow());

    const renderedRows = rows.map((row, index) =>
        <CreateOrderProductInfoTableRow
            key={index}
            row={row}
            rowIdx={index}
            numColumns={columns.length}
            onCellChange={onCellChange}
            onRowDeleteButtonClick={onRowDeleteButtonClick}
            currency={currency}
        />
    )

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [rows.length]);

    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell padding="none">&nbsp;</TableCell>
                        {renderColumns}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderedRows}
                </TableBody>
            </Table>
            <div className="d-flex justify-content-between mt-2">
                <Button variant="outlined" onClick={onRowAddButtonClick}>Add</Button>
                <div>
                    <span className="mx-3">{`${total} ${renderedTotalPieces}`}</span>
                    <span className="mx-3">{`${getCurrencySymbol(currency)} ${totalAmount}`}</span>
                </div>
            </div>
        </TableContainer>
    )
};