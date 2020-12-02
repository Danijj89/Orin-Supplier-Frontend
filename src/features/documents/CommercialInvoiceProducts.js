import React, { useEffect } from 'react';
import RHFProductTable, { validateItems } from '../shared/rhf/forms/RHFProductTable.js';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../shared/components/Footer.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import { Typography } from '@material-ui/core';
import { addressToDocAddress, tableItemsToItems } from '../shared/utils/entityConversion.js';
import { createDocument } from '../shipments/duck/thunks.js';
import { selectCompanyId } from '../home/duck/selectors.js';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import { useHistory } from 'react-router-dom';
import { getOptionId } from '../../app/utils/options/getters.js';

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
        shipmentId
    }
) {
    const dispatch = useDispatch();
    const history = useHistory();

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
        history.push(`/home/documents/ci/new?step=details&shipment=${ shipmentId }`);
    };

    const onSubmit = (productData) => {
        const document = { ...commercialInvoice, ...productData };
        document.type = DOCUMENT_TYPE;
        document.seller = companyId;
        document.sellerAdd = addressToDocAddress(document.sellerAdd);
        document.consigneeAdd = addressToDocAddress(document.consigneeAdd);
        document.currency = getOptionId(document.currency);
        document.createdBy = userId;
        document.items = tableItemsToItems(document.items);
        document.coo = getOptionId(document.coo);
        if (document.scRef) document.scRef = document.scRef.ref;
        dispatch(createDocument({ shipmentId, document }));
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