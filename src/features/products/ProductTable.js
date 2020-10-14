import React from 'react';
import Table from '../shared/components/Table.js';
import { LANGUAGE } from '../../app/constants.js';

const { tableHeadersMap } = LANGUAGE.product.overview.productTable;

export default function ProductTable({ products }) {

    const columns = [
        { field: 'id', hide: true },
        { field: 'sku', headerName: tableHeadersMap.sku },
        { field: 'name', headerName: tableHeadersMap.name },
        { field: 'description', headerName: tableHeadersMap.description },
        { field: 'lastOrder', headerName: tableHeadersMap.lastOrder, type: 'date' },
        { field: 'salesYTD', headerName: tableHeadersMap.salesYTD, type: 'number' },
        { field: 'orderCountYTD', headerName: tableHeadersMap.orderCountYTD, type: 'number' },
        { field: 'hsc', headerName: tableHeadersMap.hsc }
    ];

    const rows = products.map(product => ({
        id: product._id,
        sku: product.sku,
        name: product.name,
        description: product.description,
        lastOrder: product.lastOrder,
        salesYTD: product.salesYTD,
        orderCountYTD: product.orderCountYTD,
        hsc: product.hsc
    }));

    return (
        <Table columns={columns} rows={rows}/>
    )
}