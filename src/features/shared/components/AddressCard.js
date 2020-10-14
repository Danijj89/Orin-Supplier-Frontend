import React from 'react';
import PropTypes from 'prop-types';
import { Card, Divider, Typography, Box, Tooltip } from '@material-ui/core';
import { LANGUAGE } from '../../../app/constants.js';
import { makeStyles } from '@material-ui/core/styles';
import ThemedButton from '../buttons/ThemedButton.js';

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

export default function AddressCard({
    address,
    isDefault,
    onEdit,
    onDelete,
    onSetDefault,
}) {
    const classes = useStyles();

    const getThirdRow = () => {
        let row = '';
        if (address.city) row += address.city;
        if (address.administrative) row += `, ${address.administrative}`;
        if (address.zip) {
            if (address.administrative) row += address.zip;
            else row += `, ${address.zip}`;
        }
        return row ? <Typography>{row}</Typography> : null;
    };

    return (
        <Card className={classes.container}>
            <Box className={classes.header}>
                <Tooltip title={`${typeLabel} ${address.type}`}>
                    <Typography
                        noWrap
                    >{`${typeLabel} ${address.type}`}</Typography>
                </Tooltip>
            </Box>
            <Divider />
            <Box className={classes.main}>
                <Typography className={classes.boldText}>
                    {address.name}
                </Typography>
                {address.address && <Typography>{address.address}</Typography>}
                {address.address2 && (
                    <Typography>{address.address2}</Typography>
                )}
                {getThirdRow()}
                {address.country && <Typography>{address.country}</Typography>}
                {address.phone && (
                    <Typography
                        className={classes.phoneLabel}
                    >{`${phoneLabel} ${address.phone}`}</Typography>
                )}
                {address.email && (
                    <Typography>{`${emailLabel} ${address.email}`}</Typography>
                )}
            </Box>
            <Box className={classes.control}>
                <ThemedButton variant="text" onClick={onEdit}>
                    {editButtonLabel}
                </ThemedButton>
                <Divider orientation="vertical" flexItem />
                <ThemedButton variant="text" onClick={onDelete}>
                    {deleteButtonLabel}
                </ThemedButton>
                <Divider orientation="vertical" flexItem />
                <ThemedButton
                    variant="text"
                    disabled={isDefault}
                    onClick={onSetDefault}
                >
                    {isDefault ? defaultButtonLabel : setDefaultButtonLabel}
                </ThemedButton>
            </Box>
        </Card>
    );
}

AddressCard.propTypes = {
    address: PropTypes.object.isRequired,
    isDefault: PropTypes.bool,
};
