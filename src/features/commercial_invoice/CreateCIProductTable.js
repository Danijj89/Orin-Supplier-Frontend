import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    TableCell,
    IconButton,
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Button } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { getCurrencySymbol } from '../shared/utils.js';
import { makeStyles } from '@material-ui/core/styles';
import CreateProductTableRow from './CreateProductTableRow.js';

const useStyles = makeStyles((theme) => ({
    table: {
        marginTop: 20
    }
}));

export default function CreateCIProductTable({ currency, headers, setHeaders, rows, setRows }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    // const numColumns = columns.length;
    const onButtonDeleteColumnClick = idx => {
    };

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

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [rows.length]);

    return (
        <Grid container>
            <Grid item xs={12} className={classes.table}>
                <TableContainer>
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
                </TableContainer>
            </Grid>
            <div>
                {/*        <span className="mx-3">{`${total} ${renderedTotalPieces}`}</span>*/}
                {/*        <span className="mx-3">{`${getCurrencySymbol(currency)} ${totalAmount}`}</span>*/}
                {/*    </div>*/}
            </div>
        </Grid>

    )
}