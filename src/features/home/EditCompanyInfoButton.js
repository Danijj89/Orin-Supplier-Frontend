import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { Box } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import CompanyDialog from '../shared/forms/CompanyDialog.js';
import { useDispatch } from 'react-redux';
import { updateCompany } from '../../app/duck/thunks.js';

const { editButtonLabel, dialogTitleLabel, dialogSubmitLabel } = LANGUAGE.home.companyDetails;

export default function EditCompanyInfoButton({ company, ...props }) {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancelEditDialog = () => setIsEdit(false);

    const onSubmitEditDialog = (data) => {
        data.id = company._id;
        dispatch(updateCompany(data));
        setIsEdit(false);
    };

    return (
        <Box { ...props }>
            <ThemedButton
                onClick={ onEdit }
                variant="outlined"
            >
                { editButtonLabel }
            </ThemedButton>
            <CompanyDialog
                company={ company }
                isOpen={ isEdit }
                titleLabel={ dialogTitleLabel }
                submitLabel={ dialogSubmitLabel }
                onSubmit={ onSubmitEditDialog }
                onCancel={ onCancelEditDialog }
            />
        </Box>
    )
}