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
import { defaultRowValues } from './duck/slice.js';
import { LANGUAGE } from '../../constants.js';
import _ from 'lodash';
import UnitCounter from '../shared/classes/UnitCounter.js';

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
        headers,
        numActiveColumns
    }) {
    const classes = useStyles();
    const measurementUnit = watch('measurementUnit');
    const weightUnit = watch('weightUnit');
    const items = watch('items');
    const totalQ = watch('totalQ');
    const totalP = watch('totalP');
    const totalNW = watch('totalNW');
    const totalGW = watch('totalGW');
    const totalD = watch('totalD');

    const onCellChange = (rowIdx, colIdx, val) => {
        const newItem = _.cloneDeep(items[rowIdx]);
        if (colIdx >= 0 && colIdx <= 3) {
            newItem[colIdx] = val;
        } else if (colIdx === 4) {
            if (typeof val === 'number') {
                const unit = newItem[colIdx][0];
                const diff = val - newItem[colIdx][1];
                totalQ.addUnit(unit, diff);
                newItem[colIdx][1] = val;
            } else {
                const prevUnit = newItem[colIdx][0];
                const quantity = newItem[colIdx][1];
                totalQ.subtractUnit(prevUnit, quantity);
                totalQ.addUnit(val, quantity);
                newItem[colIdx][0] = val;
            }
            setValue('totalQ', new UnitCounter(totalQ));
        } else if (colIdx === 5) {
            if (typeof val === 'number') {
                const unit = newItem[colIdx][0];
                const diff = val - newItem[colIdx][1];
                totalP.addUnit(unit, diff);
                newItem[colIdx][1] = val;
            }
            else {
                const prevUnit = newItem[colIdx][0];
                const quantity = newItem[colIdx][1];
                totalP.subtractUnit(prevUnit, quantity);
                totalP.addUnit(val, quantity);
                newItem[colIdx][0] = val;
            }
            setValue('totalP', totalP);
        } else if (colIdx === 6) {
            setValue('totalNW', totalNW - newItem[colIdx] + val);
            newItem[colIdx] = val;
        } else if (colIdx === 7) {
            setValue('totalGW', totalGW - newItem[colIdx] + val);
            newItem[colIdx] = val;
        } else if (colIdx === 8) {
            setValue('totalD', totalD - newItem[colIdx] + val);
            newItem[colIdx] = val;
        }
        setValue('items', [...items.slice(0, rowIdx), newItem, ...items.slice(rowIdx + 1)]);
    }

    const onHeaderDeleteClick = (idx) => {
        const newHeaders = headers.map((header, index) => index === idx ? null : header);
        setValue('headers', newHeaders);
    }

    const onItemDeleteClick = (idx) => {
        const newItems = items.filter((item, index) => index !== idx);
        setValue('items', newItems);
    };

    const onAddRowClick = () => setValue('items', [...items, defaultRowValues]);

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
            onItemDeleteClick={ () => onItemDeleteClick(index) }
            onCellChange={ onCellChange }
            headers={ headers }
        />
    );

    const renderTableSpan = () => (
        <TableRow>
            <TableCell colSpan={ numActiveColumns - 5 } padding="none">
                <Button variant="outlined" onClick={ onAddRowClick }>
                    { addRowButton }
                </Button>
            </TableCell>
            <TableCell align="right">{ totalsText }</TableCell>
            <TableCell align="right" className={classes.totals}>{ totalQ.stringRep }</TableCell>
            <TableCell align="right" className={classes.totals}>{ totalP.stringRep }</TableCell>
            <TableCell align="right" className={classes.totals}>{ `${ totalNW } ${ weightUnit }` }</TableCell>
            <TableCell align="right" className={classes.totals}>{ `${ totalGW } ${ weightUnit }` }</TableCell>
            <TableCell align="right" className={classes.totals}>{ `${ totalD } ${ measurementUnit }` }</TableCell>
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