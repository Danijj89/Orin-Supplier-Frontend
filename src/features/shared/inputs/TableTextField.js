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
        borderColor: theme.palette.tertiary['400'],
        '& .MuiInputBase-input': {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            fontSize: '0.875rem'
        }
    }
}));

export default function TableTextField({ className, width, ...props }) {
    const classes = useStyles({ width });
    const classNames = clsx(classes.input, className);

    // on focus use this?
    // const moveCursorToEnd = (e) => {
    //     const target = e.currentTarget;
    //     if (target.type === 'number') {
    //         target.type = 'text';
    //         target.setSelectionRange(0, target.value.length);
    //         target.type = 'number';
    //     }
    // }

    return (
        <TextField
            { ...props }
            className={ classNames }
            InputProps={ { ...props.InputProps, disableUnderline: true } }
        />
    )
}