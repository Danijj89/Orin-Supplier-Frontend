import React, { useCallback, useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from 'app/utils/constants.js';
import LeadDialog from './LeadDialog.js';
import { useDispatch, useSelector } from 'react-redux';
import { createLead } from './duck/thunks.js';
import { selectSessionUserCompanyId, selectSessionUserId } from 'app/duck/selectors.js';
import { CREATE_ANY, CREATE_OWN } from '../admin/utils/actions.js';
import LeadPermission from '../shared/permissions/LeadPermission.js';

const {
    buttonLabel,
    dialogTitleLabel,
    dialogSubmitLabel,
} = LANGUAGE.lead.overview.newLeadButton;

const NewLeadButton = React.memo(function NewLeadButton() {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const companyId = useSelector(selectSessionUserCompanyId);
    const userId = useSelector(selectSessionUserId);

    const onCancel = useCallback(() => setIsOpen(false), []);
    const onButtonClick = useCallback(() => setIsOpen(true), []);
    const onSubmit = useCallback(
        (data) => {
            const { contactName, contactEmail, phone, ...lead } = data;
            lead.contact = {
                name: contactName,
                email: contactEmail,
                phone: phone,
            };
            lead.company = companyId;
            lead.createdBy = userId;
            if (lead.assignedTo) lead.assignedTo = lead.assignedTo._id;
            dispatch(createLead({ data: lead }));
            setIsOpen(false);
        },
        [dispatch, companyId, userId]
    );

    return (
        <LeadPermission action={ [CREATE_ANY, CREATE_OWN] }>
            <ThemedButton onClick={ onButtonClick }>
                { buttonLabel }
            </ThemedButton>
            <LeadDialog
                isOpen={ isOpen }
                onSubmit={ onSubmit }
                onCancel={ onCancel }
                submitLabel={ dialogSubmitLabel }
                titleLabel={ dialogTitleLabel }
            />
        </LeadPermission>
    );
});

export default NewLeadButton;
