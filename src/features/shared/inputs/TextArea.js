import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextField as MuiTextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    container: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'flex-start',
    },
    label: {
        marginRight: theme.spacing(4),
        marginLeft: theme.spacing(1),
    },
    input: {
        width: 240,
        minHeight: 36,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
        borderColor: theme.palette.tertiary['400'],
        backgroundColor: 'white',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(0.2),
    },
    required: {
        color: 'red',
        marginLeft: theme.spacing(1),
    },
    inputInvalid: {
        borderColor: 'red',
    },
}));

export default function TextArea({
    label,
    required,
    className,
    error,
    rows = 1,
    rowsMax = 1,
    ...props
}) {
    const classes = useStyles();
    const classNames = clsx(
        classes.input,
        className,
        error && classes.inputInvalid
    );

    return (
        <Box className={classes.container}>
            <Typography className={classes.label} variant="subtitle1">
                {label}
                {required && <span className={classes.required}>*</span>}
            </Typography>
            <MuiTextField
                {...props}
                className={classNames}
                InputProps={{ ...props.InputProps, disableUnderline: true }}
                required={required}
                error={error}
                rows={rows}
                rowsMax={rowsMax}
                multiline
            />
        </Box>
    );
}

TextArea.propTypes = {
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    className: PropTypes.string,
    error: PropTypes.bool,
    rows: PropTypes.number,
    rowsMax: PropTypes.number,
};
