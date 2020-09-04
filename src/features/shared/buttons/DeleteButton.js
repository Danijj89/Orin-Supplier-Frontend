import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { Delete as IconDelete } from '@material-ui/icons';
import { LANGUAGE } from '../../../constants.js';
import { makeStyles } from '@material-ui/core/styles';

const { cancelButton, confirmButton } = LANGUAGE.shared.deleteButton;

const useStyles = makeStyles((theme) => ({
    button: {
        width: '10%',
        minWidth: 50
    }
}));

export default function DeleteButton({ onDeleteClick, deleteMessage }) {
    const classes = useStyles();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onDialogOpen = () => setIsDialogOpen(true);
    const onDialogClose = () => setIsDialogOpen(false);

    return (
        <>
            <Button
                onClick={onDialogOpen}
                size="small"
                color="inherit"
                className={ classes.button }
            >
                <IconDelete/>
            </Button>
            <Dialog onClose={ onDialogClose } open={ isDialogOpen }>
                <DialogTitle>{ deleteMessage }</DialogTitle>
                <DialogActions>
                    <Button onClick={ onDialogClose } variant="outlined">
                        { cancelButton }
                    </Button>
                    <Button onClick={ onDeleteClick } variant="outlined">
                        { confirmButton }
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}