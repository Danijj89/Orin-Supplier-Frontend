import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle,
    FormControl, MenuItem, Select, InputLabel, DialogContent, DialogContentText } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentDefaults } from '../../home/slice.js';
import { LANGUAGE } from '../../../constants.js';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { startNewCI } from '../../commercial_invoice/duck/thunks.js';
import { startNewPL } from '../../packing_list/duck/thunks.js';

const { buttonText, dialogCancel, dialogConfirm, dialogTitle, typeLabel, errors } = LANGUAGE.shared.generateDocumentButton;
const { documentNames } = LANGUAGE.defaults;

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%'
    },
    error: {
        color: 'red',
        fontSize: '0.9em'
    }
}));

export default function DocumentGenerationButton({styles, order}) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { docTypes: documentTypes } = useSelector(selectCurrentDefaults);
    const [document, setDocument] = useState(documentTypes[0]);
    const { _id: orderId } = order;
    const [error, setError] = useState('');

    const onDialogOpen = () => setIsDialogOpen(true);
    const onDialogClose = () => setIsDialogOpen(false);
    const onDocumentTypeChange = (event) => {
        setError('');
        setDocument(event.target.value);
    }

    const handleGenerate = async () => {
        switch (document) {
            case 'CI':
                if (order.documents.hasOwnProperty('CI')) return setError(errors.ciExists);
                else dispatch(startNewCI(orderId));
                break;
            case 'PL':
                if (!order.documents.hasOwnProperty('CI')) return setError(errors.ciFirst);
                else if (order.documents.hasOwnProperty('PL')) return setError(errors.plExists);
                else dispatch(startNewPL(orderId));
                break;
            default:
                console.log('Document type is not supported!');
                throw new Error('Document type is not supported!');
        }
        history.push(`/home/${document.toLowerCase()}/create${orderId ? `?order=${orderId}` : ''}`);
    };

    return (
        <>
            <Button
                className={styles}
                variant="contained"
                onClick={onDialogOpen}
            >{buttonText}</Button>
            <Dialog onClose={onDialogClose} open={isDialogOpen}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    {error && <DialogContentText className={classes.error} >{error}</DialogContentText>}
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="document-generation-select-label" >{typeLabel}</InputLabel>
                        <Select
                            labelId="document-generation-select-label"
                            value={document}
                            onChange={onDocumentTypeChange}
                            label={typeLabel}
                        >
                            {documentTypes.map((choice) =>
                                <MenuItem key={choice} value={choice}>{documentNames[choice]}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onDialogClose} color="primary" variant="outlined">
                        {dialogCancel}
                    </Button>
                    <Button onClick={handleGenerate} color="primary" variant="outlined">
                        {dialogConfirm}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}