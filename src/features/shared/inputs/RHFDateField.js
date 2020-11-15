import React, { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import SideTextField from './SideTextField.js';
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
                    format="dd/MM/yyyy"
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

export default RHFDateField;