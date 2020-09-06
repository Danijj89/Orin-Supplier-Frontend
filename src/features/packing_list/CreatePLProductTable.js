import React from 'react';
import {
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    IconButton,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconClear from '@material-ui/icons/Clear';
import CreatePLTableRow from './CreatePLTableRow.js';
import { LANGUAGE } from '../../constants.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { roundTo2Decimal } from '../shared/utils.js';
import { useSelector } from 'react-redux';
import { selectPLAutocompleteOptions } from './duck/selectors.js';

const { addRowButton, totalsText } = LANGUAGE.packingList.createPLProductTable;

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

export default function CreatePLProductTable(
    {
        watch,
        setValue,
        numActiveColumns
    }) {
    const classes = useStyles();
    const { defaultPLRowValues } = useSelector(selectPLAutocompleteOptions);
    const measurementUnit = watch('measurementUnit');
    const weightUnit = watch('weightUnit');
    const items = watch('items');
    const totalQ = watch('totalQ');
    const totalP = watch('totalP');
    const totalNW = watch('totalNW');
    const totalGW = watch('totalGW');
    const totalD = watch('totalD');
    const headers = watch('headers');

    const onCellChange = (rowIdx, colIdx, val) => {
        const newItem = [...items[rowIdx]];
        if (colIdx === 4) {
            val = parseInt(val);
            const unit = newItem[5];
            const diff = val - newItem[colIdx];
            totalQ.addUnit(unit, diff);
            setValue('totalQ', new UnitCounter(totalQ.units, totalQ.data));
        } else if (colIdx === 5) {
            const prevUnit = newItem[colIdx];
            const quantity = newItem[4];
            totalQ.subtractUnit(prevUnit, quantity);
            totalQ.addUnit(val, quantity);
            setValue('totalQ', new UnitCounter(totalQ.units, totalQ.data));
        } else if (colIdx === 6) {
            val = parseInt(val);
            const unit = newItem[7];
            const diff = val - newItem[colIdx];
            totalP.addUnit(unit, diff);
            setValue('totalP', new UnitCounter(totalP.units, totalP.data));
        } else if (colIdx === 7) {
            const prevUnit = newItem[colIdx];
            const quantity = newItem[6];
            totalP.subtractUnit(prevUnit, quantity);
            totalP.addUnit(val, quantity);
            setValue('totalP', new UnitCounter(totalP.units, totalP.data));
        } else if (colIdx === 8) {
            val = roundTo2Decimal(val);
            setValue('totalNW', roundTo2Decimal(totalNW - newItem[colIdx] + val));
        } else if (colIdx === 9) {
            val = roundTo2Decimal(val);
            setValue('totalGW', roundTo2Decimal(totalGW - newItem[colIdx] + val));
        } else if (colIdx === 10) {
            val = roundTo2Decimal(val);
            setValue('totalD', roundTo2Decimal(totalD - newItem[colIdx] + val));
        }
        newItem[colIdx] = val;
        setValue('items', [...items.slice(0, rowIdx), newItem, ...items.slice(rowIdx + 1)]);
    }

    const onHeaderDeleteClick = (idx) => {
        const newHeaders = headers.map((header, index) => index === idx ? null : header);
        setValue('headers', newHeaders);
    }

    const onDeleteItemClick = (idx) => {
        const item = items[idx];
        totalQ.subtractUnit(item[5], item[4]);
        setValue('totalQ', new UnitCounter(totalQ.units, totalQ.data));
        totalP.subtractUnit(item[7], item[6]);
        setValue('totalP', new UnitCounter(totalP.units, totalP.data));
        setValue('totalNW', totalNW - item[8]);
        setValue('totalGW', totalGW - item[9]);
        setValue('totalD', totalD - item[10]);
        const newItems = items.filter((i, index) => index !== idx);
        setValue('items', newItems);
    };

    const onAddItemClick = () => setValue('items', [...items, defaultPLRowValues]);

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

    const renderedRows = items.map((item, index) =>
        <CreatePLTableRow
            key={ index }
            rowIdx={ index }
            item={ item }
            onItemDeleteClick={ () => onDeleteItemClick(index) }
            onCellChange={ onCellChange }
            headers={ headers }
        />
    );

    const renderTableSpan = () => (
        <TableRow>
            <TableCell colSpan={ numActiveColumns - 5 } padding="none">
                <Button variant="outlined" onClick={ onAddItemClick }>
                    { addRowButton }
                </Button>
            </TableCell>
            <TableCell align="right">{ totalsText }</TableCell>
            <TableCell align="right" className={ classes.totals }>{ totalQ.stringRep }</TableCell>
            <TableCell align="right" className={ classes.totals }>{ totalP.stringRep }</TableCell>
            <TableCell align="right" className={ classes.totals }>{ `${ totalNW } ${ weightUnit }` }</TableCell>
            <TableCell align="right" className={ classes.totals }>{ `${ totalGW } ${ weightUnit }` }</TableCell>
            <TableCell align="right" className={ classes.totals }>{ `${ totalD } ${ measurementUnit }` }</TableCell>
        </TableRow>
    )

    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        { renderedHeaders }
                    </TableRow>
                </TableHead>
                <TableBody>
                    { renderedRows }
                    { renderTableSpan() }
                </TableBody>
            </Table>
        </TableContainer>
    )
}