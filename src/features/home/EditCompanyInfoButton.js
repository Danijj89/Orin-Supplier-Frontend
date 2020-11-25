import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { Box } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import CompanyDialog from '../shared/forms/CompanyDialog.js';
import { useDispatch } from 'react-redux';
import { updateCompany } from './duck/thunks.js';

const { editButtonLabel, dialogTitleLabel, dialogSubmitLabel } = LANGUAGE.home.companyDetails;

const EditCompanyInfoButton = React.memo(function EditCompanyInfoButton({ company, className }) {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancelEditDialog = () => setIsEdit(false);

    const onSubmitEditDialog = (data) => {
        dispatch(updateCompany({ id: company._id, update: data }));
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
});

export default EditCompanyInfoButton;