import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLeadAddresses, selectLeadById } from './duck/selectors.js';
import Grid from '@material-ui/core/Grid';
import AddressCard from '../shared/components/AddressCard.js';
import AddressDialog from '../shared/forms/AddressDialog.js';
import NewLeadAddressButton from './NewLeadAddressButton.js';
import { deleteLeadAddress, updateLeadAddress, updateLeadDefaultAddress } from './duck/thunks.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { getOptionId } from 'app/utils/options/getters.js';
import { CREATE_ANY, CREATE_OWN, UPDATE_ANY, UPDATE_OWN } from '../admin/utils/actions.js';
import LeadPermission from '../shared/permissions/LeadPermission.js';

const {
    editDialogTitleLabel,
    editDialogSubmitLabel
} = LANGUAGE.lead.lead.leadAddresses;

const LeadAddresses = React.memo(function LeadAddresses({ leadId }) {
    const dispatch = useDispatch();
    const lead = useSelector(state => selectLeadById(state, { leadId }));
    const addresses = useSelector(
        state => selectLeadAddresses(state, { leadId }));
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editAddress, setEditAddress] = useState(null);

    const createEditAddressHandler = useCallback(
        (address) => () => {
            setEditAddress(address);
            setIsEditOpen(true);
        }, []);

    const createDeleteAddressHandler = useCallback(
        (leadId, addressId) => () => {
            dispatch(deleteLeadAddress({ leadId, addressId }));
            setIsEditOpen(false);
        }, [dispatch]);

    const createSetDefaultAddressHandler = useCallback(
        (leadId, addressId) =>
            () => dispatch(updateLeadDefaultAddress({ leadId, addressId })),
        [dispatch]);

    const onEditCancel = useCallback(() => setIsEditOpen(false), []);

    const onSubmit = useCallback(
        data => {
            const { _id: addressId, ...update } = data;
            update.country = getOptionId(update.country);
            dispatch(updateLeadAddress({ leadId, addressId, update }));
            setIsEditOpen(false);
        }, [dispatch, leadId]);


    return (
        <Grid container>
            <Grid container item xs={ 12 }>
                <LeadPermission action={ [CREATE_ANY, CREATE_OWN] } leadId={ leadId }>
                    <NewLeadAddressButton
                        leadId={ leadId }
                        leadName={ lead.name }
                    />
                </LeadPermission>
            </Grid>
            <Grid container item xs={ 12 }>
                { addresses.map(address =>
                    <Grid item xs={ 12 } sm={ 6 } lg={ 4 } key={ address._id }>
                        <AddressCard
                            address={ address }
                            onEdit={ createEditAddressHandler }
                            onDelete={ createDeleteAddressHandler(leadId, address._id) }
                            onSetDefault={ createSetDefaultAddressHandler(leadId, address._id) }
                        />
                    </Grid>
                ) }
                { editAddress &&
                <LeadPermission action={ [UPDATE_ANY, UPDATE_OWN] } leadId={ leadId }>
                    <AddressDialog
                        isOpen={ isEditOpen }
                        address={ editAddress }
                        titleLabel={ editDialogTitleLabel }
                        submitLabel={ editDialogSubmitLabel }
                        onCancel={ onEditCancel }
                        onSubmit={ onSubmit }
                    />
                </LeadPermission>
                }
            </Grid>
        </Grid>
    );
});

export default LeadAddresses;

