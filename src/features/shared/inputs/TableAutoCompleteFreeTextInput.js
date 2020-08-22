import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function TableAutoCompleteFreeTextInput({ options, onChange, value, styles }) {

    return (
        <Autocomplete
            freeSolo
            autoSelect
            options={options}
            renderInput={params => (
                <div ref={params.InputProps.ref}>
                    <input
                        style={styles}
                        type="text"
                        {...params.inputProps}
                    />
                </div>
            )}
            onChange={(_, data) => onChange(data)}
            value={value}
            size="small"
        />
    )
}