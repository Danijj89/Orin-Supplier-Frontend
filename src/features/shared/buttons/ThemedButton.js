import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.secondary.main,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            color: theme.palette.primary.light,
            backgroundColor: theme.palette.secondary.main,
            borderColor: theme.palette.primary.main,
        }
    }
}));

export default function ThemedButton({ onClick, text, styles }) {
    const classes = useStyles();

    return (
        <Button className={`${classes.root} ${styles}`} onClick={ onClick } variant="outlined">
            { text }
        </Button>
    )
}