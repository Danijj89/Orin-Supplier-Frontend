import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import UserDialog from '../shared/forms/UserDialog.js';
import { Box } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import { useDispatch } from 'react-redux';
import { updateUser } from './duck/thunks.js';

const {
    editButtonLabel,
    dialogTitleLabel,
    dialogSubmitLabel
} = LANGUAGE.home.accountDetails;

export default function EditAccountInfoButton({ user, ...props }) {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancelEditDialog = () => setIsEdit(false);

    const onSubmitEditDialog = (data) => {
        data.id = user._id;
        dispatch(updateUser(data));
        setIsEdit(false);
    }

    return (
        <Box { ...props }>
            <ThemedButton
                onClick={ onEdit }
                variant="outlined"
            >
                { editButtonLabel }
            </ThemedButton>
            <UserDialog
                user={ user }
                isOpen={ isEdit }
                titleLabel={ dialogTitleLabel }
                submitLabel={ dialogSubmitLabel }
                onSubmit={ onSubmitEditDialog }
                onCancel={ onCancelEditDialog }
            />
        </Box>
    )
}