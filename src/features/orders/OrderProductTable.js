import React, { useMemo } from 'react';
import Table from '../shared/components/table/Table.js';
import { LANGUAGE, LOCALE } from '../../app/utils/constants.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { getCurrencySymbol } from '../shared/utils/random.js';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectOrderById } from './duck/selectors.js';
import { getOptionLabel } from '../../app/utils/options/getters.js';
import { formatQuantityWithUnit } from '../shared/utils/format.js';
import { selectItemUnitsMap } from '../../app/duck/selectors.js';

const {
    tableHeaderLabelsMap,
    totalLabel
} = LANGUAGE.order.order.orderDetails.orderProductTable;

const OrderProductTable = React.memo(function OrderProductTable() {
    const { id: orderId } = useParams();
    const order = useSelector(state => selectOrderById(state, { orderId }));
    const itemUnitsMap = useSelector(selectItemUnitsMap);
    const { custom1, custom2, items, currency, totalQ, totalA } = order;
    const numColumns = useMemo(
        () => 6 + (custom1 ? 1 : 0) + (custom2 ? 1 : 0),
        [custom1, custom2]);

    const columns = useMemo(() => [
        { field: 'ref', headerName: tableHeaderLabelsMap.ref },
        { field: 'description', headerName: tableHeaderLabelsMap.description },
        { field: 'custom1', headerName: custom1, hide: !custom1 },
        { field: 'custom2', headerName: custom2, hide: !custom2 },
        { field: 'quantity', headerName: tableHeaderLabelsMap.quantity, type: 'number', align: 'right' },
        { field: 'price', headerName: tableHeaderLabelsMap.price, type: 'number', align: 'right' },
        { field: 'total', headerName: tableHeaderLabelsMap.total, type: 'number', align: 'right' },
    ], [custom1, custom2]);

    const rows = useMemo(() => items.map(item => ({
        ref: item.ref,
        description: item.description,
        custom1: item.custom1,
        custom2: item.custom2,
        quantity: formatQuantityWithUnit(item.quantity, getOptionLabel(item.unit, LOCALE)),
        price: formatQuantityWithUnit(item.price, getCurrencySymbol(currency)),
        total: formatQuantityWithUnit(item.total, getCurrencySymbol(currency)),
    })), [items, currency]);

    const footer = useMemo(() => [[
        { field: 'label', value: totalLabel, colSpan: numColumns - 4, align: 'right' },
        { field: 'totalQ', value: UnitCounter.stringRep(totalQ, itemUnitsMap, LOCALE), colSpan: 1, align: 'right' },
        { field: 'totalA', value: `${ getCurrencySymbol(currency) } ${ totalA }`, colSpan: 2, align: 'right' }
    ]], [currency, numColumns, totalQ, totalA, itemUnitsMap]);

    return (
        <Table columns={columns} rows={rows} footer={footer}/>
    )
});

export default OrderProductTable;