import React, { useState } from 'react';
import Table from '../shared/components/Table.js';
import { LANGUAGE } from '../../app/constants.js';
import ProductDialog from '../shared/forms/ProductDialog.js';
import { useDispatch } from 'react-redux';
import { deleteProduct, updateProduct } from './duck/thunks.js';

const {
    tableHeadersMap,
    editDialogSubmitLabel,
    editDialogTitleLabel,
} = LANGUAGE.product.overview.productTable;

export default function ProductTable({ products, isLoading }) {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [product, setProduct] = useState(null);

    const onRowClick = (params) => {
        setProduct(products[params.id]);
        setIsEdit(true);
    };
    const onEditCancel = () => setIsEdit(false);
    const onEditSubmit = (data) => {
        const { _id: id, autoGenerate, ...update } = data;
        dispatch(updateProduct({ id, update }));
        setIsEdit(false);
    };

    const onDelete = (productId) => {
        dispatch(deleteProduct(productId));
        setIsEdit(false);
    };

    const columns = [
        { field: 'id', hide: true },
        { field: 'sku', headerName: tableHeadersMap.sku },
        { field: 'name', headerName: tableHeadersMap.name },
        { field: 'description', headerName: tableHeadersMap.description },
        {
            field: 'lastOrder',
            headerName: tableHeadersMap.lastOrder,
            type: 'date',
        },
        {
            field: 'salesYTD',
            headerName: tableHeadersMap.salesYTD,
            type: 'number',
        },
        {
            field: 'orderCountYTD',
            headerName: tableHeadersMap.orderCountYTD,
            type: 'number',
        },
        { field: 'hsc', headerName: tableHeadersMap.hsc },
    ];

    const rows = Object.values(products).map((product) => ({
        id: product._id,
        sku: product.sku,
        name: product.name,
        description: product.description,
        lastOrder: product.lastOrder,
        salesYTD: product.salesYTD,
        orderCountYTD: product.orderCountYTD,
        hsc: product.hsc,
    }));

    return (
        <>
            <Table
                columns={columns}
                rows={rows}
                isLoading={isLoading}
                onRowClick={onRowClick}
            />
            {product && (
                <ProductDialog
                    isOpen={isEdit}
                    product={product}
                    titleLabel={editDialogTitleLabel}
                    submitLabel={editDialogSubmitLabel}
                    onCancel={onEditCancel}
                    onSubmit={onEditSubmit}
                    onDelete={() => onDelete(product._id)}
                    isEdit
                />
            )}
        </>
    );
}
