import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: props => props.rows === 1 ? 'center' : 'flex-start'
    },
    label: {
        marginRight: theme.spacing(4),
        marginLeft: theme.spacing(1),
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
        borderColor: 'red',
    },
}));

const RHFAutoComplete = React.memo(function RHFAutoComplete(
    {
        rhfControl: control,
        name,
        label,
        options,
        getOptionLabel,
        getOptionSelected,
        error,
        required,
        rows = 1,
        rowsMax = 1,
        disabled,
        className,
        freeSolo,
        autoSelect
    }
) {
    const classes = useStyles();

    const inputClasses = clsx(
        classes.input,
        error && classes.inputInvalid
    );

    const isRequired = useMemo(() => Boolean(required), [required]);
    const rules = useMemo(() => ({ required: required }), [required]);

    return (
        <Controller
            render={ (props) =>
                <Autocomplete
                    { ...props }
                    freeSolo={ freeSolo }
                    autoSelect={ autoSelect }
                    options={ options }
                    getOptionLabel={ getOptionLabel }
                    getOptionSelected={ getOptionSelected }
                    renderInput={ (params) => (
                        <Box className={ clsx(classes.container, className) }>
                            <Typography className={ classes.label } variant="subtitle1">
                                { label }
                                { isRequired && <span className={ classes.required }>*</span> }
                            </Typography>
                            <TextField
                                { ...params }
                                className={ inputClasses }
                                InputProps={ { ...params.InputProps, disableUnderline: true } }
                                required={ isRequired }
                                error={ error }
                                rows={ rows }
                                rowsMax={ rowsMax }
                                multiline
                                disabled={ disabled }
                            />
                        </Box>
                    ) }
                    onChange={ (_, data) => props.onChange(data) }
                />
            }
            name={ name }
            control={ control }
            rules={ rules }
        />
    )
});

RHFAutoComplete.propTypes = {
    rhfControl: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    options: PropTypes.array.isRequired,
    getOptionLabel: PropTypes.func,
    getOptionSelected: PropTypes.func,
    error: PropTypes.object,
    required: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]),
    rows: PropTypes.number,
    rowsMax: PropTypes.number,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    freeSolo: PropTypes.bool,
    autoSelect: PropTypes.bool
};

export default RHFAutoComplete;
