import React, { useCallback, useState } from 'react';
import Box from '@material-ui/core/Box';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import LeadDialog from './LeadDialog.js';
import { useDispatch, useSelector } from 'react-redux';
import { createLead } from './duck/thunks.js';
import { selectCompanyId } from '../home/duck/selectors.js';
import { selectCurrentUserId } from '../../app/duck/selectors.js';

const {
    buttonLabel,
    dialogTitleLabel,
    dialogSubmitLabel
} = LANGUAGE.lead.overview.newLeadButton;

const NewLeadButton = React.memo(function NewLeadButton({ className }) {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const companyId = useSelector(selectCompanyId);
    const userId = useSelector(selectCurrentUserId);

    const onCancel = useCallback(() => setIsOpen(false), []);
    const onButtonClick = useCallback(() => setIsOpen(true), []);
    const onSubmit = useCallback(
        (data) => {
            data.company = companyId;
            data.createdBy = userId;
            if (data.assignedTo) data.assignedTo = data.assignedTo._id;
            dispatch(createLead({ data }));
            setIsOpen(false);
        },
        [dispatch, companyId, userId]);

    return (
        <Box className={ className }>
            <ThemedButton
                onClick={ onButtonClick }
            >
                { buttonLabel }
            </ThemedButton>
            <LeadDialog
                isOpen={ isOpen }
                onSubmit={ onSubmit }
                onCancel={ onCancel }
                submitLabel={ dialogSubmitLabel }
                titleLabel={ dialogTitleLabel }
            />
        </Box>
    )
});

export default NewLeadButton;