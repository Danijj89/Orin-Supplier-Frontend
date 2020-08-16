import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { LANGUAGE } from '../../constants.js';
import { useDispatch, useSelector } from 'react-redux';
import {
    addColumn,
    changeCurrency, nextStep,
    prevStep,
} from './duck/slice.js';
import './styles.css';
import CreateOrderProductInfoTable from './CreateOrderProductInfoTable.js';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {
    selectPOAutocompleteOptions,
    selectNewOrderProductInfo
} from './duck/selectors.js';
import { submitOrderForPreview } from './duck/thunks.js';
import { selectCurrentDefaults } from '../home/slice.js';

const { currency, buttonOrderDetails, buttonReview,
    buttonAddColumn, addColumnDialog, dialogButtonCancel, maxColumnError } = LANGUAGE.orderProductInfo;

export default function CreateOrderProductInfo() {
    const dispatch = useDispatch();
    const { currencies } = useSelector(selectCurrentDefaults);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const productInfo = useSelector(selectNewOrderProductInfo);
    const columns = productInfo.columns;
    const currCurrency = productInfo.currency;

    const onCurrencyChange = (newCurrency) => dispatch(changeCurrency(newCurrency))

    const onDialogOpen = () => {
        if (columns.length < 8) {
            setIsDialogOpen(true);
        } else {
            alert(maxColumnError);
        }
    }
    const onDialogClose = () => setIsDialogOpen(false);
    const [newColumnName, setNewColumnName] = useState('');
    const onButtonAddColumnClick = () => {
        dispatch(addColumn(newColumnName));
        setNewColumnName('');
        onDialogClose();
    }

    const onButtonOrderDetailsClick = () => dispatch(prevStep());

    const onButtonReviewClick = async () => {
        dispatch(nextStep());
        dispatch(submitOrderForPreview());
    };

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="order-currency-dropdown">
                    <Autocomplete
                        options={currencies}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label={currency}
                                variant="outlined"
                                size="small"
                            />
                        )}
                        onChange={(_, data) => onCurrencyChange(data)}
                        value={currCurrency}
                    />
                </div>
                <Button variant="outlined" onClick={onDialogOpen}>{buttonAddColumn}</Button>
                <Dialog onClose={onDialogClose} open={isDialogOpen}>
                    <DialogTitle id="simple-dialog-title">{addColumnDialog}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            fullWidth
                            margin="dense"
                            type="text"
                            label={addColumnDialog}
                            value={newColumnName}
                            onChange={(e) => setNewColumnName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onDialogClose} color="primary" variant="outlined">
                            {dialogButtonCancel}
                        </Button>
                        <Button onClick={onButtonAddColumnClick} color="primary" variant="outlined">
                            {buttonAddColumn}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <CreateOrderProductInfoTable />
            <div className="d-flex justify-content-around m-4">
                <Button variant="outlined" onClick={onButtonOrderDetailsClick}>{buttonOrderDetails}</Button>
                <Button variant="contained" onClick={onButtonReviewClick}>{buttonReview}</Button>
            </div>
        </div>
    )
}