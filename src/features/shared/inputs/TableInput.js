import React from 'react';

export default function TableInput({ type, value, onChange, styles }) {
    return (
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e)}
            style={styles}
        />
    )
}