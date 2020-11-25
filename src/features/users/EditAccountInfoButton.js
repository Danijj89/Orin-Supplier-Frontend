import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import UserDialog from '../shared/forms/UserDialog.js';
import { Box } from '@material-ui/core';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './duck/thunks.js';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import { selectUserById } from './duck/selectors.js';

const {
    editButtonLabel,
    dialogTitleLabel,
    dialogSubmitLabel
} = LANGUAGE.home.accountDetails;

const EditAccountInfoButton = React.memo(function EditAccountInfoButton({ className }) {
    const dispatch = useDispatch();
    const userId = useSelector(selectCurrentUserId);
    const user = useSelector(state => selectUserById(state, userId));
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancelEditDialog = () => setIsEdit(false);

    const onSubmitEditDialog = (data) => {
        const { _id: userId, ...update } = data;
        dispatch(updateUser({ userId, update }));
        setIsEdit(false);
    };

    return (
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
    )
});

export default EditAccountInfoButton;