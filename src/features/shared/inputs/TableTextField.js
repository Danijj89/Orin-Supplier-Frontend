import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    input: {
        width: props => props.width,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 4,
        borderColor: theme.palette.tertiary['400']
    }
}));

export default function TableTextField({ className, width, ...props }) {
    const classes = useStyles({ width });
    const classNames = clsx(classes.input, className);

    return (
        <TextField
            { ...props }
            className={ classNames }
            InputProps={ { ...props.InputProps, disableUnderline: true } }
        />
    )
}