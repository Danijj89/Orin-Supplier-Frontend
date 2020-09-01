import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    main: {
        minWidth: 160,
        maxWidth: 280,
        margin: theme.spacing(1),
    }
}));

export default function RHFThemedDropdown({ options, label, error, control, errorMessage, name, styles, ...props }) {
    const classes = useStyles();
    const rules = errorMessage
        ? { required: errorMessage }
        : {}

    return (
        <Controller
            { ...props }
            render={ props => (
                <Autocomplete
                    { ...props }
                    options={ options }
                    renderInput={ params => (
                        <TextField
                            { ...params }
                            label={ label }
                            variant="outlined"
                            error={ !!error }
                            size="small"
                            className={ `${ classes.main } ${ styles }` }
                        />
                    ) }
                    onChange={ (_, data) => props.onChange(data) }
                />
            ) }
            name={ name }
            control={ control }
            rules={ rules }
        />
    )
}