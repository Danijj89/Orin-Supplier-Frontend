import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createClient } from './duck/thunks.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/constants.js';
import { Box } from '@material-ui/core';
import ClientDialog from '../shared/forms/ClientDialog.js';
import { makeStyles } from '@material-ui/core/styles';

const { newClientButtonLabel, newClientDialogTitleLabel, newClientSubmitButtonLabel } = LANGUAGE.client.clientOverview;

const useStyles = makeStyles((theme) => ({
    newClient: {
        margin: theme.spacing(2),
    },
}));

export default function NewClientButton({ userId, companyId, users, ...props }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const client = { assignedTo: users.find(user => user._id === userId) };

    const onClick = () => setIsDialogOpen(true);
    const onCancel = () => setIsDialogOpen(false);

    const onSubmit = (data) => {
        const { contactName, contactEmail, ...client } = data;
        client.assignedTo = client.assignedTo._id;
        client.contacts = [{ name: contactName, email: contactEmail }];
        client.createdBy = userId;
        client.clientOf = companyId;
        client.clientSince = new Date();
        dispatch(createClient(client));
        setIsDialogOpen(false);
    };

    return (
        <Box { ...props }>
            <ThemedButton
                onClick={ onClick }
                className={classes.newClient}
            >{ newClientButtonLabel }</ThemedButton>
            <ClientDialog
                isOpen={ isDialogOpen }
                client={ client }
                users={users}
                titleLabel={ newClientDialogTitleLabel }
                submitLabel={ newClientSubmitButtonLabel }
                onCancel={ onCancel }
                onSubmit={ onSubmit }
            />
        </Box>
    )
}