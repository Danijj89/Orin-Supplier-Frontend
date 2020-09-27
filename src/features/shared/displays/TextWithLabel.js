import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    box: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    label: {
        color: theme.palette.tertiary['600']
    },
    text: {}
}));

export default function TextWithLabel({label, text, labelStyle, textStyle}) {
    const classes = useStyles();

    return (
        <Box className={classes.box}>
            <Typography className={`${classes.label} ${labelStyle}`}>{label}</Typography>
            <Typography className={`${classes.text} ${textStyle}`}>{text}</Typography>
        </Box>
    )
}