import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ThemedButton from '../buttons/ThemedButton.js';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@material-ui/core';
import { LANGUAGE } from '../../../constants.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'inherit'
    }
}));

const { cancelLabel, confirmLabel } = LANGUAGE.shared.components.buttonWithDialog;

export default function ButtonDialog(
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
        className
    }) {
    const classes = useStyles();
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
        <Box className={ clsx(classes.container, className) }>
            <ThemedButton
                onClick={ onButtonClick }
                variant={buttonVariant}
                styles={buttonStyle}
                disabled={disabled}
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

ButtonDialog.propTypes = {
    buttonLabel: PropTypes.string,
    dialogTitle: PropTypes.string,
    children: PropTypes.element,
    onConfirm: PropTypes.func,
    cancelButtonLabel: PropTypes.string,
    confirmButtonLabel: PropTypes.string,
    buttonVariant: PropTypes.oneOf(['contained', 'outlined', 'text']),
    buttonStyle: PropTypes.string,
    isError: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string
};