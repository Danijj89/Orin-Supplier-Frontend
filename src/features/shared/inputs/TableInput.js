import React from 'react';

export default function TableInput({ type, value, onChange, styles }) {

    const moveCursorToEnd = (e) => {
        const target = e.currentTarget;
        if (target.type === 'number') {
            target.type = 'text';
            target.setSelectionRange(0, target.value.length);
            target.type = 'number';
        }
    }

    return (
        <input
            type={ type }
            value={ value }
            onChange={ (e) => onChange(e) }
            style={ styles }
            onFocus={moveCursorToEnd}
        />
    )
}