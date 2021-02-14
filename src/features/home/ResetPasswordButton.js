import React, { useState } from 'react';
import { LANGUAGE } from 'app/utils/constants.js';
import { Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import ResetPassWordDialog from 'features/shared/forms/ResetPasswordDialog.js';
import { UPDATE_OWN } from 'features/admin/utils/actions.js';
import UserPermission from 'features/shared/permissions/UserPermission.js';
import { resetPassword } from 'features/home/duck/users/thunks.js';

const {
    resetButtonLabel,
    dialogTitleLabel,
    dialogSubmitLabel,
} = LANGUAGE.home.resetPasswordButton;

const ResetPasswordButton = React.memo(function ResetPasswordButton({ userId, className }) {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancelResetDialog = () => setIsEdit(false);

    const onSubmitResetDialog = (data) => {
        const { confirmPassword, ...rest } = data;
        dispatch(resetPassword({ data: rest }));
        setIsEdit(false);
    };

    return (
        <UserPermission action={ UPDATE_OWN } userId={ userId }>
            <Box className={ className }>
                <ThemedButton
                    onClick={ onEdit }
                >
                    { resetButtonLabel }
                </ThemedButton>
                <ResetPassWordDialog
                    userId={ userId }
                    isOpen={ isEdit }
                    titleLabel={ dialogTitleLabel }
                    submitLabel={ dialogSubmitLabel }
                    onSubmit={ onSubmitResetDialog }
                    onCancel={ onCancelResetDialog }
                />
            </Box>
        </UserPermission>
    )
});

export default ResetPasswordButton;