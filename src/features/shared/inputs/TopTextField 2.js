import React from 'react';
import { Box, TextField as MuiTextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    container: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
    label: {
        marginRight: theme.spacing(4),
        marginLeft: theme.spacing(1)
    },
    input: {
        width: 240,
        height: 32,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
        borderColor: theme.palette.tertiary['400'],
        backgroundColor: 'white',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    required: {
        color: 'red',
        marginLeft: theme.spacing(1)
    },
    inputInvalid: {
        borderColor: 'red'
    }
}));

export default function TopTextField({label, required, className, error, ...props}) {
    const classes = useStyles();
    const classNames = clsx( classes.input, className, error && classes.inputInvalid);

    return (
        <Box className={ classes.container }>
            <Typography
                className={ classes.label }
                variant="subtitle1"
            >
                { label }
                { required && <span className={ classes.required }>*</span> }
            </Typography>
            <MuiTextField
                { ...props }
                className={ classNames }
                InputProps={ { ...props.InputProps, disableUnderline: true } }
                required={ required }
                error={ error }
            />
        </Box>
    )
}

TopTextField.propTypes = {
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    className: PropTypes.string,
    error: PropTypes.bool
};