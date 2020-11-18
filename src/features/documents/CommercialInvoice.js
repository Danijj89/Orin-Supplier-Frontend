import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Paper, Box } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import { useForm } from 'react-hook-form';
import CommercialInvoiceDetails from './CommercialInvoiceDetails.js';
import Footer from '../shared/components/Footer.js';
import RHFProductTable, { validateItems } from '../shared/rhf/forms/RHFProductTable.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveProducts } from '../products/duck/selectors.js';
import useSessionStorage from '../shared/hooks/useSessionStorage.js';
import { SESSION_NEW_DOCUMENT } from '../../app/sessionKeys.js';
import {
    addressToDocAddress,
    productTableItemsToDocItems, productTableItemsToItems,
    shipmentToCommercialInvoice
} from '../shared/utils/entityConversion.js';
import { cleanDocumentError, cleanNewDocument } from './duck/slice.js';
import { selectCompanyActiveAddresses } from '../home/duck/selectors.js';
import { selectClientActiveAddresses, selectClientById } from '../clients/duck/selectors.js';
import { findAddressFromAddresses } from '../shared/utils/addresses.js';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import { createDocument } from '../shipments/duck/thunks.js';
import queryString from 'query-string';
import { selectShipmentById } from '../shipments/duck/selectors.js';

const DOCUMENT_TYPE = 'CI';

const detailsFieldNames = {
    autoGenerateRef: 'autoGenerateRef',
    ref: 'ref',
    sellerAdd: 'sellerAdd',
    consigneeAdd: 'consigneeAdd',
    coo: 'coo',
    clientRefs: 'clientRefs',
    payRefs: 'payRefs',
    notes: 'notes'
};

const productsFieldNames = {
    custom1: 'ciCustom1',
    custom2: 'ciCustom2',
    currency: 'currency',
    items: 'items',
    quantity: 'quantity',
    total: 'total',
    marks: 'marks'
};

const {
    detailsPrevButtonLabel,
    detailsNextButtonLabel,
    productsPrevButtonLabel,
    productsNextButtonLabel
} = LANGUAGE.documents.ci;

const CommercialInvoice = React.memo(function CommercialInvoice() {
    const dispatch = useDispatch();
    const location = useLocation();
    const parsed = queryString.parse(location.search);
    const shipment = useSelector(state => selectShipmentById(state, parsed.shipment));
    const history = useHistory();
    const [step, setStep] = useState('details');
    const products = useSelector(selectActiveProducts);
    const companyAddresses = useSelector(selectCompanyActiveAddresses);
    const consignee = useSelector(state => selectClientById(state, shipment.consignee));
    const consigneeAddresses = useSelector(state => selectClientActiveAddresses(state, shipment.consignee));
    const userId = useSelector(selectCurrentUserId);
    const isDetailsStep = useMemo(() => step === 'details', [step]);
    const initialCI = shipmentToCommercialInvoice(shipment);
    const [commercialInvoice, setCommercialInvoice] = useSessionStorage(SESSION_NEW_DOCUMENT, initialCI);

    const { register, control, errors, getValues, setValue, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [detailsFieldNames.autoGenerateRef]: commercialInvoice.autoGenerateRef,
            [detailsFieldNames.ref]: commercialInvoice.ref,
            [detailsFieldNames.sellerAdd]: findAddressFromAddresses(commercialInvoice.sellerAdd, companyAddresses),
            [detailsFieldNames.consigneeAdd]: findAddressFromAddresses(commercialInvoice.consigneeAdd, consigneeAddresses),
            [detailsFieldNames.coo]: commercialInvoice.coo,
            [detailsFieldNames.clientRefs]: commercialInvoice.clientRefs,
            [detailsFieldNames.payRefs]: commercialInvoice.payRefs,
            [detailsFieldNames.notes]: commercialInvoice.notes,
            [productsFieldNames.currency]: commercialInvoice.currency,
            [productsFieldNames.items]: commercialInvoice.items,
            [productsFieldNames.quantity]: commercialInvoice.quantity,
            [productsFieldNames.total]: commercialInvoice.total,
            [productsFieldNames.custom1]: commercialInvoice.custom1,
            [productsFieldNames.custom2]: commercialInvoice.custom2,
            [productsFieldNames.marks]: commercialInvoice.marks
        }
    });

    useEffect(() => {
        register({ name: productsFieldNames.items }, { validate: validateItems });
        register({ name: productsFieldNames.custom1 });
        register({ name: productsFieldNames.custom2 });
        register({ name: productsFieldNames.quantity });
        register({ name: productsFieldNames.total });
    }, [register]);

    const onSubmit = useCallback(
        (data) => {
            data.type = DOCUMENT_TYPE;
            data.sellerAdd = addressToDocAddress(data.sellerAdd);
            data.consigneeAdd = addressToDocAddress(data.consigneeAdd);
            data.docItems = productTableItemsToDocItems(data.items);
            data.items = productTableItemsToItems(data.items, shipment._id);
            data.createdBy = userId;
            dispatch(createDocument({ id: shipment._id, doc: data }))
            dispatch(cleanNewDocument());
            history.push(`/home/shipments/${ shipment._id }?tab=documents`);
        },
        [dispatch, shipment._id, history, userId]);

    const onPrevClick = useCallback(
        () => {
            if (isDetailsStep) {
                dispatch(cleanNewDocument());
                history.goBack();
            } else {
                dispatch(cleanDocumentError());
                setCommercialInvoice(getValues());
                setStep('details');
            }
        },
        [history, dispatch, isDetailsStep, getValues, setCommercialInvoice]);

    const onNextClick = useCallback(
        (data) => {
            if (isDetailsStep) {
                setCommercialInvoice(getValues());
                setStep('products');
            } else {
                handleSubmit(onSubmit)();
            }
        },
        [getValues, handleSubmit, isDetailsStep, onSubmit, setCommercialInvoice]);

    return (
        <Paper>
            <Box hidden={ !isDetailsStep }>
                <CommercialInvoiceDetails
                    rhfRegister={ register }
                    rhfControl={ control }
                    rhfErrors={ errors }
                    rhfGetValues={ getValues }
                    fieldNames={ detailsFieldNames }
                    companyAddresses={ companyAddresses }
                    consigneeAddresses={ consigneeAddresses }
                    consignee={ consignee }
                />
            </Box>
            <Box hidden={ step !== 'products' }>
                <RHFProductTable
                    rhfRegister={ register }
                    rhfErrors={ errors }
                    rhfControl={ control }
                    rhfSetValue={ setValue }
                    rhfGetValues={ getValues }
                    fieldNames={ productsFieldNames }
                    products={ products }
                    isEdit
                />
            </Box>
            <Footer
                prevLabel={ isDetailsStep ? detailsPrevButtonLabel : productsPrevButtonLabel }
                nextLabel={ isDetailsStep ? detailsNextButtonLabel : productsNextButtonLabel }
                onPrevClick={ onPrevClick }
                onNextClick={ onNextClick }
            />
        </Paper>
    )
});

export default CommercialInvoice;