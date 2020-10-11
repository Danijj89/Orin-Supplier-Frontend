import React, { useState } from 'react';
import { LANGUAGE } from '../../constants.js';
import { Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../app/duck/thunks.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import ResetPassWordDialog from '../shared/forms/ResetPasswordDialog.js';

const {
    resetButtonLabel,
    dialogTitleLabel,
    dialogSubmitLabel,
} = LANGUAGE.home.resetPasswordButton;

export default function ResetPasswordButton({ userId, ...props }) {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancelResetDialog = () => setIsEdit(false);

    const onSubmitResetDialog = (data) => {
        data.id = userId;
        dispatch(resetPassword(data));
        setIsEdit(false);
    };

    return (
        <Box { ...props }>
            <ThemedButton
                onClick={onEdit}
            >
                {resetButtonLabel}
            </ThemedButton>
            <ResetPassWordDialog
                isOpen={ isEdit }
                titleLabel={ dialogTitleLabel }
                submitLabel={ dialogSubmitLabel }
                onSubmit={ onSubmitResetDialog }
                onCancel={ onCancelResetDialog }
            />
        </Box>
    )
}