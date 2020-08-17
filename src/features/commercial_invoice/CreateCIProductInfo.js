import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentDefaults } from '../home/slice.js';
import { FormControl, InputLabel, MenuItem, Select, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../constants.js';
import { selectCIAutocompleteOptions } from './duck/selectors.js';
import CreateCIOrderSelector from './CreateCIOrderSelector.js';

const { currencyLabel } = LANGUAGE.commercialInvoice.createCIProductInfo;

const useStyles = makeStyles((theme) => ({
    orderSelector: {
        marginTop: 10,
        marginBottom: 10
    },
    currenciesDropdown: {
        minWidth: 120,
        width: 160,
        marginTop: 10,
        marginBottom: 10
    }
}));

export default function CreateCIProductInfo() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { search } = useLocation();
    const currOrderId = new URLSearchParams(search).get('order');
    const { ordersRef, orderItemMap } = useSelector(selectCIAutocompleteOptions);
    const fixedOrderOptions = [Object.entries(orderItemMap).find(([key, value]) => value._id === currOrderId)[0]];
    const [orderOptions, setOrderOptions] = useState([...ordersRef.filter(ref => !fixedOrderOptions.includes(ref))]);
    const [orders, setOrders] = useState([...fixedOrderOptions]);


    const { currencies } = useSelector(selectCurrentDefaults);
    const [currency, setCurrency] = useState(currencies[0]);
    const onCurrencyChange = (event) => setCurrency(event.target.value);
    // const [isDialogOpen, setIsDialogOpen] = useState(false);
    // const productInfo = useSelector(selectNewOrderProductInfo);
    // const columns = productInfo.columns;
    // const currCurrency = productInfo.currency;
    //
    // const onCurrencyChange = (newCurrency) => dispatch(changeCurrency(newCurrency))
    //
    // const onDialogOpen = () => {
    //     if (columns.length < 8) {
    //         setIsDialogOpen(true);
    //     } else {
    //         alert(maxColumnError);
    //     }
    // }
    // const onDialogClose = () => setIsDialogOpen(false);
    // const [newColumnName, setNewColumnName] = useState('');
    // const onButtonAddColumnClick = () => {
    //     dispatch(addColumn(newColumnName));
    //     setNewColumnName('');
    //     onDialogClose();
    // }
    //
    // const onButtonOrderDetailsClick = () => dispatch(prevStep());
    //
    // const onButtonReviewClick = async () => {
    //     dispatch(nextStep());
    //     dispatch(submitOrderForPreview());
    // };

    return (
        <Grid container>
            <Grid item className={classes.orderSelector} xs={12}>
                <CreateCIOrderSelector
                    orders={orders}
                    orderOptions={orderOptions}
                    fixedOrderOptions={fixedOrderOptions}
                    setOrderOptions={setOrderOptions}
                    setOrders={setOrders}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.currenciesDropdown}>
                    <InputLabel id="currencies-dropdown">{currencyLabel}</InputLabel>
                    <Select
                        labelId="currencies-dropdown"
                        value={currency}
                        onChange={onCurrencyChange}
                        label={currencyLabel}
                    >
                        {currencies.map((choice) =>
                            <MenuItem key={choice} value={choice}>{choice}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Grid>

                {/*<Button variant="outlined" onClick={onDialogOpen}>{buttonAddColumn}</Button>*/}
                {/*<Dialog onClose={onDialogClose} open={isDialogOpen}>*/}
                {/*    <DialogTitle id="simple-dialog-title">{addColumnDialog}</DialogTitle>*/}
                {/*    <DialogContent>*/}
                {/*        <TextField*/}
                {/*            autoFocus*/}
                {/*            fullWidth*/}
                {/*            margin="dense"*/}
                {/*            type="text"*/}
                {/*            label={addColumnDialog}*/}
                {/*            value={newColumnName}*/}
                {/*            onChange={(e) => setNewColumnName(e.target.value)}*/}
                {/*        />*/}
                {/*    </DialogContent>*/}
                {/*    <DialogActions>*/}
                {/*        <Button onClick={onDialogClose} color="primary" variant="outlined">*/}
                {/*            {dialogButtonCancel}*/}
                {/*        </Button>*/}
                {/*        <Button onClick={onButtonAddColumnClick} color="primary" variant="outlined">*/}
                {/*            {buttonAddColumn}*/}
                {/*        </Button>*/}
                {/*    </DialogActions>*/}
                {/*</Dialog>*/}
            {/*<CreateOrderProductInfoTable />*/}
            {/*<div className="d-flex justify-content-around m-4">*/}
            {/*    <Button variant="outlined" onClick={onButtonOrderDetailsClick}>{buttonOrderDetails}</Button>*/}
            {/*    <Button variant="contained" onClick={onButtonReviewClick}>{buttonReview}</Button>*/}
            {/*</div>*/}
        </Grid>
    )
}