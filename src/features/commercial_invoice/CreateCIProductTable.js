import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TableCell, IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import { getCurrencySymbol } from '../shared/utils.js';
import { makeStyles } from '@material-ui/core/styles';
import CreateProductTableRow from './CreateProductTableRow.js';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 20,
        marginBottom: 20
    }
}));

export default function CreateCIProductTable({ currency, headers, setHeaders, rows, setRows }) {
    const classes = useStyles();
    const dispatch = useDispatch();


    // const { totalAmount, totalPieces } = useSelector(selectNewOrderProductInfo);
    // const numColumns = columns.length;
    const onButtonDeleteColumnClick = idx => {};

    const renderedHeaders = headers.map((header, index) => {
        if ((index === 2 || index === 3)) {
            if (headers[index]) {
                return (
                    <TableCell key={index}>
                        {header}
                        <IconButton
                            onClick={() => onButtonDeleteColumnClick(index)}
                        >
                            <Clear/>
                        </IconButton>
                    </TableCell>
                )
            } else {
                return null;
            }
        } else {
            return <TableCell key={index}>{header}</TableCell>
        }
    })
    //
    // const renderedTotalPieces = getStringFromTotalQuantityObject(totalPieces);
    //
    // const onCellChange = (rowIdx, colIdx, val) => dispatch(changeCellValue({rowIdx, colIdx, val}));
    // const onRowDeleteButtonClick = idx => dispatch(deleteRow(idx));
    // const onRowAddButtonClick = () => dispatch(addRow());
    //
    //
    // useEffect(() => {
    //     window.scrollTo(0, document.body.scrollHeight);
    // }, [rows.length]);
    //
    return (
        <TableContainer className={classes.container}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>&nbsp;</TableCell>
                        {renderedHeaders}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows && rows.map((row, index) =>
                        <CreateProductTableRow
                            key={index}
                            row={row}
                            rowIdx={index}
                            headers={headers}
                            onCellChange={null}
                            onRowDeleteButtonClick={null}
                            currency={currency}
                        />
                    )}
                </TableBody>
            </Table>
            {/*<div className="d-flex justify-content-between mt-2">*/}
            {/*    <Button variant="outlined" onClick={onRowAddButtonClick}>Add</Button>*/}
            {/*    <div>*/}
            {/*        <span className="mx-3">{`${total} ${renderedTotalPieces}`}</span>*/}
            {/*        <span className="mx-3">{`${getCurrencySymbol(currency)} ${totalAmount}`}</span>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </TableContainer>
    )
}