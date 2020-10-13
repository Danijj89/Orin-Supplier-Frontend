import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardDatePicker } from '@material-ui/pickers';
import SideTextField from './SideTextField.js';

export default function SideDateField({ label, required, className, error, ...props }) {

    return (
        <KeyboardDatePicker
            { ...props }
            autoOk
            format="dd/MM/yyyy"
            TextFieldComponent={ props =>
                <SideTextField
                    { ...props }
                    className={ className }
                    label={ label }
                    required={ required }
                    error={ error }
                />
            }
        />
    )
}

SideDateField.propTypes = {
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    className: PropTypes.string,
    error: PropTypes.bool
};