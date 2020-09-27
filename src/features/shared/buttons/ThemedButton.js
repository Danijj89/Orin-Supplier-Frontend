import React from 'react';
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
        }
    },
    text: {
        color: theme.palette.primary.main,
        borderColor: 'white'
    },
    contained: {
        color: theme.palette.secondary.main,
        borderColor: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.primary.light,
            borderColor: theme.palette.primary.main
        }
    }
}));

export default function ThemedButton({ styles, children, variant = 'contained', ...props}) {
    const classes = useStyles();
    const style = () => {
        if (variant === 'outlined') return classes.outlined;
        if (variant === 'contained') return classes.contained;
        if (variant === 'text') return classes.text;
    }
    return (
        <Button
            className={ `${ classes.button } ${ style() } ${ styles }` }
            variant={variant}
            {...props}
        >
            { children }
        </Button>
    )
}