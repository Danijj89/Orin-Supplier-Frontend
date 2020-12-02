import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getOptionId, getOptionLabel } from '../../app/utils/options/getters.js';
import { LOCALE } from '../../app/utils/constants.js';

function getStatusBackGroundColor(theme, status) {
    switch (status) {
        case 'Unbooked':
            return theme.palette.grey.main;
        case 'Booked':
            return theme.palette.primary.scuro;
        case 'Space Released':
            return theme.palette.primary.main;
        case 'Shipped':
            return theme.palette.success.main;
        case 'Archived':
            return theme.palette.warning.main;
        case 'Delayed':
            return theme.palette.danger.main;
        default:
            return theme.palette.backgroundSecondary.main;
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: props => getStatusBackGroundColor(theme, props.status),
        color: theme.palette.backgroundPrimary.main,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        borderRadius: 4,
        alignSelf: 'flex-start'
    }
}));

const ShipmentStatusPill = React.memo(function ShipmentStatusPill({ status }) {
    const classes = useStyles({ status: getOptionId(status) });
    return (
        <Typography className={ classes.root }>{ getOptionLabel(status, LOCALE) }</Typography>
    )
});

ShipmentStatusPill.propTypes = {
    status: PropTypes.object.isRequired
};

export default ShipmentStatusPill;