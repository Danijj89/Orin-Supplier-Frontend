import React, { useMemo, useState } from 'react';
import { Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../../app/utils/constants.js';
import { createClientAddress } from '../../clients/duck/thunks.js';
import ThemedButton from './ThemedButton.js';
import AddressDialog from '../forms/AddressDialog.js';
import PropTypes from 'prop-types';

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

const NewClientAddressButton = React.memo(function NewClientAddressButton({ clientId, clientName, className }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const address = useMemo(() => ({ name: clientName }), [clientName]);

    const onClick = () => setIsDialogOpen(true);
    const onCancel = () => setIsDialogOpen(false);

    const onSubmit = (data) => {
        const { _id, ...address } = data;
        address.country = data.country.code;
        dispatch(createClientAddress({ clientId, address }));
        setIsDialogOpen(false)
    };

    return (
        <Box className={ className }>
            <ThemedButton className={ classes.newAddress } onClick={ onClick }>
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
    );
});

NewClientAddressButton.propTypes = {
    clientId: PropTypes.string.isRequired,
    clientName: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default NewClientAddressButton;
