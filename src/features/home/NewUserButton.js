import React, { useCallback, useState } from 'react';
import { LANGUAGE } from 'app/utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import { Add as IconAdd } from '@material-ui/icons';
import { createUser } from 'features/home/duck/users/thunks.js';
import { selectSessionUserCompanyId } from 'app/duck/selectors.js';
import CompanyUserDialog from 'features/home/CompanyUserDialog.js';

const {
    titles,
    buttons,
} = LANGUAGE.home.companyUsers;

const NewUserButton = React.memo(function NewUserDialog() {
    const dispatch = useDispatch();
    const sessionCompanyId = useSelector(selectSessionUserCompanyId);
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = useCallback(() => setIsOpen(true), []);
    const onCancel = useCallback(() => setIsOpen(false), []);

    const onSubmit = useCallback(data => {
        data.company = sessionCompanyId;
        dispatch(createUser({ data }));
        setIsOpen(false);
    }, [dispatch, sessionCompanyId]);

    return (
        <>
            <ThemedButton variant="text" onClick={ onOpen }>
                { buttons.newUser }
                <IconAdd/>
            </ThemedButton>
            <CompanyUserDialog
                onSubmit={ onSubmit }
                onCancel={ onCancel }
                isOpen={ isOpen }
                titleLabel={ titles.newUser }
                submitLabel={ buttons.newUserSubmit }
            />
        </>
    );
});

export default NewUserButton;