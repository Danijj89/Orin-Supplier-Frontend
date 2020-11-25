import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../../app/utils/constants.js';
import { addNewClientAddress } from '../../clients/duck/thunks.js';
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
    const address = { name: clientName };

    const onClick = () => setIsDialogOpen(true);
    const onCancel = () => setIsDialogOpen(false);

    const onSubmit = (data) => {
        const { _id, ...rest } = data;
        rest.clientId = clientId;
        setIsDialogOpen(false)
        dispatch(addNewClientAddress(rest));
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
    clientId: PropTypes.string,
    clientName: PropTypes.string,
    className: PropTypes.string
};

export default NewClientAddressButton;
