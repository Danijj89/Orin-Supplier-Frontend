import React, { useEffect } from 'react';
import RHFMeasureTable, { validateItemMeasures } from '../shared/rhf/forms/RHFMeasureTable.js';
import { useForm } from 'react-hook-form';
import Footer from '../shared/components/Footer.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyId } from '../home/duck/selectors.js';
import {
    addressToDocAddress
} from '../shared/utils/entityConversion.js';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import { createDocument } from '../shipments/duck/thunks.js';
import { useHistory } from 'react-router-dom';

const {
    titleLabel,
    prevButtonLabel,
    nextButtonLabel
} = LANGUAGE.documents.pl.products;

const fieldNames = {
    custom1: 'plCustom1',
    custom2: 'plCustom2',
    package: 'package',
    netWeight: 'netWeight',
    grossWeight: 'grossWeight',
    dimension: 'dimension',
    weightUnit: 'weightUnit',
    measurementUnit: 'measurementUnit',
    items: 'items',
    marks: 'marks'
};

const DOCUMENT_TYPE = 'PL';

const PackingListProducts = React.memo(function PackingListProducts(
    { packingList, setPackingList, shipmentId, setStep }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const companyId = useSelector(selectCompanyId);
    const userId = useSelector(selectCurrentUserId);

    const { register, control, getValues, setValue, errors, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [fieldNames.items]: packingList.items,
            [fieldNames.measurementUnit]: packingList.measurementUnit,
            [fieldNames.weightUnit]: packingList.weightUnit,
            [fieldNames.package]: packingList.package,
            [fieldNames.netWeight]: packingList.netWeight,
            [fieldNames.grossWeight]: packingList.grossWeight,
            [fieldNames.dimension]: packingList.dimension,
            [fieldNames.custom1]: packingList.custom1,
            [fieldNames.custom2]: packingList.custom2,
            [fieldNames.marks]: packingList.marks
        }
    });

    useEffect(() => {
        register({ name: fieldNames.items }, { validate: validateItemMeasures });
        register({ name: fieldNames.custom1 });
        register({ name: fieldNames.custom2 });
        register({ name: fieldNames.package });
        register({ name: fieldNames.netWeight });
        register({ name: fieldNames.grossWeight });
        register({ name: fieldNames.dimension });
    }, [register]);

    const onPrevClick = () => {
        setPackingList(prev => ({ ...prev, ...getValues() }));
        setStep('details');
    };

    const onSubmit = (data) => {
        const actualData = { ...packingList, ...data };
        actualData.type = DOCUMENT_TYPE;
        actualData.seller = companyId;
        actualData.sellerAdd = addressToDocAddress(actualData.sellerAdd);
        actualData.consigneeAdd = addressToDocAddress(actualData.consigneeAdd);
        if (actualData.shipAdd) actualData.shipAdd = addressToDocAddress(actualData.shipAdd);
        actualData.ciRef = actualData.ciRef.ref;
        actualData.createdBy = userId;
        dispatch(createDocument({ id: shipmentId, doc: actualData }));
        history.push(`/home/shipments/${ shipmentId }?tab=documents`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Typography variant="h5">{ titleLabel }</Typography>
            <RHFMeasureTable
                rhfRegister={ register }
                rhfControl={ control }
                rhfGetValues={ getValues }
                rhfSetValue={ setValue }
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

export default PackingListProducts;