import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IconButton } from '@material-ui/core';
import { Add as IconAdd, Close as IconClose } from '@material-ui/icons';
import TableTextField from '../shared/inputs/TableTextField.js';
import { itemUnitsOptions, packageUnitsOptions } from '../shared/constants.js';
import { LANGUAGE } from '../../app/constants.js';
import { useSelector } from 'react-redux';
import { selectActiveProducts } from '../products/duck/selectors.js';
import EditableTable from '../shared/components/editable_table/EditableTable.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { roundToNDecimal } from '../shared/utils/format.js';
import DeleteIconButton from '../shared/buttons/DeleteIconButton.js';
import { getCurrencySymbol } from '../shared/utils/random.js';
import { defaultShipmentRowValues } from './utils/constants.js';

const {
    tableHeaderLabels,
    totalLabel
} = LANGUAGE.shipment.editShipment.products.productTable;

export default function ShipmentProductTable({ rhfMethods }) {
    const { register, setValue, watch, getValues, reset } = rhfMethods;
    const products = useSelector(selectActiveProducts);
    const validateItems = useCallback((items) => true, []);

    useEffect(() => {
        register({ name: 'items' }, { validate: validateItems });
        register({ name: 'ciCustom1' });
        register({ name: 'ciCustom2' });
        register({ name: 'plCustom1' });
        register({ name: 'plCustom2' });
        register({ name: 'quantity' });
        register({ name: 'total' });
        register({ name: 'package'});
        register({ name: 'netWeight'});
        register({ name: 'grossWeight'});
        register({ name: 'dimension'});
    }, [register, validateItems]);

    const ciCustom1 = watch('ciCustom1');
    const ciCustom2 = watch('ciCustom2');
    const plCustom1 = watch('plCustom1');
    const plCustom2 = watch('plCustom2');
    const items = watch('items');
    const quantity = watch('quantity');
    const total = watch('total');
    const pkg = watch('package');
    const netWeight = watch('netWeight');
    const grossWeight = watch('grossWeight');
    const dimension = watch('dimension');
    const currency = watch('currency');
    const weightUnit = watch('weightUnit');
    const measurementUnit = watch('measurementUnit');

    const [numColumns, setNumColumns] = useState(
        13 + (ciCustom1 ? 1 : 0) + (ciCustom2 ? 1 : 0)
    );

    const onAddCiColumn = useCallback(() => {
        if (ciCustom1 == null) {
            setNumColumns(prev => prev + 1);
            return setValue('ciCustom1', '');
        }
        if (ciCustom2 == null) {
            setNumColumns(prev => prev + 1);
            return setValue('ciCustom2', '');
        }
    }, [setValue, ciCustom1, ciCustom2]);

    const onDeleteColumn = useCallback(name => {
        setNumColumns(prev => prev - 1);
        const currValues = getValues();
        currValues[name] = null;
        reset(currValues);
    }, [getValues, reset]);

    const onAddRow = useCallback(
        () => setValue('items', [...getValues('items'), defaultShipmentRowValues]),
        [setValue, getValues]);
    const onDeleteRow = useCallback(
        idx => () => setValue('items', getValues('items').filter((_, i) => i !== idx)),
        [getValues, setValue]);

    const onCellChange = useCallback((rowIdx, key, newValue) => {
        const items = getValues('items');
        const newItem = { ...items[rowIdx] };
        let newTotalQ;
        let diff;
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
                diff = newValue - newItem.quantity;
                newTotalQ = new UnitCounter(itemUnitsOptions, getValues('quantity'));
                newTotalQ.addUnit(newItem.unit, diff);
                setValue('quantity', newTotalQ.data);
                setValue('total', roundToNDecimal(getValues('total') + (newItem.price * diff), 2));
                newItem.total = roundToNDecimal(newValue * newItem.price, 2);
                newItem.quantity = newValue;
                break;
            case 'unit':
                const prevUnit = newItem.unit;
                newTotalQ = new UnitCounter(itemUnitsOptions, getValues('quantity'));
                newTotalQ.subtractUnit(prevUnit, newItem.quantity);
                newTotalQ.addUnit(newValue, newItem.quantity);
                setValue('quantity', newTotalQ.data);
                newItem.unit = newValue;
                break;
            case 'price':
                newValue = newValue === '' ? newValue : roundToNDecimal(newValue, 2);
                diff = newValue - newItem.price;
                setValue('total', roundToNDecimal(getValues('total') + (newItem.quantity * diff), 2));
                newItem.total = roundToNDecimal(newValue * newItem.quantity, 2);
                newItem.price = newValue;
                break;
            case 'package':
                newValue = newValue === '' ? newValue : parseInt(newValue);
                diff = newValue - newItem.package;
                const newPackage = new UnitCounter(packageUnitsOptions, getValues('package'));
                newPackage.addUnit(newItem.pUnit, diff);
                setValue('package', newPackage.data);
                newItem.package = newValue;
                break;
            case 'netW':
                newValue = newValue === '' ? newValue : roundToNDecimal(newValue, 3);
                diff = newValue - newItem.netW;
                setValue('netWeight', roundToNDecimal(getValues('netWeight') + diff, 3));
                newItem.netW = newValue;
                break;
            case 'grossW':
                newValue = newValue === '' ? newValue : roundToNDecimal(newValue, 3);
                diff = newValue - newItem.grossW;
                setValue('grossWeight', roundToNDecimal(getValues('grossWeight') + diff, 3));
                newItem.grossW = newValue;
                break;
            case 'dim':
                newValue = newValue === '' ? newValue : roundToNDecimal(newValue, 3);
                diff = newValue - newItem.dim;
                setValue('dimension', roundToNDecimal(getValues('dimension') + diff, 3));
                newItem.dim = newValue;
                break;
            default:
                newItem[key] = newValue;
        }
        setValue('items', [...items.slice(0, rowIdx), newItem, ...items.slice(rowIdx + 1)])
    }, [setValue, products, getValues]);

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
            getOptionSelected: (product, params) => product._id === params.id,
        },
        {
            field: 'description',
            headerName: tableHeaderLabels.description,
            type: 'text',
            width: 200
        },
        {
            field: 'custom1',
            renderHeader: () =>
                <TableTextField
                    name="ciCustom1"
                    InputProps={ {
                        endAdornment:
                            <IconButton size="small" onClick={ () => onDeleteColumn('ciCustom1') }>
                                <IconClose fontSize="small"/>
                            </IconButton>
                    } }
                />,
            type: 'text',
            hide: ciCustom1 == null,
            width: 160
        },
        {
            field: 'custom2',
            renderHeader: () =>
                <TableTextField
                    name="ciCustom2"
                    InputProps={ {
                        endAdornment:
                            <IconButton size="small" onClick={ () => onDeleteColumn('ciCustom2') }>
                                <IconClose fontSize="small"/>
                            </IconButton>
                    } }
                />,
            type: 'text',
            hide: ciCustom2 == null,
            width: 160
        },
        {
            field: 'addColumn',
            renderHeader: () =>
                <IconButton onClick={ onAddCiColumn } color="primary" size="small">
                    <IconAdd/>
                </IconButton>,
            renderCell: () => null,
            hide: ciCustom1 != null && ciCustom2 != null
        },
        {
            field: 'quantity',
            headerName: tableHeaderLabels.quantity,
            type: 'number'
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
            type: 'number'
        },
        {
            field: 'total',
            headerName: tableHeaderLabels.total,
            align: 'center',
            width: 100
        },
        {
            field: 'package',
            headerName: tableHeaderLabels.package,
            type: 'number'
        },
        {
            field: 'pUnit',
            headerName: tableHeaderLabels.pUnit,
            type: 'dropdown',
            options: packageUnitsOptions,
            getOptionLabel: (option) => option,
            width: 50
        },
        {
            field: 'netW',
            headerName: tableHeaderLabels.netW,
            type: 'number'
        },
        {
            field: 'grossW',
            headerName: tableHeaderLabels.grossW,
            type: 'number'
        },
        {
            field: 'dim',
            headerName: tableHeaderLabels.dim,
            type: 'number'
        }
    ]), [
        ciCustom1,
        ciCustom2,
        onAddCiColumn,
        onDeleteColumn,
        products,
        onDeleteRow
    ]);

    const currencySymbol = useMemo(() => getCurrencySymbol(currency), [currency]);

    const rows = items.map((row, index) => ({
        id: row._id,
        idx: index,
        ref: row.ref,
        description: row.description,
        ciCustom1: row.ciCustom1,
        ciCustom2: row.ciCustom2,
        quantity: row.quantity,
        unit: row.unit,
        price: row.price,
        total: `${currencySymbol} ${row.total}`,
        package: row.package,
        pUnit: row.pUnit,
        netW: row.netW,
        grossW: row.grossW,
        dim: row.dim
    }));

    const footer = useMemo(() => [[
        { field: 'label', value: totalLabel, colSpan: numColumns - 9, align: 'right' },
        { field: 'quantity', value: UnitCounter.stringRep(quantity), colSpan: 3, align: 'center' },
        { field: 'total', value: `${ currencySymbol } ${ total }`, colSpan: 1, align: 'center' },
        { field: 'package', value: UnitCounter.stringRep(pkg), colSpan: 2, align: 'center' },
        { field: 'netWeight', value: `${weightUnit} ${netWeight}`, colSpan: 1, align: 'center' },
        { field: 'grossWeight', value: `${weightUnit} ${grossWeight}`, colSpan: 1, align: 'center' },
        { field: 'dimension', value: `${measurementUnit} ${dimension}`, colSpan: 1, align: 'center' }
    ]], [
        numColumns,
        total,
        quantity,
        currencySymbol,
        pkg,
        netWeight,
        grossWeight,
        dimension,
        weightUnit,
        measurementUnit
    ]);

    return (
        <EditableTable
            columns={ columns }
            rows={ rows }
            footer={ footer }
            onAddRow={ onAddRow }
            onCellChange={ onCellChange }
        />
    )
}