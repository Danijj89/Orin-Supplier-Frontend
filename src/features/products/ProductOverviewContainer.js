import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductDataStatus, selectProductError } from './duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { selectCompanyId, selectHomeError, selectHomeDataStatus } from '../home/duck/selectors.js';
import { fetchProducts } from './duck/thunks.js';
import ProductOverview from './ProductOverview.js';
import { cleanHomeState } from '../home/duck/slice.js';
import { cleanProductState } from './duck/slice.js';

const ProductOverviewContainer = React.memo(function ProductOverviewContainer() {
    const dispatch = useDispatch();
    const productDataStatus = useSelector(selectProductDataStatus);
    const productError = useSelector(selectProductError);
    const homeDataStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);

    const status = determineStatus(productDataStatus, homeDataStatus);
    const errors = getErrors(productError, homeError);

    const companyId = useSelector(selectCompanyId);

    useEffect(() => {
        if (productDataStatus === 'IDLE' && companyId)
            dispatch(fetchProducts({ companyId }));
    }, [dispatch, productDataStatus, companyId]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanHomeState());
                dispatch(cleanProductState());
            }
        }
    }, [dispatch, errors.length]);

    return (
        <>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <ProductOverview/> }
        </>
    )
});

export default ProductOverviewContainer;