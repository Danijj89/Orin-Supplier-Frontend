import React, { useMemo } from 'react';
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
        alignItems: 'center',
    },
    label: {
        marginRight: theme.spacing(4),
    },
    input: {
        width: 320,
        height: 36,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
        borderColor: theme.palette.tertiary['400'],
        backgroundColor: 'white',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: '1px',
    },
    required: {
        color: 'red',
        marginLeft: theme.spacing(1),
    },
    inputInvalid: {
        borderColor: 'red'
    },
    disabled: {
        backgroundColor: theme.palette.backgroundSecondary.main
    }
}));

const SideTextField = React.memo(function SideTextField(
    { label, required, className, error, disabled, name, inputRef, value, ...props }) {
    const classes = useStyles();
    const classNames = clsx(
        classes.input,
        className,
        error && !disabled && classes.inputInvalid,
        disabled && classes.disabled
    );

    const isRequired = useMemo(() => Boolean(required), [required]);
    const actualInputRef = useMemo(
        () => inputRef ? inputRef({ required: required }) : null,
        [inputRef, required]);

    return (
        <Box className={ classes.container }>
            <Typography className={ classes.label } variant="subtitle1">
                { label }
                { isRequired && <span className={ classes.required }>*</span> }
            </Typography>
            <MuiTextField
                { ...props }
                className={ classNames }
                name={ name }
                value={ value }
                inputRef={ actualInputRef }
                InputProps={ { ...props.InputProps, disableUnderline: true, autoComplete: 'nope' } }
                required={ required }
                error={ error }
                disabled={ disabled }
            />
        </Box>
    );
});

SideTextField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    inputRef: PropTypes.func,
    required: PropTypes.bool,
    className: PropTypes.string,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.any
};

export default SideTextField;
