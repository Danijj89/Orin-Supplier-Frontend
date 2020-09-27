import React, { useState } from 'react';
import ThemedButton from '../buttons/ThemedButton.js';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@material-ui/core';
import { LANGUAGE } from '../../../constants.js';

const { cancelLabel, confirmLabel } = LANGUAGE.shared.components.buttonWithDialog;

export default function ButtonWithDialog(
    {
        buttonLabel,
        dialogTitle,
        children,
        onConfirm,
        cancelButtonLabel = cancelLabel,
        confirmButtonLabel = confirmLabel,
        buttonVariant = 'contained',
        buttonStyle,
        isError
    }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onButtonClick = () => setIsDialogOpen(true);
    const onCancel = () => setIsDialogOpen(false);
    const onConfirmClick = () => {
        onConfirm();
        if (!isError) {
            setIsDialogOpen(false);
        }
    };

    return (
        <Box>
            <ThemedButton onClick={ onButtonClick } variant={buttonVariant} styles={buttonStyle}>
                { buttonLabel }
            </ThemedButton>
            <Dialog onClose={ onCancel } open={ isDialogOpen }>
                <DialogTitle>{ dialogTitle }</DialogTitle>
                <Divider/>
                <DialogContent>
                    { children }
                </DialogContent>
                <DialogActions>
                    <ThemedButton onClick={ onCancel }>{ cancelButtonLabel }</ThemedButton>
                    <ThemedButton onClick={ onConfirmClick }>{ confirmButtonLabel }</ThemedButton>
                </DialogActions>
            </Dialog>
        </Box>
    )
}