import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    outlined: {
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        '&:hover': {
            color: theme.palette.primary.light,
            backgroundColor: theme.palette.secondary.main,
            borderColor: theme.palette.primary.light
        },
        whiteSpace: 'nowrap'
    },
    text: {
        minWidth: 50,
        color: theme.palette.primary.main,
        borderColor: 'white',
        whiteSpace: 'nowrap'
    },
    contained: {
        color: theme.palette.secondary.main,
        borderColor: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.primary.light,
            borderColor: theme.palette.primary.main
        },
        whiteSpace: 'nowrap'
    }
}));

export default function ThemedButton(
    { children, variant = 'contained', className, ...props }) {
    const classes = useStyles();
    const classNames = clsx(
        variant === 'outlined' && classes.outlined,
        variant === 'contained' && classes.contained,
        variant === 'text' && classes.text,
        className
    );
    return (
        <Button
            { ...props }
            className={ classNames }
            variant={ variant }
        >
            { children }
        </Button>
    )
}

ThemedButton.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
};