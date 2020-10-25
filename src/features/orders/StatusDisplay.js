import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const statusColors = {
    'Not Started': '#818E9B',
    'In Progress': '#109CF1',
    Completed: '#2ED47A',
    Exception: '#F7685B',
};

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        textAlign: 'center',
        borderRadius: 6,
        whiteSpace: 'nowrap',
        color: '#FFFFFF',
        fontSize: 12,
        backgroundColor: props => statusColors[props.status]
    }
}));

export default function StatusDisplay({ status, className }) {
    const classes = useStyles({ status });

    return (
        <Typography
            variant="subtitle2"
            className={ clsx(classes.root, className) }
        >
            { status }
        </Typography>
    )
}