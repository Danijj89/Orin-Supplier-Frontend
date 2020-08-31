import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectCurrentCompany, selectCurrentUser } from '../home/slice.js';
import { selectCIAutocompleteOptions } from './duck/selectors.js';
import { Controller, useForm } from 'react-hook-form';
import { TextField, Button, Grid } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { selectNewCI } from './duck/selectors.js';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../constants.js';
import { submitCIDetails } from './duck/slice.js';
import CreateCIAdditionalInfo from './CreateCIAdditionalInfo.js';
import { getFileName } from '../shared/utils.js';

const {
    invoiceNumber, invoiceDate, importer, importerAddress,
    exporter, exporterAddressLabel, countryOfManufacture, buttonCancel, buttonNext
} = LANGUAGE.commercialInvoice.createCIDetailsForm;

const useStyles = makeStyles({
    form: {
        padding: '24px 25%'
    },
    field: {
        margin: '10px 0'
    },
    buttons: {
        marginTop: '5%'
    },
    button: {
        width: '45%',
        height: '50%',
        margin: 'auto'
    }
})

export default function CreateOrderDetailsForm({ order }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const { _id: userId } = useSelector(selectCurrentUser);
    const {
        _id: companyId,
        names: exporterNames,
        address: exporterAddress,
        addresses: exporterAddresses
    } = useSelector(selectCurrentCompany);
    const { customerNames, customerAddressMap } = useSelector(selectCIAutocompleteOptions);
    const { ciRef, date, com, notes, scRef, paymentRef } = useSelector(selectNewCI);

    const { register, control, handleSubmit, watch, errors } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            ciRef,
            date: date.substr(0, 10),
            fromName: exporterNames[0],
            fromAdd: exporterAddress,
            to: order.from,
            toName: order.fromName,
            toAdd: order.fromAdd,
            com,
            pol: order.pol,
            pod: order.pod,
            notes,
            scRef,
            paymentRef
        }
    });

    const chosenCustomer = watch('toName', []);
    const chosenCustomerAddresses = () =>
        customerAddressMap.hasOwnProperty(chosenCustomer)
            ? customerAddressMap[chosenCustomer]
            : [];

    const onButtonNextClick = (data) => {
        data.createdBy = userId;
        data.from = companyId;
        data.fileName = getFileName('CI', data.ciRef, data.createdBy);
        dispatch(submitCIDetails(data));
    }

    const onButtonCancelClick = () => history.goBack();

    return (
        <form className={ classes.form } onSubmit={ handleSubmit(onButtonNextClick) } autoComplete="off">
            <TextField
                label={ invoiceNumber }
                type="text"
                name="ciRef"
                error={ !!errors.ciRef }
                inputRef={ register({ required: true }) }
                className={ classes.field }
                fullWidth
                autoFocus
            />
            <TextField
                label={ invoiceDate }
                type="date"
                name="date"
                error={ !!errors.date }
                inputRef={ register({ required: true }) }
                className={ classes.field }
                fullWidth
            />
            <Controller
                render={ props => (
                    <Autocomplete
                        freeSolo
                        autoSelect
                        { ...props }
                        options={ customerNames }
                        renderInput={ params => (
                            <TextField
                                { ...params }
                                label={ importer }
                                variant="standard"
                                error={ !!errors.toName }
                                className={ classes.field }
                            />
                        ) }
                        onChange={ (_, data) => props.onChange(data) }
                    />
                ) }
                name="toName"
                control={ control }
                rules={ { required: true } }
            />
            <Controller
                render={ props => (
                    <Autocomplete
                        freeSolo
                        autoSelect
                        { ...props }
                        options={ chosenCustomerAddresses() }
                        renderInput={ params => (
                            <TextField
                                { ...params }
                                label={ importerAddress }
                                variant="standard"
                                error={ !!errors.toAdd }
                                className={ classes.field }
                            />
                        ) }
                        onChange={ (_, data) => props.onChange(data) }
                    />
                ) }
                name="toAdd"
                control={ control }
                rules={ { required: true } }
            />
            <Controller
                render={ props => (
                    <Autocomplete
                        freeSolo
                        autoSelect
                        { ...props }
                        options={ exporterNames }
                        renderInput={ params => (
                            <TextField
                                { ...params }
                                label={ exporter }
                                variant="standard"
                                error={ !!errors.fromName }
                                className={ classes.field }
                            />
                        ) }
                        onChange={ (_, data) => props.onChange(data) }
                    />
                ) }
                name="fromName"
                control={ control }
                rules={ { required: true } }
            />
            <Controller
                render={ props => (
                    <Autocomplete
                        freeSolo
                        autoSelect
                        { ...props }
                        options={ exporterAddresses }
                        renderInput={ params => (
                            <TextField
                                { ...params }
                                label={ exporterAddressLabel }
                                variant="standard"
                                error={ !!errors.fromAdd }
                                className={ classes.field }
                            />
                        ) }
                        onChange={ (_, data) => props.onChange(data) }
                    />
                ) }
                name="fromAdd"
                control={ control }
                rules={ { required: true } }
            />
            <TextField
                label={ countryOfManufacture }
                type="text"
                name="com"
                inputRef={ register }
                className={ classes.field }
                fullWidth
            />
            <CreateCIAdditionalInfo register={ register } control={ control }/>
            <Grid
                container
                justify="space-around"
                className={ classes.buttons }
            >
                <Button
                    variant="outlined"
                    className={ classes.button }
                    onClick={ onButtonCancelClick }
                >
                    { buttonCancel }
                </Button>
                <Button
                    variant="contained"
                    className={ classes.button }
                    type="submit"
                >
                    { buttonNext }
                </Button>
            </Grid>
        </form>
    )
}