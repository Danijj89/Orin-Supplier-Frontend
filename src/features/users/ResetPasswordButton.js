import React, { useState } from 'react';
import { LANGUAGE } from '../../app/utils/constants.js';
import { Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import ResetPassWordDialog from '../shared/forms/ResetPasswordDialog.js';
import { updateUser } from './duck/thunks.js';
import { USER } from '../admin/utils/resources.js';
import { UPDATE_OWN } from '../admin/utils/actions.js';
import UserPermission from '../shared/permissions/UserPermission.js';

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
        dispatch(updateUser({ userId, update: data }));
        setIsEdit(false);
    };

    return (
        <UserPermission resource={ USER } action={ UPDATE_OWN } userId={ userId }>
            <Box className={ className }>
                <ThemedButton
                    onClick={ onEdit }
                >
                    { resetButtonLabel }
                </ThemedButton>
                <ResetPassWordDialog
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