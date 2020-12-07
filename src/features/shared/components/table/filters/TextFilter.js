import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';

const TextFilter = React.memo(function TextFilter({ filter, onChange }) {

    const onTextChange = useCallback(
        (e) => onChange(filter.type, filter.field, e.target.value),
        [filter.type, filter.field]);


    return (
        <>
            <Typography variant="h6">{ filter.field }</Typography>
            <TextField
                label={"Name"}
                value={filter.value}
                onChange={ onTextChange }
            />
        </>
    );
});

TextFilter.propTypes = {
    filter: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default TextFilter;