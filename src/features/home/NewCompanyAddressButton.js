import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import AddressDialog from '../shared/forms/AddressDialog.js';
import { Box } from '@material-ui/core';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAddress } from './duck/thunks.js';
import { makeStyles } from '@material-ui/core/styles';
import { selectCompanyLegalAddress } from './duck/selectors.js';
import { getOptionId } from '../../app/utils/options/getters.js';
import Permission from '../shared/components/Permission.js';
import { COMPANY } from '../admin/utils/resources.js';
import { CREATE_ANY, CREATE_OWN } from '../admin/utils/actions.js';
import { selectSessionUser, selectSessionUserCompanyId } from '../../app/duck/selectors.js';

const {
    newAddressButtonLabel,
    newAddressDialogTitleLabel,
    newAddressDialogSubmitLabel,
} = LANGUAGE.home.companyDetails;

const useStyles = makeStyles((theme) => ({
    newAddressButton: {
        marginBottom: theme.spacing(4),
    },
}));

export default function NewCompanyAddressButton({ className }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const sessionUser = useSelector(selectSessionUser);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const companyId = useSelector(selectSessionUserCompanyId);
    const companyLegalAddress = useSelector(selectCompanyLegalAddress);
    const address = { name: companyLegalAddress.name };

    const onClick = () => setIsDialogOpen(true);
    const onCancel = () => setIsDialogOpen(false);

    const onSubmit = (data) => {
        const { id, ...address } = data;
        address.country = getOptionId(address.country);
        dispatch(addNewAddress({ companyId, address }));
        setIsDialogOpen(false);
    };

    return (
        <Permission
            resource={ COMPANY }
            action={ [CREATE_ANY, CREATE_OWN] }
            isOwner={ sessionUser.company === companyId }
        >
            <Box className={ className }>
                <ThemedButton
                    onClick={ onClick }
                    className={ classes.newAddressButton }
                >
                    { newAddressButtonLabel }
                </ThemedButton>
                <AddressDialog
                    isOpen={ isDialogOpen }
                    address={ address }
                    titleLabel={ newAddressDialogTitleLabel }
                    submitLabel={ newAddressDialogSubmitLabel }
                    onCancel={ onCancel }
                    onSubmit={ onSubmit }
                />
            </Box>
        </Permission>
    );
}
