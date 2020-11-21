import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormContainer from '../shared/wrappers/FormContainer.js';
import RHFCheckBox from '../shared/rhf/inputs/RHFCheckBox.js';
import SideTextField from '../shared/inputs/SideTextField.js';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import { formatAddress } from '../shared/utils/format.js';
import SideTextArea from '../shared/inputs/SideTextArea.js';
import { LANGUAGE } from '../../app/constants.js';
import { useForm } from 'react-hook-form';
import { findAddressFromAddresses } from '../shared/utils/addresses.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyActiveAddresses } from '../home/duck/selectors.js';
import { selectClientActiveAddresses, selectClientById } from '../clients/duck/selectors.js';
import { selectShipmentCommercialInvoices } from '../shipments/duck/selectors.js';
import { useHistory } from 'react-router-dom';
import Footer from '../shared/components/Footer.js';

const {
    titleLabel,
    formLabels,
    prevButtonLabel,
    nextButtonLabel
} = LANGUAGE.documents.pl.details;

const fieldNames = {
    autoGenerateRef: 'autoGenerateRef',
    ref: 'ref',
    sellerAdd: 'sellerAdd',
    consigneeAdd: 'consigneeAdd',
    ciRef: 'ciRef',
    notes: 'notes'
};

const PackingListDetails = React.memo(function PackingListDetails(
    { packingList, setPackingList, shipmentId, setStep }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const companyAddresses = useSelector(selectCompanyActiveAddresses);
    const consignee = useSelector(state => selectClientById(state, packingList.consignee));
    const consigneeAddresses = useSelector(state => selectClientActiveAddresses(state, packingList.consignee));
    const commercialInvoices = useSelector(state => selectShipmentCommercialInvoices(state, shipmentId));

    const { register, control, errors, watch, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [fieldNames.autoGenerateRef]: packingList.autoGenerateRef,
            [fieldNames.ref]: packingList.ref,
            [fieldNames.sellerAdd]: findAddressFromAddresses(packingList.sellerAdd, companyAddresses),
            [fieldNames.consigneeAdd]: findAddressFromAddresses(packingList.consigneeAdd, consigneeAddresses),
            [fieldNames.ciRef]: commercialInvoices.length ? commercialInvoices[0] : null,
            [fieldNames.notes]: packingList.notes
        }
    });

    const autoGenerateRef = watch(fieldNames.autoGenerateRef);

    const onPrevClick = () =>
        history.push(`/home/shipments/${ shipmentId }`);


    const onNextClick = (data) => {
        setPackingList(prev => ({ ...prev, ...data }));
        setStep('products');
    };

    return (
        <form onSubmit={ handleSubmit(onNextClick) } autoComplete="off">
            <Typography variant="h5">{ titleLabel }</Typography>
            <FormContainer>
                <RHFCheckBox
                    name={ fieldNames.autoGenerateRef }
                    label={ formLabels.autoGenerateRef }
                    rhfControl={ control }
                />
                <SideTextField
                    name={ fieldNames.ref }
                    label={ formLabels.ref }
                    inputRef={ register }
                    error={ !!errors[fieldNames.ref] }
                    required={ !autoGenerateRef }
                    disabled={ autoGenerateRef }
                />
                <RHFAutoComplete
                    rhfControl={ control }
                    name={ fieldNames.sellerAdd }
                    label={ formLabels.sellerAdd }
                    options={ companyAddresses }
                    error={ !!errors[fieldNames.sellerAdd] }
                    getOptionLabel={ formatAddress }
                    getOptionSelected={ (option, value) => option._id === value._id }
                    rowsMax={ 8 }
                    required
                />
                <SideTextField
                    label={ formLabels.consignee }
                    value={ consignee.name }
                    disabled
                />
                <RHFAutoComplete
                    rhfControl={ control }
                    name={ fieldNames.consigneeAdd }
                    label={ formLabels.consigneeAdd }
                    options={ consigneeAddresses }
                    error={ !!errors[fieldNames.consigneeAdd] }
                    getOptionLabel={ formatAddress }
                    getOptionSelected={ (option, value) => option._id === value._id }
                    rowsMax={ 8 }
                    required
                />
                <RHFAutoComplete
                    rhfControl={ control }
                    name={ fieldNames.ciRef }
                    label={ formLabels.ciRef }
                    options={ commercialInvoices }
                    getOptionLabel={ option => option.ref }
                    getOptionSelected={ (option, value) => option._id === value._id }
                />
                <SideTextArea
                    label={ formLabels.notes }
                    name={ fieldNames.notes }
                    inputRef={ register }
                    rows={ 4 }
                    rowsMax={ 8 }
                />
            </FormContainer>
            <Footer
                prevLabel={ prevButtonLabel }
                nextLabel={ nextButtonLabel }
                onPrevClick={ onPrevClick }
                nextButtonType="submit"
            />
        </form>
    )
});

export default PackingListDetails;