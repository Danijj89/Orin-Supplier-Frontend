import React, { useEffect } from 'react';
import RHFChinaExportTable from '../shared/rhf/forms/RHFChinaExportTable.js';
import Footer from '../shared/components/Footer.js';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LANGUAGE } from '../../app/utils/constants.js';
import { Typography } from '@material-ui/core';
import { validateItems } from '../shared/rhf/forms/RHFProductTable.js';
import { getAddressName } from '../../app/utils/models/getters.js';
import { getOptionId } from '../../app/utils/options/getters.js';
import { consolidationTableItemsToConsolidationItems } from '../shared/utils/entityConversion.js';
import { useDispatch } from 'react-redux';
import { createDocument } from '../shipments/duck/thunks.js';

const {
    titleLabel,
    prevButtonLabel,
    nextButtonLabel
} = LANGUAGE.documents.ce.products;

const fieldNames = {
    coItems: 'coItems',
    quantity: 'quantity',
    totalAmount: 'totalAmount',
    marks: 'marks'
};

const DOCUMENT_TYPE = 'CE';

const ChinaExportProducts = React.memo(function ChinaExportProducts(
    { chinaExport, setChinaExport, shipmentId }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const { register, control, getValues, setValue, errors, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [fieldNames.coItems]: chinaExport.coItems,
            [fieldNames.quantity]: chinaExport.quantity,
            [fieldNames.totalAmount]: chinaExport.totalAmount,
            [fieldNames.marks]: chinaExport.marks
        }
    });

    useEffect(() => {
        register({ name: fieldNames.coItems }, { validate: validateItems });
        register({ name: fieldNames.quantity });
        register({ name: fieldNames.totalAmount });
    }, [register]);

    const onPrevClick = () => {
        setChinaExport(prev => ({ ...prev, ...getValues() }));
        history.push(`/home/documents/ce/new?step=optional&shipment=${ shipmentId }`);
    };

    const onSubmit = (productData) => {
        const document = { ...chinaExport, ...productData };
        document.type = DOCUMENT_TYPE;
        document.sName = getAddressName(document.sName);
        document.mName = getAddressName(document.mName);
        document.cName = getAddressName(document.cName);
        document.tradingCountry = getOptionId(document.tradingCountry);
        document.destCountry = getOptionId(document.destCountry);
        if (document.del) document.del = getOptionId(document.del);
        document.items = consolidationTableItemsToConsolidationItems(document.items);
        dispatch(createDocument({ shipmentId, document }));
        history.push(`/home/shipments/${ shipmentId }?tab=documents`);
    };

    return (
        <form onSubmit={ handleSubmit(onSubmit) } autoComplete="off" noValidate>
            <Typography variant="h5">{ titleLabel }</Typography>
            <RHFChinaExportTable
                rhfRegister={ register }
                rhfControl={ control }
                rhfSetValue={ setValue }
                rhfGetValues={ getValues }
                rhfErrors={ errors }
                fieldNames={ fieldNames }
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

export default ChinaExportProducts;