import React from 'react';
import Table from '../shared/components/Table.js';
import { LANGUAGE } from '../../app/constants.js';
import { IconButton } from '@material-ui/core';
import { Add as IconAdd } from '@material-ui/icons';
import TableTextField from '../shared/inputs/TableTextField.js';
import TableAutoComplete from '../shared/inputs/TableAutoComplete.js';

const { tableHeaderLabelsMap } = LANGUAGE.order.createOrder.createOrderProducts.createOrderProductTable;

export default function CreateOrderProductTable({ register, control, setValue, getValues, watch }) {

    const custom1 = watch('custom1');
    const custom2 = watch('custom2');
    const items = watch('items');

    const onAddColumn = () => {
        if (custom1 == null) return setValue('custom1', '');
        if (custom2 == null) return setValue('custom2', '');
    };

    const renderAddColumn = () =>
        <IconButton onClick={ onAddColumn } color="primary" size="small">
            <IconAdd/>
        </IconButton>;

    const renderCustomHeaderCell = (name) =>
        <TableTextField
            name={name}
            inputRef={ register({ required: true })}
        />;

    const renderRefCell = () =>
        <TableAutoComplete
        />;



    const columns = [
        { field: 'id', hide: true },
        { field: 'ref', headerName: tableHeaderLabelsMap.ref },
        { field: 'description', headerName: tableHeaderLabelsMap.description },
        {
            field: 'custom1',
            renderHeader: () => renderCustomHeaderCell('custom1'),
            hide: custom1 == null
        },
        {
            field: 'custom2',
            renderHeader: () => renderCustomHeaderCell('custom2'),
            hide: custom2 == null
        },
        {
            field: 'addColumn',
            renderHeader: renderAddColumn,
            renderCell: () => null,
            hide: custom1 != null && custom2 != null
        },
        { field: 'quantity', headerName: tableHeaderLabelsMap.quantity },
        { field: 'unit', headerName: tableHeaderLabelsMap.unit },
        { field: 'price', headerName: tableHeaderLabelsMap.price },
        { field: 'total', headerName: tableHeaderLabelsMap.total }
    ];

    const rows = items.map(row => ({
        id: row._id,
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
        <Table columns={ columns } rows={ rows } dense/>
    )
}