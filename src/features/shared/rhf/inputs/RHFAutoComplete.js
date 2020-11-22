import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Autocomplete } from '@material-ui/lab';
import SideTextArea from '../../inputs/SideTextArea.js';

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
        rows,
        rowsMax,
        disabled,
        className,
        freeSolo,
        autoSelect,
        renderOption
    }
) {
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
                        <SideTextArea
                            { ...params }
                            label={ label }
                            required={ isRequired }
                            error={ error }
                            className={ className }
                            rows={ rows }
                            rowsMax={ rowsMax }
                            disabled={ disabled }
                        />
                    ) }
                    onChange={ (_, data) => props.onChange(data) }
                    renderOption={ renderOption }
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
    error: PropTypes.bool,
    required: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]),
    rows: PropTypes.number,
    rowsMax: PropTypes.number,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    freeSolo: PropTypes.bool,
    autoSelect: PropTypes.bool,
    renderOption: PropTypes.func
};

export default RHFAutoComplete;
