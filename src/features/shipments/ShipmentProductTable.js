import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IconButton } from '@material-ui/core';
import { Add as IconAdd, Close as IconClose, Delete as IconDelete } from '@material-ui/icons';
import TableTextField from '../shared/inputs/TableTextField.js';
import { itemUnitsOptions, packageUnitsOptions } from '../shared/constants.js';
import { LANGUAGE } from '../../app/constants.js';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectActiveProducts } from '../products/duck/selectors.js';
import EditableTable from '../shared/components/editable_table/EditableTable.js';
import { defaultOrderRowValues } from '../orders/utils/constants.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { roundTo2Decimal } from '../shared/utils/format.js';
import DeleteIconButton from '../shared/buttons/DeleteIconButton.js';

const {
    tableHeaderLabels
} = LANGUAGE.shipment.editShipment.products.productTable;

export default function ShipmentProductTable() {
    const { register, setValue, watch, getValues, reset } = useFormContext();
    const products = useSelector(selectActiveProducts);
    const validateItems = useCallback((items) => {}, []);

    useEffect(() => {
        register({ name: 'items' }, { validate: validateItems });
        register({ name: 'ciCustom1' });
        register({ name: 'ciCustom2' });
        register({ name: 'totalQ' });
        register({ name: 'totalA' });
    }, [register, validateItems]);

    const ciCustom1 = watch('ciCustom1');
    const ciCustom2 = watch('ciCustom2');
    const items = watch('items');
    const totalQ = watch('totalQ');
    const totalA = watch('totalA');
    const currency = watch('currency');

    const [numColumns, setNumColumns] = useState(
        7 + (ciCustom1 ? 1 : 0) + (ciCustom2 ? 1 : 0)
    );

    const onAddColumn = useCallback(() => {
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
        const currValues = getValues();
        currValues[name] = null;
        reset(currValues);
    }, [getValues, reset]);

    const onAddRow = useCallback(
        () => setValue('items', [...getValues('items'), defaultOrderRowValues]),
        [setValue, getValues]);
    const onDeleteRow = useCallback(
        idx => () => setValue('items', getValues('items').filter((_, i) => i !== idx)),
        [getValues, setValue]);

    const onCellChange = useCallback((rowIdx, key, newValue) => {
        const items = getValues('items');
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
    }, [setValue, totalA, totalQ, products, getValues]);

    const renderDeleteIcon = useCallback(
        params => {
            if (params.idx === 0) return <span/>;
            return <DeleteIconButton onClick={ onDeleteRow(params.idx)}/>
        }, [onDeleteRow]);
    const productGetOptionLabel = useCallback(product => product.sku || product, []);
    const productGetOptionSelected = useCallback((product, params) => product._id === params.id, []);


    const columns = useMemo(() => ([
        { field: 'id', hide: true },
        {
            field: 'delete',
            renderCell: renderDeleteIcon,
            width: 50,
            align: 'center'
        },
        {
            field: 'ref',
            headerName: tableHeaderLabels.ref,
            type: 'autocomplete',
            options: products,
            getOptionLabel: productGetOptionLabel,
            getOptionSelected: productGetOptionSelected,
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
                    inputRef={ register({ required: true }) }
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
                    inputRef={ register({ required: true }) }
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
                <IconButton onClick={ onAddColumn } color="primary" size="small">
                    <IconAdd/>
                </IconButton>,
            renderCell: () => null,
            hide: ciCustom1 != null && ciCustom2 != null
        },
    ]), [onDeleteRow, products, onDeleteColumn, ciCustom1, register, ciCustom2, onAddColumn]);

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
        total: row.total,
        package: row.package,
        pUnit: row.pUnit,
        netW: row.netW,
        grossW: row.grossW,
        dim: row.dim
    }));

    const footer = useMemo(() => [], []);

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


// {
//     field: 'quantity',
//         headerName: tableHeaderLabels.quantity,
//     type: 'number'
// },
// {
//     field: 'unit',
//         headerName: tableHeaderLabels.unit,
//     type: 'dropdown',
//     options: itemUnitsOptions,
//     getOptionLabel: (option) => option,
//     width: 50
// },
// {
//     field: 'price',
//         headerName: tableHeaderLabels.price,
//     type: 'number'
// },
// {
//     field: 'total',
//         headerName: tableHeaderLabels.total,
//     align: 'right',
//     width: 100
// },
// {
//     field: 'package',
//         headerName: tableHeaderLabels.package,
//     type: 'number'
// },
// {
//     field: 'pUnit',
//         headerName: tableHeaderLabels.pUnit,
//     type: 'dropdown',
//     options: packageUnitsOptions,
//     getOptionLabel: (option) => option,
//     width: 50
// },
// {
//     field: 'netW',
//         headerName: tableHeaderLabels.netW,
//     type: 'number'
// },
// {
//     field: 'grossW',
//         headerName: tableHeaderLabels.grossW,
//     type: 'number'
// },
// {
//     field: 'dim',
//         headerName: tableHeaderLabels.dim,
//     type: 'number'
// }