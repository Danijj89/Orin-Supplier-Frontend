import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton } from '@material-ui/core';
import { LANGUAGE } from '../../../app/constants.js';
import { currenciesOptions, itemUnitsOptions } from '../constants.js';
import { Controller } from 'react-hook-form';
import SideAutoComplete from '../inputs/SideAutoComplete.js';
import SideCheckBox from '../inputs/SideCheckBox.js';
import EditableTable from '../components/EditableTable.js';
import TableTextField from '../inputs/TableTextField.js';
import { Add as IconAdd, Close as IconClose, Delete as IconDelete } from '@material-ui/icons';
import UnitCounter from '../classes/UnitCounter.js';
import { getCurrencySymbol } from '../utils/random.js';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../../products/duck/selectors.js';
import { defaultRowValues } from '../../orders/utils/constants.js';
import { roundTo2Decimal } from '../utils/format.js';

const {
    currencyLabel,
    saveItemsLabel,
    totalLabel,
    tableHeaderLabelsMap,
    errorMessages
} = LANGUAGE.shared.rhfForms.rhfOrderProducts;

export default function RHFOrderProducts({ rhfMethods, isEdit }) {
    const { register, control, setValue, getValues, watch, reset, errors } = rhfMethods;
    const products = useSelector(selectAllProducts);

    const validateItems = useCallback((items) => {
        for (const item of items) {
            if (!(item.ref && item.description && item.quantity && item.unit && item.price))
                return errorMessages.missingItemInfo;
        }
        return true;
    }, []);

    useEffect(() => {
        // Check that this is not a new order and that we haven't already registered these fields in the form
        // by going back and forth in the order creation process
        if (isEdit || !getValues('items')) {
            register({ name: 'items' }, { validate: validateItems });
            register({ name: 'custom1' });
            register({ name: 'custom2' });
            register({ name: 'totalQ' });
            register({ name: 'totalA' });
        }
    }, [register, validateItems, getValues, isEdit]);

    const custom1 = watch('custom1');
    const custom2 = watch('custom2');
    const items = watch('items');
    const totalQ = watch('totalQ');
    const totalA = watch('totalA');
    const currency = watch('currency');

    const [numColumns, setNumColumns] = useState(
        7 + (custom1 ? 1 : 0) + (custom2 ? 1 : 0)
    );

    const onAddColumn = () => {
        if (custom1 == null) {
            setNumColumns(prev => prev + 1);
            return setValue('custom1', '');
        }
        if (custom2 == null) {
            setNumColumns(prev => prev + 1);
            return setValue('custom2', '');
        }
    };

    const onDeleteColumn = (name) => {
        const currValues = getValues();
        currValues[name] = null;
        reset(currValues);
    };

    const onAddRow = () => setValue('items', [...items, defaultRowValues]);
    const onDeleteRow = (idx) => setValue('items', items.filter((_, i) => i !== idx));

    const onCellChange = useCallback((rowIdx, key, newValue) => {
        const newItem = { ...items[rowIdx] };
        let newTotalQ;
        switch (key) {
            case 'ref':
                if (newValue._id) {
                    newItem._id = newValue._id;
                    newItem.ref = newValue.sku;
                    newItem.description = newValue.description;
                } else if (!products.find(product => product.sku === newValue)) {
                    //FIXME: material ui triggers onChange twice with freeSolo + autoSelect
                    // so we need this check to prevent the second onChange to set the newItem._id
                    // to null. Remove if bug is solved.
                    newItem._id = null;
                    newItem.description = '';
                    newItem.ref = newValue;
                }
                break;
            case 'quantity':
                newValue = newValue === '' ? newValue : parseInt(newValue);
                const diffQ = newValue - newItem.quantity;
                newTotalQ = new UnitCounter(itemUnitsOptions, totalQ);
                newTotalQ.addUnit(newItem.unit, diffQ);
                setValue('totalQ', newTotalQ.data);
                setValue('totalA', roundTo2Decimal(totalA + (newItem.price * diffQ)));
                newItem.total = roundTo2Decimal(newValue * newItem.price);
                newItem.quantity = newValue;
                break;
            case 'unit':
                const prevUnit = newItem.unit;
                newTotalQ = new UnitCounter(itemUnitsOptions, totalQ);
                newTotalQ.subtractUnit(prevUnit, newItem.quantity);
                newTotalQ.addUnit(newValue, newItem.quantity);
                setValue('totalQ', newTotalQ.data);
                newItem.unit = newValue;
                break;
            case 'price':
                newValue = newValue === '' ? newValue : roundTo2Decimal(newValue);
                const diffP = newValue - newItem.price;
                setValue('totalA', roundTo2Decimal(totalA + (newItem.quantity * diffP)));
                newItem.total = roundTo2Decimal(newValue * newItem.quantity);
                newItem.price = newValue;
                break;
            default:
                newItem[key] = newValue;
        }
        setValue('items', [...items.slice(0, rowIdx), newItem, ...items.slice(rowIdx + 1)])
    }, [items, setValue, totalA, totalQ, products]);

    const columns = [
        { field: 'id', hide: true },
        {
            field: 'delete',
            renderCell: params =>
                params.idx === 0 ? null :
                <IconButton size="small" onClick={ () => onDeleteRow(params.idx) }>
                    <IconDelete/>
                </IconButton>,
            width: 50,
            align: 'center'
        },
        {
            field: 'ref',
            headerName: tableHeaderLabelsMap.ref,
            type: 'autocomplete',
            options: products.filter(p => p.active),
            getOptionLabel: product => product.sku || product,
            getOptionSelected: (product, params) => product._id === params.id,
        },
        {
            field: 'description',
            headerName: tableHeaderLabelsMap.description,
            type: 'text'
        },
        {
            field: 'custom1',
            renderHeader: () =>
                <TableTextField
                    name="custom1"
                    inputRef={ register({ required: true }) }
                    InputProps={ {
                        endAdornment:
                            <IconButton size="small" onClick={ () => onDeleteColumn('custom1') }>
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
                    name="custom2"
                    inputRef={ register({ required: true }) }
                    InputProps={ {
                        endAdornment:
                            <IconButton size="small" onClick={ () => onDeleteColumn('custom2') }>
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
            headerName: tableHeaderLabelsMap.quantity,
            type: 'number',
            width: 100
        },
        {
            field: 'unit',
            headerName: tableHeaderLabelsMap.unit,
            type: 'dropdown',
            options: itemUnitsOptions,
            getOptionLabel: (option) => option,
            width: 100
        },
        {
            field: 'price',
            headerName: tableHeaderLabelsMap.price,
            type: 'number',
            width: 100
        },
        {
            field: 'total',
            headerName: tableHeaderLabelsMap.total,
            align: 'right'
        }
    ];

    const rows = items.map((row, index) => ({
        id: row._id,
        idx: index,
        ref: row.ref,
        description: row.description,
        custom1: row.custom1,
        custom2: row.custom2,
        quantity: row.quantity,
        unit: row.unit,
        price: row.price,
        total: row.total
    }));

    const footer = [[
        { field: 'label', value: totalLabel, colSpan: numColumns - 4, align: 'right' },
        { field: 'totalQ', value: UnitCounter.stringRep(totalQ), colSpan: 2, align: 'center' },
        { field: 'totalA', value: `${ getCurrencySymbol(currency) } ${ totalA }`, colSpan: 2, align: 'right' }
    ]];

    return (
        <Grid container>
            <Grid
                container
                item
                justify="space-between"
                alignItems="center"
                xs={ 12 }
            >
                <Controller
                    render={ props =>
                        <SideAutoComplete
                            { ...props }
                            options={ currenciesOptions }
                            label={ currencyLabel }
                            error={ !!errors.currency }
                            required
                        />
                    }
                    name="currency"
                    control={ control }
                    rules={ { required: errorMessages.currency } }
                />
                { !isEdit &&
                <Controller
                    render={ ({ value, ...rest }) =>
                        <SideCheckBox
                            { ...rest }
                            label={ saveItemsLabel }
                            checked={ value }
                        />
                    }
                    name="saveItems"
                    control={ control }
                />
                }
            </Grid>
            <Grid item xs={ 12 }>
                <EditableTable
                    columns={ columns }
                    rows={ rows }
                    onCellChange={ onCellChange }
                    footer={ footer }
                    onAddRow={ onAddRow }
                />
            </Grid>
        </Grid>
    )
}

RHFOrderProducts.propTypes = {
    rhfMethods: PropTypes.object.isRequired,
    isEdit: PropTypes.bool
};