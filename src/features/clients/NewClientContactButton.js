import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { Box } from '@material-ui/core';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useDispatch } from 'react-redux';
import ContactDialog from '../shared/forms/ContactDialog.js';
import { createClientContact } from './duck/thunks.js';
import { makeStyles } from '@material-ui/core/styles';

const {
    newDialogTitleLabel,
    newDialogSubmitLabel,
    newButtonLabel,
} = LANGUAGE.client.clientDetails.clientContactsTable;

const useStyles = makeStyles((theme) => ({
    newContact: {
        margin: theme.spacing(2),
    },
}));

const NewClientContactButton = React.memo(function NewClientContactButton({ clientId, className }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onClick = () => setIsDialogOpen(true);
    const onCancel = () => setIsDialogOpen(false);

    const onSubmit = (data) => {
        const { _id, ...contact } = data;
        dispatch(createClientContact({ clientId, contact }));
        setIsDialogOpen(false);
    };

    return (
        <Box className={ className }>
            <ThemedButton onClick={ onClick } className={ classes.newContact }>
                { newButtonLabel }
            </ThemedButton>
            <ContactDialog
                isOpen={ isDialogOpen }
                titleLabel={ newDialogTitleLabel }
                submitLabel={ newDialogSubmitLabel }
                onCancel={ onCancel }
                onSubmit={ onSubmit }
            />
        </Box>
    );
});

export default NewClientContactButton;
