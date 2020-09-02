import React, { useEffect } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import CreatePOTableRow from './CreatePOTableRow.js';
import Button from '@material-ui/core/Button';
import { Clear as IconClear } from '@material-ui/icons';
import { getCurrencySymbol } from '../shared/utils.js';
import { LANGUAGE } from '../../constants.js';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { defaultRowValues } from './duck/slice.js';

const { totals, addRowButton } = LANGUAGE.order.productTable;

const useStyles = makeStyles({
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
        whiteSpace: 'nowrap'
    }
});

export default function CreatePOProductTable({ watch, setValue, numActiveColumns }) {
    const classes = useStyles();
    const currency = watch('currency');
    const items = watch('items');
    const totalQ = watch('totalQ');
    const totalA = watch('totalA');
    const headers = watch('headers');

    const onHeaderDeleteClick = (idx) => {
        const newHeaders = headers.map((header, index) => index === idx ? null : header);
        setValue('headers', newHeaders);
    }

    const onDeleteItemClick = (idx) => {
        const item = items[idx];
        const newItems = items.filter((i, index) => index !== idx);
        totalQ.subtractUnit(item[5], item[4]);
        setValue('totalQ', new UnitCounter(totalQ.units, totalQ.data));
        setValue('totalA', totalA - item[4] * item[6]);
        setValue('items', newItems);
    };

    const onAddItemClick = () => setValue('items', [...items, defaultRowValues]);

    const renderedHeaders = headers.map((header, index) => {
        if (index === 0 || index === 1) return <TableCell key={ index }>{ header }</TableCell>;
        else if ((index === 2 || index === 3)) {
            if (headers[index]) {
                return (
                    <TableCell key={ index } className={ classes.customColumn }>
                        <Grid container justify="space-between" alignItems="center">
                            <Typography>{ header }</Typography>
                            <IconButton
                                onClick={ () => onHeaderDeleteClick(index) }
                                size="small"
                            >
                                <IconClear className={ classes.deleteColumnIcon }/>
                            </IconButton>
                        </Grid>
                    </TableCell>
                )
            } else {
                return null;
            }
        } else {
            return <TableCell key={ index } align="right">{ header }</TableCell>
        }
    })

    const onCellChange = (rowIdx, colIdx, val) => {
        const newItem = [...items[rowIdx]];
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
        setValue('items', [...items.slice(0, rowIdx), newItem, ...items.slice(rowIdx + 1)]);
    }

    const renderedRows = items.map((item, index) =>
        <CreatePOTableRow
            key={index}
            rowIdx={index}
            item={item}
            onCellChange={onCellChange}
            onItemDeleteClick={ () => onDeleteItemClick(index) }
            currency={currency}
            headers={headers}
        />
    )

    const renderTableSpan = () => (
        <TableRow>
            <TableCell colSpan={ numActiveColumns - 3 } padding="none">
                <Button variant="outlined" onClick={ onAddItemClick }>
                    { addRowButton }
                </Button>
            </TableCell>
            <TableCell align="right">{ totals }</TableCell>
            <TableCell align="right" className={ classes.totals }>{ totalQ.stringRep }</TableCell>
            <TableCell colSpan={2} align="right" className={ classes.totals }>{ `${getCurrencySymbol(currency)} ${totalA}` }</TableCell>
        </TableRow>
    )

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [items.length]);

    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        { renderedHeaders }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderedRows}
                    {renderTableSpan()}
                </TableBody>
            </Table>
        </TableContainer>
    )
};