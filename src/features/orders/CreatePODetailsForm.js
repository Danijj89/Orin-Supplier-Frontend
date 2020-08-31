import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LANGUAGE } from '../../constants.js';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Button, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCompany, selectCurrentUser } from '../home/slice.js';
import { submitOrderDetails } from './duck/slice.js';
import { useHistory } from 'react-router-dom';
import { selectNewPO, selectPOAutocompleteOptions } from './duck/selectors.js';
import CreatePOShippingInfo from './CreatePOShippingInfo.js';
import { getFileName } from '../shared/utils.js';
import { makeStyles } from '@material-ui/core/styles';

const { orderReferenceLabel, dateLabel, clientLabel, clientAddressLabel,
crdLabel, incotermLabel, paymentMethodLabel, referenceLabel, remarksLabel,
cancelButton, nextButton } = LANGUAGE.order.orderDetailsForm;

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

export default function CreatePODetailsForm({ setActiveStep }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { _id: userId } = useSelector(selectCurrentUser);
    const { _id: companyId, names, address } = useSelector(selectCurrentCompany);

    const { poRef, fromName, fromAdd, date,
        crd, incoterm, pay, orderRef, remarks, del, pol, pod, carrier } = useSelector(selectNewPO);
    const { register, control, handleSubmit, watch, errors, formState } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            poRef,
            fromName,
            fromAdd,
            date: date.substr(0, 10),
            crd: crd.substr(0, 10),
            incoterm,
            pay,
            orderRef,
            remarks,
            del,
            pol,
            pod,
            carrier
        }
    });

    const { customerNames, customerAddressMap } = useSelector(selectPOAutocompleteOptions);
    const chosenCustomer = watch('fromName', []);
    const chosenCustomerAddresses = () =>
        customerAddressMap.hasOwnProperty(chosenCustomer)
            ? customerAddressMap[chosenCustomer]
            : [];

    const onButtonNextClick = (data) => {
        data.createdBy = userId;
        data.to = companyId;
        data.toName = names[0];
        data.toAdd = address;
        data.fileName = getFileName('PO', data.poRef, data.createdBy);
        dispatch(submitOrderDetails(data));
        setActiveStep(prevStep => prevStep + 1);
    }

    const onButtonCancelClick = () => history.goBack();

    return (
        <form className={classes.form} onSubmit={handleSubmit(onButtonNextClick)} autoComplete="off">
            <TextField
                label={orderReferenceLabel}
                type="text"
                name="poRef"
                error={!!errors.poRef}
                inputRef={register({ required: true })}
                className={classes.field}
                fullWidth
                autoFocus
            />
            <TextField
                label={dateLabel}
                type="date"
                name="date"
                error={!!errors.date}
                inputRef={register({ required: true })}
                className={classes.field}
                fullWidth
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
                                label={clientLabel}
                                variant="standard"
                                error={!!errors.fromName}
                                className={classes.field}
                            />
                        )}
                        onChange={(_, data) => props.onChange(data)}
                    />
                )}
                name="fromName"
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
                                label={clientAddressLabel}
                                variant="standard"
                                error={!!errors.fromAdd}
                                className={classes.field}
                            />
                        )}
                        onChange={(_, data) => props.onChange(data)}
                    />
                )}
                name="fromAdd"
                control={control}
                rules={{ required: true }}
            />
            <TextField
                label={crdLabel}
                type="date"
                name="crd"
                inputRef={register}
                className={classes.field}
                fullWidth
            />
            <TextField
                label={incotermLabel}
                type="text"
                name="incoterm"
                inputRef={register}
                className={classes.field}
                fullWidth
            />
            <TextField
                label={paymentMethodLabel}
                type="text"
                name="pay"
                inputRef={register}
                className={classes.field}
                fullWidth
            />
            <TextField
                label={referenceLabel}
                type="text"
                name="orderRef"
                inputRef={register}
                className={classes.field}
                fullWidth
            />
            <TextField
                label={remarksLabel}
                type="text"
                name="remarks"
                inputRef={register}
                className={classes.field}
                fullWidth
            />
            <CreatePOShippingInfo register={register} control={control} />
            <Grid
                container
                justify="space-between"
                className={classes.buttons}
            >
                <Button
                    variant="outlined"
                    onClick={onButtonCancelClick}
                    className={classes.button}
                >
                    {cancelButton}
                </Button>
                <Button
                    variant="contained"
                    className={classes.button}
                    type="submit"
                >
                    {nextButton}
                </Button>
            </Grid>
        </form>
    )
}
