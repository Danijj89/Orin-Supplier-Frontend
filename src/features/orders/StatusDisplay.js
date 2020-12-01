import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { orderStatusColors } from '../../app/themes/theme.js';
import { getOptionId, getOptionLabel } from '../../app/utils/options/getters.js';
import { LOCALE } from '../../app/utils/constants.js';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        textAlign: 'center',
        borderRadius: 6,
        whiteSpace: 'nowrap',
        color: '#FFFFFF',
        fontSize: 12,
        backgroundColor: props => orderStatusColors[props.status]
    }
}));

export default function StatusDisplay({ status, className }) {
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