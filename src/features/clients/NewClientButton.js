import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createClient } from './duck/thunks.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from 'app/utils/constants.js';
import ClientDialog from '../shared/forms/ClientDialog.js';
import { selectAllActiveUsers, selectUsersMap } from 'features/home/duck/users/selectors.js';
import { selectSessionUserCompanyId, selectSessionUserId } from 'app/duck/selectors.js';
import { CREATE_ANY, CREATE_OWN } from '../admin/utils/actions.js';
import ClientPermission from '../shared/permissions/ClientPermission.js';
import { selectAllActiveClients } from 'features/clients/duck/selectors.js';
import { isWithinPercentageEditDistance } from 'app/utils/algoritms/helpers.js';
import DuplicateClientDialog from 'features/clients/DuplicateClientDialog.js';

const { newClientButtonLabel, newClientDialogTitleLabel, newClientSubmitButtonLabel } = LANGUAGE.client.clientOverview;

const NewClientButton = React.memo(function NewClientButton() {
    const dispatch = useDispatch();
    const companyId = useSelector(selectSessionUserCompanyId);
    const users = useSelector(selectAllActiveUsers);
    const userId = useSelector(selectSessionUserId);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [duplicates, setDuplicates] = useState([]);
    const [data, setData] = useState(null);

    const client = { assignedTo: userId };
    const clients = useSelector(selectAllActiveClients);
    const usersMap = useSelector(selectUsersMap)

    const onClick = () => setIsDialogOpen(true);
    const onCancel = () => setIsDialogOpen(false);
    const isDuplicateOpen = useMemo(() => duplicates.length > 0, [duplicates]);
    const onDuplicateCancel = useCallback(() => setDuplicates([]), []);
    const onDuplicateSubmit = useCallback(() => {
        dispatch(createClient({ client: data }));
        setData(null);
        setDuplicates([]);
        setIsDialogOpen(false);
    }, [data, dispatch]);

    const onSubmit = useCallback(data => {
        setData(data);
        if (data.assignedTo) data.assignedTo = data.assignedTo?._id;
        data.createdBy = userId;
        data.company = companyId;

        const duplicatesClients = [];
        for (const client of clients) {
            if (isWithinPercentageEditDistance(data.name, client.name)) {
                duplicatesClients.push({ primaryText: client.name, secondaryText: usersMap[client.assignedTo]?.name });
            }
        }
        if (duplicatesClients.length > 0) {
            setDuplicates(duplicatesClients);
            return;
        }

        dispatch(createClient({ client: data }));
        setIsDialogOpen(false);
    }, [dispatch, companyId, userId, clients, usersMap]);

    return (
        <ClientPermission action={ [CREATE_ANY, CREATE_OWN] }>
            <ThemedButton
                onClick={ onClick }
            >{ newClientButtonLabel }</ThemedButton>
            <ClientDialog
                isOpen={ isDialogOpen }
                client={ client }
                users={ users }
                titleLabel={ newClientDialogTitleLabel }
                submitLabel={ newClientSubmitButtonLabel }
                onCancel={ onCancel }
                onSubmit={ onSubmit }
            />
            <DuplicateClientDialog
                onSubmit={ onDuplicateSubmit }
                onCancel={ onDuplicateCancel }
                isOpen={ isDuplicateOpen }
                duplicates={ duplicates }
            />
        </ClientPermission>
    )
});

export default NewClientButton;