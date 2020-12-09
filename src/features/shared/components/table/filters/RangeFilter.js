import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { LANGUAGE } from '../../../../../app/utils/constants.js';
import { Typography } from '@material-ui/core';

const {
    minLabel,
    maxLabel
} = LANGUAGE.shared.components.table.filterSelector.rangeFilter;

const RangeFilter = React.memo(function RangeFilter({ filterIdx, filter, setFilters }) {

    const onMinRangeChange = useCallback(
        (e) => {
            const { value } = e.target;
            setFilters(prevFilters => {
                const newFilter = { ...prevFilters[filterIdx] };
                newFilter.min = value;
                return [...prevFilters.slice(0, filterIdx), newFilter, ...prevFilters.slice(filterIdx + 1)];
            })
        }, [filterIdx, setFilters]);

    const onMaxRangeChange = useCallback(
        (e) => {
            const { value } = e.target;
            setFilters(prevFilters => {
                const newFilter = { ...prevFilters[filterIdx] };
                newFilter.max = value;
                return [...prevFilters.slice(0, filterIdx), newFilter, ...prevFilters.slice(filterIdx + 1)];
            })
        }, [filterIdx, setFilters]);

    return (
        <Grid
            container
            item
            direction="column"
            alignItems="center"
            md
        >
            <Typography variant="subtitle1">{ filter.label }</Typography>
            <TextField
                label={ minLabel }
                onChange={ onMinRangeChange }
                value={ filter.min }
                type="number"
            />
            <TextField
                label={ maxLabel }
                onChange={ onMaxRangeChange }
                value={ filter.max }
                type="number"
            />
        </Grid>
    );
});

RangeFilter.propTypes = {
    filterIdx: PropTypes.number.isRequired,
    filter: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired
};

export default RangeFilter;