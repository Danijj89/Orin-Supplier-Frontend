import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { getOptionId, getOptionLabel } from '../../app/utils/options/getters.js';
import { LOCALE } from '../../app/utils/constants.js';

export const orderStatusColors = {
    'Not Started': '#818E9B',
    'In Progress': 'rgb(16, 156, 241, 0.75)',
    Completed: 'rgb(30, 174, 155, 0.9)',
    Exception: 'rgb(244, 91, 105, 0.9)',
};

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        textAlign: 'center',
        borderRadius: 4,
        whiteSpace: 'nowrap',
        color: '#FFFFFF',
        fontSize: 12,
        backgroundColor: props => orderStatusColors[props.status]
    }
}));

export default function OrderStatusDisplay({ status, className }) {
    const classes = useStyles({ status: getOptionId(status) });

    return (
        <Typography
            variant="subtitle2"
            className={ clsx(classes.root, className) }
        >
            { getOptionLabel(status, LOCALE) }
        </Typography>
    );
}