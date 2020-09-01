import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Box } from '@material-ui/core';
import { LANGUAGE } from '../../../constants.js';
import { makeStyles } from '@material-ui/core/styles';
import ThemedButton from './ThemedButton.js';

const { buttonText, dialogTitle, fieldLabel, dialogCancel, dialogConfirm, errorMessage } = LANGUAGE.shared.addColumnButton;

const useStyles = makeStyles((theme) => ({
    error: {
        color: 'red'
    },
    title: {
        fontSize: theme.typography.h6.fontSize,
        textAlign: 'center'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    dialog: {
        minWidth: 360,
        minHeight: 200
    }
}));

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
        <Box>
            <ThemedButton
                variant="outlined"
                onClick={onDialogOpen}
                styles={classes.button}
                text={buttonText}
            />
            <Dialog onClose={onDialogClose} open={isDialogOpen} classes={ { paper: classes.dialog } }>
                <DialogTitle disableTypography className={classes.title}>{dialogTitle}</DialogTitle>
                {error && <DialogTitle className={classes.error} disableTypography>{errorMessage}</DialogTitle>}
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        margin="dense"
                        type="text"
                        label={fieldLabel}
                        value={newColumnName}
                        size="small"
                        onChange={(e) => setNewColumnName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions className={ classes.buttons }>
                    <ThemedButton
                        onClick={onDialogClose}
                        variant="outlined"
                        text={dialogCancel}
                    />
                    <ThemedButton
                        onClick={onButtonAddColumnClick}
                        variant="outlined"
                        disabled={error}
                        text={dialogConfirm}
                    />
                </DialogActions>
            </Dialog>
        </Box>
    )
}