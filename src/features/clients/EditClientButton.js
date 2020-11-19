import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import ClientDialog from '../shared/forms/ClientDialog.js';
import { LANGUAGE } from '../../app/constants.js';
import { deleteClient, updateClient } from './duck/thunks.js';
import { selectAllActiveUsers } from '../users/duck/selectors.js';

const {
    buttonLabel,
    dialogTitleLabel,
    dialogSubmitLabel
} = LANGUAGE.client.clientDetails.editClientButton;

const EditClientButton = React.memo(function EditClientButton({ client, className }) {
    const dispatch = useDispatch();
    const users = useSelector(selectAllActiveUsers);
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancelEditDialog = () => setIsEdit(false);

    const onDelete = (id) => dispatch(deleteClient(id));

    const onSubmitEditDialog = (data) => {
        const { contactName, contactEmail, ...rest } = data;
        rest.id = client._id;
        rest.assignedTo = data.assignedTo._id;
        dispatch(updateClient(rest));
        setIsEdit(false);
    };

    return (
        <Box className={ className }>
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
                onDelete={ () => onDelete(client._id) }
                isEdit
            />
        </Box>
    )
});

export default EditClientButton;