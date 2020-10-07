import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { Chip } from '@material-ui/core';
import TextArea from './TextArea.js';

export default function SideAutoComplete(
    {
        label,
        required,
        className,
        error,
        options,
        getOptionLabel,
        multiple,
        ...props
    }) {

    const renderTags = multiple
        ? (value, getTagProps) =>
            value.map((option, index) =>
                <Chip
                    label={ option }
                    { ...getTagProps({ index }) }
                />
            )
        : null;

    return (
        <Autocomplete
            { ...props }
            multiple={ multiple }
            filterSelectedOptions={ multiple }
            options={ options }
            getOptionLabel={ getOptionLabel }
            renderInput={ (params) => (
                <TextArea
                    { ...params }
                    label={ label }
                    required={ required }
                    error={ error }
                    className={ className }
                />
            ) }
            onChange={ (_, data) => props.onChange(data) }
            renderTags={ renderTags }
        />
    )
}

SideAutoComplete.propTypes = {
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    className: PropTypes.string,
    error: PropTypes.bool,
    options: PropTypes.array.isRequired,
    getOptionLabel: PropTypes.func
};