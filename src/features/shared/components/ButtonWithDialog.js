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
        isError,
        disabled,
        ...props
    }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onButtonClick = () => setIsDialogOpen(true);
    const onCancel = () => setIsDialogOpen(false);
    const onConfirmClick = () => {
        if (!isError) {
            onConfirm();
            setIsDialogOpen(false);
        }
    };

    return (
        <Box>
            <ThemedButton
                onClick={ onButtonClick }
                variant={buttonVariant}
                styles={buttonStyle}
                disabled={disabled}
                {...props}
            >
                { buttonLabel }
            </ThemedButton>
            <Dialog open={ isDialogOpen }>
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