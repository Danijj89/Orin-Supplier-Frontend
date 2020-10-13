import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TableTextField from './TableTextField.js';

export default function TableAutoComplete(
    { options, getOptionLabel, getOptionSelected, className, ...props }) {

    return (
        <Autocomplete
            {...props}
            options={options}
            getOptionLabel={ getOptionLabel }
            getOptionSelected={ getOptionSelected }
            renderInput={params =>
                <TableTextField
                    {...params}
                    className={ className }
                />
            }
            onChange={(_, data) => props.onChange(data)}
            // size="small"
        />
    )
}