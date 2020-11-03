import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import SideAutoComplete from '../../inputs/SideAutoComplete.js';
import { Controller } from 'react-hook-form';

const RHFControlledAutocomplete = React.memo(function ControlledAutocomplete(
    { rhfMethods, label, required, options, name }) {
    const { control, errors } = rhfMethods;

    return (
        <Controller
            render={ props =>
                <SideAutoComplete
                    {...props}
                    options={ options }
                    label={ label }
                    error={ errors[name] }
                    required
                />
            }
            name={ name }
            control={ control }
            rules={ { required } }
        />
    )
}, (prev, next) =>
    prev.rhfMethods.formState.isDirty === next.rhfMethods.formState.isDirty
);

RHFControlledAutocomplete.propTypes = {
    label: PropTypes.string.isRequired,
    error: PropTypes.bool,
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired
}

export default RHFControlledAutocomplete;