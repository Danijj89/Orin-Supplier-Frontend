import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import AdminUserDialog from './AdminUserDialog.js';
import { useDispatch } from 'react-redux';
import { createUser } from '../users/duck/thunks.js';

const {
    buttonLabel,
    dialogTitleLabel,
    dialogSubmitLabel,
} = LANGUAGE.admin.admin.users.newUserButton;

const NewUserButton = React.memo(function NewUserButton() {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const onClick = () => setIsOpen(true);
    const onCancel = () => setIsOpen(false);

    const onSubmit = (data) => {
        dispatch(createUser({ user: data }));
        setIsOpen(false);
    };

    return (
        <>
            <ThemedButton onClick={ onClick }>{ buttonLabel }</ThemedButton>
            <AdminUserDialog
                onCancel={ onCancel }
                onSubmit={ onSubmit }
                isOpen={ isOpen }
                titleLabel={ dialogTitleLabel }
                submitLabel={ dialogSubmitLabel }
            />
        </>
    );
});

export default NewUserButton;