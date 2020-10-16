import React from 'react';
import { LANGUAGE } from '../../app/constants.js';
import { IconButton } from '@material-ui/core';
import { Add as IconAdd } from '@material-ui/icons';
import TableTextField from '../shared/inputs/TableTextField.js';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../products/duck/selectors.js';
import { itemUnitsOptions } from '../shared/constants.js';
import { roundTo2Decimal } from '../shared/utils/format.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import EditableTable from '../shared/components/EditableTable.js';

const { tableHeaderLabelsMap } = LANGUAGE.order.createOrder.createOrderProducts.createOrderProductTable;

export default function CreateOrderProductTable({ register, control, setValue, getValues, watch }) {
    const products = useSelector(selectAllProducts);

    const custom1 = watch('custom1');
    const custom2 = watch('custom2');
    const items = watch('items');
    const totalQ = watch('totalQ');
    const totalA = watch('totalA');

    const onAddColumn = () => {
        if (custom1 == null) return setValue('custom1', '');
        if (custom2 == null) return setValue('custom2', '');
    };

    const onCellChange = (rowIdx, key, newValue) => {
        const newItem = { ...items[rowIdx] };
        switch (key) {
            case 'ref':
                if (newValue._id) {
                    newItem._id = newValue._id;
                    newItem.ref = newValue.sku;
                    newItem.description = newValue.description;
                } else {
                    newItem._id = null;
                    newItem.description = null;
                    newItem.ref = newValue;
                }
                break;
            case 'quantity':
                newValue = parseInt(newValue);
                const diffQ = newValue - newItem.quantity;
                totalQ.addUnit(newItem.unit, diffQ);
                setValue('totalQ', new UnitCounter(totalQ.units, totalQ.data));
                setValue('totalA', roundTo2Decimal(totalA + (newItem.price * diffQ)));
                newItem.total = roundTo2Decimal(newValue * newItem.price);
                newItem.quantity = newValue;
                break;
            case 'unit':
                const prevUnit = newItem.unit;
                totalQ.subtractUnit(prevUnit, newItem.quantity);
                totalQ.addUnit(newValue, newItem.quantity);
                setValue('totalQ', new UnitCounter(totalQ.units, totalQ.data));
                newItem.unit = newValue;
                break;
            case 'price':
                newValue = roundTo2Decimal(newValue);
                const diffP = newValue - newItem.price;
                setValue('totalA', roundTo2Decimal(totalA + (newItem.quantity * diffP)));
                newItem.total = roundTo2Decimal(newValue * newItem.quantity);
                newItem.price = newValue;
                break;
            default:
                newItem[key] = newValue;
        }
        setValue('items', [...items.slice(0, rowIdx), newItem, ...items.slice(rowIdx + 1)])
    };

    const columns = [
        { field: 'id', hide: true },
        {
            field: 'ref',
            headerName: tableHeaderLabelsMap.ref,
            type: 'autocomplete',
            options: products,
            getOptionLabel: product => product.sku,
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

    return (
        <EditableTable
            columns={ columns }
            rows={ rows }
            onCellChange={ onCellChange }
        />
    )
}