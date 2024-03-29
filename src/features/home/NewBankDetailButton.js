import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { LANGUAGE } from '../../app/utils/constants.js';
import BankDetailDialog from './BankDetailDialog.js';
import { createCompanyBankDetail } from 'features/home/duck/home/thunks.js';
import { selectSessionUserCompanyId } from '../../app/duck/selectors.js';

const {
    buttonLabel,
    dialogTitleLabel,
    dialogSubmitLabel
} = LANGUAGE.home.companyDetails.newBankDetailButton;

const NewBankDetailButton = React.memo(function NewBankDetailButton({ className }) {
    const dispatch = useDispatch();
    const companyId = useSelector(selectSessionUserCompanyId);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onClick = () => setIsDialogOpen(true);
    const onCancel = () => setIsDialogOpen(false);

    const onSubmit = (data) => {
        dispatch(createCompanyBankDetail({ id: companyId, data }));
        setIsDialogOpen(false);
    };

    return (
        <Box className={ className }>
            <ThemedButton
                onClick={ onClick }
            >
                { buttonLabel }
            </ThemedButton>
            <BankDetailDialog
                isOpen={ isDialogOpen }
                titleLabel={ dialogTitleLabel }
                submitLabel={ dialogSubmitLabel }
                onCancel={ onCancel }
                onSubmit={ onSubmit }
            />
        </Box>
    )
});

export default NewBankDetailButton;