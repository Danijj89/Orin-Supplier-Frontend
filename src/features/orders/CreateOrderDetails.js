import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LANGUAGE } from '../../constants.js';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { cleanNewOrder, submitOrderDetails } from './duck/slice.js';
import { useHistory } from 'react-router-dom';
import CreatePOShippingInfo from './CreatePOShippingInfo.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { dateToYYMMDD, formatAddress } from '../shared/utils/format.js';
import { selectCurrentCompany } from '../../app/duck/selectors.js';
import FormContainer from '../shared/wrappers/FormContainer.js';
import SideTextField from '../shared/inputs/SideTextField.js';
import SideAutoComplete from '../shared/inputs/SideAutoComplete.js';
import { makeStyles } from '@material-ui/core/styles';
import useSessionStorage from '../shared/hooks/useSessionStorage.js';
import { SESSION_NEW_ORDER } from '../../app/sessionKeys.js';
import { selectNewOrder } from './duck/selectors.js';
import { selectAllClients } from '../clients/duck/selectors.js';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '70%'
    }
}));

const {
    orderReferenceLabel,
    dateLabel,
    companyAddressLabel,
    clientLabel,
    clientAddressLabel,
    crdLabel,
    incotermLabel,
    paymentMethodLabel,
    remarksLabel,
    cancelButton,
    nextButton,
} = LANGUAGE.order.createOrder.createOrderDetails;

export default function CreateOrderDetails({ setActiveStep, company }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const newOrder = useSelector(selectNewOrder);
    const [order, setOrder] = useSessionStorage(SESSION_NEW_ORDER, newOrder);
    const { addresses } = company;

    const { register, control, handleSubmit, watch, errors, getValues } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            ref: order.ref,
            from: order.from,
            fromAdd: order.fromAdd,
            to: order.to || null,
            toAdd: order.toAdd || null,
            date: dateToYYMMDD(order.date),
            crd: dateToYYMMDD(order.crd),
            incoterm: order.incoterm,
            pay: order.pay,
            notes: order.notes,
            del: order.del,
            pol: order.pol,
            pod: order.pod,
            carrier: order.carrier
        },
    });

    const chosenClient = watch('to');
    const clients = [];
    const chosenClientAddresses = () =>
        clients.find(client => client._id === chosenClient?._id)?.addresses || [];


    const onButtonNextClick = (data) => {
        // data.to = customerMap[chosenCustomer].id;
        // dispatch(submitOrderDetails(data));
        // setActiveStep((prevStep) => prevStep + 1);
    };

    const onButtonCancelClick = () => {
        // dispatch(cleanNewOrder());
        // history.goBack();
    }

    return (
        <FormContainer className={ classes.container }>
            <SideTextField
                label={ orderReferenceLabel }
                name="ref"
                error={ !!errors.ref }
                inputRef={ register({ required: true }) }
                required
                fullWidth
                autoFocus
            />
            <SideTextField
                label={ dateLabel }
                type="date"
                name="date"
                error={ !!errors.date }
                inputRef={ register({ required: true }) }
                required
                fullWidth
            />
            <Controller
                render={ (props) =>
                    <SideAutoComplete
                        { ...props }
                        options={ addresses }
                        label={ companyAddressLabel }
                        error={ !!errors.fromAdd }
                        getOptionLabel={ address => formatAddress(address) }
                        getOptionSelected={ address => address._id === getValues('fromAdd')._id }
                        required
                    />
                }
                name="fromAdd"
                control={ control }
                rules={ { required: true } }
            />
            <Controller
                render={ (props) =>
                    <SideAutoComplete
                        { ...props }
                        options={ clients }
                        label={ clientLabel }
                        error={ !!errors.to }
                        getOptionLabel={ client => client.name }
                        getOptionSelected={ client => client._id === getValues('to')._id }
                        required
                    />
                }
                name="to"
                control={ control }
                rules={ { required: true } }
            />
            <Controller
                render={ (props) => (
                    <SideAutoComplete
                        { ...props }
                        options={ chosenClientAddresses() }
                        label={ clientAddressLabel }
                        error={ !!errors.toAdd }
                        getOptionLabel={ address => formatAddress(address) }
                        getOptionSelected={ client => client._id === getValues('toAdd')._id }
                        required
                    />
                ) }
                name="toAdd"
                control={ control }
                rules={ { required: true } }
            />
        </FormContainer>
    );
}



// <TextField
//     label={ crdLabel }
//     type="date"
//     name="crd"
//     inputRef={ register }
//     className={ classes.field }
//     fullWidth
// />
// <TextField
//     label={ incotermLabel }
//     type="text"
//     name="incoterm"
//     inputRef={ register }
//     className={ classes.field }
//     fullWidth
// />
// <TextField
//     label={ paymentMethodLabel }
//     type="text"
//     name="pay"
//     inputRef={ register }
//     className={ classes.field }
//     fullWidth
// />
// <TextField
//     label={ remarksLabel }
//     type="text"
//     name="remarks"
//     inputRef={ register }
//     className={ classes.field }
//     fullWidth
// />
// <CreatePOShippingInfo register={ register } control={ control }/>
// <ThemedButton
//     onClick={ onButtonCancelClick }
//     text={ cancelButton }
// />
// <ThemedButton
//     type="submit"
//
//     text={ nextButton }
// />