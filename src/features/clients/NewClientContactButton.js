import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { Box } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch } from 'react-redux';
import ContactDialog from '../shared/forms/ContactDialog.js';
import { addNewClientContact } from './duck/thunks.js';

const {
    newDialogTitleLabel,
    newDialogSubmitLabel,
    newButtonLabel
} = LANGUAGE.client.clientDetails.clientContactsTable;

export default function NewClientContactButton({ client, ...props }) {
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onClick = () => setIsDialogOpen(true);
    const onCancel = () => setIsDialogOpen(false);

    const onSubmit = (data) => {
        const { id, ...rest } = data;
        rest.clientId = client._id;
        dispatch(addNewClientContact(rest));
        setIsDialogOpen(false);
    };

    return (
        <Box { ...props }>
            <ThemedButton
                onClick={ onClick }
            >{ newButtonLabel }</ThemedButton>
            <ContactDialog
                isOpen={ isDialogOpen }
                titleLabel={ newDialogTitleLabel }
                submitLabel={ newDialogSubmitLabel }
                onCancel={ onCancel }
                onSubmit={ onSubmit }
            />
        </Box>
    )
}

