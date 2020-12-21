import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField as MuiTextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: (props) => (props.isTextArea ? 'flex-start' : 'center'),
    },
    label: {
        marginRight: theme.spacing(4),
    },
    required: {
        color: 'red',
        marginLeft: theme.spacing(1),
    },
    root: {
        '&.Mui-focused': {
            borderColor: props => props.isError
                ? theme.palette.danger.main
                : theme.palette.primary.main,
        },
        width: 320,
        minHeight: 36,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 4,
        borderColor: props => props.isError
            ? theme.palette.danger.main
            : theme.palette.grey.light,
        backgroundColor: props => props.disabled
            ? theme.palette.backgroundSecondary.main
            : theme.palette.backgroundPrimary.main,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(0.2),
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
    const isTextArea = useMemo(() => rows > 1 || rowsMax > 1, [rows, rowsMax]);
    const isError = useMemo(() => error && !disabled, [error, disabled]);
    const classes = useStyles({ isTextArea, disabled, isError });

    const isRequired = useMemo(() => Boolean(required), [required]);
    const actualInputRef = useMemo(() => (inputRef ? inputRef : null), [
        inputRef,
    ]);

    return (
        <Box className={ classes.container }>
            <Typography className={ classes.label } variant="subtitle1">
                { label }
                { isRequired && <span className={ classes.required }>*</span> }
            </Typography>
            <MuiTextField
                { ...props }
                className={ className }
                name={ name }
                value={ value }
                inputRef={ actualInputRef }
                InputProps={ {
                    ...props.InputProps,
                    disableUnderline: true,
                    autoComplete: 'nope',
                    className: classes.root
                } }
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
