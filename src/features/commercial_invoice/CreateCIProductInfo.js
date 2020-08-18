import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentDefaults } from '../home/slice.js';
import { FormControl, InputLabel, MenuItem, Select, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../constants.js';
import { selectCIAutocompleteOptions, selectNewCI } from './duck/selectors.js';
import CreateCIOrderSelector from './CreateCIOrderSelector.js';
import { defaultRowValues, nextStep, prevStep } from './duck/slice.js';
import CreateCIProductTable from './CreateCIProductTable.js';

const { currencyLabel, buttonNext, buttonPrev } = LANGUAGE.commercialInvoice.createCIProductInfo;

const useStyles = makeStyles((theme) => ({
    row: {
        marginTop: 10,
        marginBottom: 10
    },
    currenciesDropdown: {
        minWidth: 120,
        width: 160
    }
}));

export default function CreateCIProductInfo() {
    const classes = useStyles();
    const dispatch = useDispatch();

    // Order Selector logic
    const { search } = useLocation();
    const currOrderId = new URLSearchParams(search).get('order');
    const { orderItemMap } = useSelector(selectCIAutocompleteOptions);
    // Get the poRef of the current order and put it in the fixed order option
    const currOrderRef = Object.entries(orderItemMap).find(([key, value]) => value._id === currOrderId)[0];
    const [orders, setOrders] = useState([currOrderRef]);

    // Currency dropdown
    const { currencies } = useSelector(selectCurrentDefaults);
    const [currency, setCurrency] = useState(currencies[0]);
    const onCurrencyChange = (event) => setCurrency(event.target.value);

    // table default values
    const { headers : defaultHeaders } = useSelector(selectNewCI);
    const [headers, setHeaders] = useState(defaultHeaders);

    const addOrderItemsToRows = (rows, orderRef) => {
        const items = orderItemMap[orderRef].items;
        const newRows = {
            [orderRef]: [],
            ...rows
        };
        items.forEach(item => newRows[orderRef].push([
            item.ref,
            item.description,
            '',
            '',
            item.quantity,
            item.unit,
            item.price,
            item.total
        ]));
        return newRows;
    }

    const [rows, setRows] = useState(currOrderRef
        ? addOrderItemsToRows({ custom: [] }, currOrderRef)
        : { custom: [defaultRowValues] });
    const flattenRows = rows => [].concat.apply([], Object.entries(rows).map(([key, value]) => value));
    const [flattenedRows, setFlattenedRows] = useState(flattenRows(rows));
    const computeRowsForChosenOrders = (newRefs) => {
        const removed = orders.filter(order => !newRefs.includes(order));
        const added = newRefs.filter(ref => !orders.includes(ref));
        if (removed?.length) {
            const toRemove = removed[0];
            const { [toRemove]: omit, ...remainingRows } = rows;
            return remainingRows;
        } else {
            return addOrderItemsToRows(rows, added[0]);
        }
    }

    useEffect(() => {
        setFlattenedRows(flattenRows(rows))
    }, [rows]);

    const onChosenOrderChange = (newOptions) => {
        setRows(computeRowsForChosenOrders(newOptions));
        setOrders(newOptions);
    }

    const onRowAddButtonClick = () => {
        const custom = rows.custom;
        const newCustom = [...custom, defaultRowValues];
        setRows({
            ...rows,
            custom: newCustom
        });
    };


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
    const onButtonOrderDetailsClick = () => dispatch(prevStep());

    const onButtonReviewClick = async () => {
        dispatch(nextStep());
        // dispatch(submitOrderForPreview());
    };

    return (
        <Grid container>
            <Grid item className={classes.row} xs={12}>
                <CreateCIOrderSelector
                    orders={orders}
                    currOrderRef={currOrderRef}
                    onChosenOrderChange={onChosenOrderChange}
                />
            </Grid>
            <Grid item xs={12} className={classes.row}>
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
            <CreateCIProductTable
                currency={currency}
                headers={headers}
                setHeaders={setHeaders}
                rows={flattenedRows}
                setRows={setRows}
            />
            <Grid item xs={12}>
                <Button variant="outlined" onClick={onRowAddButtonClick}>Add</Button>
            </Grid>
            <Grid
                container
                item
                className={classes.row}
                justify="space-around"
                xs={12}
            >
                <Button variant="outlined" onClick={onButtonOrderDetailsClick}>{buttonPrev}</Button>
                <Button variant="contained" onClick={onButtonReviewClick}>{buttonNext}</Button>
            </Grid>
        </Grid>
    )
}