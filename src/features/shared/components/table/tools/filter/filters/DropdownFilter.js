import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Autocomplete } from '@material-ui/lab';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const DropdownFilter = React.memo(function DropdownFilter({ filterIdx, filter, setFilters }) {

    const onOptionChange = useCallback(
        (_, data) => setFilters(prevFilters => {
            const newFilter = { ...prevFilters[filterIdx] };
            newFilter.value = data;
            return [...prevFilters.slice(0, filterIdx), newFilter, ...prevFilters.slice(filterIdx + 1)];
        }),
        [filterIdx, setFilters]);

    return (
        <Grid
            container
            item
            direction="column"
            alignItems="center"
            md
        >
            <Typography variant="subtitle1">{ filter.label }</Typography>
            <Autocomplete
                options={ filter.options }
                renderInput={ (params) => (
                    <TextField
                        { ...params }
                        label={ filter.label }
                    />
                ) }
                onChange={ onOptionChange }
                value={ filter.value }
            />
        </Grid>
    );
});

DropdownFilter.propTypes = {
    filterIdx: PropTypes.number.isRequired,
    filter: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired
};

export default DropdownFilter;