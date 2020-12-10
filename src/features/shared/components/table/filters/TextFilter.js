import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { LANGUAGE } from '../../../../../app/utils/constants.js';
import Grid from '@material-ui/core/Grid';

const {
    searchTermLabel
} = LANGUAGE.shared.components.table.filterSelector.textFilter;

const TextFilter = React.memo(function TextFilter({ filterIdx, filter, setFilters }) {

    const onTextChange = useCallback(
        (e) => {
            const { value } = e.target;
            setFilters(prevFilters => {
                const newFilter = { ...prevFilters[filterIdx] };
                newFilter.value = value;
                return [...prevFilters.slice(0, filterIdx), newFilter, ...prevFilters.slice(filterIdx + 1)];
            })
        }, [filterIdx, setFilters]);

    return (
        <Grid
            key={ filter.field }
            container
            item
            direction="column"
            alignItems="center"
            md
        >
            <Typography variant="h6">{ filter.label }</Typography>
            <TextField
                label={ searchTermLabel }
                value={ filter.value }
                onChange={ onTextChange }
            />
        </Grid>
    );
});

TextFilter.propTypes = {
    filterIdx: PropTypes.number.isRequired,
    filter: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired
};

export default TextFilter;