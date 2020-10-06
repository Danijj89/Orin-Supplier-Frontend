import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogTitle, Divider, DialogContent } from '@material-ui/core';
import ThemedButton from '../buttons/ThemedButton.js';
import { LANGUAGE } from '../../../constants.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    }
}));

const { cancelLabel } = LANGUAGE.shared.wrappers.formDialog;

export default function FormDialog(
    {
        children,
        onSubmit,
        onCancel,
        isOpen,
        titleLabel,
        submitLabel,
        className,
        onClose
    }) {
    const classes = useStyles();

    return (
        <Dialog onClose={ onClose } open={ isOpen } className={ className }>
            <DialogTitle>{ titleLabel }</DialogTitle>
            <Divider/>
            <DialogContent className={ classes.container }>
                { children }
            </DialogContent>
            <DialogActions>
                <ThemedButton onClick={ onCancel }>{ cancelLabel }</ThemedButton>
                <ThemedButton onClick={ onSubmit }>{ submitLabel }</ThemedButton>
            </DialogActions>
        </Dialog>
    )
}

FormDialog.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    titleLabel: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClose: PropTypes.func,
    children: PropTypes.element
};