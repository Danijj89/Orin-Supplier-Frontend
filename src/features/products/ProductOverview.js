import React, { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import NewProductButton from './NewProductButton.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllProducts, selectProductStatus } from './duck/selectors.js';
import { selectCurrentCompany, selectHomeStatus } from '../home/duck/selectors.js';
import { fetchProducts } from './duck/thunks.js';
import { isLoading } from '../shared/utils/store.js';
import Loader from '../shared/components/Loader.js';
import ProductTable from './ProductTable.js';

export default function ProductOverview() {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const company = useSelector(selectCurrentCompany);
    const homeStatus = useSelector(selectHomeStatus);
    const productStatus = useSelector(selectProductStatus);
    const loading = isLoading([homeStatus, productStatus]);

    useEffect(() => {
        if (company) dispatch(fetchProducts(company._id));
    }, [dispatch, company])

    return (
        <Paper>
            { loading && <Loader/> }
            { company && <NewProductButton companyId={ company._id }/> }
            { products && <ProductTable products={ products }/> }
        </Paper>
    )
}