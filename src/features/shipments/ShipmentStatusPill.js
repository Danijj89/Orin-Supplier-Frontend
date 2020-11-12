import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
        borderRadius: 4
    }
}));

const ShipmentStatusPill = React.memo(function ShipmentStatusPill({ status }) {
    const classes = useStyles({ status });
    return (
        <Typography className={ classes.root }>{ status }</Typography>
    )
});

export default ShipmentStatusPill;