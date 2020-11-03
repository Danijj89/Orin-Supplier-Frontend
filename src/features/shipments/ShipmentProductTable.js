import React, { useCallback, useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core';
import { Add as IconAdd, Close as IconClose, Delete as IconDelete } from '@material-ui/icons';
import TableTextField from '../shared/inputs/TableTextField.js';
import { itemUnitsOptions, packageUnitsOptions } from '../shared/constants.js';
import { LANGUAGE } from '../../app/constants.js';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../products/duck/selectors.js';
import EditableTable from '../shared/components/EditableTable.js';
import { defaultRowValues } from '../orders/utils/constants.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { roundTo2Decimal } from '../shared/utils/format.js';

const {
    tableHeaderLabels
} = LANGUAGE.shipment.editShipment.products.productTable;

export default function ShipmentProductTable() {
    const { register, setValue, watch, getValues, reset } = useFormContext();
    const products = useSelector(selectAllProducts);

    const validateItems = useCallback((items) => {}, []);

    useEffect(() => {
        register({ name: 'items' }, { validate: validateItems });
        register({ name: 'custom1' });
        register({ name: 'custom2' });
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

    const onAddColumn = () => {
        if (ciCustom1 == null) {
            setNumColumns(prev => prev + 1);
            return setValue('custom1', '');
        }
        if (ciCustom2 == null) {
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
            headerName: tableHeaderLabels.ref,
            type: 'autocomplete',
            options: products.filter(p => p.active),
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
            hide: ciCustom1 == null,
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
            align: 'right',
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
        total: row.total,
        package: row.package || 0,
        pUnit: row.pUnit || null,
        netW: row.netW || 0,
        grossW: row.grossW || 0,
        dim: row.dim || 0
    }));

    const footer = [];

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