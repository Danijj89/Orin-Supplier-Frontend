import React, { useEffect } from 'react';
import RHFProductTable, { validateItems } from '../shared/rhf/forms/RHFProductTable.js';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveProducts } from '../products/duck/selectors.js';
import { selectActiveOrdersMap } from '../orders/duck/selectors.js';
import Footer from '../shared/components/Footer.js';
import { LANGUAGE } from '../../app/constants.js';
import { Typography } from '@material-ui/core';
import { addressToDocAddress } from '../shared/utils/entityConversion.js';
import { createDocument } from '../shipments/duck/thunks.js';
import { selectCompanyId } from '../home/duck/selectors.js';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

const {
    titleLabel,
    prevButtonLabel,
    nextButtonLabel
} = LANGUAGE.documents.ci.products;

const productsFieldNames = {
    custom1: 'ciCustom1',
    custom2: 'ciCustom2',
    currency: 'currency',
    items: 'items',
    quantity: 'quantity',
    total: 'total',
    marks: 'marks'
};

const DOCUMENT_TYPE = 'CI';

const CommercialInvoiceProducts = React.memo(function CommercialInvoiceProducts(
    {
        commercialInvoice,
        setCommercialInvoice,
        setStep
    }
) {
    const location = useLocation();
    const { shipment: shipmentId } = queryString.parse(location.search);
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector(selectActiveProducts);
    const ordersMap = useSelector(selectActiveOrdersMap);
    const companyId = useSelector(selectCompanyId);
    const userId = useSelector(selectCurrentUserId);

    const { register, control, errors, getValues, setValue, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
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

    const onPrevClick = () => {
        setCommercialInvoice(prev => ({ ...prev, ...getValues() }));
        setStep('details');
    };

    const onSubmit = (productData) => {
        const data = { ...commercialInvoice, ...productData };
        data.type = DOCUMENT_TYPE;
        data.seller = companyId;
        data.sellerAdd = addressToDocAddress(data.sellerAdd);
        data.consigneeAdd = addressToDocAddress(data.consigneeAdd);
        data.createdBy = userId;
        dispatch(createDocument({ id: shipmentId, doc: data }))
        history.push(`/home/shipments/${ shipmentId }?tab=documents`);
    };

    return (
        <form onSubmit={ handleSubmit(onSubmit) } autoComplete="off">
            <Typography variant="h5">{ titleLabel }</Typography>
            <RHFProductTable
                rhfRegister={ register }
                rhfErrors={ errors }
                rhfControl={ control }
                rhfSetValue={ setValue }
                rhfGetValues={ getValues }
                fieldNames={ productsFieldNames }
                products={ products }
                ordersMap={ ordersMap }
                isEdit
                isShipment
            />
            <Footer
                prevLabel={ prevButtonLabel }
                nextLabel={ nextButtonLabel }
                onPrevClick={ onPrevClick }
                nextButtonType="submit"
            />
        </form>
    )
});

export default CommercialInvoiceProducts;