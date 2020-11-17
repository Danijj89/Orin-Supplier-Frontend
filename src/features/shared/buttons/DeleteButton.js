import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';
import { LANGUAGE } from '../../../app/constants.js';
import { makeStyles } from '@material-ui/core/styles';
import FormDialog from '../wrappers/FormDialog.js';
import classNames from 'classnames';

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

const DeleteButton = React.memo(function DeleteButton({ onDelete, deleteMessage, className }) {
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
            <Button
                onClick={(e) => onDialogOpen(e)}
                size="small"
                color="inherit"
                className={classNames(classes.button, className)}
            >
                {deleteButtonLabel}
            </Button>
            <FormDialog
                isOpen={isDialogOpen}
                titleLabel={deleteMessage}
                submitLabel={confirmButton}
                onCancel={onCancel}
                onSubmit={onConfirm}
            />
        </Box>
    );
});

DeleteButton.propTypes = {
    onDelete: PropTypes.func.isRequired,
    deleteMessage: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default DeleteButton;
