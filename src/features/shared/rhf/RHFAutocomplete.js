import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete as MuiAutocomplete } from '@material-ui/lab';
import { Controller } from 'react-hook-form';
import TextField from '../inputs/TextField.js';

export default function RHFAutoComplete(
    { label, labelPositionTop, required, options, getOptionLabel, defaultValue, ...props }) {

    return (
        <Controller
            {...props}
            render={ (props) => (
                <MuiAutocomplete
                    { ...props }
                    options={ options }
                    getOptionLabel={getOptionLabel}
                    renderInput={ (params) => (
                        <TextField
                            { ...params }
                            label={ label }
                            labelPositionTop={ labelPositionTop }
                            required={ required }
                        />
                    ) }
                    onChange={ (_, data) => props.onChange(data) }
                />
            ) }
            defaultValue={defaultValue}
        />
    )
};

RHFAutoComplete.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    labelPositionTop: PropTypes.bool,
    required: PropTypes.bool
};

