import React, { useCallback, useMemo, useState } from 'react';
import Box from '@material-ui/core/Box';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import AddressDialog from '../shared/forms/AddressDialog.js';
import { getOptionId } from '../../app/utils/options/getters.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useDispatch } from 'react-redux';
import { createLeadAddress } from './duck/thunks.js';

const {
    buttonLabel,
    dialogTitleLabel,
    dialogSubmitLabel
} = LANGUAGE.lead.lead.leadAddresses.newLeadAddressButton;

const NewLeadAddressButton = React.memo(function NewLeadAddressButton(
    { leadId, leadName, className }) {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const address = useMemo(() => ({ name: leadName }), [leadName]);

    const onClick = useCallback(() => setIsOpen(true), []);
    const onCancel = useCallback(() => setIsOpen(false), []);

    const onSubmit = (data) => {
        const { _id, ...address } = data;
        address.country = getOptionId(address.country);
        dispatch(createLeadAddress({ leadId, address }));
        setIsOpen(false)
    };

    return (
        <Box className={ className }>
            <ThemedButton onClick={ onClick }>
                { buttonLabel }
            </ThemedButton>
            <AddressDialog
                isOpen={ isOpen }
                address={ address }
                onSubmit={ onSubmit }
                onCancel={ onCancel }
                submitLabel={ dialogSubmitLabel }
                titleLabel={ dialogTitleLabel }
            />
        </Box>
    )
});

export default NewLeadAddressButton;