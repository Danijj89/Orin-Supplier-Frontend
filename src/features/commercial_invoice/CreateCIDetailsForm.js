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

const { invoiceNumber, invoiceDate, importer, importerAddress,
    exporter, exporterAddress, countryOfManufacture,
    additionalNotes, buttonCancel, buttonNext } = LANGUAGE.commercialInvoice.createCIDetailsForm;

const useStyles = makeStyles({
    form: {
        padding: '24px 25%'
    },
    field: {
        margin: '10px 0'
    },
    buttons: {
        marginTop: 20
    }
})

export default function CreateOrderDetailsForm() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { _id: userId } = useSelector(selectCurrentUser);
    const { _id: companyId, name, address, addresses } = useSelector(selectCurrentCompany);
    const { customerNames, customerAddressMap } = useSelector(selectCIAutocompleteOptions);
    const { ciRef, to, toAdd, date, com, notes } = useSelector(selectNewCI);

    const { register, control, handleSubmit, watch, errors, formState } = useForm({
        mode: 'onBlur',
        defaultValues: {
            ciRef,
            date: date.substr(0, 10),
            from: name,
            fromAdd: address,
            to,
            toAdd,
            com,
            notes
        }
    });

    const chosenCustomer = watch('to', []);
    const chosenCustomerAddresses = () =>
        customerAddressMap.hasOwnProperty(chosenCustomer)
            ? customerAddressMap[chosenCustomer]
            : [];

    const onButtonNextClick = (data) => {
        data.createdBy = userId;
        data.companyId = companyId;
        dispatch(submitCIDetails(data));
    }

    const onButtonCancelClick = () => history.goBack();


    return (
        <form className={classes.form} onSubmit={handleSubmit(onButtonNextClick)} autoComplete="off">
            <TextField
                label={invoiceNumber}
                type="text"
                name="ciRef"
                error={!!errors.ciRef}
                inputRef={register({ required: true })}
                className={classes.field}
                fullWidth
                autoFocus
                required
            />
            <TextField
                label={invoiceDate}
                type="date"
                name="date"
                error={!!errors.date}
                inputRef={register({ required: true })}
                className={classes.field}
                fullWidth
                required
            />
            <TextField
                label={importer}
                type="text"
                name="from"
                inputRef={register({ required: true })}
                className={classes.field}
                fullWidth
                disabled
            />
            <Controller
                render={props => (
                    <Autocomplete
                        freeSolo
                        autoSelect
                        {...props}
                        options={addresses}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label={importerAddress}
                                variant="standard"
                                error={!!errors.fromAdd}
                                required
                            />
                        )}
                        onChange={(_, data) => props.onChange(data)}
                    />
                )}
                name="fromAdd"
                control={control}
                rules={{ required: true }}
            />
            <Controller
                render={props => (
                    <Autocomplete
                        freeSolo
                        autoSelect
                        {...props}
                        options={customerNames}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label={exporter}
                                variant="standard"
                                error={!!errors.to}
                                className={classes.field}
                                required
                            />
                        )}
                        onChange={(_, data) => props.onChange(data)}
                    />
                )}
                name="to"
                control={control}
                rules={{ required: true }}
            />
            <Controller
                render={props => (
                    <Autocomplete
                        freeSolo
                        autoSelect
                        {...props}
                        options={chosenCustomerAddresses()}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label={exporterAddress}
                                variant="standard"
                                error={!!errors.toAdd}
                                className={classes.field}
                                required
                            />
                        )}
                        onChange={(_, data) => props.onChange(data)}
                    />
                )}
                name="toAdd"
                control={control}
                rules={{ required: true }}

            />
            <TextField
                label={countryOfManufacture}
                type="text"
                name="com"
                inputRef={register}
                className={classes.field}
                fullWidth
            />
            <TextField
                label={additionalNotes}
                type="text"
                name="notes"
                inputRef={register}
                className={classes.field}
                fullWidth
            />
            {/*<CreateOrderShippingInfo register={register} control={control} />*/}
            <Grid
                container
                justify="space-around"
                className={classes.buttons}
            >
                <Grid item>
                    <Button
                        variant="outlined"
                        onClick={onButtonCancelClick}
                    >
                        {buttonCancel}
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        disabled={!formState.isValid}
                        type="submit"
                    >
                        {buttonNext}
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}