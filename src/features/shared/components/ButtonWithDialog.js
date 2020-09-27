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
        confirmButtonLabel = confirmLabel
    }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onButtonClick = () => setIsDialogOpen(true);
    const onCancel = () => setIsDialogOpen(false);
    const onConfirmClick = () => {
        onConfirm();
        setIsDialogOpen(false);
    };

    return (
        <Box>
            <ThemedButton
                label={ buttonLabel }
                onClick={ onButtonClick }
            />
            <Dialog onClose={ onCancel } open={ isDialogOpen }>
                <DialogTitle>{ dialogTitle }</DialogTitle>
                <Divider/>
                <DialogContent>
                    { children }
                </DialogContent>
                <DialogActions>
                    <ThemedButton label={ cancelButtonLabel } onClick={ onCancel }/>
                    <ThemedButton label={ confirmButtonLabel } onClick={ onConfirmClick }/>
                </DialogActions>
            </Dialog>
        </Box>
    )
}