import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useDispatch } from 'react-redux';
import AdminCompanyDialog from './AdminCompanyDialog.js';
import { createCompany } from './duck/companies/thunks.js';

const {
    buttonLabel,
    dialogTitleLabel,
    dialogSubmitLabel
} = LANGUAGE.admin.admin.companies.newCompanyButton;

const NewCompanyButton = React.memo(function NewCompanyButton() {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const onClick = () => setIsOpen(true);
    const onCancel = () => setIsOpen(false);

    const onSubmit = (data) => {
        dispatch(createCompany({ company: data }));
        setIsOpen(false);
    };

    return (
        <>
            <ThemedButton onClick={ onClick }>{ buttonLabel }</ThemedButton>
            <AdminCompanyDialog
                onCancel={ onCancel }
                onSubmit={ onSubmit }
                isOpen={ isOpen }
                titleLabel={ dialogTitleLabel }
                submitLabel={ dialogSubmitLabel }
            />
        </>
    );
});

export default NewCompanyButton;