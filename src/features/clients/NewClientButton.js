import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createClient } from './duck/thunks.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import ClientDialog from '../shared/forms/ClientDialog.js';
import { makeStyles } from '@material-ui/core/styles';
import { selectAllActiveUsers } from 'features/home/duck/users/selectors.js';
import { selectSessionUserCompanyId, selectSessionUserId } from '../../app/duck/selectors.js';
import { CREATE_ANY, CREATE_OWN } from '../admin/utils/actions.js';
import ClientPermission from '../shared/permissions/ClientPermission.js';

const { newClientButtonLabel, newClientDialogTitleLabel, newClientSubmitButtonLabel } = LANGUAGE.client.clientOverview;

const useStyles = makeStyles((theme) => ({
    newClient: {
        margin: theme.spacing(2),
    },
}));

const NewClientButton = React.memo(function NewClientButton() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const companyId = useSelector(selectSessionUserCompanyId);
    const users = useSelector(selectAllActiveUsers);
    const userId = useSelector(selectSessionUserId);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const client = { assignedTo: userId };

    const onClick = () => setIsDialogOpen(true);
    const onCancel = () => setIsDialogOpen(false);

    const onSubmit = (data) => {
        if (data.assignedTo) data.assignedTo = data.assignedTo?._id;
        data.createdBy = userId;
        data.company = companyId;
        dispatch(createClient({ client: data }));
        setIsDialogOpen(false);
    };

    return (
        <ClientPermission action={ [CREATE_ANY, CREATE_OWN] }>
            <ThemedButton
                onClick={ onClick }
                className={ classes.newClient }
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
        </ClientPermission>
    )
});

export default NewClientButton;