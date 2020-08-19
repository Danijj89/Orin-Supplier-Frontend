import React, { useEffect, useRef, useState } from 'react';
import {
    TableCell,
    IconButton,
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Button,
    Typography
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { getCurrencySymbol, getStringFromTotalQuantityObject, roundTo2Decimal } from '../shared/utils.js';
import { makeStyles } from '@material-ui/core/styles';
import CreateProductTableRow from './CreateProductTableRow.js';
import { LANGUAGE } from '../../constants.js';

const { totalQuantity } = LANGUAGE.commercialInvoice.createCIProductTable;

const useStyles = makeStyles((theme) => ({
    table: {
        marginTop: 20
    },
    totals: {
        marginRight: 10,
        marginLeft: 10
    }
}));

export default function CreateCIProductTable({ currency, headers, setHeaders, rows, setRows, onRowAddButtonClick }) {
    const classes = useStyles();

    const onButtonDeleteColumnClick = idx => {
        const newHeaders = headers.map((header, index) => index === idx ? '' : header);
        setHeaders(newHeaders);
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

    const computeTotalQuantity = (rows) => Object.values(rows).reduce((acc, items) => {
        items.forEach(item => {
            const unit = item[5];
            const quantity = item[4];
            acc.hasOwnProperty(unit) ? acc[unit] += quantity : acc[unit] = quantity
        });
        return acc;
    }, {});

    const computeTotalAmount = (rows) => Object.values(rows).reduce((acc, items) => {
        items.forEach(item => acc += item[7]);
        return acc;
    }, 0);

    const [totalQ, setTotalQ] = useState(computeTotalQuantity(rows));
    const [totalA, setTotalA] = useState(computeTotalAmount(rows));

    const onCellChange = (orderRef, rowIdx, colIdx, val, func) => {
        const newRows = Object.entries(rows).reduce((result, [ref, items]) => {
            if (ref === orderRef) {
                result[orderRef] = items.map((item, index) => {
                    if (index === rowIdx) {
                        return func(item, colIdx, val);
                    }
                    return item;
                })
                return result;
            }
            result[ref] = items;
            return result;
        }, {})
        setRows(newRows);
    }

    const onTextCellChange = (item, colIdx, val) => {
        const newItem = [...item];
        newItem[colIdx] = val;
        return newItem;
    }

    const onUnitPriceChange = (item, colIdx, val) => {
        const newVal = Number(val);
        const newItem = [...item];
        const oldAmount = item[7];
        // update to new value
        newItem[colIdx] = newVal;
        const quantity = newItem[4];
        // update amount
        const newAmount = roundTo2Decimal(quantity * newVal);
        newItem[7] = newAmount;
        setTotalA(totalA - oldAmount + newAmount);
        return newItem;
    }

    const onUnitChange = (item, colIdx, val) => {
        const newItem = [...item];
        const newTotalQ = { ...totalQ };
        const quantity = item[4];
        const oldUnit = item[colIdx];
        newTotalQ[oldUnit] -= quantity;
        // update to new value
        const newUnit = val;
        item[colIdx] = newUnit;
        if (!newTotalQ[newUnit]) newTotalQ[newUnit] = quantity;
        else newTotalQ[newUnit] += quantity;
        setTotalQ(newTotalQ);
        return newItem;
    }

    const onQuantityChange = (item, colIdx, val) => {
        const newItem = [...item];
        const newTotalQ = { ...totalQ };

        const oldAmount = item[7];
        const oldQuantity = item[colIdx];
        const unit = item[5];
        const unitPrice = item[6];

        // update to new value
        const newQuantity = Number(val);
        newItem[colIdx] = newQuantity;
        // update amount
        const newAmount = roundTo2Decimal(newQuantity * unitPrice);
        newItem[7] = newAmount;

        // update total amount and total quantity
        setTotalA(totalA - oldAmount + newAmount);
        newTotalQ[unit] += newQuantity - oldQuantity;
        setTotalQ(newTotalQ);
        return newItem;
    }

    const onRowDeleteClick = (orderRef, index) => {
        const items = [...rows[orderRef].filter((item, i) => i !== index)];
        setRows({
            ...rows,
            [orderRef]: items
        })
    };

    const renderRows = () => {
        const renderedRows = [];
        Object.entries(rows).forEach(([orderRef, items]) =>
            items.forEach((item, index) => renderedRows.push(<CreateProductTableRow
                    key={orderRef + index}
                    orderRef={orderRef}
                    row={item}
                    rowIdx={index}
                    headers={headers}
                    onCellChange={onCellChange}
                    onTextCellChange={onTextCellChange}
                    onUnitPriceChange={onUnitPriceChange}
                    onUnitChange={onUnitChange}
                    onQuantityChange={onQuantityChange}
                    onRowDeleteClick={onRowDeleteClick}
                    currency={currency}
                />)
            ))
        return renderedRows;
    }

    const mounted = useRef();
    useEffect(() => {
        if (mounted) {
            window.scrollTo(0, document.body.scrollHeight);
            if (mounted.current !== Object.keys(rows).length) {
                setTotalQ(computeTotalQuantity(rows));
                setTotalA(computeTotalAmount(rows));
            }
            mounted.current = Object.keys(rows).length;
        }
    }, [rows]);

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
                            {renderRows()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid
                container
                justify="space-between"
                alignItems="center"
                item
                xs={12}>
                <Grid item>
                    <Button variant="outlined" onClick={onRowAddButtonClick}>Add</Button>
                </Grid>
                <Grid item>
                    <Typography component="span"
                                className={classes.totals}>{`${totalQuantity} ${getStringFromTotalQuantityObject(totalQ)}`}</Typography>
                    <Typography component="span"
                                className={classes.totals}>{`${getCurrencySymbol(currency)} ${totalA}`}</Typography>
                </Grid>
            </Grid>
        </Grid>

    )
}