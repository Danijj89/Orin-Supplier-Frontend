import React, { useMemo } from 'react';
import Table from '../shared/components/table/Table.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { getCurrencySymbol } from '../shared/utils/random.js';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectOrderById } from './duck/selectors.js';

const {
    tableHeaderLabelsMap,
    totalLabel
} = LANGUAGE.order.order.orderDetails.orderProductTable;

const OrderProductTable = React.memo(function OrderProductTable() {
    const { id: orderId } = useParams();
    const order = useSelector(state => selectOrderById(state, orderId));
    const { custom1, custom2, items, currency, totalQ, totalA } = order;
    const numColumns = useMemo(
        () => 7 + (custom1 ? 1 : 0) + (custom2 ? 1 : 0),
        [custom1, custom2]);

    const columns = useMemo(() => [
        { field: 'ref', headerName: tableHeaderLabelsMap.ref },
        { field: 'description', headerName: tableHeaderLabelsMap.description },
        { field: 'custom1', headerName: custom1, hide: !custom1 },
        { field: 'custom2', headerName: custom2, hide: !custom2 },
        { field: 'quantity', headerName: tableHeaderLabelsMap.quantity, type: 'number' },
        { field: 'unit', headerName: tableHeaderLabelsMap.unit },
        { field: 'price', headerName: tableHeaderLabelsMap.price, type: 'number' },
        { field: 'total', headerName: tableHeaderLabelsMap.total, type: 'number' },
    ], [custom1, custom2]);

    const rows = useMemo(() => items.map(item => ({
        ref: item.ref,
        description: item.description,
        custom1: item.custom1,
        custom2: item.custom2,
        quantity: item.quantity,
        unit: item.unit,
        price: item.price,
        total: item.total
    })), [items]);

    const footer = useMemo(() => [[
        { field: 'label', value: totalLabel, colSpan: numColumns - 4, align: 'right' },
        { field: 'totalQ', value: UnitCounter.stringRep(totalQ), colSpan: 2, align: 'center' },
        { field: 'totalA', value: `${ getCurrencySymbol(currency) } ${ totalA }`, colSpan: 2, align: 'right' }
    ]], [currency, numColumns, totalQ, totalA]);

    return (
        <Table columns={columns} rows={rows} footer={footer}/>
    )
});

export default OrderProductTable;