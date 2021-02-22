import React, { useEffect } from 'react';
import RHFChinaExportTable, { validateChinaExportItems } from '../shared/rhf/forms/RHFChinaExportTable.js';
import Footer from '../shared/components/Footer.js';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LANGUAGE } from 'app/utils/constants.js';
import { getAddressName } from 'app/utils/models/getters.js';
import { getOptionId } from 'app/utils/options/getters.js';
import { consolidationTableItemsToConsolidationItems } from '../shared/utils/entityConversion.js';
import { useDispatch, useSelector } from 'react-redux';
import { createDocument, updateDocument } from '../shipments/duck/thunks.js';
import { selectSessionUserCompanyId, selectSessionUserId } from 'app/duck/selectors.js';
import Title5 from 'features/shared/display/Title5.js';
import { getDocumentUrl } from 'features/documents/utils/urls.js';

const {
    titleLabel,
    prevButtonLabel,
    nextButtonLabel
} = LANGUAGE.documents.ce.products;

const fieldNames = {
    coItems: 'coItems',
    marks: 'marks'
};

const DOCUMENT_TYPE = 'CE';

const ChinaExportProducts = React.memo(function ChinaExportProducts(
    { chinaExport, setChinaExport, shipmentId, documentId, isEdit }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const companyId = useSelector(selectSessionUserCompanyId);
    const userId = useSelector(selectSessionUserId);

    const { register, control, getValues, setValue, errors, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [fieldNames.coItems]: chinaExport.coItems,
            [fieldNames.marks]: chinaExport.marks
        }
    });

    useEffect(() => {
        register({ name: fieldNames.coItems }, { validate: validateChinaExportItems });
    }, [register]);

    const onPrevClick = () => {
        setChinaExport(prev => ({ ...prev, ...getValues() }));
        const urlOptions = {
            edit: isEdit,
            step: 'optional'
        };
        if (isEdit) urlOptions.document = documentId;
        history.push(getDocumentUrl('CE', shipmentId, urlOptions));
    };

    const onSubmit = (productData) => {
        const document = { ...chinaExport, ...productData };
        document.type = DOCUMENT_TYPE;
        document.companyId = companyId;
        document.createdBy = userId;
        if (typeof document.sName !== 'string') getAddressName(document.sName);
        if (typeof document.mName !== 'string') getAddressName(document.mName);
        if (typeof document.cName !== 'string') getAddressName(document.cName);
        document.tradingCountry = getOptionId(document.tradingCountry);
        document.destCountry = getOptionId(document.destCountry);
        if (document.del) document.del = getOptionId(document.del);
        document.coItems = consolidationTableItemsToConsolidationItems(document.coItems);
        if (isEdit) dispatch(updateDocument({ shipmentId, documentId, update: document }));
        else dispatch(createDocument({ shipmentId, document }));
        history.push(`/home/shipments/${ shipmentId }?tab=documents`);
    };

    return (
        <form onSubmit={ handleSubmit(onSubmit) } autoComplete="off" noValidate>
            <Title5 title={ titleLabel }/>
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