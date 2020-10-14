import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import AddressDialog from '../shared/forms/AddressDialog.js';
import { Box } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch } from 'react-redux';
import { addNewClientAddress } from './duck/thunks.js';
import { makeStyles } from '@material-ui/core/styles';

const {
    newAddressButtonLabel,
    newAddressDialogTitleLabel,
    newAddressDialogSubmitLabel,
} = LANGUAGE.home.companyDetails;

const useStyles = makeStyles((theme) => ({
    newAddress: {
        margin: theme.spacing(2),
    },
}));

export default function NewClientAddressButton({ client, ...props }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const address = { name: client.name };

    const onClick = () => setIsDialogOpen(true);
    const onCancel = () => setIsDialogOpen(false);

    const onSubmit = (data) => {
        const { id, ...rest } = data;
        rest.clientId = client._id;
        dispatch(addNewClientAddress(rest));
        setIsDialogOpen(false);
    };

    return (
        <Box {...props}>
            <ThemedButton className={classes.newAddress} onClick={onClick}>
                {newAddressButtonLabel}
            </ThemedButton>
            <AddressDialog
                isOpen={isDialogOpen}
                address={address}
                titleLabel={newAddressDialogTitleLabel}
                submitLabel={newAddressDialogSubmitLabel}
                onCancel={onCancel}
                onSubmit={onSubmit}
            />
        </Box>
    );
}
