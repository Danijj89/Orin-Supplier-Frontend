import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton } from '@material-ui/core';
import { Controller, useWatch } from 'react-hook-form';
import SideAutoComplete from '../../inputs/SideAutoComplete.js';
import { currenciesOptions, itemUnitsOptions } from '../../constants.js';
import { LANGUAGE } from '../../../../app/constants.js';
import EditableTable from '../../components/editable_table/EditableTable.js';
import DeleteIconButton from '../../buttons/DeleteIconButton.js';
import TableTextField from '../../inputs/TableTextField.js';
import { Add as IconAdd, Close as IconClose } from '@material-ui/icons';
import { getCurrencySymbol } from '../../utils/random.js';
import UnitCounter from '../../classes/UnitCounter.js';
import { roundToNDecimal } from '../../utils/format.js';
import ErrorDisplay from '../../components/ErrorDisplay.js';
import { defaultProductRowValues } from './util/constants.js';
import SideCheckBox from '../../inputs/SideCheckBox.js';

const {
    formLabels,
    errorMessages,
    tableHeaderLabels,
    totalLabel
} = LANGUAGE.shared.rhf.forms.productTable;

export const validateItems = (items) => {
    if (!items.length) return errorMessages.missingItems;
    for (const item of items) {
        if (!(item.ref && item.quantity && item.unit && item.price))
            return errorMessages.missingItemInfo;
    }
    return true;
};

