import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import RHFProductTable, { validateItems } from '../shared/rhf/forms/RHFProductTable.js';
import Footer from '../shared/components/Footer.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addressToDocAddress, tableItemsToItems } from '../shared/utils/entityConversion.js';
import { createDocument } from '../shipments/duck/thunks.js';
import { selectAllActiveProducts } from '../products/duck/selectors.js';
import { selectActiveOrdersMap } from '../orders/duck/selectors.js';
import { selectCompanyId } from '../home/duck/selectors.js';
import { selectCurrentUserId } from '../../app/duck/selectors.js';

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
    quantity: 'quantity',
    total: 'total',
    marks: 'marks'
};

const DOCUMENT_TYPE = 'SC';

const SalesContractProducts = React.memo(function SalesContractProducts(
    { salesContract, setSalesContract, shipmentId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector(selectAllActiveProducts);
    const ordersMap = useSelector(selectActiveOrdersMap);
    const companyId = useSelector(selectCompanyId);
    const userId = useSelector(selectCurrentUserId);

    const { register, control, errors, getValues, setValue, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [fieldNames.currency]: salesContract.currency,
            [fieldNames.items]: salesContract.items,
            [fieldNames.quantity]: salesContract.quantity,
            [fieldNames.total]: salesContract.total,
            [fieldNames.custom1]: salesContract.custom1,
            [fieldNames.custom2]: salesContract.custom2,
            [fieldNames.marks]: salesContract.marks
        }
    });

    useEffect(() => {
        register({ name: fieldNames.items }, { validate: validateItems });
        register({ name: fieldNames.custom1 });
        register({ name: fieldNames.custom2 });
        register({ name: fieldNames.quantity });
        register({ name: fieldNames.total });
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
        document.items = tableItemsToItems(document.items, shipmentId);
        document.createdBy = userId;
        dispatch(createDocument({ shipmentId, document }))
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
                fieldNames={ fieldNames }
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

export default SalesContractProducts;