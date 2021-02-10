import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import SideTextField from '../../inputs/SideTextField.js';
import { KeyboardDatePicker } from '@material-ui/pickers';

const RHFDateField = React.memo(function RHFDateField(
    {
        rhfControl: control,
        name,
        label,
        required,
        error,
        className
    }
) {
    const isRequired = useMemo(() => Boolean(required), [required]);
    const rules = useMemo(() => ({ required: required }), [required]);

    return (
        <Controller
            render={ props =>
                <KeyboardDatePicker
                    { ...props }
                    autoOk
                    format="MM/dd/yyyy"
                    emptyLabel=""
                    TextFieldComponent={ params =>
                        <SideTextField
                            { ...params }
                            className={ className }
                            label={ label }
                            required={ isRequired }
                            error={ error }
                        />
                    }
                />
            }
            name={ name }
            control={ control }
            rules={ rules }
        />
    )
});

RHFDateField.propTypes = {
    rhfControl: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    required: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    error: PropTypes.bool,
    className: PropTypes.string
};

export default RHFDateField;