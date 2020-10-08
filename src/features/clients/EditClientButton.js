import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import ClientDialog from '../shared/forms/ClientDialog.js';
import { LANGUAGE } from '../../constants.js';
import { updateClient } from './duck/thunks.js';

const {
    buttonLabel,
    dialogTitleLabel,
    dialogSubmitLabel
} = LANGUAGE.client.clientDetails.editClientButton;

export default function EditClientButton({ client, users, ...props }) {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancelEditDialog = () => setIsEdit(false);

    const onSubmitEditDialog = (data) => {
        const { contactName, contactEmail, ...rest} = data;
        rest.id = client._id;
        rest.assignedTo = data.assignedTo._id;
        dispatch(updateClient(rest));
        setIsEdit(false);
    }

    return (
        <Box { ...props }>
            <ThemedButton
                onClick={ onEdit }
                variant="outlined"
            >
                { buttonLabel }
            </ThemedButton>
            <ClientDialog
                client={ client }
                users={ users }
                isOpen={ isEdit }
                titleLabel={ dialogTitleLabel }
                submitLabel={ dialogSubmitLabel }
                onSubmit={ onSubmitEditDialog }
                onCancel={ onCancelEditDialog }
                isEdit
            />
        </Box>
    )
}