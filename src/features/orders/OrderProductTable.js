import React, { useMemo } from 'react';
import Table from '../shared/components/table/Table.js';
import { LANGUAGE, LOCALE } from 'app/utils/constants.js';
import { useSelector } from 'react-redux';
import { formatCurrency, formatItemsTotalQuantities, formatQuantityWithUnit } from '../shared/utils/format.js';
import { selectItemUnitsMap } from 'app/duck/selectors.js';

const {
    tableHeaderLabelsMap,
    totalLabel
} = LANGUAGE.order.order.orderDetails.orderProductTable;

const OrderProductTable = React.memo(function OrderProductTable({ order }) {
    const itemUnitsMap = useSelector(selectItemUnitsMap);
    const { custom1, custom2, items, currency, quantity, total } = order;
    const numColumns = useMemo(
        () => 6 + (custom1 ? 1 : 0) + (custom2 ? 1 : 0),
        [custom1, custom2]);

    const columns = useMemo(() => [
        { field: 'ref', headerName: tableHeaderLabelsMap.ref },
        { field: 'description', headerName: tableHeaderLabelsMap.description },
        { field: 'custom1', headerName: custom1, hide: !custom1 },
        { field: 'custom2', headerName: custom2, hide: !custom2 },
        {
            field: 'quantity',
            headerName: tableHeaderLabelsMap.quantity,
            type: 'number',
            align: 'right',
            format: row => formatQuantityWithUnit(row.quantity, row.unit)
        },
        {
            field: 'price',
            headerName: tableHeaderLabelsMap.price,
            type: 'number',
            align: 'right',
            format: row => formatCurrency(row.price, currency)
        },
        {
            field: 'total',
            headerName: tableHeaderLabelsMap.total,
            type: 'number',
            align: 'right',
            format: row => formatCurrency(row.total, currency)
        },
    ], [custom1, custom2, currency]);

    const rows = useMemo(() => items.map(item => ({
        ref: item.ref,
        description: item.description,
        custom1: item.custom1,
        custom2: item.custom2,
        quantity: item.quantity,
        unit: item.unit,
        price: item.price,
        total: item.total,
    })), [items]);

    const options = useMemo(() => ({
        table: {
            dense: true
        }
    }), []);

    const footer = useMemo(() => [[
        { field: 'label', value: totalLabel, colSpan: numColumns - 4, align: 'right' },
        {
            field: 'quantity',
            value: formatItemsTotalQuantities(quantity, itemUnitsMap, LOCALE),
            colSpan: 1,
            align: 'right'
        },
        { field: 'total', value: formatCurrency(total, currency), colSpan: 2, align: 'right' }
    ]], [currency, numColumns, quantity, total, itemUnitsMap]);

    return (
        <Table
            columns={ columns }
            rows={ rows }
            footer={ footer }
            options={ options }
        />
    )
});

export default OrderProductTable;