const RHFProductTable = React.memo(function RHFProductTable(
    {
        rhfRegister: register,
        rhfErrors: errors,
        rhfControl: control,
        rhfSetValue: setValue,
        rhfGetValues: getValues,
        fieldNames,
        products,
        isEdit,
        className
    }) {

    const custom1 = useWatch({
        control,
        name: fieldNames.custom1
    });
    const custom2 = useWatch({
        control,
        name: fieldNames.custom2
    });
    const items = useWatch({
        control,
        name: fieldNames.items
    });
    const currency = useWatch({
        control,
        name: fieldNames.currency
    });
    const quantity = useWatch({
        control,
        name: fieldNames.quantity
    });
    const total = useWatch({
        control,
        name: fieldNames.total
    });

    const errMessages = useMemo(() => Object.values(errors).map(err => err.message), [errors]);
    const isError = useMemo(() => errMessages.length > 0, [errMessages]);

    const initialNumColumns = 8
        + (typeof custom1 === 'string' ? 1 : 0)
        + (typeof custom2 === 'string' ? 1 : 0)
        - (typeof custom1 === 'string' && typeof custom2 === 'string' ? 1 : 0);
    const [numColumns, setNumColumns] = useState(initialNumColumns);

    const onAddColumn = useCallback(() => {
        if (getValues(fieldNames.custom1) == null) {
            setNumColumns(prev => prev + 1);
            return setValue(fieldNames.custom1, '');
        }
        if (getValues(fieldNames.custom2) == null) {
            return setValue(fieldNames.custom2, '');
        }
    }, [setValue, getValues, fieldNames]);

    const onDeleteColumn = useCallback(name => {
        if (name === fieldNames.custom1) setNumColumns(prev => prev - 1);
        setValue(name, null);
        setValue(
            fieldNames.items,
            getValues(fieldNames.items).map(item => {
                const newItem = { ...item };
                newItem[name] = '';
                return newItem;
            })
        );
    }, [setValue, getValues, fieldNames]);

    const onAddRow = useCallback(
        () => setValue(fieldNames.items, [...getValues(fieldNames.items), defaultProductRowValues]),
        [setValue, getValues, fieldNames]);

    const onDeleteRow = useCallback(
        idx => () => setValue(fieldNames.items, getValues(fieldNames.items).filter((_, i) => i !== idx)),
        [getValues, setValue, fieldNames]);

    const onCellChange = useCallback((rowIdx, key, newValue) => {
        const items = getValues(fieldNames.items);
        const newItem = { ...items[rowIdx] };
        let newTotalQ;
        let diff;
        switch (key) {
            case 'ref':
                if (newValue._id) {
                    newItem.product = newValue._id;
                    newItem.ref = newValue.sku;
                    newItem.description = newValue.description;
                } else {
                    newItem.ref = newValue;
                    newItem.description = '';
                    newItem.product = null;
                }
                break;
            case 'quantity':
                newValue = newValue === '' ? newValue : parseInt(newValue);
                diff = newValue - newItem.quantity;
                newTotalQ = new UnitCounter(itemUnitsOptions, getValues(fieldNames.quantity));
                newTotalQ.addUnit(newItem.unit, diff);
                setValue(fieldNames.quantity, newTotalQ.data);
                setValue(fieldNames.total, roundToNDecimal(getValues(fieldNames.total) + (newItem.price * diff), 2));
                newItem.total = roundToNDecimal(newValue * newItem.price, 2);
                newItem.quantity = newValue;
                break;
            case 'unit':
                const prevUnit = newItem.unit;
                newTotalQ = new UnitCounter(itemUnitsOptions, getValues(fieldNames.quantity));
                newTotalQ.subtractUnit(prevUnit, newItem.quantity);
                newTotalQ.addUnit(newValue, newItem.quantity);
                setValue(fieldNames.quantity, newTotalQ.data);
                newItem.unit = newValue;
                break;
            case 'price':
                newValue = newValue === '' ? newValue : roundToNDecimal(newValue, 2);
                diff = newValue - newItem.price;
                setValue(fieldNames.total, roundToNDecimal(getValues(fieldNames.total) + (newItem.quantity * diff), 2));
                newItem.total = roundToNDecimal(newValue * newItem.quantity, 2);
                newItem.price = newValue;
                break;
            case 'custom1':
                newItem[fieldNames.custom1] = newValue;
                break;
            case 'custom2':
                newItem[fieldNames.custom2] = newValue;
                break;
            default:
                newItem[key] = newValue;
        }
        setValue(fieldNames.items, [...items.slice(0, rowIdx), newItem, ...items.slice(rowIdx + 1)])
    }, [setValue, getValues, fieldNames]);

    const columns = useMemo(() => ([
        { field: 'id', hide: true },
        {
            field: 'delete',
            renderCell: params =>
                params.idx === 0 ? null : <DeleteIconButton onClick={ onDeleteRow(params.idx) }/>,
            width: 50,
            align: 'center'
        },
        {
            field: 'ref',
            headerName: tableHeaderLabels.ref,
            type: 'autocomplete',
            options: products,
            getOptionLabel: product => product.sku || product,
            getOptionSelected: (product, params) => product._id === params.id
        },
        {
            field: 'description',
            headerName: tableHeaderLabels.description,
            type: 'text'
        },
        {
            field: 'custom1',
            renderHeader: () =>
                <TableTextField
                    name={ fieldNames.custom1 }
                    inputRef={ register({ required: errorMessages.missingCustomColumnName }) }
                    InputProps={ {
                        endAdornment:
                            <IconButton size="small" onClick={ () => onDeleteColumn(fieldNames.custom1) }>
                                <IconClose fontSize="small"/>
                            </IconButton>
                    } }
                />,
            type: 'text',
            hide: custom1 == null,
            width: 160
        },
        {
            field: 'custom2',
            renderHeader: () =>
                <TableTextField
                    name={ fieldNames.custom2 }
                    inputRef={ register({ required: errorMessages.missingCustomColumnName }) }
                    InputProps={ {
                        endAdornment:
                            <IconButton size="small" onClick={ () => onDeleteColumn(fieldNames.custom2) }>
                                <IconClose fontSize="small"/>
                            </IconButton>
                    } }
                />,
            type: 'text',
            hide: custom2 == null,
            width: 160
        },
        {
            field: 'addColumn',
            renderHeader: () =>
                <IconButton onClick={ onAddColumn } color="primary" size="small">
                    <IconAdd/>
                </IconButton>,
            renderCell: () => null,
            hide: custom1 != null && custom2 != null
        },
        {
            field: 'quantity',
            headerName: tableHeaderLabels.quantity,
            type: 'number',
            width: 120
        },
        {
            field: 'unit',
            headerName: tableHeaderLabels.unit,
            type: 'dropdown',
            options: itemUnitsOptions,
            getOptionLabel: (option) => option,
            width: 50
        },
        {
            field: 'price',
            headerName: tableHeaderLabels.price,
            type: 'number',
            width: 120
        },
        {
            field: 'total',
            headerName: tableHeaderLabels.total,
            align: 'right',
            width: 200
        }
    ]), [
        register,
        custom1,
        custom2,
        onAddColumn,
        onDeleteColumn,
        products,
        onDeleteRow,
        fieldNames
    ]);

    const currencySymbol = useMemo(() => getCurrencySymbol(currency), [currency]);

    // make sure custom column field names are the same as the item
    // field names
    const rows = items.map((row, index) => ({
        id: row._id,
        idx: index,
        ref: row.ref,
        description: row.description,
        custom1: row[fieldNames.custom1],
        custom2: row[fieldNames.custom2],
        quantity: row.quantity,
        unit: row.unit,
        price: row.price,
        total: `${ currencySymbol } ${ row.total }`,
    }));

    const footer = useMemo(() => [[
        { field: 'label', value: totalLabel, colSpan: numColumns - 4, align: 'right' },
        { field: 'quantity', value: UnitCounter.stringRep(quantity), colSpan: 3, align: 'center' },
        { field: 'total', value: `${ currencySymbol } ${ total }`, colSpan: 1, align: 'right' }
    ]], [numColumns, total, quantity, currencySymbol]);

    return (
        <Grid container className={ className }>
            { isError &&
            <Grid container item justify="center" xs={ 12 }>
                <ErrorDisplay errors={ errMessages }/>
            </Grid>
            }
            <Grid container item justify="flex-end" xs={ 12 }>
                <Controller
                    render={ props =>
                        <SideAutoComplete
                            { ...props }
                            options={ currenciesOptions }
                            label={ formLabels.currency }
                            error={ !!errors[fieldNames.currency] }
                            required
                        />
                    }
                    name={ fieldNames.currency }
                    control={ control }
                    rules={ { required: errorMessages.missingCurrency } }
                />
                { !isEdit &&
                <Controller
                    render={ ({ value, ...rest }) =>
                        <SideCheckBox
                            { ...rest }
                            label={ formLabels.saveItems }
                            checked={ value }
                        />
                    }
                    name={ fieldNames.saveItems }
                    control={ control }
                />
                }
            </Grid>
            <Grid item xs={ 12 }>
                <EditableTable
                    columns={ columns }
                    rows={ rows }
                    footer={ footer }
                    onAddRow={ onAddRow }
                    onCellChange={ onCellChange }
                />
            </Grid>
        </Grid>
    )
});

RHFProductTable.propTypes = {
    rhfRegister: PropTypes.func.isRequired,
    rhfErrors: PropTypes.object.isRequired,
    rhfControl: PropTypes.object.isRequired,
    rhfSetValue: PropTypes.func.isRequired,
    rhfGetValues: PropTypes.func.isRequired,
    fieldNames: PropTypes.exact({
        custom1: PropTypes.string.isRequired,
        custom2: PropTypes.string.isRequired,
        currency: PropTypes.string.isRequired,
        items: PropTypes.string.isRequired,
        quantity: PropTypes.string.isRequired,
        total: PropTypes.string.isRequired,
        saveItems: PropTypes.string
    }).isRequired,
    products: PropTypes.array.isRequired,
    isEdit: PropTypes.bool,
    className: PropTypes.string
};

export default RHFProductTable;