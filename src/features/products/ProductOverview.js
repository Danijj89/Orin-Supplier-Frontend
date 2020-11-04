import React, { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import NewProductButton from './NewProductButton.js';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectProductDataStatus,
    selectProductError,
    selectProductsMap,
} from './duck/selectors.js';
import {
    selectCurrentCompany,
    selectHomeStatus,
} from '../home/duck/selectors.js';
import { fetchProducts } from './duck/thunks.js';
import { determineStatus } from '../shared/utils/state.js';
import ProductTable from './ProductTable.js';
import ErrorDisplay from '../shared/components/ErrorDisplay.js';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../shared/components/Loader.js';

const useStyles = makeStyles((theme) => ({
    productOverviewRoot: {
        margin: theme.spacing(2),
    },
}));

export default function ProductOverview() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const products = useSelector(selectProductsMap);
    const company = useSelector(selectCurrentCompany);
    const homeStatus = useSelector(selectHomeStatus);
    const productDataStatus = useSelector(selectProductDataStatus);
    const productError = useSelector(selectProductError);
    const status = determineStatus([homeStatus, productDataStatus]);

    useEffect(() => {
        if (company) dispatch(fetchProducts(company._id));
    }, [dispatch, company]);

    return (
        <>
            { status === 'PENDING' && <Loader/> }
            { productError && <ErrorDisplay errors={ [productError] }/> }
            { status === 'FULFILLED' &&
            <Paper className={ classes.productOverviewRoot }>
                <NewProductButton companyId={ company._id }/>
                <ProductTable products={ products }/>
            </Paper>
            }
        </>
    );
}
