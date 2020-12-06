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
        alignItems: props => props.isTextArea ? 'flex-start' : 'center',
    },
    label: {
        marginRight: theme.spacing(4),
    },
    input: {
        width: 320,
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
        borderColor: 'red'
    },
    disabled: {
        backgroundColor: theme.palette.backgroundSecondary.main
    }
}));

const SideTextField = React.memo(function SideTextField(
    {
        label,
        required,
        className,
        error,
        disabled,
        name,
        inputRef,
        value,
        rows = 1,
        rowsMax = 1,
        autoFocus,
        type,
        onChange,
        ...props
    }) {
    const isTextArea = useMemo(
        () => rows > 1 || rowsMax > 1,
        [rows, rowsMax]);
    const classes = useStyles({ isTextArea });
    const classNames = clsx(
        classes.input,
        className,
        error && !disabled && classes.inputInvalid,
        disabled && classes.disabled
    );

    const isRequired = useMemo(() => Boolean(required), [required]);
    const actualInputRef = useMemo(
        () => inputRef ? inputRef : null,
        [inputRef]);

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
                rows={ rows }
                rowsMax={ rowsMax }
                multiline={ isTextArea }
                autoFocus={ autoFocus }
                type={ type }
                onChange={ onChange }
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
    value: PropTypes.any,
    rows: PropTypes.number,
    rowsMax: PropTypes.number,
    autoFocus: PropTypes.bool,
    type: PropTypes.string,
    onChange: PropTypes.func,
};

export default SideTextField;
