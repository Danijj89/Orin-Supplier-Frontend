import React, { useEffect } from 'react';
import RHFProductTable, { validateItems } from '../shared/rhf/forms/RHFProductTable.js';
import Footer from '../shared/components/Footer.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addressToDocAddress, tableItemsToItems } from '../shared/utils/entityConversion.js';
import { createDocument } from '../shipments/duck/thunks.js';
import { selectSessionUserCompanyId, selectSessionUserId } from 'app/duck/selectors.js';
import { getOptionId } from 'app/utils/options/getters.js';
import Title5 from 'features/shared/display/Title5.js';

const {
    titleLabel,
    prevButtonLabel,
    nextButtonLabel
} = LANGUAGE.documents.sc.products;

const fieldNames = {
    custom1: 'ciCustom1',
    custom2: 'ciCustom2',
    currency: 'currency',
    items: 'items',
    marks: 'marks'
};

const DOCUMENT_TYPE = 'SC';

const SalesContractProducts = React.memo(function SalesContractProducts(
    { salesContract, setSalesContract, shipmentId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const companyId = useSelector(selectSessionUserCompanyId);
    const userId = useSelector(selectSessionUserId);

    const { register, control, errors, getValues, setValue, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [fieldNames.currency]: salesContract.currency,
            [fieldNames.items]: salesContract.items,
            [fieldNames.custom1]: salesContract.custom1,
            [fieldNames.custom2]: salesContract.custom2,
            [fieldNames.marks]: salesContract.marks
        }
    });

    useEffect(() => {
        register({ name: fieldNames.items }, { validate: validateItems });
        register({ name: fieldNames.custom1 });
        register({ name: fieldNames.custom2 });
    }, [register]);

    const onPrevClick = () => {
        setSalesContract(prev => ({ ...prev, ...getValues() }));
        history.push(`/home/documents/sc/new?step=details&shipment=${ shipmentId }`);
    };

    const onSubmit = (productData) => {
        const document = { ...salesContract, ...productData };
        document.type = DOCUMENT_TYPE;
        document.seller = companyId;
        document.sellerAdd = addressToDocAddress(document.sellerAdd);
        document.consigneeAdd = addressToDocAddress(document.consigneeAdd);
        if (document.bankDetails) document.bankDetails = document.bankDetails.detail;
        document.currency = getOptionId(document.currency);
        document.items = tableItemsToItems(document.items);
        document.createdBy = userId;
        dispatch(createDocument({ shipmentId, document }))
        history.push(`/home/shipments/${ shipmentId }?tab=documents`);
    };

    return (
        <form onSubmit={ handleSubmit(onSubmit) } autoComplete="off">
            <Title5 title={ titleLabel }/>
            <RHFProductTable
                rhfRegister={ register }
                rhfErrors={ errors }
                rhfControl={ control }
                rhfSetValue={ setValue }
                rhfGetValues={ getValues }
                fieldNames={ fieldNames }
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

export default SalesContractProducts;