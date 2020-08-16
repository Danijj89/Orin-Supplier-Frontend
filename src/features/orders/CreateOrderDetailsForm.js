import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LANGUAGE } from '../../constants.js';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCompany, selectCurrentUser } from '../home/slice.js';
import CreateOrderShippingInfo from './CreateOrderShippingInfo.js';
import { submitOrderDetails } from './duck/slice.js';
import { useHistory } from 'react-router-dom';
import { selectNewOrderDetails, selectPOAutocompleteOptions } from './duck/selectors.js';

const {
    orderNumber, orderDate, from, fromAddress, crd, incoterm,
    paymentMethod, reference, remarks, buttonCancel, buttonNext
} = LANGUAGE.order.orderDetailsForm;

export default function CreateOrderDetailsForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(selectCurrentUser);
    const currentCompany = useSelector(selectCurrentCompany);

    const orderDetails = useSelector(selectNewOrderDetails);
    const { register, control, handleSubmit, watch, errors, formState } = useForm({
        mode: 'onBlur',
        defaultValues: {
            ...orderDetails,
            orderDate: orderDetails.orderDate.substr(0, 10),
            crd: orderDetails.crd.substr(0, 10)
        }
    });

    const { customers } = useSelector(selectPOAutocompleteOptions);
    const customerNames = customers.map(customer => customer.name);

    const chosenCustomer = watch('from', []);
    const chosenCustomerAddresses = chosenCustomer => {
        const customer = customers.find(customer => customer.name === chosenCustomer);
        return customer ? customer.addresses : [];
    }

    const onButtonNextClick = (data) => {
        data.createdBy = currentUser._id;
        data.company = currentCompany;
        dispatch(submitOrderDetails(data));
    }

    const onButtonCancelClick = () => {
        history.push('/home/orders');
    }

    return (
        <form className="order-details-form" onSubmit={handleSubmit(onButtonNextClick)} autoComplete="off">
            <TextField
                label={orderNumber}
                type="text"
                name="orderNumber"
                error={!!errors.orderNumber}
                inputRef={register({ required: true })}
                fullWidth
                autoFocus
                required
            />
            <TextField
                label={orderDate}
                type="date"
                name="orderDate"
                error={!!errors.orderDate}
                inputRef={register({ required: true })}
                fullWidth
                required
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
                                label={from}
                                variant="standard"
                                error={!!errors.from}
                                required
                            />
                        )}
                        onChange={(_, data) => props.onChange(data)}
                    />
                )}
                name="from"
                control={control}
                rules={{ required: true }}
            />
            <Controller
                render={props => (
                    <Autocomplete
                        freeSolo
                        autoSelect
                        {...props}
                        options={chosenCustomerAddresses(chosenCustomer)}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label={fromAddress}
                                variant="standard"
                                error={!!errors.fromAddress}
                                required
                            />
                        )}
                        onChange={(_, data) => props.onChange(data)}
                    />
                )}
                name="fromAddress"
                control={control}
                rules={{ required: true }}
            />
            <TextField
                label={crd}
                type="date"
                name="crd"
                inputRef={register}
                fullWidth
            />
            <TextField
                label={incoterm}
                type="text"
                name="incoterm"
                inputRef={register}
                fullWidth
            />
            <TextField
                label={paymentMethod}
                type="text"
                name="paymentMethod"
                inputRef={register}
                fullWidth
            />
            <TextField
                label={reference}
                type="text"
                name="reference"
                inputRef={register}
                fullWidth
            />
            <TextField
                label={remarks}
                type="text"
                name="remarks"
                inputRef={register}
                fullWidth
            />
            <CreateOrderShippingInfo register={register} control={control} />
            <div className="d-flex justify-content-around m-4">
                <Button
                    variant="outlined"
                    onClick={onButtonCancelClick}
                >
                    {buttonCancel}
                </Button>
                <Button
                    variant="contained"
                    disabled={!formState.isValid}
                    type="submit"
                >
                    {buttonNext}
                </Button>
            </div>
        </form>
    )
}
