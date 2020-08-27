import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core';
import { LANGUAGE } from '../../../constants.js';
import { makeStyles } from '@material-ui/core/styles';

const { buttonText, dialogTitle, dialogCancel, dialogConfirm, errorMessage } = LANGUAGE.shared.addColumnButton;

const useStyles = makeStyles({
    error: {
        color: 'red'
    }
})

export default function AddColumnButton({ currColNumbers, onConfirmClick, maxNumColumns }) {
    const classes = useStyles();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newColumnName, setNewColumnName] = useState('');
    const [error, setError] = useState(currColNumbers > 7);

    const onDialogOpen = () => {
        setIsDialogOpen(true);
        if (currColNumbers === maxNumColumns) setError(true);
    }
    const onDialogClose = () => setIsDialogOpen(false);

    const onButtonAddColumnClick = () => {
        onConfirmClick(newColumnName);
        setNewColumnName('');
        onDialogClose();
    }

    return (
        <>
            <Button variant="outlined" onClick={onDialogOpen}>{buttonText}</Button>
            <Dialog onClose={onDialogClose} open={isDialogOpen}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                {error && <DialogTitle className={classes.error}>{errorMessage}</DialogTitle>}
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        margin="dense"
                        type="text"
                        label={dialogTitle}
                        value={newColumnName}
                        onChange={(e) => setNewColumnName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onDialogClose} variant="outlined">
                        {dialogCancel}
                    </Button>
                    <Button
                        onClick={onButtonAddColumnClick}
                        variant="outlined"
                        disabled={error}
                    >
                        {dialogConfirm}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}