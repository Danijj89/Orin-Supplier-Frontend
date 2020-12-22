import React, { useState } from 'react';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import UserDialog from 'features/shared/forms/UserDialog.js';
import { Box } from '@material-ui/core';
import { LANGUAGE } from 'app/utils/constants.js';
import { useDispatch } from 'react-redux';
import { updateUser } from 'features/home/duck/users/thunks.js';
import { UPDATE_OWN } from 'features/admin/utils/actions.js';
import UserPermission from 'features/shared/permissions/UserPermission.js';

const {
    editButtonLabel,
    dialogTitleLabel,
    dialogSubmitLabel
} = LANGUAGE.home.accountDetails;

const EditAccountInfoButton = React.memo(function EditAccountInfoButton({ user, className }) {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancelEditDialog = () => setIsEdit(false);

    const onSubmitEditDialog = (data) => {
        const { _id: userId, ...update } = data;
        dispatch(updateUser({ userId, update }));
        setIsEdit(false);
    };

    return (
        <UserPermission action={ UPDATE_OWN } userId={ user._id }>
            <Box className={ className }>
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
        </UserPermission>
    )
});

export default EditAccountInfoButton;