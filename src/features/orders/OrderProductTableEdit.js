import React from 'react';
import {
    Grid,
    IconButton,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button
} from '@material-ui/core';
import { Clear as IconClear } from '@material-ui/icons';
import CurrencyDropdown from '../shared/dropdown/CurrencyDropdown.js';
import AddColumnButton from '../shared/buttons/addColumnButton.js';
import { roundTo2Decimal } from '../shared/utils.js';
import CreatePOTableRow from './CreatePOTableRow.js';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../constants.js';
import { defaultRowValues } from '../commercial_invoice/duck/slice.js';
import { useSelector } from 'react-redux';
import { selectPOAutocompleteOptions } from './duck/selectors.js';
import ErrorMessage from '../shared/displays/ErrorMessage.js';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100%',
    },
    topPanel: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        color: theme.palette.tertiary['700'],
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        minHeight: 52
    },
    botPanel: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        paddingBottom: theme.spacing(1),
        paddingTop: theme.spacing(1),
    },
    utilBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    clearColumn: {
        color: 'red'
    }
}));

const { addRowButton } = LANGUAGE.order.orderProductTable;

export default function OrderProductTableEdit({ watch, setValue, errors }) {
    const classes = useStyles();
    const autocompleteOptions = useSelector(selectPOAutocompleteOptions);


    const headers = watch('headers');
    const items = watch('unallocated');
    const currency = watch('currency');

    const onCellChange = (rowIdx, colIdx, val) => {
        const { itemMap } = autocompleteOptions;
        const newItem = [...items[rowIdx]];
        if (colIdx === 0 && itemMap.hasOwnProperty(val)) {
            newItem[1] = itemMap[val].defaultD;
        } else if (colIdx === 4) {
            val = parseInt(val);
            const price = newItem[6];
            newItem[7] = roundTo2Decimal(val * price);
        } else if (colIdx === 6) {
            val = roundTo2Decimal(val);
            const quantity = newItem[4];
            newItem[7] = roundTo2Decimal(val * quantity);
        }
        newItem[colIdx] = val;
        setValue('unallocated', [...items.slice(0, rowIdx), newItem, ...items.slice(rowIdx + 1)]);
    }


    const onCurrencyChange = (newCurrency) => setValue('currency', newCurrency);

    const onDeleteItemClick = (idx) => setValue('unallocated', items.filter((i, index) => index !== idx));
    const onAddItemClick = () => setValue('unallocated', [...items, defaultRowValues]);

    const numActiveColumns = headers.reduce((acc, header) => header ? acc + 1 : acc, 0);
    const onAddColumnClick = (newHeader) => {
        const newHeaders = [...headers];
        if (!newHeaders[2]) newHeaders[2] = newHeader;
        else if (!newHeaders[3]) newHeaders[3] = newHeader;
        setValue('headers', newHeaders);
    }
    const onDeleteColumnClick = (idx) => setValue('headers', headers.filter((header, i) => i !== idx));

    const renderedHeaders = headers.map((header, idx) => {
        if (!header) return null;
        else if (idx === 2 || idx === 3) return (
            <TableCell className={ classes.header } key={ header }>
                { header }
                <IconButton size="small" onClick={ () => onDeleteColumnClick(idx) }>
                    <IconClear fontSize="small" className={ classes.clearColumn }/>
                </IconButton>
            </TableCell>
        );
        else return <TableCell className={ classes.header } key={ header }>{ header }</TableCell>;
    });

    return (
        <Grid container className={ classes.container }>
            <Grid className={ classes.utilBar } item xs={ 12 }>
                <CurrencyDropdown
                    isError={ currency === null }
                    value={ currency }
                    onChange={ onCurrencyChange }
                />
                <AddColumnButton
                    maxNumColumns={ 7 }
                    currColNumbers={ numActiveColumns }
                    onConfirmClick={ onAddColumnClick }
                />
            </Grid>
            <Grid
                container
                item
                justify="center"
                alignItems="center"
                xs={ 12 }
            >
                { Object.keys(errors).length > 0 &&
                <ErrorMessage errors={ Object.values(errors).map(err => err.message) }/> }
            </Grid>
            <Grid item xs={ 12 } className={ classes.botPanel }>
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                { renderedHeaders }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { items.map((item, idx) =>
                                <CreatePOTableRow
                                    key={ idx }
                                    rowIdx={ idx }
                                    item={ item }
                                    onCellChange={ onCellChange }
                                    onItemDeleteClick={ () => onDeleteItemClick(idx) }
                                    currency={ currency }
                                    headers={ headers }
                                />
                            ) }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="outlined" onClick={onAddItemClick}>{addRowButton}</Button>
            </Grid>
        </Grid>
    )
}