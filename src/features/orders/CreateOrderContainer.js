import React, { useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCurrentOrderId
} from './duck/selectors.js';
import Loader from '../shared/components/Loader.js';
import { selectCompanyId, selectHomeError, selectHomeDataStatus } from '../home/duck/selectors.js';
import { determineStatus } from '../shared/utils/state.js';
import { selectClientDataStatus, selectClientError } from '../clients/duck/selectors.js';
import { fetchClients } from '../clients/duck/thunks.js';
import CreateOrder from './CreateOrder.js';
import { selectProductDataStatus, selectProductError } from '../products/duck/selectors.js';
import { fetchProducts } from '../products/duck/thunks.js';
import { cleanNewOrder } from './duck/slice.js';
import ErrorPage from '../shared/components/ErrorPage.js';

export default function CreateOrderContainer() {
    const dispatch = useDispatch();

    const clientDataStatus = useSelector(selectClientDataStatus);
    const clientError = useSelector(selectClientError);
    const productDataStatus = useSelector(selectProductDataStatus);
    const productError = useSelector(selectProductError);
    const homeStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);

    const status = determineStatus(clientDataStatus, productDataStatus, homeStatus);
    const errors = [clientError, productError, homeError];

    const currentOrderId = useSelector(selectCurrentOrderId);
    const companyId = useSelector(selectCompanyId);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current && companyId) {
            dispatch(fetchClients({ companyId }));
            dispatch(fetchProducts({ companyId }));
            fetched.current = true;
        }
    }, [dispatch, companyId]);

    useEffect(() => {
        return () => dispatch(cleanNewOrder());
    }, [dispatch]);

    return (
        <>
            { currentOrderId && <Redirect to={ `/home/orders/${ currentOrderId }` }/> }
            { status === 'REJECTED' && <ErrorPage errors={errors} />}
            { status === 'PENDING' && <Loader/> }
            { !currentOrderId && status === 'FULFILLED' && <CreateOrder/> }
        </>
    );
}