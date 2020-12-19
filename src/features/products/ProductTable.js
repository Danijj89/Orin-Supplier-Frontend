import React, { useCallback, useMemo, useState } from 'react';
import Table from '../shared/components/table/Table.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import ProductDialog from '../shared/forms/ProductDialog.js';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, updateProduct } from './duck/thunks.js';
import { selectActiveProductsMap, selectAllActiveProducts } from './duck/selectors.js';
import { SESSION_PRODUCT_TABLE_FILTERS } from '../../app/sessionKeys.js';
import Permission from '../shared/permissions/Permission.js';
import { PRODUCT } from '../admin/utils/resources.js';
import { UPDATE_ANY } from '../admin/utils/actions.js';

const {
    tableHeadersMap,
    editDialogSubmitLabel,
    editDialogTitleLabel,
} = LANGUAGE.product.overview.productTable;

export default function ProductTable() {
    const dispatch = useDispatch();
    const products = useSelector(selectAllActiveProducts);
    const productsMap = useSelector(selectActiveProductsMap);
    const [isEdit, setIsEdit] = useState(false);
    const [product, setProduct] = useState(null);

    const onRowClick = (params) => {
        setProduct(productsMap[params.id]);
        setIsEdit(true);
    };
    const onEditCancel = () => setIsEdit(false);
    const onEditSubmit = (data) => {
        const { _id: productId, autoGenerateRef, ...update } = data;
        dispatch(updateProduct({ productId, update }));
        setIsEdit(false);
    };

    const createDeleteHandler = useCallback(
        (productId) => () => {
            dispatch(deleteProduct({ productId }));
            setIsEdit(false);
        }, [dispatch]);

    const columns = useMemo(() => [
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
    ], []);

    const rows = useMemo(() => products.map((product) => ({
        id: product._id,
        sku: product.sku,
        name: product.name,
        description: product.description,
        lastOrder: product.lastOrder,
        salesYTD: product.salesYTD,
        orderCountYTD: product.orderCountYTD,
        hsc: product.hsc,
    })), [products]);

    const filterOptions = useMemo(() => ({
        sessionKey: SESSION_PRODUCT_TABLE_FILTERS,
        filters: [
            { field: 'lastOrder', type: 'date', label: tableHeadersMap.lastOrder },
            { field: 'salesYTD', type: 'range', label: tableHeadersMap.salesYTD }
        ]
    }), []);

    return (
        <>
            <Table
                columns={ columns }
                rows={ rows }
                onRowClick={ onRowClick }
                filterOptions={ filterOptions }
            />
            { product && (
                <Permission resource={ PRODUCT } action={ UPDATE_ANY }>
                    <ProductDialog
                        isOpen={ isEdit }
                        product={ product }
                        titleLabel={ editDialogTitleLabel }
                        submitLabel={ editDialogSubmitLabel }
                        onCancel={ onEditCancel }
                        onSubmit={ onEditSubmit }
                        onDelete={ createDeleteHandler(product._id) }
                        isEdit
                    />
                </Permission>
            ) }
        </>
    );
}
