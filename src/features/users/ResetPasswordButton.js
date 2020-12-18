import React, { useState } from 'react';
import { LANGUAGE } from '../../app/utils/constants.js';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import ResetPassWordDialog from '../shared/forms/ResetPasswordDialog.js';
import { updateUser } from './duck/thunks.js';
import Permission from '../shared/components/Permission.js';
import { USER } from '../admin/utils/resources.js';
import { UPDATE_ANY, UPDATE_OWN } from '../admin/utils/actions.js';
import { selectSessionUser } from '../../app/duck/selectors.js';

const {
    resetButtonLabel,
    dialogTitleLabel,
    dialogSubmitLabel,
} = LANGUAGE.home.resetPasswordButton;

const ResetPasswordButton = React.memo(function ResetPasswordButton({ userId, className }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(selectSessionUser);
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancelResetDialog = () => setIsEdit(false);

    const onSubmitResetDialog = (data) => {
        dispatch(updateUser({ userId, update: data }));
        setIsEdit(false);
    };

    return (
        <Permission resource={ USER } action={ [UPDATE_ANY, UPDATE_OWN] } isOwner={ sessionUser._id === userId }>
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
        </Permission>
    )
});

export default ResetPasswordButton;