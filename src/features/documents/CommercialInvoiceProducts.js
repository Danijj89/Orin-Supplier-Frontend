import React, { useEffect } from 'react';
import RHFProductTable, { validateItems } from '../shared/rhf/forms/RHFProductTable.js';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../shared/components/Footer.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { addressToDocAddress, tableItemsToItems } from '../shared/utils/entityConversion.js';
import { createDocument, updateDocument } from '../shipments/duck/thunks.js';
import { selectSessionUserCompanyId, selectSessionUserId } from 'app/duck/selectors.js';
import { useHistory } from 'react-router-dom';
import { getOptionId } from 'app/utils/options/getters.js';
import Title5 from 'features/shared/display/Title5.js';
import { makeStyles } from '@material-ui/core/styles';
import { getDocumentUrl } from 'features/documents/utils/urls.js';

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
    marks: 'marks'
};

const useStyles = makeStyles((theme) => ({
    title: {
        padding: theme.spacing(2),
    }
}));

const DOCUMENT_TYPE = 'CI';

const CommercialInvoiceProducts = React.memo(function CommercialInvoiceProducts(
    {
        commercialInvoice,
        setCommercialInvoice,
        shipmentId,
        documentId,
        isEdit
    }
) {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const companyId = useSelector(selectSessionUserCompanyId);
    const userId = useSelector(selectSessionUserId);

    const { register, control, errors, getValues, setValue, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [productsFieldNames.currency]: commercialInvoice.currency,
            [productsFieldNames.items]: commercialInvoice.items,
            [productsFieldNames.custom1]: commercialInvoice.custom1,
            [productsFieldNames.custom2]: commercialInvoice.custom2,
            [productsFieldNames.marks]: commercialInvoice.marks
        }
    });

    useEffect(() => {
        register({ name: productsFieldNames.items }, { validate: validateItems });
        register({ name: productsFieldNames.custom1 });
        register({ name: productsFieldNames.custom2 });
    }, [register]);

    const onPrevClick = () => {
        setCommercialInvoice(prev => ({ ...prev, ...getValues() }));
        const urlOptions = {
            edit: isEdit,
            step: 'details'
        };
        if (isEdit) urlOptions.document = documentId;
        history.push(getDocumentUrl('CI', shipmentId, urlOptions));
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
        if (isEdit) dispatch(updateDocument({ shipmentId, documentId, update: document }));
        else dispatch(createDocument({ shipmentId, document }));
        history.push(`/home/shipments/${ shipmentId }?tab=documents`);
    };

    return (
        <form onSubmit={ handleSubmit(onSubmit) } autoComplete="off">
            <Title5 className={classes.title} title={ titleLabel }/>
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
    );
});

export default CommercialInvoiceProducts;