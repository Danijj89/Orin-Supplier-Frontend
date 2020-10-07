import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';
import { Delete as IconDelete } from '@material-ui/icons';
import { LANGUAGE } from '../../../constants.js';
import { makeStyles } from '@material-ui/core/styles';
import FormDialog from '../wrappers/FormDialog.js';

const { confirmButton } = LANGUAGE.shared.buttons.deleteButton;

const useStyles = makeStyles((theme) => ({
    button: {
        minWidth: 50,
        color: theme.palette.tertiary['500']
    }
}));

export default function DeleteButton({ onDelete, deleteMessage }) {
    const classes = useStyles();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onDialogOpen = (e) => {
        e.stopPropagation();
        setIsDialogOpen(true);
    }

    const onCancel = () => setIsDialogOpen(false);

    const onConfirm = (e) => {
        e.stopPropagation();
        onDelete();
        setIsDialogOpen(false);
    };

    return (
        <Box>
            <Button
                onClick={(e) => onDialogOpen(e)}
                size="small"
                color="inherit"
                className={ classes.button }
            >
                <IconDelete/>
            </Button>
            <FormDialog
                isOpen={isDialogOpen}
                titleLabel={deleteMessage}
                submitLabel={confirmButton}
                onCancel={onCancel}
                onSubmit={onConfirm}
            />
        </Box>
    )
}

DeleteButton.propTypes = {
    onDelete: PropTypes.func.isRequired,
    deleteMessage: PropTypes.string.isRequired
};