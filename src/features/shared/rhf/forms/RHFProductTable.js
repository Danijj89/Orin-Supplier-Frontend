import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton } from '@material-ui/core';
import { useWatch } from 'react-hook-form';
import { LANGUAGE, LOCALE } from 'app/utils/constants.js';
import DeleteIconButton from '../../buttons/DeleteIconButton.js';
import TableTextField from '../../inputs/TableTextField.js';
import { Add as IconAdd, Close as IconClose } from '@material-ui/icons';
import UnitCounter from '../../classes/UnitCounter.js';
import { formatCurrency, roundToNDecimal } from '../../utils/format.js';
import ErrorSnackbar from 'features/shared/components/ErrorSnackbar.js';
import TextArea from '../../inputs/TextArea.js';
import RHFCheckBox from '../inputs/RHFCheckBox.js';
import RHFAutoComplete from '../inputs/RHFAutoComplete.js';
import { useSelector } from 'react-redux';
import {
    selectCurrencies,
    selectDefaultRowItem,
    selectItemUnits, selectItemUnitsMap,
} from 'app/duck/selectors.js';
import { getOptionId, getOptionLabel } from 'app/utils/options/getters.js';
import { selectAllActiveProducts } from '../../../products/duck/selectors.js';
import useItemsData from 'features/shared/hooks/useItemsData.js';
import { formatItemsTotalQuantities } from 'features/shared/utils/format.js';
import Table from 'features/shared/components/table/Table.js';
import { selectAllSplitsReferenceMap } from 'features/shipments/utils/selectors.js';

