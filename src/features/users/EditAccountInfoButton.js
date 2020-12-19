import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import UserDialog from '../shared/forms/UserDialog.js';
import { Box } from '@material-ui/core';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './duck/thunks.js';
import { selectSessionUser } from '../../app/duck/selectors.js';
import Permission from '../shared/permissions/Permission.js';
import { USER } from '../admin/utils/resources.js';
import { UPDATE_ANY, UPDATE_OWN } from '../admin/utils/actions.js';

const {
    editButtonLabel,
    dialogTitleLabel,
    dialogSubmitLabel
} = LANGUAGE.home.accountDetails;

const EditAccountInfoButton = React.memo(function EditAccountInfoButton({ user, className }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(selectSessionUser);
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancelEditDialog = () => setIsEdit(false);

    const onSubmitEditDialog = (data) => {
        const { _id: userId, ...update } = data;
        dispatch(updateUser({ userId, update }));
        setIsEdit(false);
    };

    return (
        <Permission resource={ USER } action={ [UPDATE_ANY, UPDATE_OWN] } isOwner={ sessionUser._id === user._id }>
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
        </Permission>
    )
});

export default EditAccountInfoButton;