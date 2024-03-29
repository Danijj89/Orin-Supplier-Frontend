import React, { useCallback, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { LANGUAGE } from 'app/utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import AddressDialog from '../shared/forms/AddressDialog.js';
import NewCompanyAddressButton from './NewCompanyAddressButton.js';
import { makeStyles } from '@material-ui/core/styles';
import { deleteAddress, updateAddress, updateDefaultAddress } from 'features/home/duck/home/thunks.js';
import AddressCard from '../shared/components/AddressCard.js';
import { selectActiveCompanyAddresses } from 'features/home/duck/home/selectors.js';
import { getOptionId } from 'app/utils/options/getters.js';
import { selectSessionUserCompanyId } from 'app/duck/selectors.js';
import Title5 from 'features/shared/display/Title5.js';

const useStyles = makeStyles((theme) => ({
    addressTitle: {
        fontWeight: 'bold',
        padding: theme.spacing(2),
        color: theme.palette.tertiary[700],
    },
    newAddressButton: {
        margin: theme.spacing(2),
    },
}));

const {
    addressesTableTitleLabel,
    editAddressDialogTitleLabel,
    editAddressDialogSubmitLabel,
} = LANGUAGE.home.companyDetails;

const CompanyAddressCards = React.memo(function CompanyAddressCards() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const companyId = useSelector(selectSessionUserCompanyId);
    const companyAddresses = useSelector(selectActiveCompanyAddresses);
    const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
    const [editAddress, setEditAddress] = useState(null);

    const createDeleteAddressHandler = useCallback(
        (companyId, addressId) => () => {
        dispatch(deleteAddress({ companyId, addressId }));
        setIsEditAddressOpen(false);
    }, [dispatch]);

    const createSetDefaultAddressHandler = useCallback(
        (companyId, addressId) =>
            () => dispatch(updateDefaultAddress({ companyId, addressId })),
            [dispatch]);

    const createOpenEditAddressHandler = useCallback(
        (address) => () => {
        setEditAddress(address);
        setIsEditAddressOpen(true);
    }, []);

    const onEditAddressCancel = () => setIsEditAddressOpen(false);

    const onEditAddressSubmit = (data) => {
        const { _id: addressId, ...update } = data;
        update.country = getOptionId(update.country);
        dispatch(updateAddress({ companyId, addressId, update }));
        setIsEditAddressOpen(false);
    };

    return (
        <Box>
            <Title5 className={classes.addressTitle} title={ addressesTableTitleLabel }/>
            <Grid container>
                { companyAddresses.map((address) =>
                    <Grid item xs={ 12 } sm={ 6 } lg={ 4 } key={ address._id }>
                        <AddressCard
                            address={ address }
                            onEdit={ createOpenEditAddressHandler(address) }
                            onDelete={ createDeleteAddressHandler(companyId, address._id) }
                            onSetDefault={ createSetDefaultAddressHandler(companyId, address._id) }
                        />
                    </Grid>
                ) }
            </Grid>
            { editAddress && (
                <AddressDialog
                    isOpen={ isEditAddressOpen }
                    address={ editAddress }
                    titleLabel={ editAddressDialogTitleLabel }
                    submitLabel={ editAddressDialogSubmitLabel }
                    onCancel={ onEditAddressCancel }
                    onSubmit={ onEditAddressSubmit }
                />
            ) }
            <NewCompanyAddressButton className={ classes.newAddressButton }/>
        </Box>
    );
});

export default CompanyAddressCards;
