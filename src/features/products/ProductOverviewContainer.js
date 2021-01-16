import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductDataStatus, selectProductError, selectProductStatus } from './duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { fetchProducts } from './duck/thunks.js';
import ProductOverview from './ProductOverview.js';
import { cleanProductState } from './duck/slice.js';
import { READ_ANY } from '../admin/utils/actions.js';
import ProductPermission from '../shared/permissions/ProductPermission.js';
import StatusHandler from 'features/shared/status/StatusHandler.js';

const ProductOverviewContainer = React.memo(function ProductOverviewContainer() {
    const dispatch = useDispatch();
    const productDataStatus = useSelector(selectProductDataStatus);
    const productError = useSelector(selectProductError);

    const status = determineStatus(productDataStatus);
    const errors = getErrors(productError);

    const productStatus = useSelector(selectProductStatus);

    useEffect(() => {
        if (productDataStatus === 'IDLE') dispatch(fetchProducts());
    }, [dispatch, productDataStatus]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanProductState());
            }
        }
    }, [dispatch, errors.length]);

    return (
        <ProductPermission action={ [READ_ANY] }>
            <StatusHandler status={ productStatus } error={ productError }/>
            { status === 'REJECTED' && <ErrorPage error={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <ProductOverview/> }
        </ProductPermission>
    )
});

export default ProductOverviewContainer;