import React, { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import NewProductButton from './NewProductButton.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductError, selectProductsMap, selectProductStatus } from './duck/selectors.js';
import { selectCurrentCompany, selectHomeStatus } from '../home/duck/selectors.js';
import { fetchProducts } from './duck/thunks.js';
import { isLoading } from '../shared/utils/store.js';
import ProductTable from './ProductTable.js';
import ErrorDisplay from '../shared/components/ErrorDisplay.js';

export default function ProductOverview() {
    const dispatch = useDispatch();
    const products = useSelector(selectProductsMap);
    const company = useSelector(selectCurrentCompany);
    const homeStatus = useSelector(selectHomeStatus);
    const productStatus = useSelector(selectProductStatus);
    const productError = useSelector(selectProductError);
    const loading = isLoading([homeStatus, productStatus]);

    useEffect(() => {
        if (company) dispatch(fetchProducts(company._id));
    }, [dispatch, company])

    return (
        <Paper>
            { productError && <ErrorDisplay errors={ [productError] }/> }
            { company && <NewProductButton companyId={ company._id }/> }
            <ProductTable products={ products } isLoading={ loading }/>
        </Paper>
    )
}