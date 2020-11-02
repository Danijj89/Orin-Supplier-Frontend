import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { Chip } from '@material-ui/core';
import SideTextArea from './SideTextArea.js';

export default function SideAutoComplete(
    {
        label,
        required,
        className,
        error,
        options,
        getOptionLabel,
        getOptionSelected,
        multiple,
        autoSelect,
        freeSolo,
        rows,
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
            freeSolo={ freeSolo }
            autoSelect={ autoSelect }
            multiple={ multiple }
            filterSelectedOptions={ multiple }
            options={ options }
            getOptionLabel={ getOptionLabel }
            getOptionSelected={ getOptionSelected }
            renderInput={ (params) => (
                <SideTextArea
                    { ...params }
                    label={ label }
                    required={ required }
                    error={ error }
                    className={ className }
                    rows={ rows }
                    rowsMax={ 8 }
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
    getOptionLabel: PropTypes.func,
    getOptionSelected: PropTypes.func,
    multiple: PropTypes.bool,
    freeSolo: PropTypes.bool,
    autoSelect: PropTypes.bool,
    rows: PropTypes.number
};