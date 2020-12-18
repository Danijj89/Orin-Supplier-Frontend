import React, { useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCurrentOrderId
} from './duck/selectors.js';
import Loader from '../shared/components/Loader.js';
import { selectHomeError, selectHomeDataStatus } from '../home/duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import { selectClientDataStatus, selectClientError } from '../clients/duck/selectors.js';
import { fetchClients } from '../clients/duck/thunks.js';
import CreateOrder from './CreateOrder.js';
import { selectProductDataStatus, selectProductError } from '../products/duck/selectors.js';
import { fetchProducts } from '../products/duck/thunks.js';
import { cleanNewOrder } from './duck/slice.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import { cleanHomeState } from '../home/duck/slice.js';
import { cleanClientState } from '../clients/duck/slice.js';
import { cleanProductState } from '../products/duck/slice.js';
import { fetchCurrentCompany } from '../home/duck/thunks.js';
import Permission from '../shared/components/Permission.js';
import { ORDER } from '../admin/utils/resources.js';
import { CREATE_ANY, CREATE_OWN } from '../admin/utils/actions.js';

export default function CreateOrderContainer() {
    const dispatch = useDispatch();

    const clientDataStatus = useSelector(selectClientDataStatus);
    const clientError = useSelector(selectClientError);
    const productDataStatus = useSelector(selectProductDataStatus);
    const productError = useSelector(selectProductError);
    const homeDataStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);

    const status = determineStatus(clientDataStatus, productDataStatus, homeDataStatus);
    const errors = getErrors(clientError, productError, homeError);

    const currentOrderId = useSelector(selectCurrentOrderId);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current) {
            if (clientDataStatus === 'IDLE') dispatch(fetchClients());
            if (productDataStatus === 'IDLE') dispatch(fetchProducts());
            if (homeDataStatus === 'IDLE') dispatch(fetchCurrentCompany());
            fetched.current = true;
        }
    }, [dispatch, clientDataStatus, productDataStatus, homeDataStatus]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanHomeState());
                dispatch(cleanClientState());
                dispatch(cleanProductState());
            }
            dispatch(cleanNewOrder());
        }
    }, [dispatch, errors.length]);

    return (
        <Permission resource={ORDER} action={[CREATE_ANY, CREATE_OWN]}>
            { currentOrderId && <Redirect to={ `/home/orders/${ currentOrderId }` }/> }
            { status === 'REJECTED' && <ErrorPage errors={errors} />}
            { status === 'PENDING' && <Loader/> }
            { !currentOrderId && status === 'FULFILLED' && <CreateOrder/> }
        </Permission>
    );
}