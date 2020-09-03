import React, { useEffect } from 'react';
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
import { Clear as ClearIcon } from '@material-ui/icons';
import { getCurrencySymbol, roundTo2Decimal } from '../shared/utils.js';
import { makeStyles } from '@material-ui/core/styles';
import CreateCITableRow from './CreateCITableRow.js';
import { LANGUAGE } from '../../constants.js';
import { defaultRowValues } from './duck/slice.js';
import UnitCounter from '../shared/classes/UnitCounter.js';

const { totals, addRowButton } = LANGUAGE.commercialInvoice.createCIProductTable;

const useStyles = makeStyles((theme) => ({
    table: {
        marginTop: 10
    },
    customColumn: {
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 16,
        paddingRight: 0,
    },
    deleteColumnIcon: {
        margin: 0,
        padding: 0,
        width: 20,
        height: 20
    },
    totals: {
        marginRight: 16,
        marginLeft: 40
    }
}));

export default function CreateCIProductTable(
    {
        watch,
        setValue,
        numActiveColumns
    }) {
    const classes = useStyles();
    const currency = watch('currency');
    const headers = watch('headers');
    const items = watch('items');
    const totalQ = watch('totalQ');
    const totalA = watch('totalA');

    const onColumnDeleteClick = idx =>
        setValue('headers', headers.map((header, i) => i === idx ? null : header));

    const renderedHeaders = headers.map((header, i) => {
        if (i === 0 || i === 1) return <TableCell key={ i }>{ header }</TableCell>;
        else if ((i === 2 || i === 3)) {
            if (headers[i]) {
                return (
                    <TableCell key={ i } className={ classes.customColumn }>
                        <Grid container justify="space-between" alignItems="center">
                            <Typography>{ header }</Typography>
                            <IconButton
                                onClick={ () => onColumnDeleteClick(i) }
                                size="small"
                            >
                                <ClearIcon className={ classes.deleteColumnIcon }/>
                            </IconButton>
                        </Grid>
                    </TableCell>
                )
            } else {
                return null;
            }
        } else {
            return <TableCell key={ i } align="right">{ header }</TableCell>
        }
    })

    const onCellChange = (orderRef, rowIdx, colIdx, val) => {
        const newItem = [...items[orderRef][rowIdx]];
        if (colIdx === 4) {
            const unit = newItem[5];
            const diff = val - newItem[colIdx];
            totalQ.addUnit(unit, diff);
            setValue('totalQ', new UnitCounter(totalQ.units, totalQ.data));
            const price = newItem[6];
            setValue('totalA', totalA + (price * diff));
            newItem[7] = val * price;
        } else if (colIdx === 5) {
            const prevUnit = newItem[colIdx];
            const quantity = newItem[4];
            totalQ.subtractUnit(prevUnit, quantity);
            totalQ.addUnit(val, quantity);
            setValue('totalQ', new UnitCounter(totalQ.units, totalQ.data));
        } else if (colIdx === 6) {
            const diff = val - newItem[colIdx];
            const quantity = newItem[4];
            setValue('totalA', totalA + (quantity * diff));
            newItem[7] = val * quantity;
        }
        newItem[colIdx] = val;
        const newItems = [
            ...items[orderRef].slice(0, rowIdx),
            newItem,
            ...items[orderRef].slice(rowIdx + 1)
        ];
        setValue('items', { ...items, [orderRef]: newItems });
    }

    const onAddItemClick = () => {
        const newCustom = [...items.__custom, defaultRowValues];
        setValue('items', { ...items, __custom: newCustom });
    };

    const onItemDeleteClick = (orderRef, index) => {
        const item = items[orderRef][index];
        totalQ.subtractUnit(item[5], item[4]);
        setValue('totalQ', new UnitCounter(totalQ.units, totalQ.data));
        setValue('totalA', totalA - item[7]);
        const newItems = [...items[orderRef].filter((item, i) => i !== index)];
        setValue('items', { ...items, [orderRef]: newItems });
    };

    const renderRows = () => {
        const renderedRows = [];
        Object.entries(items).forEach(
            ([orderRef, items]) => items.forEach((item, index) =>
                renderedRows.push(
                <CreateCITableRow
                    key={ orderRef + index }
                    orderRef={ orderRef }
                    rowIdx={ index }
                    item={ item }
                    headers={ headers }
                    onCellChange={ onCellChange }
                    onItemDeleteClick={ () => onItemDeleteClick(orderRef, index) }
                    currency={currency}
                />
            )));
        return renderedRows;
    }

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [items.__custom.length]);

    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>&nbsp;</TableCell>
                        { renderedHeaders }
                    </TableRow>
                </TableHead>
                <TableBody>
                    { renderRows() }
                    <TableRow>
                        <TableCell colSpan={ numActiveColumns - 3 } padding="none">
                            <Button variant="outlined" onClick={ onAddItemClick }>
                                { addRowButton }
                            </Button>
                        </TableCell>
                        <TableCell align="right">{ totals }</TableCell>
                        <TableCell align="right" className={ classes.totals }>{ totalQ.stringRep }</TableCell>
                        <TableCell
                            colSpan={ 2 }
                            align="right"
                            className={ classes.totals }
                        >
                            { `${ getCurrencySymbol(currency) } ${ totalA }` }
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}