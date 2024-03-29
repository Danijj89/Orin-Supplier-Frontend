import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { Box } from '@material-ui/core';
import { LANGUAGE } from '../../app/utils/constants.js';
import CompanyDialog from '../shared/forms/CompanyDialog.js';
import { useDispatch, useSelector } from 'react-redux';
import { updateCompany } from 'features/home/duck/home/thunks.js';
import { selectCurrentCompany } from 'features/home/duck/home/selectors.js';
import { getOptionId } from '../../app/utils/options/getters.js';
import { UPDATE_ANY, UPDATE_OWN } from '../admin/utils/actions.js';
import CompanyPermission from '../shared/permissions/CompanyPermission.js';

const { editButtonLabel, dialogTitleLabel, dialogSubmitLabel } = LANGUAGE.home.companyDetails;

const EditCompanyInfoButton = React.memo(function EditCompanyInfoButton({ className }) {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const company = useSelector(selectCurrentCompany);

    const onEdit = () => setIsEdit(true);
    const onCancelEditDialog = () => setIsEdit(false);

    const onSubmitEditDialog = (data) => {
        if (data.currency) data.currency = getOptionId(data.currency);
        data.industries = data.industries.map(industry => getOptionId(industry));
        dispatch(updateCompany({ id: company._id, update: data }));
        setIsEdit(false);
    };

    return (
        <CompanyPermission action={ [UPDATE_ANY, UPDATE_OWN] } companyId={ company._id }>
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
        </CompanyPermission>
    )
});

export default EditCompanyInfoButton;