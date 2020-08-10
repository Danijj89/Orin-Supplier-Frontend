import React from 'react';

export default function TableInputField({type, InputProps, inputProps, value, onChange, isAutocomplete}) {
    if (isAutocomplete) {
        const {className, ...rest} = inputProps;
        return (
            <div ref={InputProps.ref}>
                <input
                    className="table-input"
                    type={type}
                    {...rest}
                />
            </div>
        )
    } else {
        return (
            <input
                className="table-input"
                type={type}
                value={value}
                onChange={onChange}
            />
        )
    }
}