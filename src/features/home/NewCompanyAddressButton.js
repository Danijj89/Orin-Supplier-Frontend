import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import AddressDialog from '../shared/forms/AddressDialog.js';
import { Box } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import { addNewAddress } from './duck/thunks.js';
import { useDispatch } from 'react-redux';

const {
    newAddressButtonLabel,
    newAddressDialogTitleLabel,
    newAddressDialogSubmitLabel
} = LANGUAGE.home.companyDetails;

export default function NewCompanyAddressButton({ company }) {
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const address = { name: company.legalAddress.name }

    const onClick = () => setIsDialogOpen(true);
    const onCancel = () => setIsDialogOpen(false);

    const onSubmit = (data) => {
        const { id, ...rest } = data;
        rest.companyId = company._id;
        dispatch(addNewAddress(rest));
        setIsDialogOpen(false);
    };

    return (
        <Box>
            <ThemedButton
                onClick={ onClick }
            >{ newAddressButtonLabel }</ThemedButton>
            <AddressDialog
                isOpen={ isDialogOpen }
                address={ address }
                titleLabel={ newAddressDialogTitleLabel }
                submitLabel={ newAddressDialogSubmitLabel }
                onCancel={ onCancel }
                onSubmit={ onSubmit }
            />
        </Box>
    )
}