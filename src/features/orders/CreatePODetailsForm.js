import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LANGUAGE } from '../../constants.js';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Grid, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { submitOrderDetails } from './duck/slice.js';
import { useHistory } from 'react-router-dom';
import { selectNewOrder, selectPOAutocompleteOptions } from './duck/selectors.js';
import CreatePOShippingInfo from './CreatePOShippingInfo.js';
import { makeStyles } from '@material-ui/core/styles';
import ThemedButton from '../shared/buttons/ThemedButton.js';

const {
  orderReferenceLabel,
  dateLabel,
  clientLabel,
  clientAddressLabel,
  crdLabel,
  incotermLabel,
  paymentMethodLabel,
  referenceLabel,
  remarksLabel,
  cancelButton,
  nextButton,
} = LANGUAGE.order.orderDetailsForm;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(20),
    marginRight: theme.spacing(20),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(15),
    paddingRight: theme.spacing(15),
  },
  field: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  buttons: {
    marginTop: theme.spacing(5),
  },
  buttonCancel: {
    width: '40%',
  },
  buttonNext: {
    width: '40%',
    backgroundColor: theme.palette.tertiary.light,
  },
}));

export default function CreatePODetailsForm({ setActiveStep }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const newOrder = useSelector(selectNewOrder);
  const { register, control, handleSubmit, watch, errors, setValue } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      poRef: newOrder.poRef,
      to: newOrder.to,
      toName: newOrder.toName,
      toAdd: newOrder.toAdd,
      date: newOrder.date.substr(0, 10),
      crd: newOrder.crd.substr(0, 10),
      incoterm: newOrder.incoterm,
      pay: newOrder.pay,
      remarks: newOrder.remarks,
      del: newOrder.del,
      pol: newOrder.pol,
      pod: newOrder.pod,
      carrier: newOrder.carrier
    },
  });

  const { customerMap } = useSelector(selectPOAutocompleteOptions);
  const chosenCustomer = watch('toName');
  const customerNames = Object.keys(customerMap);
  const chosenCustomerAddresses = () =>
      customerMap && customerMap.hasOwnProperty(chosenCustomer)
          ? customerMap[chosenCustomer].addresses
          : [];

  const onButtonNextClick = (data) => {
    data.to = customerMap[chosenCustomer].id;
    dispatch(submitOrderDetails(data));
    setActiveStep((prevStep) => prevStep + 1);
  };

  const onButtonCancelClick = () => history.goBack();

  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit(onButtonNextClick)} autoComplete="off">
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
          render={(props) => (
            <Autocomplete
              {...props}
              options={customerNames}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={clientLabel}
                  variant="standard"
                  error={!!errors.toName}
                  className={classes.field}
                />
              )}
              onChange={(_, data) => props.onChange(data)}
            />
          )}
          name="toName"
          control={control}
          rules={{ required: true }}
        />
        <Controller
          render={(props) => (
            <Autocomplete
              {...props}
              options={chosenCustomerAddresses()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={clientAddressLabel}
                  variant="standard"
                  error={!!errors.toAdd}
                  className={classes.field}
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
        <Grid container justify="space-around" className={classes.buttons}>
          <ThemedButton
            onClick={onButtonCancelClick}
            styles={classes.buttonCancel}
            text={cancelButton}
            variant="outlined"
          />
          <ThemedButton
            type="submit"
            styles={classes.buttonNext}
            text={nextButton}
          />
        </Grid>
      </form>
    </Paper>
  );
}
