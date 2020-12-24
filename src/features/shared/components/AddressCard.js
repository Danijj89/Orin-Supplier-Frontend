import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card, Divider, Typography, Box, Tooltip } from '@material-ui/core';
import { LANGUAGE } from '../../../app/utils/constants.js';
import { makeStyles } from '@material-ui/core/styles';
import ThemedButton from '../buttons/ThemedButton.js';
import { getOptionLabel } from '../../../app/utils/options/getters.js';

const useStyles = makeStyles((theme) => ({
    container: {
        width: 380,
        height: 300,
        margin: theme.spacing(2),
        position: 'relative',
    },
    header: {
        height: 40,
        padding: theme.spacing(1),
    },
    main: {
        padding: theme.spacing(2),
    },
    control: {
        display: 'flex',
        padding: theme.spacing(1),
        position: 'absolute',
        bottom: 0,
    },
    phoneLabel: {
        marginTop: theme.spacing(1),
    },
    boldText: {
        fontWeight: 'bold',
    },
}));

const {
    typeLabel,
    phoneLabel,
    emailLabel,
    editButtonLabel,
    defaultButtonLabel,
    deleteButtonLabel,
    setDefaultButtonLabel,
} = LANGUAGE.shared.components.addressCard;

const AddressCard = React.memo(function AddressCard(
    {
        address,
        onEdit,
        onDelete,
        onSetDefault,
    }) {
    const classes = useStyles();

    const getThirdRow = useCallback(() => {
        let row = '';
        if (address.city) row += address.city;
        if (address.administrative && address.zip) row += `, ${ address.administrative } ${address.zip}`;
        else if (address.administrative) row += `, ${ address.administrative }`;
        else if (address.zip) row += `, ${ address.zip }`;
        return row ? <Typography>{ row }</Typography> : null;
    }, [address.administrative, address.city, address.zip]);

    return (
        <Card className={ classes.container }>
            <Box className={ classes.header }>
                <Tooltip title={ `${ typeLabel } ${ address.type }` }>
                    <Typography
                        noWrap
                    >{ `${ typeLabel } ${ address.type }` }</Typography>
                </Tooltip>
            </Box>
            <Divider/>
            <Box className={ classes.main }>
                <Typography className={ classes.boldText }>
                    { address.name }
                </Typography>
                { address.address && <Typography>{ address.address }</Typography> }
                { address.address2 && (
                    <Typography>{ address.address2 }</Typography>
                ) }
                { getThirdRow() }
                { address.country &&
                <Typography>{ getOptionLabel(address.country) }</Typography> }
                { address.phone && (
                    <Typography
                        className={ classes.phoneLabel }
                    >{ `${ phoneLabel } ${ address.phone }` }</Typography>
                ) }
                { address.email && (
                    <Typography>{ `${ emailLabel } ${ address.email }` }</Typography>
                ) }
            </Box>
            <Box className={ classes.control }>
                <ThemedButton variant="text" onClick={ onEdit }>
                    { editButtonLabel }
                </ThemedButton>
                <Divider orientation="vertical" flexItem/>
                <ThemedButton variant="text" onClick={ onDelete }>
                    { deleteButtonLabel }
                </ThemedButton>
                <Divider orientation="vertical" flexItem/>
                <ThemedButton
                    variant="text"
                    disabled={ address.default }
                    onClick={ onSetDefault }
                >
                    { address.default ? defaultButtonLabel : setDefaultButtonLabel }
                </ThemedButton>
            </Box>
        </Card>
    );
});

AddressCard.propTypes = {
    address: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSetDefault: PropTypes.func.isRequired,
};

export default AddressCard;
