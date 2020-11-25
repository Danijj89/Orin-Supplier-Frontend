import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductDataStatus, selectProductError } from './duck/selectors.js';
import { determineStatus } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { selectCompanyId, selectHomeError, selectHomeDataStatus } from '../home/duck/selectors.js';
import { fetchProducts } from './duck/thunks.js';
import ProductOverview from './ProductOverview.js';

const ProductOverviewContainer = React.memo(function ProductOverviewContainer() {
    const dispatch = useDispatch();
    const productDataStatus = useSelector(selectProductDataStatus);
    const productError = useSelector(selectProductError);
    const homeStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);

    const status = determineStatus([productDataStatus, homeStatus]);
    const errors = [productError, homeError];

    const companyId = useSelector(selectCompanyId);

    useEffect(() => {
        if (productDataStatus === 'IDLE' && companyId)
            dispatch(fetchProducts({ companyId }));
    }, [dispatch, productDataStatus, companyId]);

    return (
        <>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <ProductOverview/> }
        </>
    )
});

export default ProductOverviewContainer;