import React, { useCallback, useMemo, useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from 'app/utils/constants.js';
import LeadDialog from './LeadDialog.js';
import { useDispatch, useSelector } from 'react-redux';
import { createLead } from './duck/thunks.js';
import { selectSessionUserCompanyId, selectSessionUserId } from 'app/duck/selectors.js';
import { CREATE_ANY, CREATE_OWN } from '../admin/utils/actions.js';
import LeadPermission from '../shared/permissions/LeadPermission.js';
import DuplicateLeadDialog from 'features/leads/DuplicateLeadDialog.js';
import { selectAllLeads } from 'features/leads/duck/selectors.js';
import { isWithinPercentageEditDistance } from 'app/utils/algoritms/helpers.js';
import { selectUsersMap } from 'features/home/duck/users/selectors.js';

const {
    buttonLabel,
    dialogTitleLabel,
    dialogSubmitLabel,
} = LANGUAGE.lead.overview.newLeadButton;

const NewLeadButton = React.memo(function NewLeadButton({className}) {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [duplicates, setDuplicates] = useState([]);
    const [data, setData] = useState(null);

    const companyId = useSelector(selectSessionUserCompanyId);
    const userId = useSelector(selectSessionUserId);
    const leads = useSelector(selectAllLeads);
    const usersMap = useSelector(selectUsersMap)

    const isDuplicateOpen = useMemo(() => duplicates.length > 0, [duplicates]);
    const onDuplicateCancel = useCallback(() => setDuplicates([]), []);

    const onDuplicateSubmit = useCallback(() => {
        dispatch(createLead({ data }));
        setData(null);
        setDuplicates([]);
        setIsOpen(false);
    }, [data, dispatch]);

    const onCancel = useCallback(() => setIsOpen(false), []);
    const onButtonClick = useCallback(() => setIsOpen(true), []);
    const onSubmit = useCallback(
        (data) => {
            const { contactName, contactEmail, phone, ...newLead } = data;
            newLead.contact = {
                name: contactName,
                email: contactEmail,
                phone: phone,
            };
            newLead.company = companyId;
            newLead.createdBy = userId;
            if (newLead.assignedTo) newLead.assignedTo = newLead.assignedTo._id;

            const duplicateLeads = [];
            for (const lead of leads) {
                if (isWithinPercentageEditDistance(data.name, lead.name)) {
                    duplicateLeads.push({ primaryText: lead.name, secondaryText: usersMap[lead.assignedTo]?.name });
                }
            }

            if (duplicateLeads.length > 0) {
                setData(data);
                setDuplicates(duplicateLeads);
                return;
            }

            dispatch(createLead({ data: newLead }));
            setIsOpen(false);
        },
        [dispatch, companyId, userId, leads, usersMap]);

    return (
        <LeadPermission action={ [CREATE_ANY, CREATE_OWN] }>
            <ThemedButton onClick={ onButtonClick } className={className}>
                { buttonLabel }
            </ThemedButton>
            <LeadDialog
                isOpen={ isOpen }
                onSubmit={ onSubmit }
                onCancel={ onCancel }
                submitLabel={ dialogSubmitLabel }
                titleLabel={ dialogTitleLabel }
            />
            <DuplicateLeadDialog
                onSubmit={ onDuplicateSubmit }
                onCancel={ onDuplicateCancel }
                isOpen={ isDuplicateOpen }
                duplicates={ duplicates }
            />
        </LeadPermission>
    );
});

export default NewLeadButton;
