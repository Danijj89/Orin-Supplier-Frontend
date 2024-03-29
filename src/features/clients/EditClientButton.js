import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import ClientDialog from '../shared/forms/ClientDialog.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { deleteClient, updateClient } from './duck/thunks.js';
import { UPDATE_ANY, UPDATE_OWN } from '../admin/utils/actions.js';
import ClientPermission from '../shared/permissions/ClientPermission.js';
import { getClientOverviewURL } from 'features/clients/utils/urls.js';

const {
    buttonLabel,
    dialogTitleLabel,
    dialogSubmitLabel
} = LANGUAGE.client.clientDetails.editClientButton;

const EditClientButton = React.memo(function EditClientButton({ client, className }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancelEditDialog = () => setIsEdit(false);

    const createDeleteHandler = useCallback(
        (clientId) => () => {
            dispatch(deleteClient({ clientId }));
            history.push(getClientOverviewURL());
        },
        [dispatch, history]);

    const onSubmit = (data) => {
        const { contactName, contactEmail, notes, ...update } = data;
        if (update.assignedTo) update.assignedTo = update.assignedTo._id;
        dispatch(updateClient({ clientId: client._id, update: update }));
        setIsEdit(false);
    };

    return (
        <ClientPermission action={ [UPDATE_ANY, UPDATE_OWN] } clientId={ client._id }>
            <Box className={ className }>
                <ThemedButton
                    onClick={ onEdit }
                    variant="outlined"
                >
                    { buttonLabel }
                </ThemedButton>
                <ClientDialog
                    client={ client }
                    isOpen={ isEdit }
                    titleLabel={ dialogTitleLabel }
                    submitLabel={ dialogSubmitLabel }
                    onSubmit={ onSubmit }
                    onCancel={ onCancelEditDialog }
                    onDelete={ createDeleteHandler(client._id) }
                    isEdit
                />
            </Box>
        </ClientPermission>
    )
});

export default EditClientButton;