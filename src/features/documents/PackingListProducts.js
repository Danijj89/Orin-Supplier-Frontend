import React, { useEffect } from 'react';
import RHFMeasureTable, { validateItemMeasures } from '../shared/rhf/forms/RHFMeasureTable.js';
import { useForm } from 'react-hook-form';
import Footer from '../shared/components/Footer.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import {
    addressToDocAddress, tableItemsToItems
} from '../shared/utils/entityConversion.js';
import { selectSessionUserCompanyId, selectSessionUserId } from 'app/duck/selectors.js';
import { createDocument, updateDocument } from '../shipments/duck/thunks.js';
import { useHistory } from 'react-router-dom';
import { getOptionId } from 'app/utils/options/getters.js';
import Title5 from 'features/shared/display/Title5.js';
import { makeStyles } from '@material-ui/core/styles';
import { getDocumentUrl } from 'features/documents/utils/urls.js';


const {
    titleLabel,
    prevButtonLabel,
    nextButtonLabel
} = LANGUAGE.documents.pl.products;

const useStyles = makeStyles((theme) => ({
    title: {
        padding: theme.spacing(2),
    }
}));

const fieldNames = {
    custom1: 'plCustom1',
    custom2: 'plCustom2',
    weightUnit: 'weightUnit',
    measurementUnit: 'measurementUnit',
    items: 'items',
    marks: 'marks'
};

const DOCUMENT_TYPE = 'PL';

const PackingListProducts = React.memo(function PackingListProducts(
    { packingList, setPackingList, shipmentId, documentId, isEdit }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const companyId = useSelector(selectSessionUserCompanyId);
    const userId = useSelector(selectSessionUserId);

    const { register, control, getValues, setValue, errors, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [fieldNames.items]: packingList.items,
            [fieldNames.measurementUnit]: packingList.measurementUnit,
            [fieldNames.weightUnit]: packingList.weightUnit,
            [fieldNames.custom1]: packingList.custom1,
            [fieldNames.custom2]: packingList.custom2,
            [fieldNames.marks]: packingList.marks
        }
    });

    useEffect(() => {
        register({ name: fieldNames.items }, { validate: validateItemMeasures });
        register({ name: fieldNames.custom1 });
        register({ name: fieldNames.custom2 });
    }, [register]);

    const onPrevClick = () => {
        setPackingList(prev => ({ ...prev, ...getValues() }));
        const urlOptions = {
            edit: isEdit,
            step: 'details'
        };
        if (isEdit) urlOptions.document = documentId;
        history.push(getDocumentUrl('PL', shipmentId, urlOptions));
    };

    const onSubmit = (data) => {
        const document = { ...packingList, ...data };
        document.type = DOCUMENT_TYPE;
        document.seller = companyId;
        document.sellerAdd = addressToDocAddress(document.sellerAdd);
        document.consigneeAdd = addressToDocAddress(document.consigneeAdd);
        if (document.shipAdd) document.shipAdd = addressToDocAddress(document.shipAdd);
        document.weightUnit = getOptionId(document.weightUnit);
        document.measurementUnit = getOptionId(document.measurementUnit);
        document.createdBy = userId;
        document.items = tableItemsToItems(document.items);
        if (isEdit) dispatch(updateDocument({ shipmentId, documentId, update: document }));
        else dispatch(createDocument({ shipmentId, document }));
        history.push(`/home/shipments/${ shipmentId }?tab=documents`);
    };

    return (
        <form onSubmit={ handleSubmit(onSubmit) } autoComplete="off">
            <Title5 className={classes.title} title={ titleLabel }/>
            <RHFMeasureTable
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
    );
});

export default PackingListProducts;