const {
    formLabels,
    errorMessages,
    tableHeaderLabels,
    totalLabel,
    notInOrderLabel,
    marksPlaceholderLabel
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
        isEdit,
        isShipment,
        className
    }) {

    const defaultRowItem = useSelector(selectDefaultRowItem);
    const currencyOptions = useSelector(selectCurrencies);
    const itemUnitOptions = useSelector(selectItemUnits);
    const itemUnitsMap = useSelector(selectItemUnitsMap);
    const products = useSelector(selectAllActiveProducts);
    const ordersMap = useSelector(selectAllSplitsReferenceMap);

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

    const [itemsData, setItemsData] = useItemsData(items);

    const ordersMapWithDefault = useMemo(
        () => {
            const temp = { ...ordersMap };
            temp['0'] = { orderId: 0, splitId: 0, ref: notInOrderLabel };
            return temp;
        },
        [ordersMap]);

    const errMessages = useMemo(() => Object.values(errors).map(err => err.message), [errors]);
    const isError = useMemo(() => errMessages.length > 0, [errMessages]);

    const initialColumns = useMemo(() => {
        const custom1 = getValues(fieldNames.custom1);
        const custom2 = getValues(fieldNames.custom2);
        return 8 + (custom1 ? 1 : 0) + (custom2 ? 1 : 0) - (custom1 && custom2 ? 1 : 0);
    }, [getValues, fieldNames]);
    const [numColumns, setNumColumns] = useState(initialColumns);

    const onAddColumn = useCallback(() => {
        if (getValues(fieldNames.custom1) == null) {
            setNumColumns(prev => prev + 1);
            return setValue(fieldNames.custom1, '');
        }
        if (getValues(fieldNames.custom2) == null) {
            return setValue(fieldNames.custom2, '');
        }
    }, [setValue, getValues, fieldNames]);

    const onDeleteColumn = useCallback(column => {
        if (column === fieldNames.custom1) setNumColumns(prev => prev - 1);
        setValue(column, null);
        setValue(
            fieldNames.items,
            getValues(fieldNames.items).map(item => {
                const newItem = { ...item };
                newItem[column] = '';
                return newItem;
            })
        );
    }, [setValue, getValues, fieldNames]);

    const onAddRow = useCallback(
        () => setValue(fieldNames.items, [...getValues(fieldNames.items), defaultRowItem]),
        [setValue, getValues, fieldNames, defaultRowItem]);

    const onDeleteRow = useCallback(
        idx => () => {
            const items = getValues(fieldNames.items);
            const { quantity, unit, total } = items[idx];
            setValue(fieldNames.items, items.filter((_, i) => i !== idx));
            setItemsData(prevData => {
                const newTotalQuantity = new UnitCounter(prevData.quantity);
                newTotalQuantity.subtractUnit(getOptionId(unit), quantity);
                return {
                    ...prevData,
                    total: roundToNDecimal(prevData.total - total, 2),
                    quantity: newTotalQuantity.data
                };
            });
        },
        [getValues, setValue, fieldNames, setItemsData]);

    const onCellChange = useCallback((rowIdx, key, newValue) => {
        const items = getValues(fieldNames.items);
        const newItem = { ...items[rowIdx] };
        let diff;
        switch (key) {
            case 'split':
                newItem.order = newValue.orderId;
                newItem.split = newValue.splitId;
                break;
            case 'ref':
                if (newValue._id) {
                    newItem.product = newValue._id;
                    newItem.ref = newValue.sku;
                    newItem.description = newValue.description;
                    newItem.localD = newValue.localD;
                    newItem.hsc = newValue.hsc;
                    newItem.order = 0;
                } else {
                    newItem.ref = newValue;
                    newItem.description = '';
                    newItem.localD = '';
                    newItem.hsc = '';
                    newItem.product = null;
                    newItem.order = 0;
                }
                break;
            case 'quantity':
                newValue = newValue === '' ? newValue : parseInt(newValue);
                diff = newValue - newItem.quantity;
                setItemsData(prevData => {
                    const newTotalQ = new UnitCounter(prevData.quantity);
                    newTotalQ.addUnit(getOptionId(newItem.unit), diff);
                    return {
                        ...prevData,
                        total: roundToNDecimal(prevData.total + (newItem.price * diff), 2),
                        quantity: newTotalQ.data
                    };
                });
                newItem.total = roundToNDecimal(newValue * newItem.price, 2);
                newItem.quantity = newValue;
                break;
            case 'unit':
                const prevUnit = getOptionId(newItem.unit);
                setItemsData(prevData => {
                    const newTotalQ = new UnitCounter(prevData.quantity);
                    newTotalQ.subtractUnit(prevUnit, newItem.quantity);
                    newTotalQ.addUnit(getOptionId(newValue), newItem.quantity);
                    return {
                        ...prevData,
                        quantity: newTotalQ.data,
                    };
                });
                newItem.unit = newValue;
                break;
            case 'price':
                newValue = newValue === '' ? newValue : roundToNDecimal(newValue, 2);
                diff = newValue - newItem.price;
                setItemsData(prevData => ({
                    ...prevData,
                    total: roundToNDecimal(prevData.total + (newItem.quantity * diff), 2)
                }));
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
    }, [setValue, getValues, fieldNames, setItemsData]);

    const createRenderColumn = useCallback((column, value) => () =>
        <TableTextField
            value={ value }
            onChange={ e => setValue(column, e.target.value) }
            InputProps={ {
                endAdornment:
                    <IconButton size="small" onClick={ () => onDeleteColumn(column) }>
                        <IconClose fontSize="small"/>
                    </IconButton>
            } }
        />, [setValue, onDeleteColumn]);

    const columns = useMemo(() => ([
        {
            field: 'delete',
            renderCell: params =>
                <DeleteIconButton onClick={ onDeleteRow(params.idx) }/>,
            width: 50,
            align: 'center'
        },
        {
            field: 'split',
            hide: !isShipment,
            headerName: tableHeaderLabels.order,
            editType: 'dropdown',
            options: Object.values(ordersMapWithDefault),
            getOptionLabel: order => order.ref,
            getOptionSelected: (order, value) => order.splitId === value.splitId,
            width: 140
        },
        {
            field: 'ref',
            headerName: tableHeaderLabels.ref,
            editType: 'autocomplete',
            options: products,
            getOptionLabel: product => product.sku || product
        },
        {
            field: 'description',
            headerName: tableHeaderLabels.description,
            editType: 'text'
        },
        {
            field: 'custom1',
            renderHeader: createRenderColumn(fieldNames.custom1, custom1),
            editType: 'text',
            hide: custom1 == null,
            width: 160
        },
        {
            field: 'custom2',
            renderHeader: createRenderColumn(fieldNames.custom2, custom2),
            editType: 'text',
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
            editType: 'number',
            width: 120
        },
        {
            field: 'unit',
            headerName: tableHeaderLabels.unit,
            editType: 'dropdown',
            options: itemUnitOptions,
            getOptionLabel: option => getOptionLabel(option, LOCALE),
            getOptionSelected: (option, value) => option.id === value.id,
            width: 50
        },
        {
            field: 'price',
            headerName: tableHeaderLabels.price,
            editType: 'number',
            width: 120
        },
        {
            field: 'total',
            headerName: tableHeaderLabels.total,
            align: 'right',
            width: 200,
            format: row => formatCurrency(row.total, currency)
        }
    ]), [
        onAddColumn,
        products,
        onDeleteRow,
        fieldNames,
        isShipment,
        ordersMapWithDefault,
        itemUnitOptions,
        currency,
        createRenderColumn,
        custom1,
        custom2
    ]);

    // make sure custom column field names are the same as the item
    // field names
    const rows = useMemo(() => items.map((row, index) => ({
        id: row._id,
        idx: index,
        split: ordersMapWithDefault[row.split] || ordersMapWithDefault['0'],
        ref: row.ref,
        description: row.description,
        custom1: row[fieldNames.custom1],
        custom2: row[fieldNames.custom2],
        quantity: row.quantity,
        unit: row.unit,
        price: row.price,
        total: row.total,
    })), [items, fieldNames, ordersMapWithDefault]);

    const footer = useMemo(() => [[
        { field: 'label', value: totalLabel, colSpan: numColumns - 4, align: 'right' },
        {
            field: 'quantity',
            value: formatItemsTotalQuantities(itemsData.quantity, itemUnitsMap, LOCALE),
            colSpan: 3,
            align: 'center'
        },
        { field: 'total', value: formatCurrency(itemsData.total, currency), colSpan: 1, align: 'right' }
    ]], [numColumns, currency, itemsData.quantity, itemsData.total, itemUnitsMap]);

    const options = useMemo(() => ({
        table: {
            isEdit: true,
            dense: true
        },
        body: {
            maxEmptyRows: 0,
            onAddRow: onAddRow,
            onCellChange: onCellChange,
            hover: false
        },
        foot: {
            pagination: 'none'
        }
    }), [onAddRow, onCellChange]);

    return (
        <Grid container className={ className }>
            { isError &&
            <Grid container item justify="center" xs={ 12 }>
                <ErrorSnackbar error={ errMessages }/>
            </Grid>
            }
            <Grid container item justify="flex-end" xs={ 12 }>
                <RHFAutoComplete
                    rhfControl={ control }
                    name={ fieldNames.currency }
                    label={ formLabels.currency }
                    options={ currencyOptions }
                    getOptionLabel={ option => getOptionLabel(option) }
                    getOptionSelected={ (option, value) => option.id === value.id }
                    error={ !!errors[fieldNames.currency] }
                    required={ errorMessages.missingCurrency }
                />
                { !isEdit &&
                <RHFCheckBox
                    name={ fieldNames.saveItems }
                    label={ formLabels.saveItems }
                    rhfControl={ control }
                /> }
            </Grid>
            <Grid item xs={ 12 }>
                <Table
                    columns={ columns }
                    rows={ rows }
                    footer={ footer }
                    options={ options }
                />
            </Grid>
            <Grid container item xs={ 12 }>
                <TextArea
                    name={ fieldNames.marks }
                    inputRef={ register }
                    rows={ 4 }
                    rowsMax={ 8 }
                    placeholder={ marksPlaceholderLabel }
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
        marks: PropTypes.string.isRequired,
        saveItems: PropTypes.string
    }).isRequired,
    isEdit: PropTypes.bool,
    isShipment: PropTypes.bool,
    className: PropTypes.string
};

export default RHFProductTable;