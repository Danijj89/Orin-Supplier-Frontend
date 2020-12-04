import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, IconButton } from '@material-ui/core';
import { Delete as IconDelete } from '@material-ui/icons';
import { LANGUAGE } from '../../../app/utils/constants.js';
import { makeStyles } from '@material-ui/core/styles';
import FormDialog from '../wrappers/FormDialog.js';
import clsx from 'clsx';

const {
    confirmButton,
    deleteButtonLabel,
} = LANGUAGE.shared.buttons.deleteButton;

const useStyles = makeStyles((theme) => ({
    button: {
        minWidth: 50,
        color: theme.palette.danger.main,
    },
}));

const DeleteButton = React.memo(function DeleteButton(
    { onDelete, deleteMessage, variant = 'text', className }) {
    const classes = useStyles();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onDialogOpen = (e) => {
        e.stopPropagation();
        setIsDialogOpen(true);
    };

    const onCancel = () => setIsDialogOpen(false);

    const onConfirm = () => {
        onDelete();
        setIsDialogOpen(false);
    };

    return (
        <Box>
            { variant === 'text' &&
            <Button
                onClick={ onDialogOpen }
                size="small"
                color="inherit"
                className={ clsx(classes.button, className) }
            >
                { deleteButtonLabel }
            </Button> }
            { variant === 'icon' &&
            <IconButton onClick={ onDialogOpen }>
                <IconDelete/>
            </IconButton> }
            <FormDialog
                isOpen={ isDialogOpen }
                titleLabel={ deleteMessage }
                submitLabel={ confirmButton }
                onCancel={ onCancel }
                onSubmit={ onConfirm }
            />
        </Box>
    );
});

DeleteButton.propTypes = {
    onDelete: PropTypes.func.isRequired,
    deleteMessage: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['variant', 'icon']),
    className: PropTypes.string,
};

export default DeleteButton;
