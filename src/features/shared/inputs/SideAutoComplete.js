import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { Chip } from '@material-ui/core';
import SideTextArea from './SideTextArea.js';

const SideAutoComplete = React.memo(function SideAutoComplete(
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
        disabled,
        onChange,
        value,
        onBlur
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
            freeSolo={ freeSolo }
            autoSelect={ autoSelect }
            multiple={ multiple }
            filterSelectedOptions={ multiple }
            options={ options }
            getOptionLabel={ getOptionLabel }
            getOptionSelected={ getOptionSelected }
            disabled={ disabled }
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
            onChange={ (_, data) => onChange(data) }
            renderTags={ renderTags }
            value={ value }
            onBlur={ onBlur }
        />
    )
});

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
    rows: PropTypes.number,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.any,
    onBlur: PropTypes.func
};

export default SideAutoComplete;