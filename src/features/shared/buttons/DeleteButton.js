import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { Delete as IconDelete } from '@material-ui/icons';
import { LANGUAGE } from '../../../constants.js';
import { makeStyles } from '@material-ui/core/styles';
import ThemedButton from './ThemedButton.js';

const { cancelButton, confirmButton } = LANGUAGE.shared.buttons.deleteButton;

const useStyles = makeStyles((theme) => ({
    button: {
        minWidth: 50,
        color: theme.palette.tertiary['500']
    }
}));

export default function DeleteButton({ onDeleteClick, deleteMessage }) {
    const classes = useStyles();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onDialogOpen = (e) => {
        e.stopPropagation();
        setIsDialogOpen(true);
    }

    const onDialogClose = () => setIsDialogOpen(false);

    return (
        <>
            <Button
                onClick={(e) => onDialogOpen(e)}
                size="small"
                color="inherit"
                className={ classes.button }
            >
                <IconDelete/>
            </Button>
            <Dialog onClose={ onDialogClose } open={ isDialogOpen }>
                <DialogTitle>{ deleteMessage }</DialogTitle>
                <DialogActions>
                    <ThemedButton onClick={ onDialogClose } variant="outlined">
                        { cancelButton }
                    </ThemedButton>
                    <ThemedButton onClick={(e) => onDeleteClick(e)}>
                        { confirmButton }
                    </ThemedButton>
                </DialogActions>
            </Dialog>
        </>
    )
}